/* Eight more universes, each drawn its own way: synthwave neon, a flat gouache winter yard,
   a low-poly night road, 8-bit pixels, cut paper in daylight, a linocut on cream paper,
   art deco gold and watercolour under water. */
import { Bg, Flock, H, Stars, W, rng, sv } from "./kit";

/* ── Neon Avenue: synthwave sun, a grid floor running at you, a skyline in neon tubes, rain ── */
export const NeonCityBg = () => {
  const r = rng(71);
  const towers = Array.from({ length: 18 }, (_, i) => {
    const w = 50 + r() * 70;
    const x = i * 92 - 20 + r() * 30;
    const h = 120 + r() * 230 * (Math.abs(x - 800) < 300 ? 0.6 : 1);
    return { x, w, h };
  });
  const rain = Array.from({ length: 90 }, () => ({ x: r() * (W + 300), y: r() * H, d: 0.7 + r() * 0.6, dl: -r() * 2, c: r() > 0.5 ? "#05d9e8" : "#ff7ad9" }));
  const signs: [number, number, string, string][] = [[773, 292, "夜", "#ff2a6d"], [905, 350, "24h", "#05d9e8"], [300, 460, "OPEN", "#ffe36e"], [1120, 250, "ラーメン", "#ff7ad9"]];
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
        <clipPath id="nc-floor"><rect y="600" width={W} height="300" /></clipPath>
      </defs>
      <rect width={W} height={H} fill="url(#nc-sky)" />
      <Stars n={60} seed={73} y0={0} y1={380} color="#f9d2ff" />
      {/* a blimp with a screen drifts over the city */}
      <g className="a-fly" style={sv({ "--x0": "1800px", "--x1": "-400px", "--d": "70s", "--dl": "-25s" })}>
        <ellipse cx="0" cy="150" rx="110" ry="32" fill="#1a0a2a" stroke="#b967ff" strokeWidth="2" />
        <rect className="a-flicker" style={sv({ "--d": "3s" })} x="-50" y="136" width="100" height="28" fill="#ff2a6d" opacity=".8" />
        <circle className="a-blink" style={sv({ "--d": "1.2s" })} cx="-110" cy="150" r="4" fill="#05d9e8" />
      </g>
      <g clipPath="url(#nc-sunclip)">
        <circle className="a-pulse" style={sv({ "--d": "4s", "--o0": ".85" })} cx="800" cy="520" r="210" fill="url(#nc-sun)" />
        {[430, 462, 490, 514, 535, 553, 569, 583].map((y, i) => (
          <g key={y} className="a-bob" style={sv({ "--d": "3s", "--by": "8px", "--dl": `${-i * 0.2}s` })}>
            <rect x="560" y={y} width="480" height={3 + i * 1.6} fill="#2a0b44" />
          </g>
        ))}
      </g>
      <g fill="#0c0316" stroke="#05d9e8" strokeWidth="2" filter="url(#nc-glow)">
        {towers.map((t, i) => (
          <g key={i}>
            <rect x={t.x} y={600 - t.h} width={t.w} height={t.h} stroke={i % 3 ? "#05d9e8" : "#ff2a6d"} />
            {i % 4 === 0 && <path d={`M${t.x + t.w / 2} ${600 - t.h} V${560 - t.h}`} stroke="#ff2a6d" />}
          </g>
        ))}
      </g>
      {/* windows in the towers going on and off */}
      {towers.map((t, i) => Array.from({ length: 6 }, (_, j) => {
        const cols = Math.max(2, Math.floor(t.w / 18));
        const x = t.x + 8 + (j % cols) * ((t.w - 16) / cols);
        const y = 600 - t.h + 16 + Math.floor(j / cols) * 22 + r() * 40;
        return <rect key={`${i}-${j}`} className={j % 2 ? "a-blink" : undefined} style={j % 2 ? sv({ "--d": `${4 + r() * 9}s`, "--dl": `${-r() * 9}s` }) : undefined} x={x} y={y} width="7" height="9" fill={i % 2 ? "#ffe36e" : "#ff7ad9"} opacity=".7" />;
      }))}
      {signs.map(([x, y, text, c], i) => (
        <g key={text} className="a-flicker" style={sv({ "--d": `${3 + i * 1.3}s`, "--dl": `${-i}s` })} filter="url(#nc-glow)">
          {text.length > 3
            ? <text x={x} y={y} fill="none" stroke={c} strokeWidth="1.6" fontSize="30" style={{ writingMode: text === "ラーメン" ? "vertical-rl" : undefined, fontFamily: "var(--mono)" }}>{text}</text>
            : <text x={x} y={y} fill="none" stroke={c} strokeWidth="1.8" fontSize={text === "夜" ? 54 : 30} style={{ fontFamily: "var(--mono)" }}>{text}</text>}
        </g>
      ))}

      <rect y="600" width={W} height="300" fill="#0c0316" />
      {/* the grid floor: lines come at you from the horizon */}
      <g clipPath="url(#nc-floor)" stroke="#ff2a6d" strokeWidth="1.6" filter="url(#nc-glow)">
        {Array.from({ length: 21 }, (_, i) => { const x = (i - 10) * 260; return <path key={`v${i}`} d={`M800 600 L${800 + x} 900`} opacity=".7" />; })}
        {Array.from({ length: 8 }, (_, i) => (
          <path key={`h${i}`} className="a-grid" style={sv({ "--d": "4s", "--dl": `${-i * 0.5}s` })} d="M0 600 H1600" />
        ))}
      </g>
      <path d="M0 600 H1600" stroke="#ff7ad9" strokeWidth="3" filter="url(#nc-glow)" />
      {/* rain in the neon */}
      {rain.map((d, i) => (
        <g key={i} transform={`translate(${d.x.toFixed(0)} ${d.y.toFixed(0)})`}>
          <path className="a-fall" style={sv({ "--d": `${d.d.toFixed(2)}s`, "--dl": `${d.dl.toFixed(2)}s`, "--y0": "-900px", "--y1": "300px", "--fx": "-140px" })} d="M0 0 l-4 22" stroke={d.c} strokeWidth="1.2" opacity=".45" />
        </g>
      ))}
    </Bg>
  );
};

