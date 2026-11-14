/* Eight more universes, each drawn in its own manner: synthwave neon, Soviet panel blocks, low-poly
   night road, 8-bit pixels, cut paper, woodcut, art deco and watercolour under water.
   Same 1600×900 canvas as scenes.tsx, cropped to the screen; key shapes stay near the middle. */
import { rng } from "./scenes";

const W = 1600;
const H = 900;

const Bg = ({ children, crisp }: { children: React.ReactNode; crisp?: boolean }) => (
  <svg className="land-bg" viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMid slice" aria-hidden="true"
    shapeRendering={crisp ? "crispEdges" : undefined}>
    {children}
  </svg>
);

/* ── Neon Avenue: synthwave sun, a grid floor, a skyline drawn in neon tubes ── */
export const NeonCityBg = () => {
  const r = rng(71);
  const towers = Array.from({ length: 18 }, (_, i) => {
    const w = 50 + r() * 70;
    const x = i * 92 - 20 + r() * 30;
    const h = 120 + r() * 230 * (Math.abs(x - 800) < 300 ? 0.6 : 1);
    return { x, w, h };
  });
  return (
    <Bg>
      <defs>
        <linearGradient id="nc-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#0b0218" /><stop offset=".5" stopColor="#2a0b44" /><stop offset=".66" stopColor="#7a1a5e" />
        </linearGradient>
        <linearGradient id="nc-sun" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#ffe36e" /><stop offset=".55" stopColor="#ff7a59" /><stop offset="1" stopColor="#ff2a6d" /></linearGradient>
        <filter id="nc-glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="4" result="b" /><feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
        <clipPath id="nc-sunclip"><rect x="560" y="300" width="480" height="300" /></clipPath>
      </defs>
      <rect width={W} height={H} fill="url(#nc-sky)" />
      {Array.from({ length: 60 }, (_, i) => <circle key={i} cx={r() * W} cy={r() * 380} r={0.6 + r()} fill="#f9d2ff" opacity={0.3 + r() * 0.5} className={i % 6 ? undefined : "twinkle"} />)}
      <g clipPath="url(#nc-sunclip)">
        <circle cx="800" cy="520" r="210" fill="url(#nc-sun)" />
        {[430, 462, 490, 514, 535, 553, 569, 583].map((y, i) => <rect key={y} x="560" y={y} width="480" height={3 + i * 1.6} fill="#2a0b44" />)}
      </g>
      <g fill="#0c0316" stroke="#05d9e8" strokeWidth="2" filter="url(#nc-glow)">
        {towers.map((t, i) => (
          <g key={i}>
            <rect x={t.x} y={600 - t.h} width={t.w} height={t.h} stroke={i % 3 ? "#05d9e8" : "#ff2a6d"} />
            {i % 4 === 0 && <path d={`M${t.x + t.w / 2} ${600 - t.h} V${560 - t.h}`} stroke="#ff2a6d" />}
          </g>
        ))}
      </g>
      <rect y="600" width={W} height="300" fill="#0c0316" />
      <g stroke="#ff2a6d" strokeWidth="1.5" opacity=".7" filter="url(#nc-glow)">
        {Array.from({ length: 9 }, (_, i) => { const y = 600 + (i * i * 300) / 64; return <path key={`h${i}`} d={`M0 ${y} H${W}`} />; })}
        {Array.from({ length: 21 }, (_, i) => { const x = (i - 10) * 260; return <path key={`v${i}`} d={`M800 600 L${800 + x} 900`} />; })}
      </g>
      <path d="M0 600 H1600" stroke="#ff7ad9" strokeWidth="3" filter="url(#nc-glow)" />
    </Bg>
  );
};

