/* Chapter 05 scene: a room in Tashkent at 19:05 — rain on the window, the TV tower on the skyline,
   someone in headphones at the desk, Go on the monitor, the cat on the sill
   and the current track in the cassette deck.
   The desk is drawn as a surface in perspective (back edge y 440, front edge y 528)
   and everything on it stands on that surface with a contact shadow. */

// deterministic randomness so the city looks the same on every render
const seeded = (seed: number) => () => ((seed = (seed * 16807) % 2147483647) / 2147483647);

const WIN = { x: 676, y: 46, w: 464, h: 318 };
const SILL = WIN.y + WIN.h;
const TOWER = WIN.x + 130;
const DESK = { back: 440, front: 528 };

const r1 = seeded(11);
const STARS = Array.from({ length: 60 }, () => ({
  x: WIN.x + r1() * WIN.w, y: WIN.y + 8 + r1() * 150, r: 0.4 + r1() * 1.1, o: 0.25 + r1() * 0.6,
}));

type Building = { x: number; w: number; h: number; lights: { x: number; y: number; flicker: boolean }[] };
const city = (seed: number, minH: number, maxH: number, lightRate: number): Building[] => {
  const r = seeded(seed);
  const out: Building[] = [];
  let x = WIN.x - 10;
  while (x < WIN.x + WIN.w + 10) {
    const w = 24 + r() * 42, h = minH + r() * (maxH - minH);
    const lights = [];
    for (let ly = SILL - h + 8; ly < SILL - 6; ly += 11)
      for (let lx = x + 5; lx < x + w - 6; lx += 8)
        if (r() < lightRate) lights.push({ x: lx, y: ly, flicker: r() < 0.08 });
    out.push({ x, w, h, lights });
    x += w + 2;
  }
  return out;
};
const FAR = city(5, 60, 130, 0.12);
const NEAR = city(23, 34, 96, 0.2).filter((b) => b.x + b.w < TOWER - 14 || b.x > TOWER + 14);

const r2 = seeded(42);
const RAIN = Array.from({ length: 56 }, () => ({
  x: WIN.x + r2() * (WIN.w + 60), y: WIN.y - 40 + r2() * WIN.h, d: (0.7 + r2() * 0.6).toFixed(2), delay: (-r2() * 2).toFixed(2),
}));
const DROPS = Array.from({ length: 16 }, () => ({ x: WIN.x + 8 + r2() * (WIN.w - 16), y: WIN.y + 8 + r2() * (WIN.h - 16), r: 1 + r2() * 2 }));

// string lights hang in a curve across the top of the window
const BULBS = Array.from({ length: 11 }, (_, i) => {
  const t = i / 10, x = WIN.x - 6 + t * (WIN.w + 12);
  return { x, y: WIN.y + 4 + 4 * 20 * t * (1 - t), c: ["#f4a95c", "#f2d98d", "#e0533c"][i % 3] };
});

const BOOKS = [
  { w: 16, h: 64, c: "#5b3434" }, { w: 12, h: 58, c: "#3e4a5c" }, { w: 18, h: 70, c: "#58503f" }, { w: 11, h: 52, c: "#2f3b33" },
  { w: 14, h: 66, c: "#6b5a44" }, { w: 10, h: 50, c: "#d9ccb4" }, { w: 10, h: 50, c: "#d9ccb4" }, { w: 10, h: 50, c: "#8a3a3a" },
  { w: 16, h: 60, c: "#3a3448" },
];

const CODE: [string, string][][] = [
  [["func ", "#c792ea"], ["(s *Server) ", "#e9e3d9"], ["Health", "#82aaff"], ["(w, r) {", "#e9e3d9"]],
  [["  w.WriteHeader(", "#e9e3d9"], ["http.StatusOK", "#f4a95c"], [")", "#e9e3d9"]],
  [["}", "#e9e3d9"]],
  [["", ""]],
  [["func ", "#c792ea"], ["(r *Repo) ", "#e9e3d9"], ["Feed", "#82aaff"], ["(ctx) ([]Post, error) {", "#e9e3d9"]],
  [["  ", ""], ["// one query, not N+1", "#6f6a7a"]],
];

// a leaf: base at 0,0, pointing right, length 1 — scaled and rotated where it is used
const LEAF = "M0 0 C.25 -.32 .7 -.36 1 0 C.7 .34 .25 .3 0 0 Z";

type Props = { track?: { title: string; artist: string } };