/* ── Panel Blocks: flat gouache, no gradients. A winter yard, snow in three layers, a man walking a dog ── */
export const PanelBlocksBg = () => {
  const r = rng(83);
  const far = Array.from({ length: 9 }, (_, i) => ({ x: i * 190 - 40 + r() * 40, w: 150 + r() * 40, h: 230 + r() * 90 }));
  const snow = (n: number, s0: number, s1: number) => Array.from({ length: n }, () => ({ x: r() * W, y: r() * H, s: s0 + r() * (s1 - s0) }));
  const layers = [
    { flakes: snow(70, 1, 2), d: 26, o: 0.5 },
    { flakes: snow(50, 2, 3.5), d: 16, o: 0.75 },
    { flakes: snow(26, 3.5, 6), d: 9, o: 0.9 },
  ];
  return (
    <Bg>
      <rect width={W} height={H} fill="#2b3760" />
      <rect y="380" width={W} height="200" fill="#36426c" />
      <rect y="520" width={W} height="240" fill="#434d78" />
      <circle cx="1080" cy="170" r="54" fill="#f1e6c4" />
      <circle cx="1064" cy="158" r="9" fill="#ddd0aa" /><circle cx="1094" cy="186" r="6" fill="#ddd0aa" />
      {far.map((b, i) => (
        <g key={i}>
          <rect x={b.x} y={760 - b.h} width={b.w} height={b.h} fill={i % 2 ? "#232c4c" : "#283255"} />
          {Array.from({ length: 30 }, (_, j) => {
            const col = j % 5; const row = Math.floor(j / 5);
            const lit = r() > 0.72;
            const live = lit && r() > 0.5;
            return <rect key={j} className={live ? "a-blink" : undefined} style={live ? sv({ "--d": `${6 + r() * 14}s`, "--dl": `${-r() * 14}s` }) : undefined}
              x={b.x + 14 + (col * (b.w - 28)) / 5} y={760 - b.h + 18 + row * 30} width="12" height="14" fill={lit ? "#e8b04a" : "#1a2140"} />;
          })}
        </g>
      ))}

      {/* the boiler house chimney, red and white, smoking */}
      <g>
        <path d="M884 740 L892 330 H916 L924 740 Z" fill="#e9e4da" />
        {[350, 430, 510, 590, 670].map((y) => <path key={y} d={`M${892 - (y - 330) * 0.02} ${y} H${916 + (y - 330) * 0.02} V${y + 40} H${892 - (y + 40 - 330) * 0.02} Z`} fill="#c2453a" />)}
        {Array.from({ length: 6 }, (_, i) => (
          <g key={i} transform="translate(904 320)">
            <circle className="a-rise" style={sv({ "--d": "9s", "--dl": `${-i * 1.5}s`, "--rx": "160px", "--ry": "-260px", "--s0": ".4", "--s1": "2.2", "--o": ".55" })} r="22" fill="#8790b0" />
          </g>
        ))}
      </g>

      <rect y="740" width={W} height="160" fill="#d6dfec" />
      <path d="M0 740 C300 728 500 750 800 738 C1100 726 1300 750 1600 736 V760 H0 Z" fill="#e9eef6" />
      <path d="M0 812 C400 800 700 830 1100 812 C1300 804 1500 816 1600 810 V836 H0 Z" fill="#b9c6dc" />

      {/* birches, white with black marks */}
      {[[230, 420], [330, 470], [1330, 430]].map(([x, top], i) => (
        <g key={i}>
          <rect x={x} y={top} width="16" height={800 - top} fill="#ece8de" />
          {Array.from({ length: 6 }, (_, j) => <rect key={j} x={x + (j % 2 ? 6 : 0)} y={top + 40 + j * 52} width="10" height="4" fill="#20222c" />)}
          <path className="a-sway" style={sv({ "--a": "2deg", "--d": "5s", "--dl": `${-i}s` })} d={`M${x + 8} ${top + 10} C${x - 40} ${top - 40} ${x - 70} ${top - 30} ${x - 90} ${top - 70} M${x + 8} ${top + 30} C${x + 50} ${top - 10} ${x + 80} ${top - 20} ${x + 100} ${top - 60} M${x + 8} ${top} V${top - 90}`} stroke="#20222c" strokeWidth="3" fill="none" />
        </g>
      ))}

      {/* a slide and a swing that someone just left */}
      <g stroke="#2b3760" strokeWidth="5" fill="none" strokeLinecap="round">
        <path d="M560 800 V740 H600 L660 800" /><path d="M560 760 H600" />
        <path d="M980 800 L1010 720 L1040 800 M1100 800 L1070 720 L1040 800 M1010 720 H1070" />
      </g>
      <g transform="translate(1040 720)">
        <path className="a-sway" style={sv({ "--a": "9deg", "--d": "2.2s", "--o": "50% 0%" })} d="M0 0 V50 M-12 50 H12" stroke="#2b3760" strokeWidth="4" fill="none" />
      </g>

      {/* the lamp, buzzing */}
      <g>
        <path d="M800 900 V600" stroke="#20222c" strokeWidth="6" />
        <path d="M800 604 Q820 596 842 604" stroke="#20222c" strokeWidth="6" fill="none" />
        <g className="a-flicker" style={sv({ "--d": "7s" })}>
          <path d="M832 612 L760 810 H930 Z" fill="#ffd28a" opacity=".22" />
          <ellipse cx="842" cy="612" rx="10" ry="5" fill="#ffd28a" />
          <ellipse cx="845" cy="808" rx="90" ry="14" fill="#ffd28a" opacity=".35" />
        </g>
      </g>

      {/* a man in a hat walks his dog across the yard */}
      <g className="a-fly" style={sv({ "--x0": "-120px", "--x1": "1720px", "--d": "48s", "--dl": "-20s" })}>
        <g className="a-bob" style={sv({ "--d": ".45s", "--by": "-3px" })}>
          <path d="M0 790 V748 Q0 736 10 736 Q20 736 20 748 V790 Z" fill="#20222c" />
          <circle cx="10" cy="726" r="9" fill="#20222c" /><rect x="-1" y="714" width="22" height="7" fill="#c2453a" />
          <path d="M20 752 L52 778" stroke="#20222c" strokeWidth="1.5" />
        </g>
        <g className="a-bob" style={sv({ "--d": ".3s", "--by": "-3px" })}>
          <path d="M44 790 V778 H70 V790 M42 778 Q38 768 46 766 L50 772 H72 Q78 770 78 776" stroke="#20222c" strokeWidth="5" fill="none" strokeLinecap="round" />
        </g>
      </g>

      {layers.map((l, i) => (
        <g key={i} className="a-wobble" style={sv({ "--d": `${5 + i * 2}s` })}>
          <g className="a-snow" style={sv({ "--d": `${l.d}s` })} fill="#f5f7fb" opacity={l.o}>
            {l.flakes.map((f, j) => <g key={j}><circle cx={f.x.toFixed(0)} cy={f.y.toFixed(0)} r={f.s.toFixed(1)} /><circle cx={f.x.toFixed(0)} cy={(f.y - H).toFixed(0)} r={f.s.toFixed(1)} /></g>)}
          </g>
        </g>
      ))}
    </Bg>
  );
};

