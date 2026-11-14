/* Five of the universes: a ukiyo-e print, a forest in layers of fog, a gold star chart over a lake,
   a cel-shaded sunset above the clouds and a two-ink risograph lighthouse.
   The songs are not drawn here; they are buttons laid over the scene (see Music.tsx). */
import { Bg, Flock, H, Stars, W, rng, sv } from "./kit";

/* ── The Lantern Path: a woodblock print. Flat colour, ink outlines, printed bands of mist ── */
export const LanternPathBg = () => {
  const r = rng(3);
  const INK = "#2a2420";
  const lilies = Array.from({ length: 150 }, () => {
    const y = 705 + r() ** 1.3 * 200;
    return { x: r() * W, y, s: 0.7 + ((y - 705) / 200) * 1.6, a: r() * 24 - 12, d: 3.5 + r() * 3, dl: -r() * 5 };
  }).sort((a, b) => a.y - b.y);
  const petals = Array.from({ length: 24 }, () => ({ x: r() * W * 1.15, d: 11 + r() * 9, dl: -r() * 20, fx: -(120 + r() * 260), s: 0.7 + r() * 0.9, sd: 1.6 + r() * 2.4 }));
  const kasumi: [number, number, number, number][] = [[960, 118, 720, 22], [820, 236, 300, 16], [1010, 372, 560, 24], [-160, 430, 460, 18], [380, 488, 300, 16]];
  return (
    <Bg>
      <defs>
        <linearGradient id="lp-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#121d3a" /><stop offset=".2" stopColor="#2d4c7c" /><stop offset=".42" stopColor="#a9b9c3" />
          <stop offset=".54" stopColor="#efe3c8" /><stop offset=".62" stopColor="#f0c6a0" /><stop offset=".68" stopColor="#df7f63" />
        </linearGradient>
        <g id="lp-lily">
          <path d="M0 0 V24" stroke="#2e4a33" strokeWidth="1.6" />
          <g stroke="#c8402f" strokeWidth="2" fill="none" strokeLinecap="round">
            <path d="M0 0 C-3 -5 -9 -7 -13 -4" /><path d="M0 0 C3 -5 9 -7 13 -4" />
            <path d="M0 0 C-2 -7 -5 -12 -9 -14" /><path d="M0 0 C2 -7 5 -12 9 -14" />
            <path d="M0 0 C0 -6 -1 -12 -2 -17" /><path d="M0 0 C-5 -2 -10 1 -12 5" /><path d="M0 0 C5 -2 10 1 12 5" />
          </g>
          <circle r="2.2" fill="#e25b3f" />
        </g>
      </defs>
      <rect width={W} height={H} fill="url(#lp-sky)" />
      <rect width={W} height="70" fill="#0b1328" opacity=".55" />
      <Stars n={40} seed={5} y0={10} y1={200} color="#efe3c8" />

      {/* the sun, flat as a stamp, going down behind the hills */}
      <circle cx="800" cy="566" r="98" fill="#d2452f" />

      {/* a far mountain with snow, as printed */}
      <path d="M1040 640 L1300 330 L1340 352 L1372 326 L1640 640 Z" fill="#6f8ca6" stroke={INK} strokeWidth="3" strokeLinejoin="round" />
      <path d="M1236 406 L1300 330 L1340 352 L1372 326 L1420 384 L1388 376 L1362 398 L1334 378 L1300 404 L1270 392 Z" fill="#f3ecdc" stroke={INK} strokeWidth="2" strokeLinejoin="round" />

      {/* kasumi: the bands of mist, sliding slowly */}
      {kasumi.map(([x, y, w, h], i) => (
        <g key={i} className="a-bob" style={sv({ "--d": `${13 + i * 3}s`, "--bx": `${i % 2 ? -70 : 70}px`, "--by": "0px", "--dl": `${-i * 2}s` })}>
          <rect x={x} y={y} width={w} height={h} rx={h / 2} fill={i % 2 ? "#f3e7cf" : "#f6d6bd"} stroke={INK} strokeWidth="2" />
        </g>
      ))}

      <Flock y={250} color={INK} d={38} n={6} s={0.9} />
      <Flock y={180} color={INK} d={52} dl={-30} n={4} s={0.7} dir={1} />

      {/* hills in flat colour with an ink line */}
      <path d="M-20 640 C140 590 300 600 440 616 C560 630 640 596 760 604 C880 612 980 640 1100 620 C1240 598 1420 610 1620 630 V900 H-20 Z" fill="#9fb0a2" stroke={INK} strokeWidth="3" />
      <path d="M-20 676 C180 646 380 680 560 664 C700 652 780 670 860 676 C1000 686 1180 650 1360 660 C1480 668 1560 660 1620 664 V900 H-20 Z" fill="#62805d" stroke={INK} strokeWidth="3" />
      <path d="M-20 706 C220 690 480 716 760 704 C1040 692 1300 716 1620 700 V900 H-20 Z" fill="#2f4a36" stroke={INK} strokeWidth="3" />
      <path d="M782 704 C800 740 724 796 652 900 H984 C902 804 842 740 824 704 Z" fill="#e8d5ae" stroke={INK} strokeWidth="2.5" />
      <path d="M800 740 C790 780 760 830 740 900 M830 760 C850 800 880 850 900 900" stroke="#c9b48a" strokeWidth="2" fill="none" />

      {lilies.map((l, i) => (
        <g key={i} transform={`translate(${l.x.toFixed(1)} ${l.y.toFixed(1)}) rotate(${l.a.toFixed(1)}) scale(${l.s.toFixed(2)})`}>
          <use href="#lp-lily" className={i % 3 ? undefined : "a-sway"} style={i % 3 ? undefined : sv({ "--a": "6deg", "--d": `${l.d.toFixed(1)}s`, "--dl": `${l.dl.toFixed(1)}s` })} />
        </g>
      ))}

      {/* petals blown across the print */}
      {petals.map((p, i) => (
        <g key={i} transform={`translate(${p.x.toFixed(0)} 0)`}>
          <g className="a-fall" style={sv({ "--d": `${p.d.toFixed(1)}s`, "--dl": `${p.dl.toFixed(1)}s`, "--fx": `${p.fx.toFixed(0)}px` })}>
            <ellipse className="a-spin" style={sv({ "--d": `${p.sd.toFixed(1)}s` })} rx={5 * p.s} ry={2.6 * p.s} fill="#d2452f" stroke={INK} strokeWidth=".8" />
          </g>
        </g>
      ))}

      {/* the title slip and the seal, as on a print */}
      <g transform="translate(1458 70)">
        <rect width="58" height="236" fill="#f3e7cf" stroke={INK} strokeWidth="2" />
        <rect x="5" y="5" width="48" height="226" fill="none" stroke="#c8402f" strokeWidth="1.5" />
        <text x="29" y="24" fontSize="30" fill={INK} style={{ writingMode: "vertical-rl", fontFamily: "var(--mincho)" }}>提灯の道</text>
      </g>
      <g transform="translate(1470 800)">
        <rect width="44" height="44" rx="4" fill="#c8402f" />
        <text x="22" y="32" fontSize="26" textAnchor="middle" fill="#f3e7cf" style={{ fontFamily: "var(--mincho)" }}>夜</text>
      </g>
    </Bg>
  );
};