/* ── Panel Blocks: a winter yard between nine-storey blocks, flat and quiet ── */
export const PanelBlocksBg = () => {
  const r = rng(83);
  const far = Array.from({ length: 9 }, (_, i) => ({ x: i * 190 - 40 + r() * 40, w: 150 + r() * 40, h: 230 + r() * 90 }));
  return (
    <Bg>
      <defs>
        <linearGradient id="pb-sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#0d1424" /><stop offset=".7" stopColor="#2a3552" /><stop offset="1" stopColor="#4a4a68" /></linearGradient>
        <radialGradient id="pb-lamp"><stop offset="0" stopColor="#ffb35c" stopOpacity=".55" /><stop offset="1" stopColor="#ffb35c" stopOpacity="0" /></radialGradient>
      </defs>
      <rect width={W} height={H} fill="url(#pb-sky)" />
      {far.map((b, i) => (
        <g key={i}>
          <rect x={b.x} y={760 - b.h} width={b.w} height={b.h} fill="#1b2236" />
          {Array.from({ length: 30 }, (_, j) => {
            const col = j % 5; const row = Math.floor(j / 5);
            const lit = r() > 0.78;
            return <rect key={j} x={b.x + 14 + col * (b.w - 28) / 5} y={760 - b.h + 18 + row * 30} width="12" height="14" fill={lit ? "#f4b860" : "#141a2b"} opacity={lit ? 0.55 : 1} />;
          })}
        </g>
      ))}
      <rect y="740" width={W} height="160" fill="#c9d4e6" />
      <path d="M0 740 C300 728 500 750 800 738 C1100 726 1300 750 1600 736 V760 H0 Z" fill="#dfe7f3" />
      {/* playground: a slide and a swing */}
      <g stroke="#3a4560" strokeWidth="5" fill="none" strokeLinecap="round">
        <path d="M560 800 V740 H600 L660 800" /><path d="M560 760 H600" />
        <path d="M980 800 L1010 720 L1040 800 M1100 800 L1070 720 L1040 800 M1010 720 H1070" /><path d="M1040 720 V770 M1030 770 H1050" />
      </g>
      <g>
        <path d="M800 900 V600" stroke="#2a3348" strokeWidth="6" />
        <path d="M800 604 Q820 596 842 604" stroke="#2a3348" strokeWidth="6" fill="none" />
        <circle cx="842" cy="614" r="120" fill="url(#pb-lamp)" />
        <ellipse cx="842" cy="612" rx="10" ry="5" fill="#ffd28a" />
        <ellipse cx="842" cy="800" rx="160" ry="20" fill="#ffb35c" opacity=".18" />
      </g>
      <g className="snow">
        {Array.from({ length: 90 }, (_, i) => <circle key={i} cx={r() * W} cy={r() * H} r={1 + r() * 2} fill="#eef3fb" opacity={0.4 + r() * 0.5} />)}
      </g>
    </Bg>
  );
};

/* ── Midnight Highway: low-poly hills, a road to the horizon (the road itself is drawn over the scene) ── */
export const HighwayBg = () => {
  const facets = (y: number, peaks: number[], shades: string[]) =>
    peaks.slice(0, -1).map((x, i) => {
      const x2 = peaks[i + 1];
      const top = y - 60 - ((i * 53) % 110);
      return <path key={`${y}${i}`} d={`M${x} ${y} L${(x + x2) / 2} ${top} L${x2} ${y} Z`} fill={shades[i % shades.length]} />;
    });
  const r = rng(91);
  return (
    <Bg>
      <defs>
        <linearGradient id="hw-sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#07040f" /><stop offset=".6" stopColor="#241238" /><stop offset=".72" stopColor="#5a1f45" /></linearGradient>
        <radialGradient id="hw-city" cx=".5" cy="1" r=".5"><stop offset="0" stopColor="#ff5a3c" stopOpacity=".45" /><stop offset="1" stopColor="#ff5a3c" stopOpacity="0" /></radialGradient>
      </defs>
      <rect width={W} height={H} fill="url(#hw-sky)" />
      {Array.from({ length: 70 }, (_, i) => <rect key={i} x={r() * W} y={r() * 360} width="2" height="2" fill="#e6dcff" opacity={0.3 + r() * 0.5} />)}
      <path d="M1040 140 L1078 120 L1110 140 L1118 178 L1090 206 L1050 204 L1028 176 Z" fill="#e9e1f5" />
      <path d="M1040 140 L1078 120 L1070 160 Z M1028 176 L1050 204 L1070 160 Z" fill="#cfc4e4" />
      <ellipse cx="800" cy="414" rx="520" ry="80" fill="url(#hw-city)" />
      <g>{facets(420, [0, 160, 330, 480, 620, 760], ["#2a1640", "#33194d", "#241236"])}{facets(420, [840, 990, 1130, 1290, 1440, 1600], ["#2a1640", "#241236", "#33194d"])}</g>
      <g>{facets(440, [-80, 120, 300, 520, 700], ["#170b24", "#1e0f2e", "#140920"])}{facets(440, [900, 1080, 1260, 1460, 1680], ["#1e0f2e", "#170b24", "#140920"])}</g>
      <rect y="414" width={W} height="486" fill="#0b0712" />
      {Array.from({ length: 10 }, (_, i) => {
        const x = i < 5 ? 80 + i * 110 : 1080 + (i - 5) * 110;
        return <path key={i} d={`M${x} 470 L${x + 18} ${520 + (i % 3) * 30} L${x - 18} ${520 + (i % 3) * 30} Z`} fill="#140c1e" />;
      })}
    </Bg>
  );
};