/* ── Midnight Highway: low-poly hills, a radio mast, a road to the horizon (the road is drawn over the scene) ── */
export const HighwayBg = () => {
  const facets = (y: number, peaks: number[], shades: string[]) =>
    peaks.slice(0, -1).map((x, i) => {
      const x2 = peaks[i + 1];
      const top = y - 60 - ((i * 53) % 110);
      const mx = (x + x2) / 2;
      return (
        <g key={`${y}${i}`}>
          <path d={`M${x} ${y} L${mx} ${top} L${x2} ${y} Z`} fill={shades[i % shades.length]} />
          <path d={`M${mx} ${top} L${x2} ${y} L${mx + (x2 - mx) * 0.2} ${y} Z`} fill="#000" opacity=".22" />
        </g>
      );
    });
  const r = rng(91);
  return (
    <Bg>
      <defs>
        <linearGradient id="hw-sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#07040f" /><stop offset=".6" stopColor="#241238" /><stop offset=".72" stopColor="#5a1f45" /></linearGradient>
        <radialGradient id="hw-city" cx=".5" cy="1" r=".5"><stop offset="0" stopColor="#ff5a3c" stopOpacity=".5" /><stop offset="1" stopColor="#ff5a3c" stopOpacity="0" /></radialGradient>
      </defs>
      <rect width={W} height={H} fill="url(#hw-sky)" />
      {Array.from({ length: 70 }, (_, i) => <rect key={i} className={i % 6 ? undefined : "twinkle"} style={i % 6 ? undefined : { animationDelay: `${-i * 0.2}s` }} x={r() * W} y={r() * 360} width="2" height="2" fill="#e6dcff" opacity={0.3 + r() * 0.5} />)}
      <path className="a-shoot" style={sv({ "--d": "11s", "--dl": "-3s", "--from": "120px", "--to": "-380px" })} d="M1300 60 L960 200" stroke="#fff" strokeWidth="2" strokeDasharray="120 600" strokeLinecap="round" />
      {/* a low-poly moon and faceted clouds */}
      <path d="M1040 140 L1078 120 L1110 140 L1118 178 L1090 206 L1050 204 L1028 176 Z" fill="#e9e1f5" />
      <path d="M1040 140 L1078 120 L1070 160 Z M1028 176 L1050 204 L1070 160 Z" fill="#cfc4e4" />
      {[[300, 220, 1], [1250, 300, 0.8], [700, 160, 0.6]].map(([x, y, s], i) => (
        <g key={i} transform={`translate(${x} ${y}) scale(${s})`}>
          <g className="a-bob" style={sv({ "--d": `${30 + i * 10}s`, "--bx": i % 2 ? "120px" : "-120px", "--by": "0px" })}>
            <path d="M-120 20 L-80 -10 L-30 -24 L20 -14 L70 -30 L120 0 L140 20 Z" fill="#3a2350" />
            <path d="M-80 -10 L-30 -24 L-20 20 Z M20 -14 L70 -30 L60 20 Z" fill="#4a2c63" />
          </g>
        </g>
      ))}
      <ellipse className="a-pulse" style={sv({ "--d": "5s", "--o0": ".7" })} cx="800" cy="414" rx="520" ry="80" fill="url(#hw-city)" />
      <g>{facets(420, [0, 160, 330, 480, 620, 760], ["#2a1640", "#33194d", "#241236"])}{facets(420, [840, 990, 1130, 1290, 1440, 1600], ["#2a1640", "#241236", "#33194d"])}</g>
      {/* a radio mast on the hill, its light blinking */}
      <path d="M1210 320 L1196 420 M1210 320 L1224 420 M1200 390 H1220 M1203 360 H1217" stroke="#140a1e" strokeWidth="3" />
      <circle className="a-blink" style={sv({ "--d": "1.6s" })} cx="1210" cy="318" r="4" fill="#ff3b3b" />
      <g opacity=".3"><circle className="a-blink" style={sv({ "--d": "1.6s" })} cx="1210" cy="318" r="12" fill="#ff3b3b" /></g>
      <rect y="418" width={W} height="482" fill="#0b0712" />
      <g>{facets(436, [-80, 120, 300, 520, 700], ["#170b24", "#1e0f2e", "#140920"])}{facets(436, [900, 1080, 1260, 1460, 1680], ["#1e0f2e", "#170b24", "#140920"])}</g>
      <rect y="434" width={W} height="466" fill="#0b0712" />
      <path d="M0 434 H1600" stroke="#5a1f45" strokeWidth="2" opacity=".6" />
    </Bg>
  );
};

