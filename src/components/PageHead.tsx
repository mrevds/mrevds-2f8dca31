import type { ReactNode } from "react";

/* Opening of an inner page: kicker, a big title with one red word, a line of intro */
const PageHead = ({ kicker, children, lede }: { kicker: string; children: ReactNode; lede: string }) => (
  <header className="page-head">
    <p className="kicker">{kicker}</p>
    <h1>{children}</h1>
    <p className="lede">{lede}</p>
  </header>
);

export default PageHead;
