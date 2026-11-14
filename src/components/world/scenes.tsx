/* Backdrops for the world behind the door. Each one is drawn on a 1600×900 canvas and cropped to the
   screen ("slice"), so the important things stand near the middle: on a phone only the centre strip shows.
   The songs themselves are not drawn here; they are buttons laid over the scene (see Music.tsx). */

export const rng = (seed: number) => () => ((seed = (seed * 16807) % 2147483647) / 2147483647);

const W = 1600;
const H = 900;

const Bg = ({ children, label }: { children: React.ReactNode; label?: string }) => (
  <svg className="land-bg" viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMid slice" aria-hidden={label ? undefined : true} role={label ? "img" : undefined} aria-label={label}>
    {children}
  </svg>
);

const Stars = ({ n, seed, y0, y1, color = "#f6e7c8" }: { n: number; seed: number; y0: number; y1: number; color?: string }) => {
  const r = rng(seed);
  return (
    <g>
      {Array.from({ length: n }, (_, i) => {
        const x = r() * W;
        const y = y0 + r() * (y1 - y0);
        const s = 0.5 + r() * 1.4;
        const o = 0.25 + r() * 0.6;
        return <circle key={i} cx={x} cy={y} r={s} fill={color} opacity={o} className={i % 7 === 0 ? "twinkle" : undefined} style={i % 7 === 0 ? { animationDelay: `${(r() * 4).toFixed(2)}s` } : undefined} />;
      })}
    </g>
  );
};

/* ── I. the lantern path: a field of red spider lilies at dusk ── */
export const LanternPathBg = () => {
  const r = rng(3);
  const lilies = Array.from({ length: 170 }, () => {
    const y = 655 + r() ** 1.4 * 250;
    return { x: r() * W, y, s: 0.55 + ((y - 655) / 250) * 1.5, a: r() * 24 - 12, sway: r() > 0.6 };
  }).sort((a, b) => a.y - b.y);

  return (
    <Bg>
      <defs>
        <linearGradient id="lp-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#100b22" /><stop offset=".42" stopColor="#2a1437" /><stop offset=".6" stopColor="#64284a" />
          <stop offset=".69" stopColor="#b9504f" /><stop offset=".74" stopColor="#ea9460" />
        </linearGradient>
        <linearGradient id="lp-path" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#f0a06a" stopOpacity=".7" /><stop offset=".4" stopColor="#8a3d4a" stopOpacity=".7" /><stop offset="1" stopColor="#2a1426" />
        </linearGradient>
        <radialGradient id="lp-glow" cx=".5" cy="1" r=".6"><stop offset="0" stopColor="#ffb27a" stopOpacity=".5" /><stop offset="1" stopColor="#ffb27a" stopOpacity="0" /></radialGradient>
        <g id="lp-lily">
          <path d="M0 0 V22" stroke="#26301f" strokeWidth="1.4" />
          <g stroke="#c8263a" strokeWidth="1.4" fill="none" strokeLinecap="round">
            <path d="M0 0 C-3 -5 -9 -7 -13 -4" /><path d="M0 0 C3 -5 9 -7 13 -4" />
            <path d="M0 0 C-2 -7 -5 -12 -9 -14" /><path d="M0 0 C2 -7 5 -12 9 -14" />
            <path d="M0 0 C0 -6 -1 -12 -2 -17" /><path d="M0 0 C-5 -2 -10 1 -12 5" /><path d="M0 0 C5 -2 10 1 12 5" />
          </g>
          <circle r="2" fill="#ea4d50" />
        </g>
      </defs>
      <rect width={W} height={H} fill="url(#lp-sky)" />
      <Stars n={80} seed={5} y0={10} y1={360} />
      <path d="M1130 120 a34 34 0 1 0 28 56 a27 27 0 1 1 -28 -56z" fill="#f6e7c8" opacity=".9" />
      <ellipse cx="800" cy="665" rx="760" ry="200" fill="url(#lp-glow)" />
      <path d="M0 650 L120 570 L210 610 L330 505 L430 585 L560 525 L700 615 L800 548 L900 605 L1040 488 L1160 592 L1290 532 L1420 602 L1600 540 V900 H0 Z" fill="#3c1a3c" opacity=".85" />
      <path d="M0 690 C200 650 380 708 560 668 C720 632 880 698 1040 662 C1220 628 1400 698 1600 656 V900 H0 Z" fill="#1d0d1f" />
      <path d="M776 668 C784 706 712 770 640 900 H990 C908 784 836 708 826 668 Z" fill="url(#lp-path)" />
      {lilies.map((l, i) => (
        <use key={i} href="#lp-lily" className={l.sway ? "lily" : undefined}
          transform={`translate(${l.x.toFixed(1)} ${l.y.toFixed(1)}) rotate(${l.a.toFixed(1)}) scale(${l.s.toFixed(2)})`} />
      ))}
    </Bg>
  );
};

