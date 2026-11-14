import type { Kind } from "./universes";

/* Drawings for the songs that need more than a CSS shape. Colours come from --c on the button. */

/* a car seen from behind: sedan, hatchback or a low coupe */
const CABINS = [
  "M14 19 L19 8 Q20 6 22.5 6 H41.5 Q44 6 45 8 L50 19 Z",
  "M12 19 L14.5 4.5 Q15 3 17 3 H47 Q49 3 49.5 4.5 L52 19 Z",
  "M16 19 L22 11 Q23.5 9.5 26 9.5 H38 Q40.5 9.5 42 11 L48 19 Z",
];
const GLASS = [
  "M17.5 18 L21.5 9 H42.5 L46.5 18 Z",
  "M15.5 18 L17.5 6 H46.5 L48.5 18 Z",
  "M19.5 18 L24.5 12 H39.5 L44.5 18 Z",
];

export const Car = ({ v }: { v: number }) => (
  <svg className="car" viewBox="0 0 64 44" aria-hidden="true">
    <ellipse cx="32" cy="41" rx="29" ry="3" fill="#000" opacity=".55" />
    <rect x="7" y="31" width="10" height="11" rx="2.5" fill="#06060a" />
    <rect x="47" y="31" width="10" height="11" rx="2.5" fill="#06060a" />
    <path className="car-cabin" d={CABINS[v % 3]} />
    <path className="car-glass" d={GLASS[v % 3]} />
    <path d={v % 3 === 1 ? "M22 7 L27 7 L22 17 L18 17 Z" : "M25 10 L29 10 L25 17 L21 17 Z"} fill="#fff" opacity=".12" />
    <path className="car-body" d="M4 24 Q4 19.5 9 19 H55 Q60 19.5 60 24 V34 Q60 37.5 56.5 37.5 H7.5 Q4 37.5 4 34 Z" />
    <path d="M7 21 H57" stroke="#fff" strokeOpacity=".28" strokeWidth="1" />
    <rect className="car-lamp" x="6" y="23.5" width="13" height="4.5" rx="1.5" />
    <rect className="car-lamp" x="45" y="23.5" width="13" height="4.5" rx="1.5" />
    <rect x="25" y="27" width="14" height="6" rx="1" fill="#d9d4c6" />
    <path d="M27 30 H37" stroke="#3a3a44" strokeWidth="1.2" strokeDasharray="1.5 1" />
    <rect x="5" y="34" width="54" height="2.5" rx="1" fill="#000" opacity=".3" />
  </svg>
);

/* neon tubes: a heart, a note, a bolt, a star, a moon, a glass */
const NEON = [
  "M20 33 C8 24 5 17 9 12 C13 7 19 9 20 14 C21 9 27 7 31 12 C35 17 32 24 20 33 Z",
  "M18 30 V9 L32 6 V26 M18 30 a4 3.4 0 1 1 -0.1 0 M32 26 a4 3.4 0 1 1 -0.1 0",
  "M23 4 L11 22 H20 L16 36 L30 16 H21 Z",
  "M20 4 L24.5 15 L36 15.5 L27 23 L30 35 L20 28 L10 35 L13 23 L4 15.5 L15.5 15 Z",
  "M26 5 A15 15 0 1 0 35 27 A12 12 0 1 1 26 5 Z",
  "M7 8 H33 L20 22 Z M20 22 V33 M13 34 H27 M25 8 L30 2",
];

const Neon = ({ i }: { i: number }) => (
  <svg className="neon" viewBox="0 0 40 40" aria-hidden="true">
    <path d={NEON[i % NEON.length]} />
  </svg>
);

/* a jellyfish whose tentacles wave */
const Jelly = () => (
  <svg className="jelly" viewBox="0 0 40 56" aria-hidden="true">
    {[["M10 21 C6 30 14 36 9 46", 0], ["M17 22 C14 32 21 38 17 52", -0.4], ["M24 22 C27 32 20 38 24 52", -0.8], ["M31 21 C35 30 27 36 32 46", -1.2]].map(([d, dl]) => (
      <path key={d} className="jt" d={d as string} style={{ animationDelay: `${dl}s` }} />
    ))}
    <path className="jbell" d="M4 21 C4 9 12 3 20 3 C28 3 36 9 36 21 C32 19 30 23 26 21 C23 23 17 23 14 21 C10 23 8 19 4 21 Z" />
    <ellipse cx="16" cy="11" rx="6" ry="3.4" fill="#fff" opacity=".45" />
  </svg>
);

/* a flame cut in lino: red ink, black edge, the paper showing through */
const Flame = () => (
  <svg className="flame" viewBox="0 0 20 28" aria-hidden="true">
    <path d="M10 1 C13 7 18 10 17 18 C16 24 13 27 10 27 C7 27 3 24 3 18 C3 13 7 11 7 6 C9 9 9 11 10 12 C11 9 11 5 10 1 Z" fill="#c4311f" stroke="#1b1512" strokeWidth="1.6" strokeLinejoin="round" />
    <path d="M10 14 C12 17 13 19 12 22 C11 24 9 24 8 22 C7 20 9 17 10 14 Z" fill="#efe3c8" />
  </svg>
);

export const ThingArt = ({ kind, i }: { kind: Kind; i: number }) => {
  switch (kind) {
    case "taillight": return <Car v={i} />;
    case "neon": return <Neon i={i} />;
    case "jelly": return <Jelly />;
    case "ember": return <Flame />;
    default: return null;
  }
};
