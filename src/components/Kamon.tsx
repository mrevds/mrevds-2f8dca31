/* Higanbana kamon — the brand mark. "kamon" from 48px up, "simple" below that */
const FLOWER = (
  <>
    <path d="M32 58 C31 51 33 43 32 36" strokeWidth="2.6" />
    <g strokeWidth="1.7">
      <path d="M32 36 C27 29 18 24 9 24" /><path d="M32 36 C28 26 22 17 15 12" /><path d="M32 36 C31 26 29 16 26 8" />
      <path d="M32 36 C37 29 46 24 55 24" /><path d="M32 36 C36 26 42 17 49 12" /><path d="M32 36 C33 26 35 16 38 8" />
    </g>
    <g strokeWidth="2.6">
      <path d="M32 36 C26 36 21 39 20 44 C22 42 25 42 26 44" /><path d="M32 36 C38 36 43 39 44 44 C42 42 39 42 38 44" />
      <path d="M32 36 C29 32 24 31 21 33 C23 33 25 34 25 36" /><path d="M32 36 C35 32 40 31 43 33 C41 33 39 34 39 36" />
    </g>
    <g fill="currentColor" stroke="none">
      <circle cx="32" cy="36" r="2.8" />
      <circle cx="9" cy="24" r="1.7" /><circle cx="15" cy="12" r="1.7" /><circle cx="26" cy="8" r="1.7" />
      <circle cx="55" cy="24" r="1.7" /><circle cx="49" cy="12" r="1.7" /><circle cx="38" cy="8" r="1.7" />
    </g>
  </>
);

const SIMPLE = (
  <>
    <path d="M32 56 L32 36" strokeWidth="5" />
    <g strokeWidth="4">
      <path d="M32 36 C26 29 19 24 11 24" /><path d="M32 36 C30 26 26 17 21 12" />
      <path d="M32 36 C38 29 45 24 53 24" /><path d="M32 36 C34 26 38 17 43 12" />
      <path d="M32 36 C26 37 22 40 22 45" /><path d="M32 36 C38 37 42 40 42 45" />
    </g>
    <circle cx="32" cy="36" r="5" fill="currentColor" stroke="none" />
  </>
);

type Props = { size?: number; variant?: "kamon" | "simple"; className?: string };

const Kamon = ({ size = 32, variant = "kamon", className = "" }: Props) => {
  const simple = variant === "simple";
  return (
    <svg
      className={`kamon ${className}`}
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="32" cy="32" r="29.5" strokeWidth={simple ? 4.5 : 2.6} />
      <g transform="translate(32 33) scale(.8) translate(-32 -34)">{simple ? SIMPLE : FLOWER}</g>
    </svg>
  );
};

export default Kamon;