/* ── Pixel Arcade: everything on a 10-unit grid, Sweetie-16 colours, scanlines, a hero walking ── */
const HERO_A = ["..rrr...", ".rrrrr..", ".skks...", ".ssss...", "bbbbbb..", "sbbbbs..", ".bbbb...", ".b..b...", "kk..kk.."];
const HERO_B = ["..rrr...", ".rrrrr..", ".skks...", ".ssss...", "bbbbbb..", "sbbbbs..", ".bbbb...", "..bb....", ".kkkk..."];
const BIRD_A = ["k.....k", ".k...k.", "..kkk..", "...k..."];
const BIRD_B = [".......", "...k...", ".kkkkk.", "k..k..k"];
const SPRITE_COLORS: Record<string, string> = { r: "#b13e53", s: "#ffcd75", k: "#1a1c2c", b: "#3b5dc9" };
const Sprite = ({ rows, p, color }: { rows: string[]; p: number; color?: string }) => (
  <g>
    {rows.flatMap((row, y) => [...row].map((c, x) => (c === "." ? null : <rect key={`${x}-${y}`} x={x * p} y={y * p} width={p} height={p} fill={color ?? SPRITE_COLORS[c]} />)))}
  </g>
);

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
  const frames = (a: string[], b: string[], p: number, d: string, color?: string) => (
    <>
      <g className="a-frame" style={sv({ "--d": d })}><Sprite rows={a} p={p} color={color} /></g>
      <g className="a-frame" style={sv({ "--d": d, "--dl": `calc(${d} / -2)` })}><Sprite rows={b} p={p} color={color} /></g>
    </>
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
      <rect width={W} height="300" fill="#29366f" /><rect y="300" width={W} height="200" fill="#3b5dc9" /><rect y="500" width={W} height="400" fill="#41a6f6" />
      {Array.from({ length: 50 }, (_, i) => <rect key={i} className={i % 4 ? undefined : "a-blink"} style={i % 4 ? undefined : sv({ "--d": `${1 + (i % 5) * 0.4}s` })} x={Math.floor((r() * W) / P) * P} y={Math.floor((r() * 280) / P) * P} width={P / 2} height={P / 2} fill="#f4f4f4" opacity={0.5 + r() * 0.5} />)}
      <g className="a-blink" style={sv({ "--d": "2s", "--off": ".75" })}>
        <rect x="1100" y="90" width="80" height="80" fill="#ffcd75" /><rect x="1090" y="100" width="100" height="60" fill="#ffcd75" /><rect x="1110" y="80" width="60" height="100" fill="#ffcd75" />
      </g>
      <g className="a-pixfly" style={sv({ "--x0": "0px", "--x1": "-400px", "--d": "40s" })}>{cloud(200, 220)}{cloud(620, 160)}{cloud(1300, 260)}{cloud(1700, 200)}</g>
      <g className="a-pixfly" style={sv({ "--x0": "1700px", "--x1": "-200px", "--d": "24s", "--dl": "-6s" })}>
        <g transform="translate(0 340)">{frames(BIRD_A, BIRD_B, 6, ".5s", "#1a1c2c")}</g>
      </g>
      {hills(700, "#257179", 3)}
      {hills(760, "#38b764", 5)}
      {/* a small pixel castle on the hill, a flag and a torch */}
      <g fill="#333c57">
        <rect x="740" y="520" width="120" height="120" /><rect x="720" y="480" width="40" height="160" /><rect x="840" y="480" width="40" height="160" />
        {[720, 740, 840, 860].map((x) => <rect key={x} x={x} y="470" width="10" height="10" />)}
        <rect x="780" y="580" width="40" height="60" fill="#1a1c2c" />
        <rect className="a-blink" style={sv({ "--d": ".6s", "--off": ".4" })} x="790" y="500" width="20" height="20" fill="#ffcd75" />
        <rect x="798" y="430" width="4" height="50" />
      </g>
      <g className="a-frame" style={sv({ "--d": ".8s" })}><rect x="802" y="430" width="30" height="20" fill="#b13e53" /></g>
      <g className="a-frame" style={sv({ "--d": ".8s", "--dl": "-.4s" })}><rect x="802" y="430" width="30" height="10" fill="#b13e53" /><rect x="812" y="440" width="20" height="10" fill="#b13e53" /></g>
      <rect y="800" width={W} height="100" fill="url(#pa-brick)" />
      <rect y="790" width={W} height="10" fill="#a7f070" />
      {/* the hero walks the whole level */}
      <g className="a-pixfly" style={sv({ "--x0": "-100px", "--x1": "1700px", "--d": "30s", "--dl": "-12s" })}>
        <g transform="translate(0 700)">{frames(HERO_A, HERO_B, P, ".4s")}</g>
      </g>
      <g className="a-blink" style={sv({ "--d": "1.4s" })} fill="#f4f4f4">
        <text x="800" y="866" fontSize="26" textAnchor="middle" style={{ fontFamily: "var(--mono)", fontWeight: 700, letterSpacing: "4px" }}>INSERT COIN</text>
      </g>
      <text x="1330" y="120" fontSize="20" textAnchor="end" fill="#f4f4f4" style={{ fontFamily: "var(--mono)", fontWeight: 700 }}>HI 013370</text>
      <rect width={W} height={H} fill="url(#pa-scan)" />
    </Bg>
  );
};

