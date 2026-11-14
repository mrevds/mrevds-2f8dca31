import { useCallback, useEffect, useMemo, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { ArrowDown, ArrowUp, ArrowUpRight, Play, Shuffle } from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import NightRoom from "@/components/NightRoom";
import { rng } from "@/components/world/scenes";
import { PortalView } from "@/components/world/scenes2";
import { placeTracks, type Kind, type Universe } from "@/components/world/universes";
import { ym, formatDuration, type LikedTrack } from "@/lib/data";

/* Music: my room at night, a door, and behind it a universe for every kind of song I like.
   Songs are sorted by the genre of their album (see universes.ts); each universe draws them as its own thing. */

const ROMAN = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI", "XII", "XIII"];

/* ── where each song stands, in % of its scene ── */
type Pt = { x: number; y: number; drop?: number; s?: number; delay: number };
type Box = { x0: number; x1: number; y0: number; y1: number };
type Layout = { pts: Pt[]; buildings?: Box[]; road?: { vy: number; lanes: number[] }; ropes?: number[] };

const scatter = (n: number, seed: number, box: Box, avoid: Box[], ar: number): Pt[] => {
  const r = rng(seed);
  const pts: Pt[] = [];
  let min = 13;
  for (let tries = 0; pts.length < n && tries < 20000; tries++) {
    if (tries % 400 === 399) min *= 0.88; // crowded: let them sit closer
    const x = box.x0 + r() * (box.x1 - box.x0);
    const y = box.y0 + r() * (box.y1 - box.y0);
    if (avoid.some((a) => x > a.x0 && x < a.x1 && y > a.y0 && y < a.y1)) continue;
    if (pts.some((p) => Math.hypot(p.x - x, (p.y - y) * ar) < min)) continue;
    pts.push({ x, y, delay: -r() * 6 });
  }
  return pts;
};

const ROPE_SAG = 6;
const ropeY = (base: number, x: number) => base + ROPE_SAG * Math.sin((x / 100) * Math.PI);

/* how many screens tall a universe is: kinds that can stack grow with their songs */
const GROWS: Partial<Record<Kind, number>> = { lantern: 22, window: 26, neon: 26, coin: 26, balloon: 24, firefly: 26, ember: 26, vinyl: 22, skylantern: 24, jelly: 26 };
const screensFor = (kind: Kind, n: number, portrait: boolean) => {
  const base = portrait ? 1.5 : 1;
  const cap = GROWS[kind];
  if (!cap) return base;
  return Math.max(base, (n / cap) * (portrait ? 1.9 : 1));
};

const layout = (kind: Kind, n: number, portrait: boolean, K: number): Layout => {
  const ar = (portrait ? 2.2 : 0.56) * K;
  const capY = (portrait ? 46 : 40) / K; // the caption's share of the scene
  const caption: Box = portrait ? { x0: 0, x1: 100, y0: 0, y1: capY } : { x0: 0, x1: 46, y0: 0, y1: capY };
  const top = (y: number) => (portrait ? Math.max(y, capY + 2) : y);
  const box = (y0: number, y1: number): Box => ({ x0: portrait ? 8 : 4, x1: portrait ? 92 : 96, y0: top(y0), y1 });

  switch (kind) {
    case "lantern": {
      const perRow = portrait ? 5 : 10;
      const rows = Math.max(1, Math.ceil(n / perRow));
      const y0 = capY + 6;
      const bases = Array.from({ length: rows }, (_, i) => (rows === 1 ? Math.max(y0, 50) : y0 + ((88 - y0) * i) / (rows - 1)));
      const per = Math.ceil(n / rows);
      const r = rng(7);
      const pts = Array.from({ length: n }, (_, i) => {
        const row = Math.floor(i / per);
        const count = Math.min(per, n - row * per);
        const x = 5 + (90 * ((i % per) + 0.5)) / count;
        return { x, y: ropeY(bases[row], x), drop: 16 + Math.round(r() * 40), delay: -r() * 4 };
      });
      return { pts, ropes: bases };
    }
    case "window": {
      const perBuilding = 12;
      const B = Math.max(1, Math.ceil(n / perBuilding));
      const perRow = portrait ? Math.min(3, B) : Math.min(6, B);
      const rows = Math.ceil(B / perRow);
      const y0 = capY + 6;
      const rowH = (96 - y0) / rows;
      const r = rng(13);
      const buildings: Box[] = [];
      const pts: Pt[] = [];
      let left = n;
      for (let b = 0; b < B; b++) {
        const row = Math.floor(b / perRow);
        const inRow = Math.min(perRow, B - row * perRow);
        const col = b % perRow;
        const slot = 88 / inRow;
        const bw = Math.min(slot * 0.74, portrait ? 26 : 12);
        const cx = 6 + slot * (col + 0.5);
        const rowTop = y0 + row * rowH;
        const by0 = rowTop + rowH * (0.04 + r() * 0.16);
        const by1 = rowTop + rowH;
        buildings.push({ x0: cx - bw / 2, x1: cx + bw / 2, y0: by0, y1: by1 });
        const m = Math.min(perBuilding, left, Math.ceil(left / (B - b)));
        left -= m;
        const wr = Math.ceil(m / 3);
        for (let i = 0; i < m; i++) {
          const c = i % 3;
          const rr = Math.floor(i / 3);
          pts.push({
            x: cx - bw / 2 + (bw * (c + 0.5)) / 3,
            y: by0 + (by1 - by0) * 0.1 + ((by1 - by0) * 0.78 * (rr + 0.5)) / Math.max(wr, 3),
            delay: -r() * 8,
          });
        }
      }
      return { pts, buildings };
    }
    case "taillight": {
      const lanes = n > 16 ? (portrait ? [-40, -14, 14, 40] : [-30, -10, 10, 30]) : portrait ? [-30, 30] : [-16, 16];
      const vy = portrait ? 33 : 47;
      const perLane = Math.ceil(n / lanes.length);
      const r = rng(17);
      const pts = Array.from({ length: n }, (_, i) => {
        const lane = lanes[i % lanes.length];
        const k = Math.floor(i / lanes.length);
        const t = 0.08 + 0.9 * ((k + 0.5 + (i % 2) * 0.35) / perLane) ** 1.5;
        return { x: 50 + lane * t, y: vy + (96 - vy) * t, s: 0.35 + 0.8 * t, delay: -r() * 3 };
      });
      return { pts, road: { vy, lanes } };
    }
    case "neon": return { pts: scatter(n, 21, box(12, 82), [caption], ar) };
    case "coin": return { pts: scatter(n, 23, box(12, 76), [caption], ar) };
    case "balloon": return { pts: scatter(n, 25, box(10, 82), [caption], ar) };
    case "firefly": return { pts: scatter(n, 11, box(18, 90), [caption], ar) };
    case "ember": return { pts: scatter(n, 27, box(8, 100 - 30 / K), [caption], ar) };
    case "vinyl": return { pts: scatter(n, 29, box(14, 100 - 26 / K), [caption], ar) };
    case "skylantern": return { pts: scatter(n, 37, box(12, 100 - 26 / K), [caption], ar) };
    case "jelly": return { pts: scatter(n, 31, box(10, 92), [caption], ar) };
    case "star": return { pts: scatter(n, 33, box(6, portrait ? 56 : 54), [caption, { x0: 48, x1: 60, y0: 8, y1: 30 }], ar) };
    case "bottle": return { pts: scatter(n, 41, box(portrait ? 64 : 70, 90), [{ x0: 0, x1: 34, y0: 82, y1: 100 }], ar * 1.6) };
  }
};

const constellations = (pts: Pt[]) => {
  const groups: Pt[][] = [];
  for (let i = 0; i < pts.length; i += 5) groups.push([...pts.slice(i, i + 5)].sort((a, b) => a.x - b.x));
  return groups;
};

const PALETTE: Partial<Record<Kind, string[]>> = {
  neon: ["#05d9e8", "#ff2a6d", "#ffe36e", "#b967ff"],
  balloon: ["#f7a8c4", "#fbe3a8", "#a8e0c8", "#a8c8f5", "#d4b8f2", "#ffb8a0"],
  window: ["#ffcf7a", "#ffd9a0", "#9fc4ff", "#ffb36b", "#ffcf7a"],
  jelly: ["#8fe8ff", "#ff9ad5", "#b9a8ff"],
};

const usePortrait = () => {
  const q = "(max-aspect-ratio: 4/5)";
  const [portrait, set] = useState(() => window.matchMedia(q).matches);
  useEffect(() => {
    const m = window.matchMedia(q);
    const on = () => set(m.matches);
    m.addEventListener("change", on);
    return () => m.removeEventListener("change", on);
  }, []);
  return portrait;
};

/* ── the door: scrolling through this section opens it, then carries you through ── */
const Threshold = ({ worlds }: { worlds: number }) => {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const rect = el.getBoundingClientRect();
      const total = el.offsetHeight - window.innerHeight;
      const p = Math.min(1, Math.max(0, -rect.top / Math.max(1, total)));
      const open = Math.min(1, p / 0.5);
      const zoom = Math.min(1, Math.max(0, (p - 0.45) / 0.55));
      el.style.setProperty("--open", open.toFixed(3));
      el.style.setProperty("--zoom", (zoom * zoom).toFixed(3));
    };
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <section className="threshold" ref={ref} id="threshold" aria-label="The door out of the room">
      <div className="threshold-stage">
        <div className="threshold-text">
          <span className="ch-no">The threshold</span>
          <h2>Every kind of song I like is a world</h2>
          <p>{worlds} worlds wait outside, each drawn its own way. Keep scrolling and the door opens.</p>
        </div>
        <div className="door-zoom">
          <div className="door-frame">
            <div className="door-view"><PortalView /></div>
            <div className="door-leaf" aria-hidden="true">
              <span /><span /><i />
            </div>
          </div>
          <div className="door-spill" aria-hidden="true" />
          <div className="door-mat" aria-hidden="true">ようこそ</div>
        </div>
      </div>
    </section>
  );
};

