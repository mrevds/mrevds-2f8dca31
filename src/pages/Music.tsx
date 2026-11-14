import { useCallback, useEffect, useMemo, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { ArrowDown, ArrowUp, ArrowUpRight, Play, Shuffle } from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import NightRoom from "@/components/NightRoom";
import {
  CloudSeaBg, DoorView, FireflyForestBg, LanternPathBg, LighthouseBg, StarLakeBg, rng,
} from "@/components/world/scenes";
import { ym, formatDuration, type LikedTrack } from "@/lib/data";

/* Music: my room at night, a door, and behind it a small world where every liked song lives somewhere.
   The newest likes come first; each story holds the next handful of them. */

type Kind = "lantern" | "firefly" | "star" | "skylantern" | "bottle";
type Story = { kind: Kind; title: string; jp: string; text: string; Bg: () => JSX.Element; thing: string };

const STORIES: Story[] = [
  {
    kind: "lantern", title: "The Lantern Path", jp: "提灯の道", Bg: LanternPathBg, thing: "lanterns",
    text: "Past the door the city is gone. A path runs through a field of red spider lilies, and someone has hung a paper lantern for every song I kept.",
  },
  {
    kind: "firefly", title: "The Firefly Forest", jp: "蛍の森", Bg: FireflyForestBg, thing: "fireflies",
    text: "Under the cedars the songs won’t stay still. They drift between the trunks like fireflies. Catch one and it plays.",
  },
  {
    kind: "star", title: "The Lake of Stars", jp: "星の湖", Bg: StarLakeBg, thing: "stars",
    text: "The lake is so calm it keeps a second sky. These songs are pinned up there as constellations, and the water remembers each of them.",
  },
  {
    kind: "skylantern", title: "The Sea of Clouds", jp: "雲の海", Bg: CloudSeaBg, thing: "sky lanterns",
    text: "Above the clouds a whale swims slowly west. The songs rise past it as sky lanterns, lighter than the night.",
  },
  {
    kind: "bottle", title: "The Lighthouse", jp: "灯台", Bg: LighthouseBg, thing: "bottles",
    text: "At the end of the world a lighthouse keeper collects songs in bottles. The tide always brings them back, and the light at home stays on.",
  },
];

const ROMAN = ["I", "II", "III", "IV", "V"];

/* ── where each song stands in its scene, in % of the scene ── */
type Pt = { x: number; y: number; drop?: number; delay: number };
type Box = { x0: number; x1: number; y0: number; y1: number };

const scatter = (n: number, seed: number, box: Box, avoid: Box[], ar: number): Pt[] => {
  const r = rng(seed);
  const pts: Pt[] = [];
  let min = 13;
  for (let tries = 0; pts.length < n && tries < 6000; tries++) {
    if (tries % 600 === 599) min *= 0.85; // crowded: let them sit closer
    const x = box.x0 + r() * (box.x1 - box.x0);
    const y = box.y0 + r() * (box.y1 - box.y0);
    if (avoid.some((a) => x > a.x0 && x < a.x1 && y > a.y0 && y < a.y1)) continue;
    if (pts.some((p) => Math.hypot(p.x - x, (p.y - y) * ar) < min)) continue;
    pts.push({ x, y, delay: -r() * 6 });
  }
  return pts;
};

const ROPE_SAG = 7;
const ropeY = (base: number, x: number) => base + ROPE_SAG * Math.sin((x / 100) * Math.PI);

const ropeRows = (portrait: boolean) => (portrait ? [34, 52, 70] : [44, 66]);

const layout = (kind: Kind, n: number, portrait: boolean): Pt[] => {
  const ar = portrait ? 2.4 : 0.56;
  const caption: Box = portrait ? { x0: 0, x1: 100, y0: 0, y1: 30 } : { x0: 0, x1: 46, y0: 0, y1: 40 };
  switch (kind) {
    case "lantern": {
      const rows = ropeRows(portrait);
      const per = Math.ceil(n / rows.length);
      const r = rng(7);
      return Array.from({ length: n }, (_, i) => {
        const row = Math.floor(i / per);
        const k = i % per;
        const count = Math.min(per, n - row * per);
        const x = 5 + (90 * (k + 0.5)) / count;
        return { x, y: ropeY(rows[row], x), drop: 18 + Math.round(r() * 46), delay: -r() * 4 };
      });
    }
    case "firefly":
      return scatter(n, 11, portrait ? { x0: 8, x1: 92, y0: 33, y1: 88 } : { x0: 5, x1: 95, y0: 18, y1: 86 }, [caption], ar);
    case "star":
      return scatter(n, 23, portrait ? { x0: 8, x1: 92, y0: 31, y1: 56 } : { x0: 4, x1: 96, y0: 8, y1: 54 }, [caption, { x0: 48, x1: 60, y0: 8, y1: 30 }], ar);
    case "skylantern":
      return scatter(n, 37, portrait ? { x0: 8, x1: 92, y0: 32, y1: 74 } : { x0: 5, x1: 95, y0: 14, y1: 74 }, [caption], ar);
    case "bottle":
      return scatter(n, 41, portrait ? { x0: 8, x1: 92, y0: 64, y1: 88 } : { x0: 4, x1: 96, y0: 70, y1: 88 }, [{ x0: 0, x1: 34, y0: 80, y1: 100 }], ar);
  }
};

/* constellations: every five stars, joined left to right */
const constellations = (pts: Pt[]) => {
  const groups: Pt[][] = [];
  for (let i = 0; i < pts.length; i += 5) groups.push([...pts.slice(i, i + 5)].sort((a, b) => a.x - b.x));
  return groups;
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
const Threshold = () => {
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
          <h2>Every song I kept became a place</h2>
          <p>Five stories wait outside. Keep scrolling and the door opens.</p>
        </div>
        <div className="door-zoom">
          <div className="door-frame">
            <div className="door-view"><DoorView /></div>
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
const Thing = ({ kind, t, p, on, onPlay }: { kind: Kind; t: LikedTrack; p: Pt; on: boolean; onPlay: (t: LikedTrack) => void }) => {
  const side = p.x < 22 ? " tip-l" : p.x > 78 ? " tip-r" : "";
  const below = kind === "star" && p.y < 20 ? " tip-below" : "";
  const style = {
    left: `${p.x}%`, top: `${p.y}%`, "--drop": `${p.drop ?? 0}px`, "--delay": `${p.delay.toFixed(2)}s`,
  } as CSSProperties;
  return (
    <button id={`t-${t.id}`} className={`thing thing-${kind}${on ? " on" : ""}`} style={style} onClick={() => onPlay(t)}
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

const Land = ({ story, index, tracks, current, onPlay, portrait, children }: {
  story: Story; index: number; tracks: LikedTrack[]; current: string; onPlay: (t: LikedTrack) => void; portrait: boolean; children?: ReactNode;
}) => {
  const pts = useMemo(() => layout(story.kind, tracks.length, portrait), [story.kind, tracks.length, portrait]);
  const { Bg } = story;
  const id = `story-${index + 1}`;
  return (
    <section className={`land land-${story.kind}`} id={id} aria-labelledby={`${id}-title`}>
      <Bg />
      {story.kind === "lantern" && (
        <svg className="land-lines" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
          {ropeRows(portrait).map((base) => (
            <polyline key={base} points={Array.from({ length: 41 }, (_, i) => `${i * 2.5},${ropeY(base, i * 2.5).toFixed(2)}`).join(" ")} />
          ))}
        </svg>
      )}
      {story.kind === "star" && (
        <>
          <svg className="land-lines land-lines-sky" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
            {constellations(pts).map((g, i) => <polyline key={i} points={g.map((p) => `${p.x},${p.y}`).join(" ")} />)}
          </svg>
          {pts.map((p, i) => {
            const y = 2 * (portrait ? 60 : 62) - p.y;
            return y < 97 ? <span key={i} className="star-echo" style={{ left: `${p.x}%`, top: `${y}%`, animationDelay: `${p.delay}s` }} aria-hidden="true" /> : null;
          })}
        </>
      )}

      <header className="story-cap">
        <span className="ch-no">Story {ROMAN[index]} · {tracks.length} songs as {story.thing}</span>
        <h2 id={`${id}-title`}>{story.title}</h2>
        <p>{story.text}</p>
        <span className="story-jp" aria-hidden="true">{story.jp}</span>
      </header>

      {tracks.map((t, i) => pts[i] && <Thing key={t.id} kind={story.kind} t={t} p={pts[i]} on={t.id === current} onPlay={onPlay} />)}
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

  const per = Math.ceil(tracks.length / STORIES.length);
  const chunks = STORIES.map((_, i) => tracks.slice(i * per, (i + 1) * per));
  const storyOf = (t: LikedTrack) => Math.floor(tracks.findIndex((x) => x.id === t.id) / per);

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

  const story = storyOf(current);

  return (
    <div className="world">
      <section className="world-room" aria-labelledby="music-title">
        <NightRoom track={{ title: current.title, artist: current.artists.join(", ") }} />
        <div className="room-cap">
          <p className="kicker">Music · {ym.totalLikedTracks.toLocaleString("en-US")} liked tracks · 19:05, Tashkent</p>
          <h1 id="music-title">Night <em>shift</em></h1>
          <p className="lede">My room, late. Rain on the window, Go on the screen, a tape in the deck. Behind the door there is a whole world, and every song I liked lives somewhere in it.</p>
          <a className="btn btn-paper" href="#threshold">Step outside <ArrowDown size={16} strokeWidth={1.5} /></a>
        </div>
      </section>

      <Threshold />

      {STORIES.map((s, i) => (
        <Land key={s.kind} story={s} index={i} tracks={chunks[i]} current={current.id} onPlay={play} portrait={portrait}>
          {i === STORIES.length - 1 && (
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
          <span>{current.artists.join(", ")} · <a href={`#story-${story + 1}`}>Story {ROMAN[story]}</a></span>
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