/* ── Pixel Arcade: everything on a 10-unit grid, Sweetie-16 colours, scanlines ── */
export const PixelArcadeBg = () => {
  const P = 10;
  const r = rng(101);
  const hills = (base: number, color: string, seed: number) => {
    const rr = rng(seed);
    let h = 6;
    return Array.from({ length: W / P }, (_, i) => {
      h = Math.max(2, Math.min(18, h + Math.round(rr() * 2 - 1)));
      return <rect key={i} x={i * P} y={base - h * P} width={P} height={h * P + 400} fill={color} />;
    });
  };
  const cloud = (x: number, y: number) => (
    <g fill="#f4f4f4" key={`${x}${y}`}>
      <rect x={x} y={y} width={P * 8} height={P * 2} /><rect x={x + P * 2} y={y - P * 2} width={P * 4} height={P * 2} /><rect x={x + P} y={y - P} width={P * 6} height={P} />
    </g>
  );
  return (
    <Bg crisp>
      <defs>
        <pattern id="pa-scan" width="4" height="4" patternUnits="userSpaceOnUse"><rect width="4" height="2" fill="#000" opacity=".18" /></pattern>
        <pattern id="pa-brick" width="40" height="20" patternUnits="userSpaceOnUse">
          <rect width="40" height="20" fill="#b13e53" /><rect width="40" height="2" fill="#5d275d" /><rect y="10" width="40" height="2" fill="#5d275d" />
          <rect x="18" width="2" height="10" fill="#5d275d" /><rect x="38" y="10" width="2" height="10" fill="#5d275d" />
        </pattern>
      </defs>
      <rect width={W} height="300" fill="#29366f" /><rect y="300" width={W} height="200" fill="#3b5dc9" /><rect y="500" width={W} height="140" fill="#41a6f6" />
      {Array.from({ length: 50 }, (_, i) => <rect key={i} x={Math.floor((r() * W) / P) * P} y={Math.floor((r() * 280) / P) * P} width={P / 2} height={P / 2} fill="#f4f4f4" opacity={0.5 + r() * 0.5} className={i % 5 ? undefined : "twinkle"} />)}
      <rect x="1100" y="90" width="80" height="80" fill="#ffcd75" /><rect x="1090" y="100" width="100" height="60" fill="#ffcd75" /><rect x="1110" y="80" width="60" height="100" fill="#ffcd75" />
      <g className="drift-a">{cloud(200, 220)}{cloud(620, 160)}{cloud(1300, 260)}</g>
      {hills(700, "#257179", 3)}
      {hills(760, "#38b764", 5)}
      {/* a small pixel castle on the hill */}
      <g fill="#333c57">
        <rect x="740" y="520" width="120" height="120" /><rect x="720" y="480" width="40" height="160" /><rect x="840" y="480" width="40" height="160" />
        {[720, 740, 840, 860].map((x) => <rect key={x} x={x} y="470" width="10" height="10" />)}
        <rect x="780" y="580" width="40" height="60" fill="#1a1c2c" />
        <rect x="790" y="500" width="20" height="20" fill="#ffcd75" />
        <rect x="798" y="430" width="4" height="50" /><rect x="802" y="430" width="30" height="20" fill="#b13e53" />
      </g>
      <rect y="800" width={W} height="100" fill="url(#pa-brick)" />
      <rect y="790" width={W} height="10" fill="#a7f070" />
      <rect width={W} height={H} fill="url(#pa-scan)" />
    </Bg>
  );
};