/* ── one song as a thing in the world ── */
const Thing = ({ kind, t, p, i, on, onPlay }: { kind: Kind; t: LikedTrack; p: Pt; i: number; on: boolean; onPlay: (t: LikedTrack) => void }) => {
  const side = p.x < 22 ? " tip-l" : p.x > 78 ? " tip-r" : "";
  const below = p.y < 16 || kind === "lantern" || kind === "window" ? " tip-below" : "";
  const colors = PALETTE[kind];
  const style = {
    left: `${p.x}%`, top: `${p.y}%`, "--drop": `${p.drop ?? 0}px`, "--delay": `${p.delay.toFixed(2)}s`, "--s": p.s ?? 1,
    "--c": colors ? colors[i % colors.length] : undefined,
  } as CSSProperties;
  return (
    <button id={`t-${t.id}`} className={`thing thing-${kind} v${i % 3}${on ? " on" : ""}`} style={style} onClick={() => onPlay(t)}
      aria-label={`Play ${t.title} by ${t.artists.join(", ")}`}>
      <span className="thing-shape" aria-hidden="true" />
      <span className={`tip${side}${below}`} aria-hidden="true">
        {t.cover ? <img src={t.cover} alt="" width={44} height={44} loading="lazy" /> : <span className="tip-nocover" />}
        <span className="tip-text">
          <b>{t.title}</b>
          <span>{t.artists.join(", ")} · {formatDuration(t.durationMs)}</span>
        </span>
      </span>
    </button>
  );
};