/* ── Candy Sky: cut paper in daylight, each layer casting a small shadow; confetti in the air ── */
export const CandySkyBg = () => {
  const r = rng(113);
  const cloud = (x: number, y: number, s: number, fill: string, k: string, d: number, bx: number) => (
    <g key={k} transform={`translate(${x} ${y}) scale(${s})`}>
      <g className="a-bob" style={sv({ "--d": `${d}s`, "--bx": `${bx}px`, "--by": "0px" })} fill={fill} filter="url(#cs2-paper)">
        <path d="M-120 40 C-140 0 -90 -30 -60 -10 C-50 -60 20 -70 40 -20 C70 -50 130 -20 110 30 C150 40 130 80 100 70 H-110 C-150 70 -150 40 -120 40 Z" />
      </g>
    </g>
  );
  const confetti = Array.from({ length: 36 }, () => ({ x: r() * W * 1.1, d: 9 + r() * 8, dl: -r() * 17, c: ["#ff8fb1", "#ffd86b", "#7fd6b0", "#7fb4f0", "#c39af0"][Math.floor(r() * 5)], sd: 1 + r() * 2, fx: -(40 + r() * 160) }));
  const flowers = Array.from({ length: 16 }, (_, i) => ({ x: 40 + i * 100 + r() * 40, y: 800 + r() * 70, c: ["#ff8fb1", "#ffd86b", "#fff4f8"][i % 3], dl: -r() * 3 }));
  return (
    <Bg>
      <defs>
        <linearGradient id="cs2-sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#7cc4ea" /><stop offset=".5" stopColor="#bfe2f2" /><stop offset=".85" stopColor="#ffe3ec" /></linearGradient>
        <filter id="cs2-paper" x="-10%" y="-10%" width="130%" height="140%"><feDropShadow dx="0" dy="6" stdDeviation="4" floodColor="#3a4a7a" floodOpacity=".28" /></filter>
      </defs>
      <rect width={W} height={H} fill="url(#cs2-sky)" />
      {/* a paper sun whose rays turn */}
      <g transform="translate(800 250)">
        <g className="a-spin" style={sv({ "--d": "50s" })} fill="#ffd86b" filter="url(#cs2-paper)">
          {Array.from({ length: 12 }, (_, i) => <path key={i} transform={`rotate(${i * 30})`} d="M-14 -90 L0 -130 L14 -90 Z" />)}
        </g>
        <circle r="78" fill="#ffe9a6" filter="url(#cs2-paper)" />
        <circle r="56" fill="#fff4cc" />
      </g>
      <g fill="none" strokeWidth="34" filter="url(#cs2-paper)">
        {["#ff9fbf", "#ffd27a", "#9fe0c0", "#9fc6f2", "#c9aef2"].map((c, i) => <path key={c} d={`M${380 + i * 34} 760 A${420 - i * 34} ${420 - i * 34} 0 0 1 ${1220 - i * 34} 760`} stroke={c} />)}
      </g>
      {/* a paper hot-air balloon, far off */}
      <g transform="translate(1260 300)">
        <g className="a-bob" style={sv({ "--d": "7s", "--by": "-40px", "--bx": "20px" })} filter="url(#cs2-paper)">
          <path d="M0 -60 C40 -60 56 -20 40 20 L14 46 H-14 L-40 20 C-56 -20 -40 -60 0 -60 Z" fill="#ff8fb1" />
          <path d="M0 -60 C14 -60 18 -20 12 20 L6 46 H-6 L-12 20 C-18 -20 -14 -60 0 -60 Z" fill="#fff4f8" />
          <path d="M-12 46 L-10 62 M12 46 L10 62" stroke="#7a5a8a" strokeWidth="2" />
          <rect x="-12" y="62" width="24" height="16" rx="3" fill="#b07a4a" />
        </g>
      </g>
      {cloud(240, 560, 0.8, "#ffffff", "a", 26, 90)}{cloud(1330, 190, 0.9, "#ffffff", "b", 34, -110)}{cloud(980, 420, 0.7, "#fff4fb", "c", 20, 70)}{cloud(1060, 110, 0.6, "#fff4fb", "d", 30, -80)}
      {/* a paper plane looping round */}
      <g className="a-fly" style={sv({ "--x0": "-200px", "--x1": "1800px", "--d": "26s", "--dl": "-8s" })}>
        <g className="a-bob" style={sv({ "--d": "2.5s", "--by": "60px" })} filter="url(#cs2-paper)">
          <path d="M0 300 L60 316 L0 326 L12 316 Z" fill="#ffffff" /><path d="M0 326 L12 316 L60 316 Z" fill="#dfe6f5" />
        </g>
      </g>
      <Flock y={140} color="#5a6a9a" d={40} n={4} s={0.7} />
      <path d="M0 720 C200 660 420 700 620 680 C820 660 1000 720 1200 690 C1380 664 1500 690 1600 680 V900 H0 Z" fill="#bfe8c8" filter="url(#cs2-paper)" />
      <path d="M0 780 C260 740 500 790 760 770 C1020 750 1280 800 1600 760 V900 H0 Z" fill="#8fd4a8" filter="url(#cs2-paper)" />
      <path d="M0 840 C300 810 640 860 960 840 C1200 826 1420 850 1600 836 V900 H0 Z" fill="#6cbf8e" filter="url(#cs2-paper)" />
      {flowers.map((f, i) => (
        <g key={i} transform={`translate(${f.x.toFixed(0)} ${f.y.toFixed(0)})`}>
          <g className="a-sway" style={sv({ "--a": "7deg", "--d": "2.6s", "--dl": `${f.dl.toFixed(1)}s` })}>
            <path d="M0 0 V-26" stroke="#3f8a5f" strokeWidth="3" />
            <g transform="translate(0 -30)" fill={f.c}>{[0, 72, 144, 216, 288].map((a) => <ellipse key={a} transform={`rotate(${a}) translate(0 -7)`} rx="5" ry="7" />)}<circle r="4" fill="#ffd86b" /></g>
          </g>
        </g>
      ))}
      {confetti.map((c, i) => (
        <g key={i} transform={`translate(${c.x.toFixed(0)} 0)`}>
          <g className="a-fall" style={sv({ "--d": `${c.d.toFixed(1)}s`, "--dl": `${c.dl.toFixed(1)}s`, "--fx": `${c.fx.toFixed(0)}px` })}>
            <rect className="a-spin" style={sv({ "--d": `${c.sd.toFixed(1)}s` })} x="-4" y="-7" width="8" height="14" fill={c.c} />
          </g>
        </g>
      ))}
    </Bg>
  );
};

