/* Hand-drawn line illustrations. They share the #rough filter defined once in Index */

/* small line drawings for the chapter title plates */
const Line = ({ children }: { children: React.ReactNode }) => (
  <svg viewBox="0 0 120 120" aria-hidden="true">
    <g filter="url(#rough)" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
      {children}
    </g>
  </svg>
);

export const PlateFace = () => (
  <Line>
    <circle cx="60" cy="56" r="26" />
    <path d="M60 82 L60 104 M48 104 H72" />
    <path d="M50 50 h4 M66 50 h4 M52 66 C56 70 64 70 68 66" />
  </Line>
);
export const PlateNodes = () => (
  <Line>
    <rect x="18" y="22" width="34" height="24" rx="4" />
    <rect x="68" y="22" width="34" height="24" rx="4" />
    <rect x="43" y="76" width="34" height="24" rx="4" />
    <path d="M35 46 L55 76 M85 46 L65 76" />
  </Line>
);
export const PlateClock = () => (
  <Line>
    <circle cx="60" cy="62" r="34" />
    <path d="M60 62 L60 40 M60 62 L76 72" />
    <path d="M50 22 h20" />
  </Line>
);
export const PlateMoon = () => (
  <Line>
    <path d="M74 30 a28 28 0 1 0 22 44 a22 22 0 1 1 -22 -44z" />
    <path d="M24 96 h72" />
  </Line>
);
export const PlateChecks = () => (
  <Line>
    <path d="M24 34 l6 6 l10 -12 M24 62 l6 6 l10 -12 M24 90 l6 6 l10 -12" />
    <path d="M54 36 H96 M54 64 H90 M54 92 H80" />
  </Line>
);
export const PlatePath = () => (
  <Line>
    <path d="M20 90 C40 70 50 80 64 60 C76 44 88 46 100 28" />
    <path d="M88 28 h12 v12" />
    <circle cx="20" cy="90" r="4" />
  </Line>
);

/* the request path through a typical service, with packets running on the wires */
export const PlateShelf = () => (
  <Line>
    <path d="M16 96 H104 M16 60 H104" />
    <rect x="24" y="30" width="16" height="30" rx="2" />
    <rect x="46" y="22" width="14" height="38" rx="2" />
    <rect x="68" y="34" width="22" height="26" rx="2" />
    <rect x="26" y="68" width="24" height="28" rx="2" />
    <path d="M62 96 L70 68 L92 72 L88 96" />
  </Line>
);
export const PlateClip = () => (
  <Line>
    <rect x="30" y="26" width="60" height="76" rx="8" />
    <rect x="46" y="18" width="28" height="16" rx="5" />
    <path d="M42 58 H78 M42 72 H78 M42 86 H64" />
  </Line>
);
export const PlateWindow = () => (
  <Line>
    <rect x="14" y="24" width="92" height="74" rx="8" />
    <path d="M14 42 H106 M34 24 V42" />
    <path d="M60 58 C60 58 72 74 72 82 C72 89 66 94 60 94 C54 94 48 89 48 82 C48 74 60 58 60 58 Z" />
  </Line>
);
export const Schematic = () => (
  <svg className="schematic-svg" viewBox="0 0 1060 340" aria-hidden="true">
    <g className="wires">
      <path d="M150 170 H380" />
      <path d="M600 150 C700 150 700 70 800 70" />
      <path d="M600 170 H800" />
      <path d="M600 190 C700 190 700 270 800 270" />
    </g>
    <g className="wire-labels">
      <text x="230" y="160">REST · json</text>
      <text x="660" y="96">SQL</text>
      <text x="672" y="162">gRPC</text>
      <text x="652" y="262">cache</text>
    </g>
    <circle className="packet" r="5">
      <animateMotion dur="2.4s" repeatCount="indefinite" path="M150 170 H380 M600 150 C700 150 700 70 800 70" />
    </circle>
    <circle className="packet" r="5">
      <animateMotion dur="2.4s" begin="1.2s" repeatCount="indefinite" path="M600 170 H800" />
    </circle>
    <g className="node" transform="translate(30 140)"><rect width="120" height="60" rx="10" /><text x="20" y="28">client</text><text className="sub" x="20" y="46">web · mobile</text></g>
    <g className="node main" transform="translate(380 110)">
      <rect width="220" height="120" rx="14" />
      <text x="24" y="40" className="title">go service</text>
      <text x="24" y="66" className="sub">handlers · domain · repo</text>
      <text x="24" y="96" className="ok">200 OK · 12 ms</text>
    </g>
    <g className="node" transform="translate(800 40)"><rect width="200" height="60" rx="10" /><text x="20" y="28">PostgreSQL</text><text className="sub" x="20" y="46">data · migrations</text></g>
    <g className="node" transform="translate(800 140)"><rect width="200" height="60" rx="10" /><text x="20" y="28">other service</text><text className="sub" x="20" y="46">protobuf</text></g>
    <g className="node" transform="translate(800 240)"><rect width="200" height="60" rx="10" /><text x="20" y="28">Redis</text><text className="sub" x="20" y="46">cache · queues</text></g>
  </svg>
);