/* ── II. the firefly forest: cedars, mist and a small torii ── */
export const FireflyForestBg = () => {
  const r = rng(17);
  const trunks = (n: number, w0: number, w1: number) =>
    Array.from({ length: n }, () => ({ x: r() * W, w: w0 + r() * (w1 - w0) }));
  const far = trunks(26, 10, 22);
  // keep the torii in the middle clear of the nearer trunks
  const mid = trunks(14, 24, 44).map((t) => (t.x > 660 && t.x < 930 ? { ...t, x: t.x < 795 ? t.x - 280 : t.x + 280 } : t));
  const near = [{ x: 90, w: 110 }, { x: 330, w: 70 }, { x: 1210, w: 90 }, { x: 1480, w: 130 }];

  return (
    <Bg>
      <defs>
        <linearGradient id="ff-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#030c0c" /><stop offset=".55" stopColor="#0a2321" /><stop offset="1" stopColor="#0f2d29" />
        </linearGradient>
        <radialGradient id="ff-moon" cx=".72" cy=".05" r=".55"><stop offset="0" stopColor="#bfe8d8" stopOpacity=".22" /><stop offset="1" stopColor="#bfe8d8" stopOpacity="0" /></radialGradient>
        <radialGradient id="ff-toro"><stop offset="0" stopColor="#ffcf8a" stopOpacity=".55" /><stop offset="1" stopColor="#ffcf8a" stopOpacity="0" /></radialGradient>
        <linearGradient id="ff-ray" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#bfe8d8" stopOpacity=".08" /><stop offset="1" stopColor="#bfe8d8" stopOpacity="0" /></linearGradient>
      </defs>
      <rect width={W} height={H} fill="url(#ff-sky)" />
      <rect width={W} height={H} fill="url(#ff-moon)" />
      <path d="M1080 0 L1180 0 L860 900 L700 900 Z M1260 0 L1310 0 L1060 900 L980 900 Z" fill="url(#ff-ray)" />
      {far.map((t, i) => <rect key={`f${i}`} x={t.x} y="0" width={t.w} height="660" fill="#123230" opacity=".9" />)}

      {/* the torii at the end of the path, with two stone lanterns */}
      <g>
        <path d="M800 900 L782 660 L818 660 Z" fill="#163a35" opacity=".7" />
        <g fill="#b3202d">
          <rect x="758" y="532" width="9" height="124" /><rect x="833" y="532" width="9" height="124" />
          <rect x="748" y="552" width="104" height="7" />
          <path d="M732 528 Q800 536 868 528 L872 518 Q800 526 728 518 Z" />
        </g>
        <rect x="732" y="530" width="136" height="3" fill="#1a1716" opacity=".6" />
        <circle cx="800" cy="580" r="120" fill="url(#ff-toro)" opacity=".35" />
        {[700, 900].map((x) => (
          <g key={x} transform={`translate(${x} 660)`}>
            <circle cy="-30" r="34" fill="url(#ff-toro)" />
            <rect x="-4" y="-14" width="8" height="14" fill="#3b4a46" />
            <rect x="-11" y="-36" width="22" height="20" fill="#4a5a55" />
            <rect x="-6" y="-31" width="12" height="9" fill="#ffcf8a" />
            <path d="M-16 -36 L0 -46 L16 -36 Z" fill="#3b4a46" />
          </g>
        ))}
      </g>

      {mid.map((t, i) => <rect key={`m${i}`} x={t.x} y="0" width={t.w} height="700" fill="#0a1f1d" />)}
      <rect y="640" width={W} height="260" fill="#061412" />
      <g className="mist">
        <ellipse cx="400" cy="660" rx="420" ry="34" fill="#9fd6c4" opacity=".07" />
        <ellipse cx="1180" cy="690" rx="460" ry="40" fill="#9fd6c4" opacity=".06" />
      </g>
      {near.map((t, i) => (
        <g key={`n${i}`} fill="#020807">
          <rect x={t.x - t.w / 2} y="0" width={t.w} height={H} />
          <path d={`M${t.x - t.w / 2} 860 Q${t.x - t.w} 900 ${t.x - t.w * 1.3} 900 H${t.x + t.w * 1.3} Q${t.x + t.w} 900 ${t.x + t.w / 2} 860 Z`} />
        </g>
      ))}
      <path d="M0 0 H1600 V90 C1300 150 1100 70 800 120 C520 165 300 80 0 140 Z" fill="#020807" />
      <g className="mist mist-b">
        <ellipse cx="800" cy="820" rx="700" ry="50" fill="#9fd6c4" opacity=".05" />
      </g>
    </Bg>
  );
};