const Land = ({ u, index, tracks, byGenre, current, onPlay, portrait, children }: {
  u: Universe; index: number; tracks: LikedTrack[]; byGenre: boolean; current: string;
  onPlay: (t: LikedTrack) => void; portrait: boolean; children?: ReactNode;
}) => {
  const K = screensFor(u.kind, tracks.length, portrait);
  const tall = K > (portrait ? 1.5 : 1) + 0.01;
  const { pts, buildings, road, ropes } = useMemo(() => layout(u.kind, tracks.length, portrait, K), [u.kind, tracks.length, portrait, K]);
  const { Bg } = u;
  const id = `world-${u.id}`;
  return (
    <section className={`land land-${u.kind}${tall ? " tall" : ""}`} id={id} aria-labelledby={`${id}-title`} style={{ "--k": K } as CSSProperties}>
      <div className="land-sky"><Bg /></div>

      {(ropes || buildings || road || u.kind === "star") && (
        <svg className="land-lines" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
          {ropes?.map((base) => (
            <polyline key={base} points={Array.from({ length: 41 }, (_, i) => `${i * 2.5},${ropeY(base, i * 2.5).toFixed(2)}`).join(" ")} />
          ))}
          {buildings?.map((b, i) => (
            <g key={i} className="block">
              <rect x={b.x0} y={b.y0} width={b.x1 - b.x0} height={b.y1 - b.y0} />
              <rect className="block-roof" x={b.x0 - 0.4} y={b.y0} width={b.x1 - b.x0 + 0.8} height="0.6" />
            </g>
          ))}
          {road && (() => {
            const edge = Math.max(...road.lanes.map(Math.abs)) + 10;
            return (
              <g className="road">
                <polygon points={`49.6,${road.vy} 50.4,${road.vy} ${50 + edge},100 ${50 - edge},100`} />
                <polyline className="road-edge" points={`49.6,${road.vy} ${50 - edge},100`} />
                <polyline className="road-edge" points={`50.4,${road.vy} ${50 + edge},100`} />
                {road.lanes.slice(0, -1).map((l, i) => {
                  const mid = (l + road.lanes[i + 1]) / 2;
                  return <polyline key={i} className="road-dash" points={`50,${road.vy} ${50 + mid},100`} />;
                })}
              </g>
            );
          })()}
          {u.kind === "star" && constellations(pts).map((g, i) => <polyline key={i} className="sky-line" points={g.map((p) => `${p.x},${p.y}`).join(" ")} />)}
        </svg>
      )}
      {u.kind === "star" && !tall && pts.map((p, i) => {
        const y = 2 * (portrait ? 60 : 62) - p.y;
        return y < 97 ? <span key={i} className="star-echo" style={{ left: `${p.x}%`, top: `${y}%`, animationDelay: `${p.delay}s` }} aria-hidden="true" /> : null;
      })}

      <header className="story-cap">
        <span className="ch-no">World {ROMAN[index] ?? index + 1} · {byGenre ? `${u.genres} · ` : ""}{tracks.length} {tracks.length === 1 ? "song" : "songs"} as {u.thing}</span>
        <h2 id={`${id}-title`}>{u.title}</h2>
        <p>{u.text}</p>
        <span className="story-jp" aria-hidden="true">{u.jp}</span>
      </header>

      {tracks.map((t, i) => pts[i] && <Thing key={t.id} kind={u.kind} t={t} p={pts[i]} i={i} on={t.id === current} onPlay={onPlay} />)}
      {children}
    </section>
  );
};

