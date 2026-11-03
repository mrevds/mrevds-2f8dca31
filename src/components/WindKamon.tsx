import { useEffect, useState } from "react";

/* The higanbana from the kamon, out of its ring and on a long stem, moving in the wind:
   the whole flower leans from the root, each stamen flutters on its own beat,
   petals tremble, pollen drifts off with the gusts.
   SMIL rotate(angle cx cy) keeps every pivot in the drawing's own grid. */

const HEART = "32 36";
const ROOT = "32 66";

// stamen path, tip, how far it moves (outer ones catch more wind) and its beat
const STAMENS = [
  { d: "M32 36 C27 29 18 24 9 24", tip: [9, 24], amp: 7, dur: 2.6, delay: 0.0 },
  { d: "M32 36 C28 26 22 17 15 12", tip: [15, 12], amp: 5, dur: 2.9, delay: 0.3 },
  { d: "M32 36 C31 26 29 16 26 8", tip: [26, 8], amp: 3.5, dur: 3.3, delay: 0.6 },
  { d: "M32 36 C33 26 35 16 38 8", tip: [38, 8], amp: 3.5, dur: 3.1, delay: 0.15 },
  { d: "M32 36 C36 26 42 17 49 12", tip: [49, 12], amp: 5, dur: 2.7, delay: 0.45 },
  { d: "M32 36 C37 29 46 24 55 24", tip: [55, 24], amp: 7, dur: 2.5, delay: 0.75 },
];
const PETALS = [
  "M32 36 C26 36 21 39 20 44 C22 42 25 42 26 44",
  "M32 36 C38 36 43 39 44 44 C42 42 39 42 38 44",
  "M32 36 C29 32 24 31 21 33 C23 33 25 34 25 36",
  "M32 36 C35 32 40 31 43 33 C41 33 39 34 39 36",
];
const POLLEN = [
  { from: [52, 14], to: [90, 0], dur: 6, delay: 1.2 },
  { from: [56, 24], to: [96, 34], dur: 7.5, delay: 3.8 },
  { from: [40, 8], to: [82, -14], dur: 8, delay: 6 },
  { from: [48, 30], to: [94, 52], dur: 9, delay: 2.4 },
];

// wind blows left to right: swing further right than left, ease in and out of each sway
const swing = (amp: number, at = HEART) => `0 ${at}; ${amp} ${at}; ${-amp * 0.45} ${at}; ${amp * 0.6} ${at}; 0 ${at}`;
const SPLINES = "0.45 0 0.55 1; 0.45 0 0.55 1; 0.45 0 0.55 1; 0.45 0 0.55 1";

const useReducedMotion = () => {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const on = () => setReduced(mq.matches);
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);
  return reduced;
};

const WindKamon = ({ className = "" }: { className?: string }) => {
  const still = useReducedMotion();
  const rot = (values: string, dur: number, delay = 0) =>
    still ? null : (
      <animateTransform attributeName="transform" type="rotate" values={values} dur={`${dur}s`} begin={`${-delay}s`}
        repeatCount="indefinite" calcMode="spline" keyTimes="0; 0.3; 0.6; 0.82; 1" keySplines={SPLINES} />
    );

  return (
    <svg className={`wind ${className}`} viewBox="4 2 56 64" preserveAspectRatio="xMidYMax meet" fill="none"
      stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" role="img" aria-label="A higanbana moving in the wind">
      {/* the whole flower leans from the root of the stem */}
      <g>
        {rot(swing(2.2, ROOT), 5.2)}
        <path d="M32 66 C33 56 31 46 32 36" strokeWidth="1.5" />
        {STAMENS.map((s, i) => (
          <g key={i}>
            {rot(swing(s.amp), s.dur, s.delay)}
            <path d={s.d} strokeWidth="0.9" />
            <circle cx={s.tip[0]} cy={s.tip[1]} r="1.1" fill="currentColor" stroke="none" />
          </g>
        ))}
        {PETALS.map((d, i) => (
          <g key={i}>
            {rot(swing(i < 2 ? 2.5 : 3.5), 2.2 + i * 0.25, i * 0.4)}
            <path d={d} strokeWidth="1.6" />
          </g>
        ))}
        <circle cx="32" cy="36" r="1.9" fill="currentColor" stroke="none" />
      </g>

      {/* pollen carried off by the gusts */}
      {!still &&
        POLLEN.map((p, i) => (
          <circle key={i} r=".7" fill="currentColor" stroke="none" opacity="0">
            <animate attributeName="cx" values={`${p.from[0]};${p.to[0]}`} dur={`${p.dur}s`} begin={`${p.delay}s`} repeatCount="indefinite" />
            <animate attributeName="cy" values={`${p.from[1]};${(p.from[1] + p.to[1]) / 2 - 6};${p.to[1]}`} dur={`${p.dur}s`} begin={`${p.delay}s`} repeatCount="indefinite" />
            <animate attributeName="opacity" values="0;.9;.6;0" keyTimes="0;.1;.6;1" dur={`${p.dur}s`} begin={`${p.delay}s`} repeatCount="indefinite" />
          </circle>
        ))}
    </svg>
  );
};

export default WindKamon;