/* ── III. the lake of stars: a moon, a quiet house on the shore, a second sky in the water ── */
export const StarLakeBg = () => {
  const r = rng(29);
  const shimmer = Array.from({ length: 22 }, (_, i) => {
    const y = 560 + i * 14 + r() * 6;
    return { y, w: 26 + r() * 70 * (1 - i / 30), dx: r() * 20 - 10, d: (r() * 3).toFixed(2) };
  });
  return (
    <Bg>
      <defs>
        <linearGradient id="sl-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#03051a" /><stop offset=".45" stopColor="#0b1238" /><stop offset=".6" stopColor="#1e2a5c" />
        </linearGradient>
        <linearGradient id="sl-lake" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#14204c" /><stop offset="1" stopColor="#03051a" />
        </linearGradient>
        <radialGradient id="sl-halo"><stop offset="0" stopColor="#f3e6c7" stopOpacity=".32" /><stop offset="1" stopColor="#f3e6c7" stopOpacity="0" /></radialGradient>
        <radialGradient id="sl-milky" cx=".5" cy=".5" r=".5"><stop offset="0" stopColor="#c9d4ff" stopOpacity=".1" /><stop offset="1" stopColor="#c9d4ff" stopOpacity="0" /></radialGradient>
      </defs>
      <rect width={W} height="560" fill="url(#sl-sky)" />
      <ellipse cx="800" cy="260" rx="900" ry="120" fill="url(#sl-milky)" transform="rotate(-18 800 260)" />
      <Stars n={150} seed={31} y0={0} y1={520} />
      <circle cx="860" cy="170" r="140" fill="url(#sl-halo)" />
      <circle cx="860" cy="170" r="44" fill="#f3e6c7" />
      <circle cx="848" cy="160" r="8" fill="#d9caa6" opacity=".5" /><circle cx="872" cy="186" r="5" fill="#d9caa6" opacity=".45" />
      <path d="M0 560 L140 510 L260 540 L380 488 L520 548 L640 520 L760 556 L920 512 L1080 550 L1200 500 L1360 545 L1600 505 V560 Z" fill="#0b1230" />
      {/* the house on the shore keeps a light on */}
      <g transform="translate(660 546)">
        <rect x="-18" y="-22" width="36" height="22" fill="#070b20" />
        <path d="M-24 -22 L0 -40 L24 -22 Z" fill="#070b20" />
        <rect x="-6" y="-16" width="9" height="8" fill="#f4a95c" />
      </g>
      <rect y="560" width={W} height="340" fill="url(#sl-lake)" />
      <path d="M660 566 h-5 v14 h5 z" fill="#f4a95c" opacity=".35" />
      <g>
        {shimmer.map((s, i) => (
          <rect key={i} className="shimmer" x={860 - s.w / 2 + s.dx} y={s.y} width={s.w} height="3" rx="1.5" fill="#f3e6c7" opacity=".35" style={{ animationDelay: `${s.d}s` }} />
        ))}
      </g>
      <g className="bob">
        <path d="M940 712 Q1000 732 1060 712 L1050 728 Q1000 740 950 728 Z" fill="#05081c" />
        <path d="M1000 712 V680" stroke="#05081c" strokeWidth="2" />
        <circle cx="1000" cy="678" r="4" fill="#ffcf8a" />
        <circle cx="1000" cy="678" r="16" fill="#ffcf8a" opacity=".15" />
      </g>
      <g stroke="#02030f" strokeWidth="3" strokeLinecap="round">
        {Array.from({ length: 16 }, (_, i) => {
          const x = i < 8 ? 20 + i * 22 : 1440 + (i - 8) * 20;
          const h = 90 + ((i * 37) % 70);
          return <path key={i} d={`M${x} 900 Q${x + 6} ${900 - h / 2} ${x + (i % 2 ? 12 : -8)} ${900 - h}`} fill="none" />;
        })}
      </g>
    </Bg>
  );
};