/* ── Ember Mountains: a linocut. Black and red ink on cream paper, gouge marks, a volcano that won't rest ── */
export const EmberMountainsBg = () => {
  const r = rng(127);
  const INK = "#1b1512";
  const RED = "#c4311f";
  const CREAM = "#efe3c8";
  const sky = Array.from({ length: 26 }, (_, i) => {
    const y = 20 + i * 15;
    const segs: string[] = [];
    let x = -20 + r() * 60;
    while (x < W) {
      const len = 80 + r() * 260;
      const sun = Math.abs(y - 300) < 160 && x + len > 600 && x < 1000;
      const caption = y > 100 && y < 380 && x < 760;
      if (!sun && !caption) segs.push(`M${x.toFixed(0)} ${y} h${len.toFixed(0)}`);
      x += len + 20 + r() * 60;
    }
    return { d: segs.join(" "), w: Math.max(0.6, 5 - i * 0.2) };
  });
  const gouge = (x0: number, x1: number, y0: number, y1: number, n: number, seed: number) => {
    const rr = rng(seed);
    return Array.from({ length: n }, () => {
      const x = x0 + rr() * (x1 - x0); const y = y0 + rr() * (y1 - y0); const l = 14 + rr() * 30;
      return `M${x.toFixed(0)} ${y.toFixed(0)} q${(l / 2).toFixed(0)} ${(-4 - rr() * 6).toFixed(0)} ${l.toFixed(0)} 0`;
    }).join(" ");
  };
  const ash = Array.from({ length: 40 }, () => ({ x: r() * W, d: 12 + r() * 10, dl: -r() * 22, s: 1.5 + r() * 2.5, fx: 60 + r() * 140 }));
  const bursts = Array.from({ length: 12 }, (_, i) => ({ rx: (r() - 0.5) * 520, ry: -(160 + r() * 220), dl: -(i * 0.55), s: 6 + r() * 10 }));
  return (
    <Bg>
      <defs>
        <clipPath id="em-volcano"><path d="M300 900 L640 330 L730 300 L770 330 L830 330 L870 300 L960 330 L1300 900 Z" /></clipPath>
      </defs>
      <rect width={W} height={H} fill={CREAM} />
      {/* the sky cut in lines, thick at the top */}
      <g stroke={INK} strokeLinecap="round" fill="none">{sky.map((s, i) => <path key={i} d={s.d} strokeWidth={s.w.toFixed(1)} />)}</g>
      {/* a red sun with carved rays turning */}
      <g transform="translate(800 290)">
        <g className="a-spin" style={sv({ "--d": "90s" })} stroke={INK} strokeWidth="5" strokeLinecap="round">
          {Array.from({ length: 24 }, (_, i) => <path key={i} transform={`rotate(${i * 15})`} d="M0 -168 V-210" />)}
        </g>
        <circle r="150" fill={RED} />
        {[118, 86, 54].map((rad) => <circle key={rad} r={rad} fill="none" stroke={CREAM} strokeWidth="3" strokeDasharray="30 12" />)}
      </g>
      {/* smoke out of the crater, rolling up and away */}
      {Array.from({ length: 7 }, (_, i) => (
        <g key={i} transform={`translate(${790 + (i % 3) * 16} 300)`}>
          <g className="a-rise" style={sv({ "--d": "12s", "--dl": `${-i * 1.7}s`, "--rx": `${(i % 2 ? 1 : -0.4) * (120 + i * 20)}px`, "--ry": "-320px", "--s0": ".5", "--s1": "2.4", "--o": "1" })}>
            <circle r="44" fill={CREAM} stroke={INK} strokeWidth="4" />
            <path d="M-26 -6 q12 -16 28 -6 q10 8 0 18 M-10 20 q14 6 26 -4" stroke={INK} strokeWidth="3" fill="none" strokeLinecap="round" />
          </g>
        </g>
      ))}

      <path d="M300 900 L640 330 L730 300 L770 330 L830 330 L870 300 L960 330 L1300 900 Z" fill={INK} />
      <g clipPath="url(#em-volcano)">
        <path d={gouge(380, 760, 420, 900, 70, 5)} stroke={CREAM} strokeWidth="2.4" fill="none" strokeLinecap="round" />
        <path d={gouge(860, 1240, 420, 900, 70, 6)} stroke={CREAM} strokeWidth="2.4" fill="none" strokeLinecap="round" />
      </g>
      {/* lava running down */}
      {[
        "M770 330 C780 420 740 500 760 600 C770 680 720 760 740 900",
        "M830 330 C840 440 880 520 860 640 C850 730 900 800 880 900",
      ].map((d) => (
        <g key={d}>
          <path d={d} stroke={RED} strokeWidth="14" fill="none" />
          <path className="a-dash" style={sv({ "--d": "2.4s", "--do": "-60px" })} d={d} stroke="#f2a64a" strokeWidth="5" fill="none" strokeDasharray="22 38" strokeLinecap="round" />
        </g>
      ))}
      <path d="M730 300 L770 330 L830 330 L870 300 Z" fill={RED} />
      {/* the eruption: red rocks thrown out of the crater */}
      {bursts.map((b, i) => (
        <g key={i} transform="translate(800 318)">
          <g className="a-throw" style={sv({ "--d": "6.6s", "--dl": `${b.dl.toFixed(2)}s`, "--rx": `${b.rx.toFixed(0)}px`, "--ry": `${b.ry.toFixed(0)}px` })}>
            <path d={`M0 ${-b.s} L${b.s * 0.8} 0 L0 ${b.s} L${-b.s * 0.8} 0 Z`} fill={RED} stroke={INK} strokeWidth="2" />
          </g>
        </g>
      ))}

      <path d="M-40 900 L180 560 L280 620 L420 470 L560 900 Z M1060 900 L1200 500 L1320 600 L1440 520 L1660 900 Z" fill={INK} />
      <path d={gouge(60, 520, 560, 900, 40, 7) + " " + gouge(1100, 1580, 560, 900, 40, 8)} stroke={CREAM} strokeWidth="2.2" fill="none" strokeLinecap="round" />
      <Flock y={180} color={INK} d={30} n={5} s={1.1} />
      {/* ash falling */}
      {ash.map((a, i) => (
        <g key={i} transform={`translate(${a.x.toFixed(0)} 0)`}>
          <g className="a-fall" style={sv({ "--d": `${a.d.toFixed(1)}s`, "--dl": `${a.dl.toFixed(1)}s`, "--fx": `${a.fx.toFixed(0)}px` })}>
            <rect className="a-spin" style={sv({ "--d": "3s" })} x={-a.s} y={-a.s / 2} width={a.s * 2} height={a.s} fill={INK} />
          </g>
        </g>
      ))}
    </Bg>
  );
};