/* ── Candy Sky: cut paper in pastel, each layer casting a small shadow ── */
export const CandySkyBg = () => {
  const cloud = (x: number, y: number, s: number, fill: string, k: string) => (
    <g key={k} transform={`translate(${x} ${y}) scale(${s})`} fill={fill} filter="url(#cs2-paper)">
      <path d="M-120 40 C-140 0 -90 -30 -60 -10 C-50 -60 20 -70 40 -20 C70 -50 130 -20 110 30 C150 40 130 80 100 70 H-110 C-150 70 -150 40 -120 40 Z" />
    </g>
  );
  return (
    <Bg>
      <defs>
        <linearGradient id="cs2-sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#2b2350" /><stop offset=".45" stopColor="#7d5fa8" /><stop offset=".8" stopColor="#f2a9c4" /><stop offset="1" stopColor="#ffd7b5" /></linearGradient>
        <filter id="cs2-paper" x="-10%" y="-10%" width="130%" height="140%"><feDropShadow dx="0" dy="6" stdDeviation="5" floodColor="#2b1a40" floodOpacity=".35" /></filter>
        <filter id="cs2-grain"><feTurbulence type="fractalNoise" baseFrequency=".9" numOctaves="2" seed="3" /><feColorMatrix values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 .07 0" /></filter>
      </defs>
      <rect width={W} height={H} fill="url(#cs2-sky)" />
      <g fill="none" strokeWidth="34" filter="url(#cs2-paper)" opacity=".9">
        {["#f7c6d9", "#fbe3a8", "#c8e9d6", "#bcd7f5", "#d9c8f2"].map((c, i) => <path key={c} d={`M${380 + i * 34} 760 A${420 - i * 34} ${420 - i * 34} 0 0 1 ${1220 - i * 34} 760`} stroke={c} />)}
      </g>
      <circle cx="800" cy="300" r="70" fill="#fff4d6" filter="url(#cs2-paper)" />
      <g className="drift-a">{cloud(260, 600, 0.8, "#fdf0f5", "a")}{cloud(1320, 200, 0.9, "#fdf0f5", "b")}{cloud(980, 420, 0.7, "#f6e8ff", "c")}</g>
      <path d="M0 720 C200 660 420 700 620 680 C820 660 1000 720 1200 690 C1380 664 1500 690 1600 680 V900 H0 Z" fill="#f7cfe0" filter="url(#cs2-paper)" />
      <path d="M0 780 C260 740 500 790 760 770 C1020 750 1280 800 1600 760 V900 H0 Z" fill="#e7b3cf" filter="url(#cs2-paper)" />
      <path d="M0 840 C300 810 640 860 960 840 C1200 826 1420 850 1600 836 V900 H0 Z" fill="#c995bd" filter="url(#cs2-paper)" />
      <rect width={W} height={H} filter="url(#cs2-grain)" />
    </Bg>
  );
};

/* ── Ember Mountains: woodcut, black and red, carved cream lines ── */
export const EmberMountainsBg = () => (
  <Bg>
    <defs>
      <pattern id="em-hatch" width="10" height="10" patternUnits="userSpaceOnUse" patternTransform="rotate(-30)"><path d="M0 5 H10" stroke="#5a1410" strokeWidth="2" /></pattern>
      <pattern id="em-hatch2" width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(40)"><path d="M0 4 H8" stroke="#e9dcc4" strokeWidth="1.2" opacity=".55" /></pattern>
      <radialGradient id="em-crater" cx=".5" cy=".3" r=".6"><stop offset="0" stopColor="#ffb347" /><stop offset=".4" stopColor="#e2401f" /><stop offset="1" stopColor="#e2401f" stopOpacity="0" /></radialGradient>
    </defs>
    <rect width={W} height={H} fill="#140806" />
    <rect width={W} height={H} fill="url(#em-hatch)" opacity=".7" />
    <circle cx="800" cy="330" r="260" fill="url(#em-crater)" opacity=".45" className="lamp" />
    <g className="smoke" stroke="#e9dcc4" strokeWidth="2" strokeOpacity=".3">
      {[[800, 250, 60], [760, 190, 70], [830, 130, 80], [770, 60, 95], [850, -10, 110]].map(([x, y, rad], i) => (
        <circle key={i} cx={x} cy={y} r={rad} fill="#2a100b" opacity={0.75 - i * 0.1} />
      ))}
    </g>
    <path d="M300 900 L640 330 L730 300 L770 330 L830 330 L870 300 L960 330 L1300 900 Z" fill="#0a0403" />
    <path d="M300 900 L640 330 L730 300 L770 330 L830 330 L870 300 L960 330 L1300 900 Z" fill="url(#em-hatch2)" />
    <path d="M770 330 C780 420 740 500 760 600 C770 680 720 760 740 900 M830 330 C840 440 880 520 860 640 C850 730 900 800 880 900" stroke="#e2401f" strokeWidth="10" fill="none" />
    <path d="M770 330 C780 420 740 500 760 600 C770 680 720 760 740 900 M830 330 C840 440 880 520 860 640 C850 730 900 800 880 900" stroke="#ffb347" strokeWidth="3" fill="none" />
    <path d="M-40 900 L180 560 L280 620 L420 470 L560 900 Z M1060 900 L1200 500 L1320 600 L1440 520 L1660 900 Z" fill="#0d0504" />
    <path d="M-40 900 L180 560 L280 620 L420 470 L560 900 Z M1060 900 L1200 500 L1320 600 L1440 520 L1660 900 Z" fill="url(#em-hatch2)" opacity=".7" />
    <g stroke="#e9dcc4" strokeWidth="2" opacity=".5" fill="none">
      <path d="M640 330 L560 470 M960 330 L1040 470 M700 360 L620 560 M900 360 L980 560" />
    </g>
  </Bg>
);

