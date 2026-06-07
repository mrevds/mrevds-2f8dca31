#!/usr/bin/env node
import { writeFile, readFile, mkdir } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import https from "node:https";

const ROOT = process.cwd();
const ENV_PATH = path.join(ROOT, ".env");
const OUT_PATH = path.join(ROOT, "src/data/yandex-music.json");
const API = "https://api.music.yandex.net";

let token = process.env.YANDEX_MUSIC_TOKEN;
if (!token && existsSync(ENV_PATH)) {
  const env = await readFile(ENV_PATH, "utf-8");
  for (const line of env.split("\n")) {
    const m = line.match(/^\s*YANDEX_MUSIC_TOKEN\s*=\s*(.+)$/);
    if (m) {
      token = m[1].trim().replace(/^['"]|['"]$/g, "");
      break;
    }
  }
}

await mkdir(path.dirname(OUT_PATH), { recursive: true });

if (!token) {
  const existing = existsSync(OUT_PATH) ? JSON.parse(await readFile(OUT_PATH, "utf-8")) : null;
  if (existing?.ok === true && existing?.likedTracks?.length) {
    console.log(`[yandex-music] YANDEX_MUSIC_TOKEN not set — keeping existing data from ${existing.fetchedAt}`);
    process.exit(0);
  }
  console.warn("[yandex-music] YANDEX_MUSIC_TOKEN not set — writing fallback stub");
  const fallback = { ok: false, fetchedAt: new Date().toISOString() };
  await writeFile(OUT_PATH, JSON.stringify(fallback, null, 2));
  console.log(`[yandex-music] wrote ${OUT_PATH} (no data — missing token)`);
  process.exit(0);
}

function agent(opts) {
  return new Promise((resolve) => {
    const req = https.request(opts, (res) => {
      let raw = "";
      res.on("data", (chunk) => (raw += chunk));
      res.on("end", () => {
        if (res.statusCode < 200 || res.statusCode >= 300) {
          console.error(`[yandex-music] ${opts.method || "GET"} ${opts.path} → HTTP ${res.statusCode}`);
          resolve(null);
          return;
        }
        try {
          const json = JSON.parse(raw);
          if (json.error) {
            console.error(`[yandex-music] ${opts.path} → error: ${json.error.message || json.error}`);
            resolve(null);
          } else {
            resolve(json.result);
          }
        } catch {
          resolve(null);
        }
      });
    });
    req.on("error", (e) => {
      console.error(`[yandex-music] ${opts.path} → ${e.message}`);
      resolve(null);
    });
    if (opts.body) req.write(opts.body);
    req.end();
  });
}

function get(path) {
  return agent({
    hostname: "api.music.yandex.net",
    path,
    method: "GET",
    headers: {
      Authorization: `OAuth ${token}`,
      "User-Agent": "Yandex-Music-API",
      "X-Yandex-Music-Client": "YandexMusicAndroid/24023621",
    },
  });
}

function postForm(path, data) {
  const params = new URLSearchParams();
  for (const [k, v] of Object.entries(data)) {
    if (Array.isArray(v)) {
      v.forEach((item) => params.append(k, String(item)));
    } else {
      params.append(k, String(v));
    }
  }
  const body = params.toString();
  return agent({
    hostname: "api.music.yandex.net",
    path,
    method: "POST",
    headers: {
      Authorization: `OAuth ${token}`,
      "User-Agent": "Yandex-Music-API",
      "X-Yandex-Music-Client": "YandexMusicAndroid/24023621",
      "Content-Type": "application/x-www-form-urlencoded",
      "Content-Length": Buffer.byteLength(body),
    },
    body,
  });
}

function coverUrl(uri, size = "200x200") {
  if (!uri) return null;
  return `https://${uri.replace("%%", size)}`;
}

// 1. Get account info
const status = await get("/account/status");
if (!status?.account?.uid) {
  console.error("[yandex-music] could not get account info — writing fallback");
  const fallback = { ok: false, fetchedAt: new Date().toISOString() };
  await writeFile(OUT_PATH, JSON.stringify(fallback, null, 2));
  process.exit(0);
}

const uid = status.account.uid;
const login = status.account.login || "";
const displayName = status.account.displayName || status.account.secondName || login;
console.log(`[yandex-music] authenticated as ${displayName} (uid: ${uid})`);

// 2. Get liked tracks (up to 50 most recent)
const likes = await get(`/users/${uid}/likes/tracks`);
const likedShort = likes?.library?.tracks || [];
console.log(`[yandex-music] found ${likedShort.length} liked tracks`);

// 3. Fetch full track details for liked tracks (first 100)
const likedTrackIds = likedShort.slice(0, 100).map((t) => String(t.id));
let likedTracks = [];
if (likedTrackIds.length > 0) {
  let trackDetails = [];
  for (let i = 0; i < likedTrackIds.length; i += 50) {
    const batch = likedTrackIds.slice(i, i + 50);
    const details = await postForm("/tracks/", {
      "track-ids": batch,
      "with-positions": "false",
    });
    if (details && Array.isArray(details)) trackDetails.push(...details);
  }
  if (trackDetails.length > 0) {
    likedTracks = trackDetails.map((t) => ({
      id: t.id,
      title: t.title,
      artists: (t.artists || []).map((a) => a.name),
      cover: coverUrl(t.coverUri),
      albumTitle: t.albums?.[0]?.title || null,
      albumId: t.albums?.[0]?.id || null,
      durationMs: t.durationMs,
    }));
  }
}

// 4. Assemble output
const out = {
  ok: true,
  fetchedAt: new Date().toISOString(),
  user: { uid, login, displayName },
  likedTracks,
  likedTracksCount: likes?.library?.revision ?? null,
  totalLikedTracks: likedShort.length,
};

await writeFile(OUT_PATH, JSON.stringify(out, null, 2));
console.log(`[yandex-music] wrote ${OUT_PATH} (${likedTracks.length} liked tracks of ${likedShort.length})`);