/* ── Velvet Lounge: art deco sunburst, gold pinstripes, a mirror ball and two spotlights ── */
export const VelvetLoungeBg = () => {
  const r = rng(131);
  const spots = Array.from({ length: 40 }, () => {
    const a = r() * Math.PI * 2; const d = 160 + r() * 700;
    return { x: 800 + Math.cos(a) * d * 1.3, y: 140 + Math.abs(Math.sin(a)) * d * 0.7, s: 2 + r() * 4 };
  });
  const motes = Array.from({ length: 30 }, () => ({ x: 560 + r() * 480, y: 380 + r() * 360, d: 6 + r() * 6, dl: -r() * 8, w: 10 + r() * 20 }));
  const notes = Array.from({ length: 8 }, (_, i) => ({ x: 600 + i * 50 + r() * 30, dl: -i * 1.1, c: i % 2 ? "♪" : "♫" }));
  return (
    <Bg>
      <defs>
        <linearGradient id="vl-wall" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#1a0509" /><stop offset="1" stopColor="#3a0b16" /></linearGradient>
        <linearGradient id="vl-curtain" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#4a0a18" /><stop offset=".25" stopColor="#8a1428" /><stop offset=".5" stopColor="#4a0a18" /><stop offset=".75" stopColor="#7a1224" /><stop offset="1" stopColor="#3a0812" />
        </linearGradient>
        <linearGradient id="vl-cone" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#ffe6b0" stopOpacity=".32" /><stop offset="1" stopColor="#ffe6b0" stopOpacity="0" /></linearGradient>
        <radialGradient id="vl-spot" cx=".5" cy="1" r=".6"><stop offset="0" stopColor="#ffe6b0" stopOpacity=".35" /><stop offset="1" stopColor="#ffe6b0" stopOpacity="0" /></radialGradient>
        <pattern id="vl-pin" width="60" height="900" patternUnits="userSpaceOnUse"><path d="M30 0 V900" stroke="#c9a45c" strokeWidth="1" opacity=".18" /></pattern>
        <clipPath id="vl-ball"><circle cx="800" cy="150" r="34" /></clipPath>
      </defs>
      <rect width={W} height={H} fill="url(#vl-wall)" />
      <rect width={W} height={H} fill="url(#vl-pin)" />
      <g className="a-pulse" style={sv({ "--d": "3s", "--o0": ".45" })} stroke="#c9a45c" fill="none">
        {Array.from({ length: 19 }, (_, i) => { const a = Math.PI * (i / 18); return <path key={i} d={`M800 520 L${800 - Math.cos(a) * 620} ${520 - Math.sin(a) * 620}`} strokeWidth="1.5" />; })}
      </g>
      <g stroke="#c9a45c" fill="none" opacity=".8">
        {[160, 230, 300].map((rad) => <path key={rad} d={`M${800 - rad} 520 A${rad} ${rad} 0 0 1 ${800 + rad} 520`} strokeWidth="3" />)}
        <path d="M560 520 H1040" strokeWidth="3" />
      </g>
      <circle cx="800" cy="520" r="80" fill="#c9a45c" opacity=".9" />
      <circle cx="800" cy="520" r="62" fill="#1a0509" />
      <path d="M770 520 a30 30 0 0 1 60 0" stroke="#c9a45c" strokeWidth="3" fill="none" />

      {/* light off the mirror ball, wheeling round the room */}
      <g className="a-turn" style={sv({ "--ox": "800px", "--oy": "150px", "--d": "26s" })} fill="#fff1cf">
        {spots.map((s, i) => <circle key={i} cx={s.x.toFixed(0)} cy={s.y.toFixed(0)} r={s.s.toFixed(1)} opacity=".5" />)}
      </g>
      <path d="M800 0 V116" stroke="#c9a45c" strokeWidth="2" />
      <circle cx="800" cy="150" r="34" fill="#4a3f36" />
      <g clipPath="url(#vl-ball)">
        <g className="a-scroll" style={sv({ "--d": "3s", "--dx": "-35px" })}>
          {Array.from({ length: 240 }, (_, i) => <rect key={i} x={758 + (i % 20) * 7} y={116 + Math.floor(i / 20) * 6} width="6" height="5" fill={["#f4ead2", "#a8977e", "#6e6254", "#fff8e6", "#d8c7a8"][(i * 7 + Math.floor(i / 20)) % 5]} />)}
        </g>
      </g>

      {/* two spotlights sweeping the stage */}
      {[[300, -0.5], [1300, -3]].map(([x, dl], i) => (
        <g key={x} transform={`translate(${x} 60)`}>
          <path className="a-swing" style={sv({ "--a": "14deg", "--d": "6s", "--dl": `${dl}s` })} d={`M-10 0 L${i ? -620 : 260} 720 L${i ? -260 : 620} 720 L10 0 Z`} fill="url(#vl-cone)" />
        </g>
      ))}

      <rect y="700" width={W} height="200" fill="#120306" />
      <path d="M0 700 H1600" stroke="#c9a45c" strokeWidth="3" />
      <ellipse className="a-pulse" style={sv({ "--d": "2.4s", "--o0": ".6" })} cx="800" cy="760" rx="380" ry="70" fill="url(#vl-spot)" />
      {/* a double bass that rocks with the tune, and a microphone, in gold line */}
      <g transform="translate(650 760)">
        <g className="a-sway" style={sv({ "--a": "3deg", "--d": ".9s" })} stroke="#c9a45c" strokeWidth="3" fill="none" strokeLinecap="round">
          <path d="M-10 0 C-50 -20 -50 -70 -20 -90 C-40 -120 -30 -150 0 -160 C30 -150 40 -120 20 -90 C50 -70 50 -20 10 0 Z" />
          <path d="M0 -160 V-260 M-10 -260 H10" /><path d="M-10 -120 H10 M-10 -110 H10" />
        </g>
      </g>
      <g stroke="#c9a45c" strokeWidth="3" fill="none" strokeLinecap="round">
        <path d="M960 760 V600 M940 760 H980" /><circle cx="960" cy="588" r="12" />
      </g>
      {/* notes rising off the stage */}
      {notes.map((n, i) => (
        <g key={i} transform={`translate(${n.x.toFixed(0)} 690)`}>
          <text className="a-rise" style={sv({ "--d": "8.8s", "--dl": `${n.dl}s`, "--rx": `${i % 2 ? 40 : -40}px`, "--ry": "-300px", "--s0": ".8", "--s1": "1.3", "--o": ".85" })} fontSize="30" fill="#e8c77a">{n.c}</text>
        </g>
      ))}
      {motes.map((m, i) => (
        <g key={i} transform={`translate(${m.x.toFixed(0)} ${m.y.toFixed(0)})`}>
          <circle className="a-wander" style={sv({ "--d": `${m.d.toFixed(1)}s`, "--dl": `${m.dl.toFixed(1)}s`, "--w": m.w.toFixed(0) })} r="1.6" fill="#ffe6b0" opacity=".6" />
        </g>
      ))}
      <g className="a-sway" style={sv({ "--a": "1.2deg", "--d": "7s", "--o": "0% 0%" })}><path d="M0 0 H260 C240 200 270 500 220 900 H0 Z" fill="url(#vl-curtain)" /></g>
      <g className="a-sway" style={sv({ "--a": "1.2deg", "--d": "8s", "--dl": "-3s", "--o": "100% 0%" })}><path d="M1600 0 H1340 C1360 200 1330 500 1380 900 H1600 Z" fill="url(#vl-curtain)" /></g>
      <path d="M0 0 H1600 V60 C1300 100 1100 50 800 80 C500 110 300 50 0 90 Z" fill="#5a0c1c" />
      <path d="M0 90 C300 50 500 110 800 80 C1100 50 1300 100 1600 60" stroke="#c9a45c" strokeWidth="3" fill="none" />
    </Bg>
  );
};

/* ── Glass Reef: watercolour water and coral (drawn once, underneath), fish and bubbles moving over it ── */
const Fish = ({ x, y, s, c }: { x: number; y: number; s: number; c: string }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <g className="a-sway" style={sv({ "--a": "6deg", "--d": ".5s", "--o": "50% 50%", "--dl": `${-(x % 7) / 10}s` })}>
      <path d="M0 0 C10 -10 30 -10 40 0 C30 10 10 10 0 0 Z M0 0 L-12 -9 L-10 0 L-12 9 Z" fill={c} />
      <circle cx="31" cy="-2" r="1.6" fill="#06121f" />
    </g>
  </g>
);

