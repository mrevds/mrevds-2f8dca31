export type MochiMood = "genki" | "happy" | "surprised" | "sleepy";

export interface MochiFaceProps {
  mood: MochiMood;
  size?: number;
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
  blink?: boolean;
  antenna?: boolean;
}

const eyes: Record<MochiMood, React.ReactNode> = {
  genki: (
    <>
      <ellipse className="blink" cx="38" cy="56" rx="3.2" ry="5" fill="var(--ink)" />
      <ellipse className="blink" cx="62" cy="56" rx="3.2" ry="5" fill="var(--ink)" />
    </>
  ),
  happy: (
    <>
      <path d="M 31 54 Q 38 47 45 54" stroke="var(--ink)" strokeWidth="3" fill="none" strokeLinecap="round" />
      <path d="M 55 54 Q 62 47 69 54" stroke="var(--ink)" strokeWidth="3" fill="none" strokeLinecap="round" />
    </>
  ),
  surprised: (
    <>
      <circle cx="38" cy="56" r="5" fill="var(--ink)" />
      <circle cx="62" cy="56" r="5" fill="var(--ink)" />
    </>
  ),
  sleepy: (
    <>
      <path d="M 30 58 Q 38 62 46 58" stroke="var(--ink)" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <path d="M 54 58 Q 62 62 70 58" stroke="var(--ink)" strokeWidth="2.5" fill="none" strokeLinecap="round" />
    </>
  ),
};

const mouths: Record<MochiMood, React.ReactNode> = {
  genki: <path d="M 44 66 Q 50 72 56 66" stroke="var(--ink)" strokeWidth="2.5" fill="none" strokeLinecap="round" />,
  happy: <path d="M 40 66 Q 50 76 60 66" stroke="var(--ink)" strokeWidth="2.5" fill="none" strokeLinecap="round" />,
  surprised: <ellipse cx="50" cy="70" rx="4" ry="5" fill="var(--ink)" />,
  sleepy: <path d="M 46 70 Q 50 72 54 70" stroke="var(--ink)" strokeWidth="2" fill="none" strokeLinecap="round" />,
};

const MochiFace = ({ mood, size = 200, className, style, onClick, blink = true, antenna = true }: MochiFaceProps) => (
  <svg
    viewBox="0 0 100 100"
    width={size}
    height={size}
    className={className}
    style={style}
    onClick={onClick}
    aria-hidden="true"
  >
    <g>
      {/* shadow */}
      <ellipse cx="50" cy="92" rx="22" ry="3" fill="rgba(0,0,0,0.08)" />

      {/* body */}
      <ellipse cx="50" cy="58" rx="36" ry="32" fill="var(--paper)" stroke="var(--ink)" strokeWidth="2.5" />

      {/* blush */}
      <ellipse cx="28" cy="68" rx="7" ry="4" fill="var(--sakura)" opacity="0.75" />
      <ellipse cx="72" cy="68" rx="7" ry="4" fill="var(--sakura)" opacity="0.75" />

      {/* arms */}
      <ellipse cx="14" cy="62" rx="5" ry="4" fill="var(--paper)" stroke="var(--ink)" strokeWidth="2" />
      <ellipse cx="86" cy="62" rx="5" ry="4" fill="var(--paper)" stroke="var(--ink)" strokeWidth="2" />

      {/* eyes */}
      {blink ? eyes[mood] : eyes[mood]}

      {/* eye highlights */}
      <circle cx="37" cy="54" r="1.1" fill="white" />
      <circle cx="61" cy="54" r="1.1" fill="white" />

      {/* mouth */}
      {mouths[mood]}

      {/* antenna */}
      {antenna && (
        <>
          <path d="M 50 27 Q 52 22 55 24" stroke="var(--ink)" strokeWidth="2.5" fill="none" strokeLinecap="round" />
          <circle cx="55" cy="24" r="2.2" fill="var(--sakura)" stroke="var(--ink)" strokeWidth="2" />
        </>
      )}
    </g>
  </svg>
);

export default MochiFace;
