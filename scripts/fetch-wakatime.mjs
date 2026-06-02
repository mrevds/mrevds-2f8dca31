#!/usr/bin/env node
/**
 * Build-time WakaTime fetch.
 * Reads WAKA_KEY from .env, calls WakaTime API, writes JSON to src/data/wakatime.json.
 * The key never reaches the client bundle — only the resulting JSON does.
 *
 * If WAKA_KEY is missing the script no-ops (keeps any existing file).
 */
import { writeFile, readFile, mkdir } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const ENV_PATH = path.join(ROOT, ".env");
const OUT_PATH = path.join(ROOT, "src/data/wakatime.json");

let key = process.env.WAKA_KEY;
if (!key && existsSync(ENV_PATH)) {
  const env = await readFile(ENV_PATH, "utf-8");
  for (const line of env.split("\n")) {
    const m = line.match(/^\s*WAKA_KEY\s*=\s*(.+)$/);
    if (m) {
      key = m[1].trim().replace(/^['"]|['"]$/g, "");
      break;
    }
  }
}

await mkdir(path.dirname(OUT_PATH), { recursive: true });

if (!key) {
  // If the file already has real data, keep it (don't destroy on Vercel/CI builds).
  const existing = existsSync(OUT_PATH) ? JSON.parse(await readFile(OUT_PATH, "utf-8")) : null;
  if (existing?.ok === true && existing?.languages?.length) {
    console.log(`[wakatime] WAKA_KEY not set — keeping existing data from ${existing.fetchedAt}`);
    process.exit(0);
  }
  console.warn("[wakatime] WAKA_KEY not set — writing fallback stub");
  const fallback = { ok: false, fetchedAt: new Date().toISOString() };
  await writeFile(OUT_PATH, JSON.stringify(fallback, null, 2));
  console.log(`[wakatime] wrote ${OUT_PATH} (no data — missing key)`);
  process.exit(0);
}

const auth = "Basic " + Buffer.from(key).toString("base64");

async function get(p) {
  try {
    const r = await fetch(`https://wakatime.com/api/v1${p}`, { headers: { Authorization: auth } });
    if (!r.ok) {
      console.error(`[wakatime] ${p} → HTTP ${r.status}`);
      return null;
    }
    return await r.json();
  } catch (e) {
    console.error(`[wakatime] ${p} → ${e.message}`);
    return null;
  }
}

const [stats, allTime] = await Promise.all([
  get("/users/current/stats/last_7_days"),
  get("/users/current/all_time_since_today"),
]);

if (!stats?.data) {
  console.error("[wakatime] could not fetch stats — writing fallback");
  const fallback = { ok: false, fetchedAt: new Date().toISOString() };
  await writeFile(OUT_PATH, JSON.stringify(fallback, null, 2));
  console.log(`[wakatime] wrote ${OUT_PATH} (API returned no data)`);
  process.exit(0);
}

const d = stats.data;
const pick = (arr, n) =>
  (arr || []).slice(0, n).map((x) => ({
    name: x.name,
    percent: x.percent,
    text: x.text,
    color: x.color,
  }));

const out = {
  ok: true,
  fetchedAt: new Date().toISOString(),
  range: d.range,
  humanReadableTotal: d.human_readable_total,
  humanReadableDailyAverage: d.human_readable_daily_average,
  totalSeconds: d.total_seconds,
  dailyAverage: d.daily_average,
  languages: pick(d.languages, 10),
  editors: pick(d.editors, 4),
  operatingSystems: pick(d.operating_systems, 4),
  projects: pick(d.projects, 5),
  categories: pick(d.categories, 10),
  allTime: allTime?.data?.text ?? null,
};

await writeFile(OUT_PATH, JSON.stringify(out, null, 2));
console.log(`[wakatime] wrote ${OUT_PATH} (${d.human_readable_total} last ${d.range})`);