/* ── IV. the sea of clouds: aurora, a floating island and a whale that swims through the sky ── */
export const CloudSeaBg = () => {
  const r = rng(43);
  const band = (y: number, n: number, rad: number) =>
    Array.from({ length: n }, (_, i) => ({ x: (i / (n - 1)) * (W + 200) - 100 + r() * 40, y: y + r() * 30, r: rad * (0.7 + r() * 0.6) }));
  const bands: [string, ReturnType<typeof band>, string][] = [
    ["#3a3274", band(700, 22, 70), "drift-a"],
    ["#4f4590", band(770, 20, 80), "drift-b"],
    ["#6a5daa", band(850, 18, 90), "drift-a"],
  ];
  return (
    <Bg>
      <defs>
        <linearGradient id="cs-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#0a0924" /><stop offset=".55" stopColor="#221c56" /><stop offset=".8" stopColor="#4a3a80" />
        </linearGradient>
        <linearGradient id="cs-aurora" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#5fe0b0" stopOpacity="0" /><stop offset=".4" stopColor="#5fe0b0" stopOpacity=".35" />
          <stop offset=".7" stopColor="#e07ab8" stopOpacity=".25" /><stop offset="1" stopColor="#e07ab8" stopOpacity="0" />
        </linearGradient>
      </defs>
      <rect width={W} height={H} fill="url(#cs-sky)" />
      <Stars n={110} seed={47} y0={0} y1={600} />
      <g className="aurora">
        <path d="M-100 160 C200 60 420 260 700 150 C980 40 1200 230 1700 110 L1700 190 C1200 300 980 120 700 230 C420 340 200 140 -100 240 Z" fill="url(#cs-aurora)" />
      </g>

      {/* the whale swims slowly west, trailing stars */}
      <g className="whale"><g className="whale-body">
        <path d="M540 330 C580 255 750 222 900 244 C1015 260 1085 298 1125 288 C1155 280 1176 248 1198 236 C1192 268 1188 290 1210 322 C1178 316 1156 314 1130 322 C1064 364 962 404 818 404 C680 404 574 384 540 330 Z" fill="#2b2563" stroke="#9d92e0" strokeOpacity=".35" strokeWidth="2" />
        <path d="M560 346 C640 380 760 394 880 388" stroke="#b9b0f0" strokeWidth="3" fill="none" opacity=".45" />
        <path d="M580 360 C660 390 760 402 860 398" stroke="#b9b0f0" strokeWidth="3" fill="none" opacity=".3" />
        <path d="M760 392 C770 430 742 456 712 462 C730 438 732 414 728 396 Z" fill="#2b2563" />
        <circle cx="608" cy="318" r="4" fill="#cfc7ff" />
        {Array.from({ length: 12 }, (_, i) => (
          <circle key={i} cx={1200 + i * 16 + r() * 10} cy={290 + r() * 60 - i * 2} r={1 + r() * 1.6} fill="#f6e7c8" opacity={0.7 - i * 0.05} />
        ))}
      </g></g>

      {/* a floating island with a house and a tree */}
      <g className="float">
        <path d="M300 470 Q420 450 540 470 L470 560 L430 620 L400 560 Z" fill="#251f4c" />
        <path d="M290 470 Q420 440 550 470 Q420 486 290 470 Z" fill="#3f6a58" />
        <rect x="380" y="438" width="34" height="28" fill="#1c1838" />
        <path d="M374 440 L397 420 L420 440 Z" fill="#b3202d" />
        <rect x="390" y="446" width="10" height="9" fill="#f4a95c" />
        <path d="M480 466 V430" stroke="#2a2440" strokeWidth="4" />
        <circle cx="480" cy="420" r="20" fill="#2f5848" /><circle cx="466" cy="430" r="13" fill="#2f5848" />
      </g>

      {bands.map(([fill, pts, cls], i) => (
        <g key={i} className={cls} fill={fill}>
          {pts.map((p, j) => <circle key={j} cx={p.x} cy={p.y} r={p.r} />)}
          <rect x="-200" y={pts[0].y} width={W + 400} height={H} />
        </g>
      ))}
    </Bg>
  );
};

