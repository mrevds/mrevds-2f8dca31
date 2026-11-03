import Kamon from "@/components/Kamon";
import WindKamon from "@/components/WindKamon";
import Chapter from "@/components/Chapter";
import WakaSection from "@/components/WakaSection";
import YandexMusicSection from "@/components/YandexMusicSection";
import LeetCodeSection from "@/components/LeetCodeSection";
import ClaudeMark from "@/components/ClaudeMark";
import { PlateFace, PlateNodes, PlatePath, Schematic } from "@/components/Drawings";

const toc: [string, string, string][] = [
  ["01", "The why", "#why"],
  ["02", "The stack", "#stack"],
  ["03", "The hours", "#hours"],
  ["04", "Practice", "#practice"],
  ["05", "Night shift", "#music"],
  ["06", "Current arc", "#work"],
  ["07", "Say hi", "#contact"],
];

const stack = ["Go", "PostgreSQL", "Redis", "gRPC", "REST", "Docker", "Linux", "GoLand", "GitHub"];

const notes = [
  ["Understand first", "A bug patched without understanding comes back. Usually in production."],
  ["Shape before code", "I sketch the problem before I write the fix."],
  ["Speed where it counts", "Fast on what matters, unhurried on what doesn’t."],
  ["Draw, don’t explain", "Five minutes at a whiteboard beats an hour of talking."],
];

const contacts = [
  { href: "https://t.me/mrevds", label: "Telegram @mrevds", primary: true },
  { href: "https://github.com/mrevds", label: "GitHub" },
  { href: "https://linkedin.com/in/mrevds", label: "LinkedIn" },
];

const Index = () => (
  <>
    {/* hand-drawn wobble shared by every line illustration */}
    <svg width="0" height="0" className="defs" aria-hidden="true">
      <filter id="rough">
        <feTurbulence type="fractalNoise" baseFrequency="0.03" numOctaves="2" seed="4" />
        <feDisplacementMap in="SourceGraphic" scale="1.8" />
      </filter>
    </svg>

    <div className="wrap">
      <nav className="nav" aria-label="Primary">
        <a className="brand" href="#top">
          <Kamon size={30} />
          <span>Denis Muratbaev</span>
        </a>
        <ul>
          <li><a href="#why">Chapters</a></li>
          <li><a href="#stack">Stack</a></li>
          <li><a href="#music">Music</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
        <a className="btn btn-ink btn-small" href="#contact">Say hi</a>
      </nav>

      {/* PROLOGUE */}
      <header className="prologue" id="top">
        <div className="prologue-text">
          <p className="kicker">Prologue · Tashkent, 2026</p>
          <h1>
            A backend developer, told in <em>seven chapters</em>
          </h1>
          <p className="lede">
            I’m Denis. I build Go services at Renesans: APIs, data and the infrastructure between them.
          </p>
          <div className="actions">
            <a className="btn btn-ink" href="#why">Start reading</a>
            <a className="btn btn-line" href="https://t.me/mrevds" target="_blank" rel="noopener noreferrer">
              Telegram @mrevds
            </a>
          </div>
          <ol className="toc">
            {toc.map(([n, title, href]) => (
              <li key={n}><a href={href}><span>{n}</span>{title}</a></li>
            ))}
          </ol>
        </div>
        <div className="hero-mark-wrap">
          <WindKamon className="hero-mark" />
          <span className="hero-jp" aria-hidden="true">デニス</span>
          <span className="hero-cap">彼岸花 · higanbana</span>
        </div>
      </header>

      <main>
        {/* CH 1 */}
        <section id="why">
          <Chapter n={1} title="The why" sub="How I work" genre="four notes" plate="var(--oat)" drawing={<PlateFace />} />
          <div className="chapter-body">
            <ol className="notes">
              {notes.map(([title, text], i) => (
                <li key={title}>
                  <span className="note-n">{String(i + 1).padStart(2, "0")}</span>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* CH 2 */}
        <section id="stack">
          <Chapter n={2} title="The stack" sub="What a request passes through" genre="a system diagram" plate="var(--sky)" drawing={<PlateNodes />} />
          <div className="chapter-body">
            <div className="schematic">
              <Schematic />
              <ul className="legend">
                {stack.map((s) => <li key={s}>{s}</li>)}
                <li className="legend-ai"><ClaudeMark size={14} />Claude Code</li>
              </ul>
            </div>
          </div>
        </section>

        <WakaSection />
        <LeetCodeSection />
        <YandexMusicSection />

        {/* CH 5 */}
        <section id="work">
          <Chapter n={6} title="Current arc" sub="Backend at Renesans, 2026 — now" genre="an essay" plate="var(--oat)" drawing={<PlatePath />} />
          <div className="chapter-body">
            <p className="quote">
              Go services, small corners of the API, one pull request at a time. A team where{" "}
              <mark>“why?”</mark> gets an answer.
            </p>
            <div className="byline">
              <img src="/assets/renesans-logo.png" alt="Renesans logo" width={44} height={44} />
              <div>
                <b>Renesans</b>
                <span>Tashkent · backend team</span>
              </div>
            </div>
          </div>
        </section>

        {/* EPILOGUE */}
        <section className="epilogue" id="contact">
          <div className="ch-no">Chapter 07 · Epilogue</div>
          <div className="tbc" aria-hidden="true">つづく</div>
          <h2 className="sr-only">Say hi</h2>
          <p>Open to code reviews, playlist swaps and short hellos.</p>
          <div className="actions">
            {contacts.map((c) => (
              <a key={c.href} className={`btn ${c.primary ? "btn-ink" : "btn-line"}`} href={c.href} target="_blank" rel="noopener noreferrer">
                {c.label}
              </a>
            ))}
          </div>
        </section>
      </main>

      <footer className="footer">
        <Kamon size={28} />
        <span>Denis Muratbaev · Tashkent · 2026</span>
        <span className="footer-right">
          <ClaudeMark size={14} /> Built with Claude Code · data from WakaTime, LeetCode and Yandex Music, daily
        </span>
      </footer>
    </div>
  </>
);

export default Index;