/* ── The Firefly Forest: four layers of spruce, each further one paler in the fog ── */
const pine = (x: number, base: number, h: number, w: number) => {
  let d = "";
  for (let k = 0; k < 4; k++) {
    const top = base - h + (h * k) / 4.6;
    const hw = (w / 2) * (0.45 + (0.55 * (k + 1)) / 4);
    d += `M${x.toFixed(0)} ${top.toFixed(0)} L${(x + hw).toFixed(0)} ${(top + h * 0.42).toFixed(0)} L${(x - hw).toFixed(0)} ${(top + h * 0.42).toFixed(0)} Z `;
  }
  return d + `M${(x - w * 0.05).toFixed(0)} ${(base - h * 0.2).toFixed(0)} h${(w * 0.1).toFixed(0)} V${base} h${(-w * 0.1).toFixed(0)} Z`;
};

export const FireflyForestBg = () => {
  const r = rng(17);
  const row = (n: number, base: number, h0: number, h1: number, w0: number, w1: number, gap?: [number, number]) =>
    Array.from({ length: n }, (_, i) => {
      let x = (i + 0.2 + r() * 0.6) * (W / n);
      if (gap && x > gap[0] && x < gap[1]) x = x < (gap[0] + gap[1]) / 2 ? gap[0] - r() * 60 : gap[1] + r() * 60;
      return { x, h: h0 + r() * (h1 - h0), w: w0 + r() * (w1 - w0), dl: -r() * 6 };
    });
  const far = row(26, 610, 170, 260, 70, 100);
  const mid = row(16, 660, 260, 360, 100, 140, [700, 900]);
  const near = row(9, 730, 380, 520, 160, 210, [560, 1040]);
  const flies = Array.from({ length: 46 }, () => ({ x: r() * W, y: 380 + r() * 480, d: 6 + r() * 8, dl: -r() * 10, w: 20 + r() * 40, b: 1.6 + r() * 2.4 }));
  const ferns = Array.from({ length: 14 }, (_, i) => ({ x: i < 7 ? i * 70 + r() * 30 : 1120 + (i - 7) * 70 + r() * 30, s: 0.8 + r() * 0.7, dl: -r() * 4 }));
  return (
    <Bg>
      <defs>
        <linearGradient id="ff-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#0b2427" /><stop offset=".45" stopColor="#285e5a" /><stop offset=".7" stopColor="#74ab9c" />
        </linearGradient>
        <radialGradient id="ff-toro"><stop offset="0" stopColor="#ffcf8a" stopOpacity=".6" /><stop offset="1" stopColor="#ffcf8a" stopOpacity="0" /></radialGradient>
      </defs>
      <rect width={W} height={H} fill="url(#ff-sky)" />
      <Stars n={50} seed={19} y0={0} y1={260} color="#dff3ea" />
      <circle cx="800" cy="196" r="230" fill="#e6f4ea" opacity=".06" />
      <circle cx="800" cy="196" r="150" fill="#e6f4ea" opacity=".1" />
      <circle cx="800" cy="196" r="86" fill="#e6f4ea" />

      <g fill="#3f7c73">{far.map((t, i) => <path key={i} d={pine(t.x, 610, t.h, t.w)} />)}</g>
      <g className="a-bob" style={sv({ "--d": "16s", "--bx": "90px", "--by": "0px" })}>
        <ellipse cx="420" cy="600" rx="520" ry="40" fill="#b5e0d2" opacity=".3" />
        <ellipse cx="1220" cy="616" rx="560" ry="44" fill="#b5e0d2" opacity=".26" />
      </g>
      <g fill="#22554f">{mid.map((t, i) => <path key={i} className="a-sway" style={sv({ "--a": "0.8deg", "--d": "7s", "--dl": `${t.dl.toFixed(1)}s` })} d={pine(t.x, 660, t.h, t.w)} />)}</g>

      {/* the torii at the end of the path, two stone lanterns, and a fox in the dark */}
      <g>
        <circle cx="800" cy="600" r="150" fill="url(#ff-toro)" opacity=".4" />
        <g fill="#b3202d">
          <rect x="752" y="520" width="11" height="150" /><rect x="837" y="520" width="11" height="150" />
          <rect x="740" y="544" width="120" height="8" />
          <path d="M720 516 Q800 526 880 516 L885 504 Q800 514 715 504 Z" />
        </g>
        <rect x="720" y="518" width="160" height="3" fill="#1a1716" opacity=".6" />
        {[690, 910].map((x, i) => (
          <g key={x} transform={`translate(${x} 676)`}>
            <circle className="a-pulse" style={sv({ "--d": "2.6s", "--dl": `${-i}s`, "--o0": ".55" })} cy="-30" r="40" fill="url(#ff-toro)" />
            <rect x="-4" y="-14" width="8" height="14" fill="#3b4a46" />
            <rect x="-11" y="-36" width="22" height="20" fill="#4a5a55" />
            <rect x="-6" y="-31" width="12" height="9" fill="#ffcf8a" />
            <path d="M-16 -36 L0 -46 L16 -36 Z" fill="#3b4a46" />
          </g>
        ))}
      </g>

      <rect y="690" width={W} height="210" fill="#0b2120" />
      <g fill="#10302d">{near.map((t, i) => <path key={i} className="a-sway" style={sv({ "--a": "0.6deg", "--d": "9s", "--dl": `${t.dl.toFixed(1)}s` })} d={pine(t.x, 730, t.h, t.w)} />)}</g>
      <path d="M760 700 C770 760 700 820 640 900 H960 C900 820 830 760 840 700 Z" fill="#163a35" opacity=".8" />
      <g className="a-bob" style={sv({ "--d": "22s", "--bx": "-120px", "--by": "0px" })}>
        <ellipse cx="800" cy="740" rx="760" ry="46" fill="#b5e0d2" opacity=".14" />
      </g>

      {/* eyes: a fox by the gate and an owl high up, blinking now and then */}
      {[[868, 704, 0], [1316, 452, -2.4], [300, 520, -4.1]].map(([x, y, dl], i) => (
        <g key={i} transform={`translate(${x} ${y})`}>
          <g className="a-wink" style={sv({ "--dl": `${dl}s`, "--d": `${5 + i * 1.7}s` })}>
            <ellipse cx="-7" rx="3.4" ry="3" fill="#ffd36b" /><ellipse cx="7" rx="3.4" ry="3" fill="#ffd36b" />
          </g>
        </g>
      ))}

      {/* fireflies of the forest itself (the songs are the brighter ones) */}
      {flies.map((f, i) => (
        <g key={i} transform={`translate(${f.x.toFixed(0)} ${f.y.toFixed(0)})`}>
          <g className="a-wander" style={sv({ "--d": `${f.d.toFixed(1)}s`, "--dl": `${f.dl.toFixed(1)}s`, "--w": f.w.toFixed(0) })}>
            <circle r="8" fill="#d8ff8a" opacity=".14" />
            <circle className="a-pulse" style={sv({ "--d": `${f.b.toFixed(1)}s`, "--o0": ".1" })} r="2" fill="#f2ffbf" />
          </g>
        </g>
      ))}

      <g fill="#041110">
        {[40, 250, 1370, 1570].map((x, i) => <path key={x} d={pine(x, 940, 980, i % 3 ? 300 : 360)} />)}
      </g>
      {ferns.map((f, i) => (
        <g key={i} transform={`translate(${f.x.toFixed(0)} 900) scale(${f.s.toFixed(2)})`}>
          <path className="a-sway" style={sv({ "--a": "5deg", "--d": "4s", "--dl": `${f.dl.toFixed(1)}s` })} d="M0 0 C-10 -40 -40 -60 -70 -64 C-40 -50 -20 -30 -6 0 Z M0 0 C6 -50 30 -80 60 -90 C34 -70 16 -40 8 0 Z M2 0 C0 -40 -6 -70 -2 -100 C6 -70 8 -40 6 0 Z" fill="#06191a" />
        </g>
      ))}
      <path d="M0 0 H1600 V70 C1300 120 1100 50 800 96 C520 140 300 60 0 110 Z" fill="#041110" />
    </Bg>
  );
};