/* a tiny cassette for the deck at the bottom; the reels turn while the player is open */
const Cassette = ({ spinning }: { spinning: boolean }) => (
  <svg className={`hud-tape${spinning ? " spinning" : ""}`} viewBox="0 0 48 32" aria-hidden="true">
    <rect x="1" y="1" width="46" height="30" rx="4" fill="#efe7da" />
    <rect x="6" y="6" width="36" height="12" rx="2" fill="#b3202d" />
    <rect x="10" y="20" width="28" height="9" rx="2" fill="#1a1716" />
    <g className="reel"><circle cx="16" cy="12" r="4" fill="#1a1716" /><path d="M16 9 V15 M13 12 H19" stroke="#efe7da" strokeWidth="1" /></g>
    <g className="reel"><circle cx="32" cy="12" r="4" fill="#1a1716" /><path d="M32 9 V15 M29 12 H35" stroke="#efe7da" strokeWidth="1" /></g>
  </svg>
);

const Music = () => {
  const tracks = useMemo(() => (ym.ok ? ym.likedTracks : []), []);
  const { placed, byGenre } = useMemo(() => placeTracks(tracks), [tracks]);
  const worldOf = useMemo(() => {
    const m = new Map<string, number>();
    placed.forEach((p, i) => p.tracks.forEach((t) => m.set(t.id, i)));
    return m;
  }, [placed]);
  const [current, setCurrent] = useState<LikedTrack | undefined>(tracks[0]);
  const [playing, setPlaying] = useState<LikedTrack | null>(null);
  const portrait = usePortrait();

  useEffect(() => {
    const prev = document.title;
    document.title = "Music — Denis Muratbaev";
    document.documentElement.classList.add("theme-night");
    return () => {
      document.title = prev;
      document.documentElement.classList.remove("theme-night");
    };
  }, []);

  const play = useCallback((t: LikedTrack) => { setCurrent(t); setPlaying(t); }, []);
  const shuffle = () => {
    const pool = tracks.filter((t) => t.id !== current?.id);
    if (!pool.length) return;
    const t = pool[Math.floor(Math.random() * pool.length)];
    setCurrent(t);
    document.getElementById(`t-${t.id}`)?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  if (!tracks.length || !current) {
    return <p className="world-empty">The music data is not here yet. It updates every day.</p>;
  }

  const w = worldOf.get(current.id) ?? 0;

  return (
    <div className="world">
      <section className="world-room" aria-labelledby="music-title">
        <NightRoom track={{ title: current.title, artist: current.artists.join(", ") }} />
        <div className="room-cap">
          <p className="kicker">Music · {ym.totalLikedTracks.toLocaleString("en-US")} liked tracks · Tashkent, after dark</p>
          <h1 id="music-title">Night <em>shift</em></h1>
          <p className="lede">My room, late. Rain on the window, Go on the screen, a tape in the deck. Behind the door there is a world for every kind of song I like, and my newest {tracks.length} likes live out there.</p>
          <a className="btn btn-paper" href="#threshold">Step outside <ArrowDown size={16} strokeWidth={1.5} /></a>
        </div>
      </section>

      <Threshold worlds={placed.length} />

      {placed.map((p, i) => (
        <Land key={p.universe.id} u={p.universe} index={i} tracks={p.tracks} byGenre={byGenre} current={current.id} onPlay={play} portrait={portrait}>
          {i === placed.length - 1 && (
            <a className="btn btn-ghost way-home" href="#music-title">
              <ArrowUp size={16} strokeWidth={1.5} /> Back to the room
            </a>
          )}
        </Land>
      ))}

      <div className="hud" role="region" aria-label="Cassette deck">
        <Cassette spinning={!!playing} />
        <div className="hud-now">
          <b>{current.title}</b>
          <span>{current.artists.join(", ")} · <a href={`#world-${placed[w]?.universe.id}`}>{placed[w]?.universe.title}</a></span>
        </div>
        <button className="hud-btn hud-play" onClick={() => setPlaying(current)} aria-label={`Play ${current.title}`}>
          <Play size={16} fill="currentColor" strokeWidth={1.5} />
        </button>
        <button className="hud-btn" onClick={shuffle} aria-label="Pick a random song">
          <Shuffle size={16} strokeWidth={1.5} />
        </button>
      </div>

      <Dialog open={!!playing} onOpenChange={(o) => !o && setPlaying(null)}>
        {playing && (
          <DialogContent className="player">
            <div className="player-head">
              {playing.cover && <img src={playing.cover} alt="" width={48} height={48} />}
              <div>
                <DialogTitle className="player-title">{playing.title}</DialogTitle>
                <div className="player-artist">{playing.artists.join(", ")}</div>
              </div>
            </div>
            <iframe
              className="player-frame"
              src={`https://music.yandex.ru/iframe/#track/${playing.id}/${playing.albumId || ""}`}
              allow="autoplay *; encrypted-media *; fullscreen *"
              title="Yandex Music player"
            />
            <a className="player-link" href={`https://music.yandex.ru/track/${playing.id}`} target="_blank" rel="noopener noreferrer">
              Open in Yandex Music <ArrowUpRight size={14} strokeWidth={1.5} />
            </a>
          </DialogContent>
        )}
      </Dialog>
    </div>
  );
};

export default Music;
