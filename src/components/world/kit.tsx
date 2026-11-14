import type { CSSProperties, ReactNode } from "react";

/* Shared pieces for the scenes. Every scene is drawn on a 1600×900 canvas and cropped to the screen
   ("slice"): on a phone only the strip x≈660–940 shows, so the main things stand near the middle.
   Motion is plain CSS (index.css, "scene motion"): an element gets a class like a-fly or a-sway and
   its numbers through style variables. A CSS transform replaces the SVG transform attribute, so an
   animated element never carries its own position: it sits inside a <g transform="..."> instead. */

export const W = 1600;
export const H = 900;

export const rng = (seed: number) => () => ((seed = (seed * 16807) % 2147483647) / 2147483647);

/* style with custom properties */
export const sv = (o: Record<string, string | number>) => o as CSSProperties;

const Svg = ({ children, crisp }: { children: ReactNode; crisp?: boolean }) => (
  <svg className="land-bg" viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMid slice" aria-hidden="true"
    shapeRendering={crisp ? "crispEdges" : undefined}>
    {children}
  </svg>
);

/* `still` is drawn in its own SVG underneath, so heavy filters there are not repainted with the motion */
export const Bg = ({ children, crisp, still }: { children: ReactNode; crisp?: boolean; still?: ReactNode }) => (
  <>
    {still && <Svg crisp={crisp}>{still}</Svg>}
    <Svg crisp={crisp}>{children}</Svg>
  </>
);

export const Stars = ({ n, seed, y0, y1, color = "#f6e7c8", x0 = 0, x1 = W }: { n: number; seed: number; y0: number; y1: number; color?: string; x0?: number; x1?: number }) => {
  const r = rng(seed);
  return (
    <g>
      {Array.from({ length: n }, (_, i) => {
        const x = x0 + r() * (x1 - x0);
        const y = y0 + r() * (y1 - y0);
        const s = 0.5 + r() * 1.4;
        const o = 0.25 + r() * 0.6;
        const tw = i % 5 === 0;
        return <circle key={i} cx={x} cy={y} r={s} fill={color} opacity={o} className={tw ? "twinkle" : undefined} style={tw ? { animationDelay: `${(-r() * 4).toFixed(2)}s` } : undefined} />;
      })}
    </g>
  );
};

/* a bird as two strokes; the wings flap */
export const Bird = ({ x, y, s = 1, color, dl = 0 }: { x: number; y: number; s?: number; color: string; dl?: number }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path className="a-flap" style={sv({ "--d": "0.45s", "--dl": `${dl}s` })} d="M-16 0 Q-8 -8 0 0 Q8 -8 16 0" stroke={color} strokeWidth="2.6" fill="none" strokeLinecap="round" />
  </g>
);

/* a flock that crosses the whole scene and comes back round */
export const Flock = ({ y, color, d = 46, dl = 0, s = 1, n = 5, dir = -1 }: { y: number; color: string; d?: number; dl?: number; s?: number; n?: number; dir?: 1 | -1 }) => {
  const r = rng(Math.round(y * 7 + n));
  return (
    <g className="a-fly" style={sv({ "--x0": dir < 0 ? "1800px" : "-500px", "--x1": dir < 0 ? "-500px" : "1800px", "--d": `${d}s`, "--dl": `${dl}s` })}>
      {Array.from({ length: n }, (_, i) => <Bird key={i} x={i * 38 * s + r() * 14} y={y + (i % 2 ? -14 : 8) * s + r() * 10} s={s * (0.7 + r() * 0.4)} color={color} dl={-r()} />)}
    </g>
  );
};