/* ── The Lake of Stars: an engraved star chart in gold on navy, turning; the lake keeps a copy ── */
export const StarLakeBg = () => {
  const r = rng(29);
  const GOLD = "#d3b56d";
  const ripples = Array.from({ length: 20 }, (_, i) => {
    const y = 570 + (i / 19) ** 1.5 * 320;
    const a = 30 + r() * 90; const b = 20 + r() * 60; const c = 60 + r() * 140;
    return { y, dash: `${a.toFixed(0)} ${b.toFixed(0)} ${c.toFixed(0)} ${(b * 1.6).toFixed(0)}`, d: 16 + r() * 18, dir: i % 2 ? 1 : -1, o: 0.14 + (i / 19) * 0.22 };
  });
  const shimmer = Array.from({ length: 24 }, (_, i) => ({ y: 572 + i * 13 + r() * 5, w: 20 + r() * 70 * (1 - i / 32), dx: r() * 20 - 10, d: (-r() * 3).toFixed(2) }));
  const bright = Array.from({ length: 14 }, () => ({ x: r() * W, y: 30 + r() * 480, s: 4 + r() * 5, d: -r() * 4 }));
  return (
    <Bg>
      <defs>
        <clipPath id="sl-sky"><rect width={W} height="560" /></clipPath>
        <clipPath id="sl-moon"><circle cx="860" cy="170" r="48" /></clipPath>
      </defs>
      <rect width={W} height={H} fill="#091231" />

      <g clipPath="url(#sl-sky)">
        <g className="a-turn" style={sv({ "--ox": "800px", "--oy": "300px", "--d": "260s" })} stroke={GOLD} fill="none">
          {[110, 200, 300, 420, 560, 720, 880].map((rad) => <circle key={rad} cx="800" cy="300" r={rad} strokeWidth="1" opacity=".3" />)}
          {Array.from({ length: 24 }, (_, i) => {
            const a = (i / 24) * Math.PI * 2;
            return <path key={i} d={`M${800 + Math.cos(a) * 110} ${300 + Math.sin(a) * 110} L${800 + Math.cos(a) * 900} ${300 + Math.sin(a) * 900}`} strokeWidth=".8" opacity=".22" />;
          })}
          {Array.from({ length: 72 }, (_, i) => {
            const a = (i / 72) * Math.PI * 2;
            return <path key={i} d={`M${800 + Math.cos(a) * 420} ${300 + Math.sin(a) * 420} L${800 + Math.cos(a) * (i % 6 ? 430 : 444)} ${300 + Math.sin(a) * (i % 6 ? 430 : 444)}`} strokeWidth="1.2" opacity=".5" />;
          })}
          <circle cx="880" cy="360" r="380" strokeWidth="1" strokeDasharray="2 7" opacity=".4" />
        </g>
        <Stars n={150} seed={31} y0={0} y1={540} color={GOLD} />
        <Stars n={50} seed={37} y0={0} y1={540} color="#f4f0e2" />
        {bright.map((b, i) => (
          <g key={i} transform={`translate(${b.x.toFixed(0)} ${b.y.toFixed(0)})`}>
            <g className="twinkle" style={{ animationDelay: `${b.d.toFixed(2)}s` }} stroke={GOLD} strokeWidth="1.2">
              <path d={`M0 ${-b.s * 2} V${b.s * 2} M${-b.s * 2} 0 H${b.s * 2}`} />
              <circle r={b.s * 0.4} fill={GOLD} />
            </g>
          </g>
        ))}
        {/* shooting stars */}
        {[[980, 40, 700, 150, 0], [420, 70, 120, 200, -5], [1500, 90, 1180, 230, -9]].map(([x1, y1, x2, y2, dl], i) => (
          <path key={i} className="a-shoot" style={sv({ "--d": "13s", "--dl": `${dl}s`, "--from": "120px", "--to": "-360px" })} d={`M${x1} ${y1} L${x2} ${y2}`} stroke="#fff6d8" strokeWidth="2" strokeLinecap="round" strokeDasharray="120 600" />
        ))}
      </g>

      {/* the moon, engraved: hatching on the lit side */}
      <circle cx="860" cy="170" r="74" fill="none" stroke={GOLD} strokeWidth="1" opacity=".3" />
      <circle cx="860" cy="170" r="96" fill="none" stroke={GOLD} strokeWidth="1" opacity=".18" strokeDasharray="3 6" />
      <g clipPath="url(#sl-moon)" stroke={GOLD} strokeWidth="1.4">
        {Array.from({ length: 26 }, (_, i) => <path key={i} d={`M${790 + i * 6} 100 L${830 + i * 6} 240`} />)}
        <circle cx="838" cy="164" r="46" fill="#091231" stroke="none" />
      </g>
      <circle cx="860" cy="170" r="48" fill="none" stroke={GOLD} strokeWidth="2" />

      {/* the far shore drawn in line, and the house that keeps a light on */}
      <path d="M0 560 L140 512 L260 540 L380 490 L520 548 L640 522 L760 556 L920 514 L1080 550 L1200 502 L1360 545 L1600 506 V560 Z" fill="#091231" stroke={GOLD} strokeWidth="1.5" strokeLinejoin="round" />
      <g stroke={GOLD} strokeWidth="1" opacity=".5" fill="none">
        <path d="M100 540 L140 524 L200 534 M330 520 L380 504 L450 526 M1140 530 L1200 516 L1280 532 M1450 530 L1520 516" />
      </g>
      <g transform="translate(660 548)" stroke={GOLD} strokeWidth="1.6" fill="#091231">
        <path d="M-22 0 V-24 H22 V0 M-28 -24 L0 -44 L28 -24 Z" />
        <rect className="a-pulse" style={sv({ "--d": "3.4s", "--o0": ".6" })} x="-8" y="-18" width="10" height="9" fill="#f4a95c" stroke="none" />
      </g>

      <path d="M0 560 H1600" stroke={GOLD} strokeWidth="1" opacity=".6" />
      <g stroke={GOLD} fill="none" strokeWidth="1">
        {ripples.map((p, i) => (
          <path key={i} className="a-dash" style={sv({ "--d": `${p.d.toFixed(0)}s`, "--do": `${p.dir * 600}px` })} d={`M-40 ${p.y.toFixed(1)} H1640`} strokeDasharray={p.dash} opacity={p.o.toFixed(2)} />
        ))}
      </g>
      <path d="M660 566 h-5 v16 h5 z" fill="#f4a95c" opacity=".4" />
      {shimmer.map((s, i) => (
        <rect key={i} className="shimmer" x={860 - s.w / 2 + s.dx} y={s.y} width={s.w} height="2.5" fill={GOLD} opacity=".4" style={{ animationDelay: `${s.d}s` }} />
      ))}

      {/* rings where a fish just jumped */}
      <g transform="translate(720 700)" stroke={GOLD} fill="none" strokeWidth="1.4">
        {[0, -1.2, -2.4].map((dl) => <ellipse key={dl} className="a-ripple" style={sv({ "--d": "7s", "--dl": `${dl}s` })} rx="30" ry="6" />)}
      </g>

      <g transform="translate(1000 712)">
        <g className="a-rock" style={sv({ "--d": "4.6s" })}>
          <path d="M-60 0 Q0 20 60 0 L50 16 Q0 28 -50 16 Z" fill="#091231" stroke={GOLD} strokeWidth="1.6" />
          <path d="M0 0 V-34" stroke={GOLD} strokeWidth="1.6" />
          <circle className="a-pulse" style={sv({ "--d": "1.8s", "--o0": ".7" })} cy="-36" r="4" fill="#ffcf8a" />
          <circle cy="-36" r="16" fill="#ffcf8a" opacity=".15" />
        </g>
      </g>

      <g stroke={GOLD} strokeWidth="1.6" strokeLinecap="round" fill="none" opacity=".7">
        {Array.from({ length: 16 }, (_, i) => {
          const x = i < 8 ? 20 + i * 22 : 1440 + (i - 8) * 20;
          const h = 90 + ((i * 37) % 70);
          return <path key={i} className="a-sway" style={sv({ "--a": "3deg", "--d": `${3 + (i % 4)}s`, "--dl": `${-i * 0.4}s` })} d={`M${x} 900 Q${x + 6} ${900 - h / 2} ${x + (i % 2 ? 12 : -8)} ${900 - h}`} />;
        })}
      </g>
    </Bg>
  );
};