/* ── Velvet Lounge: art deco sunburst, gold pinstripes, a velvet curtain ── */
export const VelvetLoungeBg = () => (
  <Bg>
    <defs>
      <linearGradient id="vl-wall" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#1a0509" /><stop offset="1" stopColor="#3a0b16" /></linearGradient>
      <linearGradient id="vl-curtain" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" stopColor="#4a0a18" /><stop offset=".25" stopColor="#8a1428" /><stop offset=".5" stopColor="#4a0a18" /><stop offset=".75" stopColor="#7a1224" /><stop offset="1" stopColor="#3a0812" />
      </linearGradient>
      <radialGradient id="vl-spot" cx=".5" cy="1" r=".6"><stop offset="0" stopColor="#ffe6b0" stopOpacity=".35" /><stop offset="1" stopColor="#ffe6b0" stopOpacity="0" /></radialGradient>
      <pattern id="vl-pin" width="60" height="900" patternUnits="userSpaceOnUse"><path d="M30 0 V900" stroke="#c9a45c" strokeWidth="1" opacity=".18" /></pattern>
    </defs>
    <rect width={W} height={H} fill="url(#vl-wall)" />
    <rect width={W} height={H} fill="url(#vl-pin)" />
    <g stroke="#c9a45c" fill="none" opacity=".75">
      {Array.from({ length: 19 }, (_, i) => { const a = Math.PI * (i / 18); return <path key={i} d={`M800 520 L${800 - Math.cos(a) * 620} ${520 - Math.sin(a) * 620}`} strokeWidth="1.5" />; })}
      {[160, 230, 300].map((rad) => <path key={rad} d={`M${800 - rad} 520 A${rad} ${rad} 0 0 1 ${800 + rad} 520`} strokeWidth="3" />)}
      <path d="M560 520 H1040" strokeWidth="3" />
    </g>
    <circle cx="800" cy="520" r="80" fill="#c9a45c" opacity=".9" />
    <circle cx="800" cy="520" r="62" fill="#1a0509" />
    <path d="M770 520 a30 30 0 0 1 60 0" stroke="#c9a45c" strokeWidth="3" fill="none" />
    <rect y="700" width={W} height="200" fill="#120306" />
    <path d="M0 700 H1600" stroke="#c9a45c" strokeWidth="3" />
    <ellipse cx="800" cy="760" rx="380" ry="70" fill="url(#vl-spot)" />
    {/* a double bass and a microphone, in gold line */}
    <g stroke="#c9a45c" strokeWidth="3" fill="none" strokeLinecap="round">
      <path d="M640 760 C600 740 600 690 630 670 C610 640 620 610 650 600 C680 610 690 640 670 670 C700 690 700 740 660 760 Z" />
      <path d="M650 600 V500 M640 500 H660" /><path d="M640 640 H660 M640 650 H660" />
      <path d="M960 760 V600 M940 760 H980" /><circle cx="960" cy="588" r="12" />
    </g>
    <path d="M0 0 H260 C240 200 270 500 220 900 H0 Z" fill="url(#vl-curtain)" />
    <path d="M1600 0 H1340 C1360 200 1330 500 1380 900 H1600 Z" fill="url(#vl-curtain)" />
    <path d="M0 0 H1600 V60 C1300 100 1100 50 800 80 C500 110 300 50 0 90 Z" fill="#5a0c1c" />
    <path d="M0 90 C300 50 500 110 800 80 C1100 50 1300 100 1600 60" stroke="#c9a45c" strokeWidth="3" fill="none" />
  </Bg>
);