export const GlassReefBg = () => {
  const r = rng(137);
  const school = (n: number, cx: number, cy: number, spread: number, c: string, s: number) =>
    Array.from({ length: n }, (_, i) => <Fish key={i} x={cx + (r() - 0.5) * spread * 2} y={cy + (r() - 0.5) * spread} s={s * (0.8 + r() * 0.4)} c={c} />);
  const vents = [180, 560, 1080, 1420];
  const snow = Array.from({ length: 40 }, () => ({ x: r() * W, d: 18 + r() * 14, dl: -r() * 30 }));
  return (
    <Bg still={
      <>
        <defs>
          <linearGradient id="gr-water" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#1d5b73" /><stop offset=".45" stopColor="#0d2f4a" /><stop offset="1" stopColor="#06121f" /></linearGradient>
          <filter id="gr-wash" x="-20%" y="-20%" width="140%" height="140%">
            <feTurbulence type="fractalNoise" baseFrequency=".02" numOctaves="3" seed="9" result="n" />
            <feDisplacementMap in="SourceGraphic" in2="n" scale="30" result="d" /><feGaussianBlur in="d" stdDeviation="3" />
          </filter>
        </defs>
        <rect width={W} height={H} fill="url(#gr-water)" />
        <g filter="url(#gr-wash)" opacity=".5">
          <circle cx="300" cy="260" r="220" fill="#2a7a8a" /><circle cx="1250" cy="180" r="260" fill="#3a5f8f" /><circle cx="820" cy="460" r="300" fill="#16405e" />
        </g>
        <g filter="url(#gr-wash)">
          <path d="M0 900 C80 800 160 820 240 760 C320 700 420 760 520 720 C600 690 680 760 760 740 C840 720 940 780 1040 740 C1160 700 1260 780 1380 750 C1480 726 1560 760 1600 740 V900 Z" fill="#081a28" />
        </g>
        <g stroke="#8a4f7a" strokeWidth="9" strokeLinecap="round" fill="none" filter="url(#gr-wash)" opacity=".9">
          <path d="M300 860 C300 800 260 770 250 720 M300 820 C330 790 360 780 370 740 M280 780 C250 760 230 740 230 700" />
          <path d="M1240 870 C1250 800 1290 770 1300 720 M1260 820 C1220 790 1210 760 1200 720" stroke="#b0625e" />
          <path d="M760 880 C770 820 740 790 730 750 M770 840 C800 810 820 800 830 770" stroke="#c07a5e" />
        </g>
      </>
    }>
      <defs>
        <linearGradient id="gr-ray" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#bff3ff" stopOpacity=".22" /><stop offset="1" stopColor="#bff3ff" stopOpacity="0" /></linearGradient>
      </defs>
      {[["M600 0 H700 L900 900 H640 Z", 0], ["M820 0 H880 L1120 900 H960 Z", -2], ["M980 0 H1020 L1320 900 H1220 Z", -4], ["M300 0 H340 L460 900 H380 Z", -1]].map(([d, dl], i) => (
        <path key={i} className="a-pulse" style={sv({ "--d": "5s", "--dl": `${dl}s`, "--o0": ".2" })} d={d as string} fill="url(#gr-ray)" />
      ))}
      {/* light on the surface, rippling */}
      <g className="a-bob" style={sv({ "--d": "6s", "--bx": "60px", "--by": "0px" })} fill="#bff3ff" opacity=".12">
        {Array.from({ length: 12 }, (_, i) => <ellipse key={i} cx={i * 150 + 40} cy={30 + (i % 3) * 14} rx="70" ry="10" />)}
      </g>

      {/* a manta, slow and far */}
      <g className="a-fly" style={sv({ "--x0": "1900px", "--x1": "-500px", "--d": "90s", "--dl": "-40s" })}>
        <g transform="translate(0 260)">
          <g className="a-flap" style={sv({ "--d": "3s" })}>
            <path d="M0 0 C40 -40 90 -50 140 -20 C100 -10 80 0 70 20 C60 0 40 -10 0 0 Z M70 20 C72 50 66 80 60 100" fill="#0e3550" stroke="#0e3550" strokeWidth="2" opacity=".85" />
          </g>
        </g>
      </g>
      {/* two schools of fish, one each way */}
      <g className="a-fly" style={sv({ "--x0": "-400px", "--x1": "1900px", "--d": "34s", "--dl": "-10s" })}>
        <g className="a-bob" style={sv({ "--d": "3s", "--by": "30px" })}>{school(14, 0, 420, 90, "#ffb38a", 0.9)}</g>
      </g>
      <g className="a-fly" style={sv({ "--x0": "1900px", "--x1": "-400px", "--d": "46s", "--dl": "-30s" })}>
        <g transform="scale(-1 1)"><g className="a-bob" style={sv({ "--d": "4s", "--by": "-24px" })}>{school(10, 0, 600, 70, "#8fe8ff", 0.7)}</g></g>
      </g>

      <g stroke="#2f6b56" strokeWidth="6" fill="none" strokeLinecap="round">
        {[120, 170, 520, 1080, 1440, 1500, 640, 960].map((x, i) => (
          <path key={x} className="a-sway" style={sv({ "--a": "5deg", "--d": `${4 + (i % 3)}s`, "--dl": `${-i * 0.7}s` })} d={`M${x} 900 C${x - 30} 800 ${x + 30} 720 ${x - 10} ${620 - (i % 2) * 60}`} />
        ))}
      </g>
      {/* bubbles rising from the reef */}
      {vents.flatMap((x, v) => Array.from({ length: 7 }, (_, i) => (
        <g key={`${v}-${i}`} transform={`translate(${x + (i % 3) * 8} 860)`}>
          <circle className="a-rise" style={sv({ "--d": `${6 + (v % 2) * 2}s`, "--dl": `${-(i * 0.9 + v * 0.4)}s`, "--rx": `${(i % 2 ? 1 : -1) * 30}px`, "--ry": "-820px", "--s0": ".6", "--s1": "1.5", "--o": ".7" })} r={3 + (i % 3) * 2} fill="none" stroke="#cfefff" strokeWidth="1.2" />
        </g>
      )))}
      {snow.map((s, i) => (
        <g key={i} transform={`translate(${s.x.toFixed(0)} 0)`}>
          <circle className="a-fall" style={sv({ "--d": `${s.d.toFixed(0)}s`, "--dl": `${s.dl.toFixed(0)}s`, "--fx": "40px" })} r="1.3" fill="#e6f8ff" opacity=".45" />
        </g>
      ))}
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
        {hues.map((c) => <circle key={c} cx={40 + r() * 220} cy={60 + r() * 480} r={40 + r() * 50} fill={c} opacity=".55" />)}
      </g>
      {Array.from({ length: 60 }, (_, i) => <circle key={i} cx={r() * 300} cy={r() * 600} r={0.5 + r() * 1.4} fill="#fff" opacity={0.3 + r() * 0.6} className={i % 5 ? undefined : "twinkle"} />)}
    </svg>
  );
};