/* ── The Sea of Clouds: a cel-shaded sunset, clouds in three flat tones, a whale crossing the sky ── */
type Puff = [number, number, number];
const TOWER: Puff[] = [[0, 0, 90], [-90, 30, 70], [90, 25, 75], [-160, 64, 50], [160, 60, 55], [-40, -70, 70], [50, -60, 62], [0, -130, 55], [0, 64, 80], [-80, 74, 60], [90, 74, 60]];
const Cumulus = ({ id, x, y, s, puffs, tones }: { id: string; x: number; y: number; s: number; puffs: Puff[]; tones: [string, string, string] }) => {
  const shape = (oy: number) => puffs.map(([dx, dy, rr], i) => <circle key={i} cx={dx} cy={dy + oy} r={rr} />);
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <clipPath id={id}>{shape(0)}</clipPath>
      <g fill={tones[0]}>{shape(0)}</g>
      <g clipPath={`url(#${id})`}>
        <g fill={tones[1]}>{shape(20)}</g>
        <g fill={tones[2]}>{shape(52)}</g>
      </g>
    </g>
  );
};

export const CloudSeaBg = () => {
  const r = rng(43);
  const sea = (y: number, n: number, rad: number): Puff[] => Array.from({ length: n }, (_, i) => [(i / (n - 1)) * (W + 300) - 150 + r() * 40, r() * 26, rad * (0.7 + r() * 0.6)]);
  const seaBase = (y: number, n: number, rad: number): Puff[] => [...sea(y, n, rad), ...Array.from({ length: 20 }, (_, i): Puff => [i * 100 - 150, 140, 120])];
  const lanterns = Array.from({ length: 16 }, () => ({ x: r() * W, y: 640 + r() * 100, d: 18 + r() * 14, dl: -r() * 30, s: 0.6 + r() * 0.6 }));
  return (
    <Bg>
      <defs>
        <linearGradient id="cs-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#222b63" /><stop offset=".34" stopColor="#5f52a0" /><stop offset=".58" stopColor="#df8aa6" /><stop offset=".76" stopColor="#ffc994" />
        </linearGradient>
      </defs>
      <rect width={W} height={H} fill="url(#cs-sky)" />
      <Stars n={70} seed={47} y0={0} y1={300} />
      <circle cx="800" cy="650" r="200" fill="#ffe2b8" opacity=".25" />
      <circle cx="800" cy="650" r="124" fill="#fff3d1" />

      <g className="a-bob" style={sv({ "--d": "40s", "--bx": "-90px", "--by": "0px" })}>
        <Cumulus id="cs-c1" x={250} y={520} s={1.5} puffs={TOWER} tones={["#ffe9da", "#e9a9bb", "#9a78b0"]} />
        <Cumulus id="cs-c2" x={1360} y={470} s={1.25} puffs={TOWER} tones={["#ffe9da", "#e9a9bb", "#9a78b0"]} />
      </g>

      {/* the whale swims the whole way across, west, and comes round again */}
      <g className="a-fly" style={sv({ "--x0": "1400px", "--x1": "-1500px", "--d": "64s", "--dl": "-34s" })}>
        <g className="whale-size">
          <g className="a-bob" style={sv({ "--d": "5s", "--by": "18px" })}>
            <path d="M540 330 C580 255 750 222 900 244 C1015 260 1085 298 1125 288 C1150 282 1168 262 1180 250 C1172 274 1170 290 1180 314 C1160 312 1146 314 1130 322 C1064 364 962 404 818 404 C680 404 574 384 540 330 Z" fill="#3a3474" />
            <path d="M560 300 C620 252 760 236 880 250" stroke="#ffd7c4" strokeWidth="4" fill="none" opacity=".6" />
            <path d="M560 346 C640 380 760 394 880 388 M580 362 C660 392 760 402 860 398" stroke="#e2c8f0" strokeWidth="3" fill="none" opacity=".5" />
            <path d="M760 392 C770 430 742 456 712 462 C730 438 732 414 728 396 Z" fill="#2c2760" />
            <g transform="translate(1176 282)">
              <path className="a-sway" style={sv({ "--a": "9deg", "--d": "1.8s", "--o": "0% 50%" })} d="M0 -32 C24 -46 50 -42 62 -30 C44 -24 30 -10 22 0 C30 10 44 24 62 30 C50 42 24 46 0 32 Z" fill="#3a3474" />
            </g>
            <circle cx="608" cy="318" r="4.5" fill="#fff3d1" />
            {Array.from({ length: 14 }, (_, i) => (
              <circle key={i} className="twinkle" cx={1240 + i * 18 + r() * 10} cy={280 + r() * 50 - i * 2} r={1 + r() * 1.8} fill="#fff3d1" opacity={0.8 - i * 0.05} style={{ animationDelay: `${-i * 0.3}s` }} />
            ))}
          </g>
        </g>
      </g>

      {/* a floating island with a house, a tree and a waterfall into the clouds */}
      <g transform="translate(1180 330)">
        <g className="a-bob" style={sv({ "--d": "6s", "--by": "10px" })}>
          <path d="M-120 0 Q0 -20 120 0 L50 90 L10 150 L-20 90 Z" fill="#4a3a78" />
          <path d="M-130 0 Q0 -30 130 0 Q0 16 -130 0 Z" fill="#7fb38f" />
          <path d="M-130 0 Q0 -30 130 0 Q0 -14 -130 0 Z" fill="#b6deaa" />
          <rect x="-40" y="-32" width="34" height="28" fill="#2e2552" />
          <path d="M-46 -30 L-23 -50 L0 -30 Z" fill="#d9475a" />
          <rect x="-30" y="-24" width="10" height="9" fill="#ffd28a" />
          <path d="M60 -4 V-40" stroke="#2e2552" strokeWidth="4" />
          <circle cx="60" cy="-50" r="20" fill="#5f9a6e" /><circle cx="46" cy="-40" r="13" fill="#5f9a6e" /><circle cx="64" cy="-58" r="10" fill="#8cc58f" />
          <path className="a-dash" style={sv({ "--d": "1.2s", "--do": "-40px" })} d="M96 6 C100 60 104 140 104 260" stroke="#f4f0ff" strokeWidth="6" strokeDasharray="14 10" fill="none" opacity=".75" />
        </g>
      </g>

      <Flock y={200} color="#2a2350" d={44} n={5} s={0.8} />

      {/* tiny lanterns far away, rising out of the clouds */}
      {lanterns.map((l, i) => (
        <g key={i} transform={`translate(${l.x.toFixed(0)} ${l.y.toFixed(0)})`}>
          <g className="a-rise" style={sv({ "--d": `${l.d.toFixed(0)}s`, "--dl": `${l.dl.toFixed(0)}s`, "--ry": "-520px", "--rx": "40px", "--s0": "1", "--s1": ".4", "--o": ".9" })}>
            <rect x={-3 * l.s} y={-4 * l.s} width={6 * l.s} height={8 * l.s} fill="#ffb066" />
            <circle r={10 * l.s} fill="#ffb066" opacity=".25" />
          </g>
        </g>
      ))}

      {[
        { y: 700, n: 22, rad: 70, tones: ["#ffd9cf", "#c992b8", "#7e64a3"] as [string, string, string], d: 30, bx: -80 },
        { y: 770, n: 20, rad: 80, tones: ["#f6c8d0", "#b384b2", "#6a5596"] as [string, string, string], d: 22, bx: 100 },
        { y: 850, n: 18, rad: 90, tones: ["#e9b8cd", "#9d74a8", "#5a478a"] as [string, string, string], d: 16, bx: -120 },
      ].map((b, i) => (
        <g key={i} className="a-bob" style={sv({ "--d": `${b.d}s`, "--bx": `${b.bx}px`, "--by": "0px" })}>
          <Cumulus id={`cs-sea${i}`} x={0} y={b.y} s={1} puffs={seaBase(b.y, b.n, b.rad)} tones={b.tones} />
        </g>
      ))}
    </Bg>
  );
};