const NightRoom = ({ track }: Props) => (
  <svg className="room" viewBox="0 0 1200 640" preserveAspectRatio="xMidYMid slice" role="img"
    aria-label="A room at 19:05: rain on the window, the Tashkent TV tower on the skyline, a cat on the sill, and someone in headphones at a desk with a monitor, a lamp and a cassette deck">
    <defs>
      <linearGradient id="nr-wall" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#1b1823" /><stop offset="1" stopColor="#15121b" /></linearGradient>
      <linearGradient id="nr-sky" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#0a0e24" /><stop offset=".65" stopColor="#1c2148" /><stop offset="1" stopColor="#47304a" />
      </linearGradient>
      <linearGradient id="nr-desk" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#241f2b" /><stop offset="1" stopColor="#362e3d" /></linearGradient>
      <linearGradient id="nr-dusk" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#3b2a5a" /><stop offset=".55" stopColor="#e0735a" /><stop offset="1" stopColor="#f4b77a" /></linearGradient>
      <linearGradient id="nr-cone" x1="0" y1="0" x2=".4" y2="1"><stop offset="0" stopColor="#ffcf8a" stopOpacity=".32" /><stop offset="1" stopColor="#ffcf8a" stopOpacity="0" /></linearGradient>
      <linearGradient id="nr-moonbeam" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#9fb3e0" stopOpacity=".09" /><stop offset="1" stopColor="#9fb3e0" stopOpacity="0" /></linearGradient>
      <linearGradient id="nr-mug" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stopColor="#d0414c" /><stop offset=".45" stopColor="#b3202d" /><stop offset="1" stopColor="#6e1119" /></linearGradient>
      <radialGradient id="nr-moon"><stop offset="0" stopColor="#f6e7c8" stopOpacity=".35" /><stop offset="1" stopColor="#f6e7c8" stopOpacity="0" /></radialGradient>
      <radialGradient id="nr-pool"><stop offset="0" stopColor="#ffcf8a" stopOpacity=".28" /><stop offset="1" stopColor="#ffcf8a" stopOpacity="0" /></radialGradient>
      <radialGradient id="nr-lampwall"><stop offset="0" stopColor="#f4a95c" stopOpacity=".16" /><stop offset="1" stopColor="#f4a95c" stopOpacity="0" /></radialGradient>
      <radialGradient id="nr-screen"><stop offset="0" stopColor="#82aaff" stopOpacity=".14" /><stop offset="1" stopColor="#82aaff" stopOpacity="0" /></radialGradient>
      <radialGradient id="nr-shadow"><stop offset="0" stopColor="#000" stopOpacity=".55" /><stop offset="1" stopColor="#000" stopOpacity="0" /></radialGradient>
      <radialGradient id="nr-vignette" cx=".5" cy=".45" r=".75"><stop offset=".6" stopColor="#000" stopOpacity="0" /><stop offset="1" stopColor="#000" stopOpacity=".45" /></radialGradient>
      <clipPath id="nr-win"><rect x={WIN.x} y={WIN.y} width={WIN.w} height={WIN.h} /></clipPath>
      <clipPath id="nr-print"><rect x="10" y="10" width="130" height="130" /></clipPath>
      {/* film grain, the lo-fi texture over the whole scene */}
      <filter id="nr-grain" x="0" y="0" width="100%" height="100%">
        <feTurbulence type="fractalNoise" baseFrequency=".85" numOctaves="2" seed="7" stitchTiles="stitch" />
        <feColorMatrix values="0 0 0 0 1  0 0 0 0 .92  0 0 0 0 .85  0 0 0 .55 0" />
      </filter>
    </defs>

    {/* wall, with the lamp and the monitor lighting it */}
    <rect width="1200" height="640" fill="url(#nr-wall)" />
    <circle cx="270" cy="330" r="230" fill="url(#nr-lampwall)" />
    <ellipse cx="470" cy="330" rx="230" ry="150" fill="url(#nr-screen)" />

    {/* a print of the Chimgan mountains at sunset, hung on a nail */}
    <g transform="translate(60 40)">
      <path d="M75 -14 L20 0 M75 -14 L130 0" stroke="#4a4252" strokeWidth="1" />
      <circle cx="75" cy="-14" r="2" fill="#6b6375" />
      <rect x="3" y="5" width="150" height="176" rx="2" fill="#000" opacity=".3" />
      <rect width="150" height="176" rx="2" fill="#2e2836" />
      <rect x="5" y="5" width="140" height="166" fill="#efe4d2" />
      <g clipPath="url(#nr-print)">
        <rect x="10" y="10" width="130" height="130" fill="url(#nr-dusk)" />
        <circle cx="96" cy="84" r="20" fill="#f6c77d" />
        <path d="M10 104 L36 76 L50 88 L74 56 L92 80 L104 70 L140 100 V140 H10 Z" fill="#8c4a5a" />
        <path d="M74 56 L80 64 L74 62 L69 66 Z" fill="#efe4d2" opacity=".8" />
        <path d="M10 120 L30 106 L56 116 L84 98 L112 112 L140 104 V140 H10 Z" fill="#5a3048" />
        <path d="M10 140 V128 C40 122 70 130 100 124 C120 120 132 124 140 126 V140 Z" fill="#2f1e33" />
      </g>
      <text x="75" y="156" textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontSize="10" fill="#2a2420" letterSpacing="3">CHIMGAN</text>
      <text x="75" y="166" textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontSize="6" fill="#7b7266">41.5°N · 70.0°E</text>
    </g>

    {/* go run poster, taped at the corners */}
    <g transform="translate(236 72) rotate(3)">
      <rect x="3" y="4" width="96" height="120" fill="#000" opacity=".3" />
      <rect width="96" height="120" rx="2" fill="#1f2a44" />
      <text x="48" y="58" textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontSize="15" fill="#7fc7d9">go run .</text>
      <text x="48" y="78" textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontSize="7.5" fill="#8a93ad">build · ship · sleep</text>
      <rect x="-6" y="-4" width="18" height="8" fill="#e9dcc4" opacity=".55" transform="rotate(-35 3 0)" />
      <rect x="84" y="-4" width="18" height="8" fill="#e9dcc4" opacity=".55" transform="rotate(35 93 0)" />
    </g>

    {/* pothos hanging from the ceiling on three cords */}
    <g className="sway">
      <path d="M548 0 L534 40 M548 0 L548 40 M548 0 L562 40" stroke="#4a4252" strokeWidth="1" />
      <path d="M530 40 h36 l-4 22 c-1 4 -27 4 -28 0 z" fill="#7a5f4e" />
      <rect x="528" y="38" width="40" height="5" rx="2" fill="#8c6e5a" />
      <g stroke="#3f6a4a" strokeWidth="1.4" fill="none">
        <path d="M536 58 C530 86 540 110 530 142" /><path d="M548 60 C552 92 544 120 552 176" /><path d="M560 58 C570 82 564 102 572 124" />
      </g>
      {[[531, 74, 200], [537, 98, -20], [529, 124, 200], [531, 140, 160], [550, 82, -10], [546, 108, 190], [552, 134, -20], [548, 156, 200], [552, 174, 70], [566, 74, -30], [568, 96, 200], [572, 122, 60]].map(([x, y, a], i) => (
        <path key={i} d={LEAF} fill={i % 3 ? "#5c8a63" : "#6f9c72"} transform={`translate(${x} ${y}) rotate(${a}) scale(14)`} />
      ))}
    </g>

    {/* shelf on two brackets: books, a cactus */}
    <g>
      <rect x="40" y="300" width="290" height="5" fill="#3a3344" />
      <rect x="40" y="305" width="290" height="7" fill="#2a2431" />
      <path d="M66 312 h6 v18 l-6 -6 z M300 312 h6 v18 l-6 -6 z" fill="#2a2431" />
      <rect x="40" y="312" width="290" height="10" fill="#000" opacity=".18" />
      {(() => {
        let x = 52;
        return BOOKS.map((b, i) => {
          const el = (
            <g key={i}>
              <rect x={x} y={300 - b.h} width={b.w} height={b.h} rx="1.5" fill={b.c} />
              <rect x={x} y={300 - b.h + 6} width={b.w} height="3" fill="#000" opacity=".2" />
              <rect x={x} y={300 - b.h} width="2" height={b.h} fill="#fff" opacity=".06" />
            </g>
          );
          x += b.w + 2;
          return el;
        });
      })()}
      <rect x="182" y="244" width="13" height="56" rx="1.5" fill="#4a4052" transform="rotate(16 195 300)" />
      <g transform="translate(222 300)">
        <path d="M-12 0 h24 l-3 -16 h-18 z" fill="#8c6e5a" />
        <rect x="-14" y="-19" width="28" height="4" rx="1.5" fill="#9c7e68" />
        <path d="M-5 -19 v-24 a5 5 0 0 1 10 0 v24 z" fill="#5f8a5f" />
        <path d="M-5 -30 h-5 a3 3 0 0 1 -3 -3 v-6 a3 3 0 0 1 6 0 v3 h2 z M5 -26 h5 a3 3 0 0 0 3 -3 v-8 a3 3 0 0 0 -6 0 v5 h-2 z" fill="#5f8a5f" />
        <path d="M0 -42 v20" stroke="#4a7550" strokeWidth="1" />
      </g>
    </g>

    {/* sticky note on the wall */}
    <g transform="translate(96 340) rotate(-5)">
      <rect x="1.5" y="2" width="38" height="34" fill="#000" opacity=".25" />
      <rect width="38" height="34" fill="#f2a7b4" />
      <rect width="38" height="6" fill="#000" opacity=".06" />
      <text x="7" y="22" fontFamily="JetBrains Mono, monospace" fontSize="9" fill="#3a2028">why?</text>
    </g>

    {/* window: sky, moon, city with the TV tower, rain */}
    <g clipPath="url(#nr-win)">
      <rect x={WIN.x} y={WIN.y} width={WIN.w} height={WIN.h} fill="url(#nr-sky)" />
      {STARS.map((s, i) => <circle key={i} cx={s.x} cy={s.y} r={s.r} fill="#f6e7c8" opacity={s.o} />)}
      <circle cx={WIN.x + WIN.w - 96} cy="112" r="84" fill="url(#nr-moon)" />
      <path d={`M${WIN.x + WIN.w - 96} 88 a26 26 0 1 0 21 43 a21 21 0 1 1 -21 -43z`} fill="#f6e7c8" />
      <path d={`M${WIN.x + 30} 140 C${WIN.x + 70} 130 ${WIN.x + 130} 136 ${WIN.x + 160} 146 M${WIN.x + 260} 112 C${WIN.x + 310} 104 ${WIN.x + 360} 110 ${WIN.x + 380} 118`}
        stroke="#343a6e" strokeWidth="14" strokeLinecap="round" opacity=".28" />

      {FAR.map((b, i) => (
        <g key={`f${i}`}>
          <rect x={b.x} y={SILL - b.h - 36} width={b.w} height={b.h + 36} fill="#141936" />
          {b.lights.map((l, j) => <rect key={j} x={l.x} y={l.y - 36} width="3" height="5" fill="#f2c37a" opacity=".45" className={l.flicker ? "flicker" : undefined} />)}
        </g>
      ))}

      {/* Tashkent TV tower: three legs, the observation pod, the mast */}
      <g fill="#0b0e22">
        <path d={`M${TOWER - 18} ${SILL} L${TOWER - 4} ${SILL - 150} L${TOWER + 4} ${SILL - 150} L${TOWER + 18} ${SILL} Z`} />
        <path d={`M${TOWER - 13} ${SILL - 40} H${TOWER + 13} M${TOWER - 9} ${SILL - 85} H${TOWER + 9} M${TOWER - 6} ${SILL - 120} H${TOWER + 6}`} stroke="#141936" strokeWidth="2" />
        <rect x={TOWER - 3} y={SILL - 262} width="6" height="114" />
        <ellipse cx={TOWER} cy={SILL - 206} rx="17" ry="9" />
        <ellipse cx={TOWER} cy={SILL - 182} rx="10" ry="5" />
        <rect x={TOWER - 1} y={SILL - 310} width="2" height="50" />
      </g>
      <g fill="#f2c37a" opacity=".8">
        {[-11, -4, 3, 9].map((d) => <rect key={d} x={TOWER + d} y={SILL - 208} width="3" height="3" />)}
      </g>
      <circle className="blink-red" cx={TOWER} cy={SILL - 310} r="3" fill="#ff4b3e" />

      {NEAR.map((b, i) => (
        <g key={`n${i}`}>
          <rect x={b.x} y={SILL - b.h} width={b.w} height={b.h} fill="#0c0f22" />
          {b.lights.map((l, j) => <rect key={j} x={l.x} y={l.y} width="3.5" height="5" fill="#f4a95c" opacity=".75" className={l.flicker ? "flicker" : undefined} />)}
        </g>
      ))}

      <g className="rain">
        {RAIN.map((d, i) => (
          <line key={i} x1={d.x} y1={d.y} x2={d.x - 5} y2={d.y + 16} stroke="#c8d5e8" strokeWidth="1" opacity=".35"
            style={{ animationDuration: `${d.d}s`, animationDelay: `${d.delay}s` }} />
        ))}
      </g>
      {DROPS.map((d, i) => (
        <g key={i}>
          <circle cx={d.x} cy={d.y} r={d.r} fill="#c8d5e8" opacity=".16" />
          <circle cx={d.x - d.r * 0.3} cy={d.y - d.r * 0.3} r={d.r * 0.35} fill="#fff" opacity=".35" />
        </g>
      ))}
      {/* faint reflection in the glass */}
      <path d={`M${WIN.x} ${WIN.y + 40} L${WIN.x + 80} ${WIN.y} H${WIN.x + 110} L${WIN.x} ${WIN.y + 90} Z`} fill="#fff" opacity=".03" />
    </g>

    {/* frame with depth: outer casing, inner reveal, sash bars, a handle */}
    <rect x={WIN.x - 16} y={WIN.y - 16} width={WIN.w + 32} height={WIN.h + 16} rx="4" fill="none" stroke="#2b2634" strokeWidth="14" />
    <rect x={WIN.x - 4} y={WIN.y - 4} width={WIN.w + 8} height={WIN.h + 4} fill="none" stroke="#211d29" strokeWidth="8" />
    <path d={`M${WIN.x - 9} ${WIN.y - 9} H${WIN.x + WIN.w + 9}`} stroke="#3a3344" strokeWidth="1.5" />
    <rect x={WIN.x + WIN.w / 2 - 4} y={WIN.y} width="8" height={WIN.h} fill="#2b2634" />
    <rect x={WIN.x} y={WIN.y + 160} width={WIN.w} height="8" fill="#2b2634" />
    <rect x={WIN.x + WIN.w / 2 - 4} y={WIN.y} width="2" height={WIN.h} fill="#3a3344" />
    <rect x={WIN.x + WIN.w / 2 + 6} y={WIN.y + 196} width="4" height="16" rx="2" fill="#4a4252" />

    {/* sill: top face, front face, shadow on the wall below */}
    <path d={`M${WIN.x - 30} ${SILL} H${WIN.x + WIN.w + 30} L${WIN.x + WIN.w + 36} ${SILL + 10} H${WIN.x - 36} Z`} fill="#3a3344" />
    <rect x={WIN.x - 36} y={SILL + 10} width={WIN.w + 72} height="8" fill="#2a2431" />
    <rect x={WIN.x - 36} y={SILL + 18} width={WIN.w + 72} height="12" fill="#000" opacity=".2" />

    {/* curtain, gathered at the right */}
    <path d="M1162 24 C1172 120 1162 260 1176 410 L1200 410 L1200 24 Z" fill="#2a2030" />
    <path d="M1170 30 C1178 140 1172 270 1182 404 M1188 30 C1192 150 1190 280 1194 404" stroke="#211927" strokeWidth="3" fill="none" />
    <rect x="1150" y="16" width="50" height="6" rx="3" fill="#3a3344" />

    {/* string lights */}
    <path d={`M${WIN.x - 6} ${WIN.y + 4} Q${WIN.x + WIN.w / 2} ${WIN.y + 44} ${WIN.x + WIN.w + 6} ${WIN.y + 4}`} stroke="#3a3344" strokeWidth="1.5" fill="none" />
    {BULBS.map((b, i) => (
      <g key={i} className="bulb" style={{ animationDelay: `${(i % 4) * 0.7}s` }}>
        <circle cx={b.x} cy={b.y + 7} r="10" fill={b.c} opacity=".14" />
        <rect x={b.x - 1.5} y={b.y} width="3" height="3" fill="#3a3344" />
        <ellipse cx={b.x} cy={b.y + 7} rx="2.8" ry="4" fill={b.c} />
      </g>
    ))}

    {/* on the sill: spider lily in a glass of water */}
    <g transform={`translate(${WIN.x + 36} ${SILL})`}>
      <ellipse cx="13" cy="1" rx="16" ry="3" fill="#000" opacity=".3" />
      <path d="M2 0 L0 -40 H26 L24 0 Z" fill="#c8d5e8" opacity=".1" />
      <path d="M1 -22 H25 L24 0 H2 Z" fill="#9fb3e0" opacity=".14" />
      <path d="M2 0 L0 -40 M24 0 L26 -40" stroke="#c8d5e8" strokeOpacity=".35" />
      <ellipse cx="13" cy="-40" rx="13" ry="2.5" fill="none" stroke="#c8d5e8" strokeOpacity=".35" />
      <path d="M13 -4 C12 -30 14 -50 13 -64" stroke="#4f7a58" strokeWidth="2" fill="none" />
      <g stroke="#d9333f" strokeWidth="1.2" strokeLinecap="round" fill="none">
        <path d="M13 -64 C8 -72 2 -76 -6 -76 M13 -64 C10 -76 6 -84 2 -88 M13 -64 C14 -78 14 -86 12 -92 M13 -64 C18 -72 24 -76 32 -76 M13 -64 C16 -76 20 -84 24 -88" />
        <path d="M13 -64 C8 -64 4 -61 4 -57 M13 -64 C18 -64 22 -61 22 -57 M13 -64 C10 -68 6 -69 4 -67 M13 -64 C16 -68 20 -69 22 -67" strokeWidth="2.2" />
      </g>
    </g>

    {/* the cat, from behind, watching the city */}
    <g transform={`translate(${WIN.x + 250} ${SILL})`} fill="#09080d">
      <ellipse cx="24" cy="1" rx="34" ry="4" fill="#000" opacity=".35" />
      <path d="M2 0 C-4 -26 4 -48 24 -52 C44 -48 52 -26 46 0 Z" />
      <ellipse cx="24" cy="-62" rx="15" ry="13" />
      <path d="M11 -68 L12 -84 L21 -73 Z M27 -73 L36 -84 L37 -68 Z" />
      <path d="M14 -70 L14.5 -79 L19 -73 Z" fill="#2a1e26" />
      <path className="tail" d="M44 -2 C62 0 74 -4 76 -18" stroke="#09080d" strokeWidth="7" strokeLinecap="round" fill="none" />
      <path d="M6 -24 C8 -40 16 -48 24 -50" stroke="#f2c37a" strokeOpacity=".18" strokeWidth="1.5" fill="none" />
    </g>

    {/* a potted plant with broad leaves */}
    <g transform={`translate(${WIN.x + 400} ${SILL})`}>
      <ellipse cx="18" cy="1" rx="22" ry="3" fill="#000" opacity=".3" />
      <path d="M2 -26 H34 L30 0 H6 Z" fill="#8c6e5a" />
      <rect x="0" y="-30" width="36" height="6" rx="2" fill="#9c7e68" />
      <path d="M8 -26 v24" stroke="#000" strokeOpacity=".12" strokeWidth="3" />
      <g stroke="#3f6a4a" strokeWidth="1.5" fill="none"><path d="M18 -30 C14 -44 6 -52 -2 -56 M18 -30 C22 -48 32 -58 44 -60 M18 -30 C18 -50 16 -64 12 -76" /></g>
      {[[-2, -56, 200, 22], [44, -60, -20, 24], [12, -76, 250, 22], [10, -44, 210, 16], [28, -46, -40, 16]].map(([x, y, a, s], i) => (
        <path key={i} d={LEAF} fill={i % 2 ? "#5c8a63" : "#4f7a58"} transform={`translate(${x} ${y}) rotate(${a}) scale(${s})`} />
      ))}
    </g>

    {/* the desk: back edge against the wall, top surface, front edge, dark underneath */}
    <rect x="0" y={DESK.back - 4} width="1200" height="4" fill="#000" opacity=".3" />
    <rect x="0" y={DESK.back} width="1200" height={DESK.front - DESK.back} fill="url(#nr-desk)" />
    <rect x="0" y={DESK.front} width="1200" height="2" fill="#5a4d60" />
    <rect x="0" y={DESK.front + 2} width="1200" height="14" fill="#41374a" />
    <rect x="0" y={DESK.front + 16} width="1200" height={640 - DESK.front - 16} fill="#141118" />
    <path d={`M${WIN.x} ${DESK.back} H${WIN.x + WIN.w} L1200 ${DESK.front} H${WIN.x + 40} Z`} fill="url(#nr-moonbeam)" />
    <ellipse cx="330" cy="490" rx="190" ry="34" fill="url(#nr-pool)" />

    {/* monitor on its stand: an editor with two tabs and a terminal */}
    <g>
      <ellipse cx="470" cy="470" rx="70" ry="9" fill="url(#nr-shadow)" />
      <path d="M440 470 C440 462 500 462 500 470 L506 474 H434 Z" fill="#2e2936" />
      <path d="M462 418 H478 L482 466 H458 Z" fill="#2b2633" />
      <rect x="290" y="228" width="360" height="196" rx="10" fill="#26222d" />
      <rect x="290" y="228" width="360" height="2" rx="1" fill="#3a3344" />
      <rect x="300" y="238" width="340" height="174" rx="3" fill="#0f1219" />
      <rect x="300" y="238" width="340" height="16" fill="#171b25" />
      <rect x="300" y="238" width="78" height="16" fill="#0f1219" />
      <rect x="300" y="252" width="78" height="2" fill="#82aaff" opacity=".6" />
      <text x="310" y="249" fontFamily="JetBrains Mono, monospace" fontSize="8" fill="#a9a3b3">handler.go</text>
      <text x="390" y="249" fontFamily="JetBrains Mono, monospace" fontSize="8" fill="#5f5a69">repo.go</text>
      <g fontFamily="JetBrains Mono, monospace" fontSize="10">
        {CODE.map((line, i) => (
          <g key={i}>
            <text x="316" y={272 + i * 14} textAnchor="end" fill="#3f3b48">{i + 1}</text>
            <text x="326" y={272 + i * 14} xmlSpace="preserve">
              {line.map(([t, c], j) => <tspan key={j} fill={c}>{t}</tspan>)}
            </text>
          </g>
        ))}
      </g>
      <rect x="300" y="358" width="340" height="1" fill="#2a2e3a" />
      <g fontFamily="JetBrains Mono, monospace" fontSize="9.5">
        <text x="310" y="374" fill="#6f6a7a">$ go test ./...</text>
        <text x="310" y="388" xmlSpace="preserve"><tspan fill="#7fc79a">ok  </tspan><tspan fill="#e9e3d9">api/feed   0.412s</tspan></text>
        <rect className="cursor" x="310" y="394" width="6" height="11" fill="#e9e3d9" />
      </g>
      <circle cx="470" cy="418" r="1.5" fill="#4a4252" />
      {/* sticky note on the bezel */}
      <g transform="translate(608 222) rotate(6)">
        <rect width="38" height="32" fill="#f2d98d" />
        <rect width="38" height="5" fill="#000" opacity=".06" />
        <text x="5" y="16" fontFamily="JetBrains Mono, monospace" fontSize="7" fill="#3a3020">fix N+1</text>
        <text x="5" y="26" fontFamily="JetBrains Mono, monospace" fontSize="7" fill="#3a3020">in feed</text>
      </g>
    </g>

    {/* keyboard, mostly behind the sitter */}
    <path d="M362 510 L372 486 H568 L578 510 Z" fill="#2f2a36" />
    <path d="M362 510 H578 V514 H362 Z" fill="#221e28" />
    {Array.from({ length: 3 }).flatMap((_, row) =>
      Array.from({ length: 16 }).map((_, k) => (
        <rect key={`${row}-${k}`} x={378 - row * 3 + k * 12} y={490 + row * 6.5} width="9.5" height="4.6" rx="1" fill="#3d3746" />
      )),
    )}

    {/* books stacked at the end of the desk */}
    <g transform="translate(20 482)">
      <ellipse cx="34" cy="18" rx="44" ry="6" fill="url(#nr-shadow)" />
      <rect x="0" y="4" width="66" height="12" rx="1" fill="#3e4a5c" /><rect x="64" y="5" width="2" height="10" fill="#e9dcc4" />
      <rect x="4" y="-8" width="60" height="12" rx="1" fill="#6b5a44" /><rect x="62" y="-7" width="2" height="10" fill="#e9dcc4" />
      <rect x="-2" y="-18" width="62" height="10" rx="1" fill="#d9ccb4" />
      <rect x="10" y="-18" width="4" height="10" fill="#8a3a3a" />
    </g>

    {/* digital clock: always 19:05 */}
    <g transform="translate(104 466)">
      <ellipse cx="34" cy="30" rx="44" ry="6" fill="url(#nr-shadow)" />
      <path d="M0 30 L6 0 H62 L68 30 Z" fill="#1d1a22" />
      <path d="M6 0 H62 L63 4 H5 Z" fill="#2c2733" />
      <rect x="12" y="7" width="44" height="17" rx="2" fill="#0d0b10" />
      <text x="34" y="21" textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontSize="14" fill="#ff5a3c">19:05</text>
      <rect x="12" y="7" width="44" height="17" rx="2" fill="#ff5a3c" opacity=".06" />
    </g>

    {/* architect lamp: weighted base, two arm segments with a spring, cone shade */}
    <g>
      <path d="M262 334 L304 308 L470 500 L250 506 Z" fill="url(#nr-cone)" />
      <ellipse cx="216" cy="500" rx="40" ry="8" fill="url(#nr-shadow)" />
      <ellipse cx="216" cy="494" rx="32" ry="7" fill="#2e2936" />
      <ellipse cx="216" cy="491" rx="32" ry="7" fill="#3b3442" />
      <path d="M216 490 L176 370" stroke="#3b3442" strokeWidth="4" strokeLinecap="round" />
      <path d="M222 488 L182 372" stroke="#2e2936" strokeWidth="2" strokeLinecap="round" />
      <path d="M200 440 l6 -3 l-4 -5 l6 -3 l-4 -5 l6 -3" stroke="#6b6375" strokeWidth="1.2" fill="none" />
      <circle cx="178" cy="370" r="5" fill="#4a4252" />
      <path d="M178 370 L262 292" stroke="#3b3442" strokeWidth="4" strokeLinecap="round" />
      <path d="M182 376 L264 300" stroke="#2e2936" strokeWidth="2" strokeLinecap="round" />
      <g transform="translate(266 298) rotate(-32)">
        <path d="M-7 -14 H7 L10 -6 H-10 Z" fill="#46404f" />
        <path d="M-10 -6 H10 L26 22 H-26 Z" fill="#3b3442" />
        <path d="M-10 -6 H-4 L-14 22 H-26 Z" fill="#fff" opacity=".05" />
        <ellipse cx="0" cy="22" rx="26" ry="5" fill="#ffd9a0" />
        <ellipse cx="0" cy="22" rx="14" ry="2.5" fill="#fff4dc" />
      </g>
      <path d="M216 498 C226 540 190 580 214 640" stroke="#241f2a" strokeWidth="3" fill="none" />
    </g>

    {/* phone face up, a message just came in */}
    <g transform="translate(716 498)">
      <path d="M0 18 L8 0 H40 L36 18 Z" fill="#000" opacity=".35" transform="translate(2 2)" />
      <path d="M0 18 L8 0 H40 L36 18 Z" fill="#111016" />
      <path d="M3 16 L9.5 2 H37 L33.5 16 Z" fill="#82aaff" opacity=".25" />
      <path d="M11 6 H30 M9 10 H24" stroke="#e9e3d9" strokeOpacity=".6" strokeWidth="1.5" />
    </g>

    {/* mug with coffee and steam */}
    <g transform="translate(640 470)">
      <ellipse cx="17" cy="36" rx="26" ry="5" fill="url(#nr-shadow)" />
      <path d="M30 10 C44 10 44 28 30 28" stroke="#8e1822" strokeWidth="5" fill="none" />
      <path d="M0 2 V30 C0 36 4 38 8 38 H24 C28 38 32 36 32 30 V2 Z" fill="url(#nr-mug)" />
      <ellipse cx="16" cy="2" rx="16" ry="4" fill="#8e1822" />
      <ellipse cx="16" cy="2.6" rx="13" ry="2.8" fill="#3a2418" />
      <path d="M5 8 V28" stroke="#fff" strokeOpacity=".22" strokeWidth="2.5" strokeLinecap="round" />
      <g className="steam" stroke="#efe7da" strokeWidth="2" strokeLinecap="round" fill="none">
        <path d="M10 -6 c-6 -10 6 -14 0 -26" /><path d="M22 -8 c-6 -10 6 -14 0 -26" />
      </g>
    </g>

    {/* cassette deck: top face, transport keys, the tape in its window, a VU meter */}
    <g transform="translate(830 444)">
      <ellipse cx="124" cy="68" rx="140" ry="8" fill="url(#nr-shadow)" />
      <path d="M0 4 L10 -6 H258 L248 4 Z" fill="#3a3443" />
      <rect x="0" y="4" width="248" height="62" rx="4" fill="#2a2631" />
      <rect x="0" y="4" width="248" height="2" fill="#4a4252" />
      {[0, 1, 2, 3].map((k) => (
        <g key={k}>
          <rect x={12 + k * 13} y="46" width="11" height="10" rx="1.5" fill="#3d3746" />
          <rect x={12 + k * 13} y="46" width="11" height="2" rx="1" fill="#57506a" />
        </g>
      ))}
      <path d="M17 49.5 l3 2 l-3 2 z" fill="#7fc79a" />
      <rect x="66" y="12" width="118" height="48" rx="4" fill="#15131a" />
      <rect x="72" y="16" width="106" height="40" rx="3" fill="#efe4d2" />
      <rect x="72" y="16" width="106" height="6" rx="2" fill="#b3202d" opacity=".85" />
      <text x="125" y="31" textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontSize="7" fill="#2a2420">
        {(track?.title ?? "late night commits").slice(0, 24)}
      </text>
      <text x="125" y="39" textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontSize="5.5" fill="#7b7266">
        {(track?.artist ?? "mixed by mrevds").slice(0, 30)}
      </text>
      <rect x="94" y="42" width="62" height="12" rx="6" fill="#17151c" />
      <path d="M106 48 H144" stroke="#4a3626" strokeWidth="5" />
      <circle className="reel" cx="106" cy="48" r="4.5" fill="none" stroke="#efe4d2" strokeWidth="2" strokeDasharray="3.5 2.5" />
      <circle className="reel" cx="144" cy="48" r="4.5" fill="none" stroke="#efe4d2" strokeWidth="2" strokeDasharray="3.5 2.5" />
      <rect x="196" y="14" width="40" height="22" rx="2" fill="#efd9a8" />
      <path d="M200 30 A16 16 0 0 1 232 30" stroke="#7b6a4a" strokeWidth=".8" fill="none" />
      <path className="needle" d="M216 34 L224 20" stroke="#b3202d" strokeWidth="1.2" />
      <circle cx="216" cy="34" r="1.5" fill="#2a2631" />
      <circle className="blink-red" cx="236" cy="50" r="2.2" fill="#e0533c" />
      <circle cx="210" cy="50" r="5" fill="#3d3746" /><path d="M210 50 l3 -3" stroke="#8f8799" strokeWidth="1" />
    </g>

    {/* notes drifting up from the deck */}
    <g fill="#efe4d2" stroke="#efe4d2">
      {[{ x: 900, d: 0 }, { x: 966, d: -1.6 }, { x: 1030, d: -3.1 }].map((n, i) => (
        <g key={i} className="note" style={{ animationDelay: `${n.d}s` }}>
          <circle cx={n.x} cy="420" r="3.5" stroke="none" />
          <path d={`M${n.x + 3.2} 420 V404 l7 3`} strokeWidth="1.4" fill="none" />
        </g>
      ))}
    </g>

    {/* someone at the desk, from behind: hoodie, headphones, a hand on the mouse, nodding to the beat */}
    <g>
      <path d="M362 640 C364 548 392 498 470 490 C548 498 576 548 578 640 Z" fill="#342b44" />
      <path d="M556 560 C580 546 596 530 606 514" stroke="#342b44" strokeWidth="26" strokeLinecap="round" fill="none" />
      <path d="M566 548 C584 536 596 524 602 514" stroke="#2a2236" strokeWidth="4" strokeLinecap="round" fill="none" />
      <ellipse cx="616" cy="516" rx="10" ry="13" fill="#2f2a36" />
      <path d="M616 504 v7" stroke="#4a4252" strokeWidth="1" />
      <ellipse cx="611" cy="513" rx="8" ry="6" fill="#b88a72" />
      <path d="M380 560 C388 524 418 500 470 494" stroke="#f4a95c" strokeOpacity=".3" strokeWidth="2.5" fill="none" />
      <path d="M432 496 C438 518 502 518 508 496 C496 482 444 482 432 496 Z" fill="#2a2236" />
      <path d="M440 498 C450 510 490 510 500 498" stroke="#1f1928" strokeWidth="2" fill="none" />
      <path d="M462 508 l-2 22 M478 508 l2 22" stroke="#d9ccb4" strokeWidth="1.5" strokeLinecap="round" />
      <g className="bob">
        <path d="M454 492 h32 v-14 h-32 z" fill="#2a2236" />
        <ellipse cx="470" cy="452" rx="34" ry="38" fill="#17131c" />
        <path d="M442 444 C444 414 466 406 482 412 M452 420 C466 412 486 416 494 432" stroke="#231d2b" strokeWidth="2" fill="none" />
        <path d="M440 452 C436 420 458 408 470 420" stroke="#82aaff" strokeOpacity=".45" strokeWidth="2.5" fill="none" />
        <path d="M434 450 C432 392 508 392 506 450" stroke="#4a4252" strokeWidth="7" fill="none" />
        <path d="M436 440 C438 404 502 404 504 440" stroke="#5a5266" strokeWidth="1.5" fill="none" />
        <rect x="423" y="436" width="16" height="32" rx="7" fill="#4a4252" />
        <rect x="501" y="436" width="16" height="32" rx="7" fill="#4a4252" />
        <rect x="425" y="440" width="4" height="24" rx="2" fill="#5a5266" />
        <circle cx="431" cy="442" r="1.8" fill="#e0533c" />
      </g>
      {/* office chair back in front of the sitter */}
      <path d="M396 640 V570 C396 550 410 540 430 540 H510 C530 540 544 550 544 570 V640 Z" fill="#1b1721" />
      <path d="M408 566 C408 556 416 550 430 550 H510 C524 550 532 556 532 566" stroke="#2a2431" strokeWidth="2" fill="none" />
      <path d="M420 600 H520" stroke="#231f2a" strokeWidth="2" strokeDasharray="4 4" />
    </g>

    <rect width="1200" height="640" filter="url(#nr-grain)" opacity=".07" pointerEvents="none" />
    <rect width="1200" height="640" fill="url(#nr-vignette)" pointerEvents="none" />
  </svg>
);

export default NightRoom;