/* ── V. the lighthouse at the end of the world, and the way home ── */
export const LighthouseBg = () => (
  <Bg>
    <defs>
      <linearGradient id="lh-sky" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#040a1a" /><stop offset=".5" stopColor="#0c1c38" /><stop offset=".62" stopColor="#1a304e" />
      </linearGradient>
      <linearGradient id="lh-sea" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#0d2038" /><stop offset="1" stopColor="#040a1a" /></linearGradient>
      <linearGradient id="lh-beam" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stopColor="#ffe3a8" stopOpacity=".45" /><stop offset="1" stopColor="#ffe3a8" stopOpacity="0" /></linearGradient>
      <linearGradient id="lh-beam-r" x1="1" y1="0" x2="0" y2="0"><stop offset="0" stopColor="#ffe3a8" stopOpacity="0" /><stop offset="1" stopColor="#ffe3a8" stopOpacity=".45" /></linearGradient>
      <radialGradient id="lh-lamp"><stop offset="0" stopColor="#ffe3a8" stopOpacity=".7" /><stop offset="1" stopColor="#ffe3a8" stopOpacity="0" /></radialGradient>
      <radialGradient id="lh-home"><stop offset="0" stopColor="#f4a95c" stopOpacity=".45" /><stop offset="1" stopColor="#f4a95c" stopOpacity="0" /></radialGradient>
    </defs>
    <rect width={W} height={H} fill="url(#lh-sky)" />
    <Stars n={120} seed={53} y0={0} y1={540} />
    <rect y="560" width={W} height="340" fill="url(#lh-sea)" />
    <path d="M0 560 H1600" stroke="#2a4466" strokeWidth="1" opacity=".6" />

    <g className="beam">
      <path d="M860 340 L-400 220 L-400 470 Z" fill="url(#lh-beam)" />
      <path d="M860 340 L2300 470 L2300 220 Z" fill="url(#lh-beam-r)" opacity=".6" />
    </g>
    <g transform="translate(-80 0)">
    <path d="M940 600 L930 900 L950 900 Z" fill="#ffe3a8" opacity=".12" />

    {/* tower on the rocks */}
    <path d="M780 706 L806 660 L838 646 L862 610 L900 598 L980 596 L1012 614 L1040 606 L1066 642 L1092 664 L1112 706 Z" fill="#081322" />
    <path d="M838 646 L862 610 L880 640 Z M1012 614 L1040 606 L1030 640 Z M806 660 L838 646 L826 676 Z" fill="#14233a" />
    <path d="M770 706 Q940 690 1124 706" stroke="#5f84b0" strokeWidth="2" fill="none" opacity=".35" />
    <path d="M908 600 L918 372 H962 L972 600 Z" fill="#e9e3d9" />
    <path d="M911 540 L966 540 L969 570 L910 570 Z M914 470 L963 470 L965 500 L913 500 Z M917 400 L961 400 L962 428 L916 428 Z" fill="#b3202d" />
    <rect x="906" y="362" width="68" height="10" fill="#1a1716" />
    <rect x="918" y="326" width="44" height="36" fill="#ffe3a8" />
    <path d="M922 326 V362 M940 326 V362 M958 326 V362" stroke="#1a1716" strokeWidth="2" />
    <path d="M912 326 L940 300 L968 326 Z" fill="#b3202d" />
    <circle cx="940" cy="340" r="90" fill="url(#lh-lamp)" className="lamp" />

    </g>
    <g className="waves">
      {[620, 680, 750, 830].map((y, i) => (
        <path key={y} d={`M-100 ${y} q50 -10 100 0 t100 0 t100 0 t100 0 t100 0 t100 0 t100 0 t100 0 t100 0 t100 0 t100 0 t100 0 t100 0 t100 0 t100 0 t100 0 t100 0 t100 0 t100 0`}
          stroke="#5f84b0" strokeWidth={1 + i * 0.4} fill="none" opacity={0.18 + i * 0.05} className={i % 2 ? "drift-a" : "drift-b"} />
      ))}
    </g>

    {/* the shore, and home with the light still on */}
    <path d="M-20 820 C120 760 300 760 520 800 C600 815 640 850 660 900 H-20 Z" fill="#0b1220" />
    <g transform="translate(250 778)">
      <circle cy="-20" r="80" fill="url(#lh-home)" />
      <rect x="-26" y="-34" width="52" height="34" fill="#050a14" />
      <path d="M-34 -34 L0 -60 L34 -34 Z" fill="#050a14" />
      <rect x="-15" y="-26" width="12" height="11" fill="#f4a95c" />
      <rect x="6" y="-22" width="10" height="22" fill="#2a1d14" />
      <path d="M16 -58 V-44" stroke="#050a14" strokeWidth="6" />
    </g>
  </Bg>
);