/* ── The Lighthouse: a two-ink risograph, blue and fluorescent pink, halftone dots on paper ── */
const BLUE = "#2f4fb8";
const PINK = "#ff5c8a";
const PAPER = "#f1e8d6";
const dots = (id: string, color: string, rad: number, cell = 9) => (
  <pattern key={id} id={id} width={cell} height={cell} patternUnits="userSpaceOnUse" patternTransform="rotate(28)">
    <circle cx={cell / 2} cy={cell / 2} r={rad} fill={color} />
  </pattern>
);

export const LighthouseBg = () => {
  const ink = { mixBlendMode: "multiply" } as const;
  const wave = (y: number, amp: number) => `M-200 ${y} ` + Array.from({ length: 21 }, () => `q25 ${-amp} 50 0 t50 0`).join(" ");
  return (
    <Bg>
      <defs>
        {[0.9, 1.6, 2.4, 3.2, 4.1].map((rad, i) => dots(`lh-p${i}`, PINK, rad))}
        {[1, 1.8, 2.7, 3.6, 4.6].map((rad, i) => dots(`lh-b${i}`, BLUE, rad, 8))}
        <clipPath id="lh-tower"><path d="M828 600 L838 372 H882 L892 600 Z" /></clipPath>
      </defs>
      <rect width={W} height={H} fill={PAPER} />

      {/* sky: pink rising to the horizon, blue night pressing down from the top */}
      <g style={ink}>
        {[[0, 140, 4], [140, 260, 3], [260, 380, 2], [380, 480, 3], [480, 560, 4]].map(([y0, y1, k]) => <rect key={y0} y={y0} width={W} height={y1 - y0} fill={`url(#lh-p${k})`} />)}
      </g>
      <g style={ink}>
        <rect width={W} height="380" fill={BLUE} />
        {[[380, 430, 3], [430, 480, 2], [480, 530, 1], [530, 560, 0]].map(([y0, y1, k]) => <rect key={y0} y={y0} width={W} height={y1 - y0} fill={`url(#lh-b${k})`} />)}
      </g>
      {/* stars and the moon knocked out of the ink, so they are paper */}
      <g fill={PAPER}>
        {Array.from({ length: 60 }, (_, i) => {
          const rr = rng(53 + i);
          return <circle key={i} className={i % 4 ? undefined : "twinkle"} cx={rr() * W} cy={rr() * 360} r={1 + rr() * 1.6} style={i % 4 ? undefined : { animationDelay: `${-i * 0.37}s` }} />;
        })}
        <circle cx="890" cy="150" r="46" />
      </g>
      <circle cx="894" cy="154" r="46" fill="none" stroke={PINK} strokeWidth="3" style={ink} />

      {/* clouds of pink ink sliding past */}
      <g style={ink}>
        {[[200, 300, 1], [1100, 250, 1.3], [620, 420, 0.8]].map(([x, y, s], i) => (
          <g key={i} transform={`translate(${x} ${y}) scale(${s})`}>
            <g className="a-bob" style={sv({ "--d": `${24 + i * 8}s`, "--bx": `${i % 2 ? -110 : 110}px`, "--by": "0px" })}>
              <path d="M-120 20 C-130 -10 -90 -26 -64 -12 C-50 -44 10 -50 30 -16 C56 -36 110 -20 104 14 C130 18 124 40 100 40 H-110 C-140 40 -140 20 -120 20 Z" fill={PINK} />
            </g>
          </g>
        ))}
      </g>

      {/* the beam turns; pink printed over blue goes purple */}
      <g className="beam" style={ink}>
        <path d="M860 340 L-400 200 L-400 480 Z" fill={PINK} opacity=".55" />
        <path d="M860 340 L2300 480 L2300 200 Z" fill={PINK} opacity=".3" />
      </g>

      {/* sea: blue dots getting heavier toward you */}
      <g style={ink}>
        {[[560, 610, 0], [610, 680, 1], [680, 760, 2], [760, 840, 3], [840, 900, 4]].map(([y0, y1, k]) => <rect key={y0} y={y0} width={W} height={y1 - y0} fill={`url(#lh-b${k})`} />)}
        <rect y="560" width={W} height="40" fill="url(#lh-p1)" />
      </g>
      <g stroke={BLUE} fill="none" strokeLinecap="round">
        {[[600, 4, 1.5, 7], [650, 6, 2, 5], [720, 8, 2.5, 4], [800, 10, 3, 3]].map(([y, amp, w, d], i) => (
          <path key={y} className="a-scroll" style={sv({ "--d": `${d}s`, "--dx": i % 2 ? "100px" : "-100px" })} d={wave(y, amp)} strokeWidth={w} />
        ))}
      </g>

      {/* the tower on its rocks, printed a little off register */}
      <path d="M700 706 L726 660 L758 646 L782 610 L820 598 L900 596 L932 614 L960 606 L986 642 L1012 664 L1032 706 Z" fill={BLUE} />
      <path d="M758 646 L782 610 L800 640 Z M932 614 L960 606 L950 640 Z" fill="url(#lh-p3)" style={ink} />
      <path d="M828 600 L838 372 H882 L892 600 Z" fill={PAPER} stroke={BLUE} strokeWidth="3" />
      <g clipPath="url(#lh-tower)" fill={BLUE}>
        <rect x="820" y="540" width="80" height="30" /><rect x="820" y="470" width="80" height="30" /><rect x="820" y="400" width="80" height="28" />
      </g>
      <path d="M831 603 L841 375 H885 L895 603" fill="none" stroke={PINK} strokeWidth="2" style={ink} />
      <rect x="826" y="362" width="68" height="10" fill={BLUE} />
      <rect className="a-pulse" style={sv({ "--d": "1.5s", "--o0": ".6" })} x="838" y="326" width="44" height="36" fill={PINK} />
      <path d="M842 326 V362 M860 326 V362 M878 326 V362" stroke={BLUE} strokeWidth="2" />
      <path d="M832 326 L860 300 L888 326 Z" fill={BLUE} />

      {/* foam where the waves hit the rocks */}
      {[[720, 700], [1010, 700], [860, 712]].map(([x, y], i) => (
        <g key={i} transform={`translate(${x} ${y})`}>
          <ellipse className="a-ripple" style={sv({ "--d": "3.2s", "--dl": `${-i * 1.1}s` })} rx="26" ry="7" fill={PAPER} />
        </g>
      ))}

      <Flock y={300} color={BLUE} d={34} n={4} s={1} />
      <Flock y={460} color={BLUE} d={48} dl={-20} n={3} s={0.8} dir={1} />

      {/* the shore, and home with the light still on */}
      <path d="M-20 820 C120 760 300 760 520 800 C600 815 640 850 660 900 H-20 Z" fill={BLUE} />
      <g transform="translate(250 778)">
        <circle className="a-pulse" style={sv({ "--d": "3s", "--o0": ".5", ...ink })} cy="-20" r="70" fill="url(#lh-p2)" />
        <rect x="-26" y="-34" width="52" height="34" fill={BLUE} />
        <path d="M-34 -34 L0 -60 L34 -34 Z" fill={BLUE} />
        <rect x="-15" y="-26" width="12" height="11" fill={PINK} />
        <rect x="6" y="-22" width="10" height="22" fill={PAPER} />
        <path d="M16 -58 V-44" stroke={BLUE} strokeWidth="6" />
      </g>
    </Bg>
  );
};