/* ── Glass Reef: watercolour water, coral and kelp, light from far above ── */
export const GlassReefBg = () => {
  const r = rng(113);
  return (
    <Bg>
      <defs>
        <linearGradient id="gr-water" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#1d5b73" /><stop offset=".45" stopColor="#0d2f4a" /><stop offset="1" stopColor="#06121f" /></linearGradient>
        <linearGradient id="gr-ray" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#bff3ff" stopOpacity=".22" /><stop offset="1" stopColor="#bff3ff" stopOpacity="0" /></linearGradient>
        <filter id="gr-wash" x="-20%" y="-20%" width="140%" height="140%">
          <feTurbulence type="fractalNoise" baseFrequency=".02" numOctaves="3" seed="9" result="n" />
          <feDisplacementMap in="SourceGraphic" in2="n" scale="30" result="d" /><feGaussianBlur in="d" stdDeviation="3" />
        </filter>
      </defs>
      <rect width={W} height={H} fill="url(#gr-water)" />
      <g filter="url(#gr-wash)" opacity=".5">
        <circle cx="300" cy="260" r="220" fill="#2a7a8a" /><circle cx="1250" cy="180" r="260" fill="#3a5f8f" /><circle cx="820" cy="460" r="300" fill="#16405e" />
      </g>
      <g className="rays">
        <path d="M600 0 H700 L900 900 H640 Z" fill="url(#gr-ray)" /><path d="M820 0 H880 L1120 900 H960 Z" fill="url(#gr-ray)" /><path d="M980 0 H1020 L1320 900 H1220 Z" fill="url(#gr-ray)" opacity=".6" />
      </g>
      <g filter="url(#gr-wash)">
        <path d="M0 900 C80 800 160 820 240 760 C320 700 420 760 520 720 C600 690 680 760 760 740 C840 720 940 780 1040 740 C1160 700 1260 780 1380 750 C1480 726 1560 760 1600 740 V900 Z" fill="#081a28" />
      </g>
      <g stroke="#8a4f7a" strokeWidth="9" strokeLinecap="round" fill="none" filter="url(#gr-wash)" opacity=".9">
        <path d="M300 860 C300 800 260 770 250 720 M300 820 C330 790 360 780 370 740 M280 780 C250 760 230 740 230 700" />
        <path d="M1240 870 C1250 800 1290 770 1300 720 M1260 820 C1220 790 1210 760 1200 720" stroke="#b0625e" />
      </g>
      <g className="kelp" stroke="#2f6b56" strokeWidth="6" fill="none" strokeLinecap="round">
        {[120, 170, 520, 1080, 1440, 1500].map((x, i) => <path key={x} d={`M${x} 900 C${x - 30} 800 ${x + 30} 720 ${x - 10} ${620 - (i % 2) * 60}`} />)}
      </g>
      <g className="bubbles">
        {Array.from({ length: 40 }, (_, i) => <circle key={i} cx={r() * W} cy={r() * H} r={2 + r() * 5} fill="none" stroke="#cfefff" strokeWidth="1" opacity={0.3 + r() * 0.4} />)}
      </g>
    </Bg>
  );
};

/* behind the door: not one world but all of them, colours swirling together */
export const PortalView = () => {
  const r = rng(131);
  const hues = ["#ff2a6d", "#05d9e8", "#ffcd75", "#a7f070", "#f2a9c4", "#e2401f", "#c9a45c", "#5fe0b0", "#7d5fa8", "#ea9460"];
  return (
    <svg className="door-view-svg" viewBox="0 0 300 600" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs>
        <filter id="pv-blur"><feGaussianBlur stdDeviation="18" /></filter>
        <linearGradient id="pv-bg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#120c24" /><stop offset="1" stopColor="#2a1437" /></linearGradient>
      </defs>
      <rect width="300" height="600" fill="url(#pv-bg)" />
      <g filter="url(#pv-blur)" className="portal-swirl">
        {hues.map((c, i) => <circle key={c} cx={40 + r() * 220} cy={60 + r() * 480} r={40 + r() * 50} fill={c} opacity=".55" />)}
      </g>
      {Array.from({ length: 60 }, (_, i) => <circle key={i} cx={r() * 300} cy={r() * 600} r={0.5 + r() * 1.4} fill="#fff" opacity={0.3 + r() * 0.6} className={i % 5 ? undefined : "twinkle"} />)}
    </svg>
  );
};
