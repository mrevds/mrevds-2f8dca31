import SiteLink from "@/components/SiteLink";
import { projectsHref } from "@/lib/site";
import WindKamon from "@/components/WindKamon";
import Chapter from "@/components/Chapter";
import { PlateFace, PlatePath } from "@/components/Drawings";

const pages = (): [string, string, string][] => [
  ["Stack", "/stack", "and practice"],
  ["Projects", projectsHref(), "built on my own"],
  ["Music", "/music", "night shift"],
  ["Say hi", "#contact", "contacts"],
];

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
    <header className="prologue">
      <div className="prologue-text">
        <p className="kicker">Prologue · Tashkent, 2026</p>
        <h1>
          A backend developer, told in <em>a few pages</em>
        </h1>
        <p className="lede">
          I’m Denis. I build Go services at Renesans: APIs, data and the infrastructure between them.
        </p>
        <div className="actions">
          <SiteLink className="btn btn-ink" to={projectsHref()}>See my projects</SiteLink>
          <a className="btn btn-line" href="https://t.me/mrevds" target="_blank" rel="noopener noreferrer">
            Telegram @mrevds
          </a>
        </div>
        <ul className="toc">
          {pages().map(([title, href, sub]) => (
            <li key={title}>
              {href.startsWith("#") ? <a href={href}><span>→</span>{title}</a> : <SiteLink to={href}><span>→</span>{title}</SiteLink>}
              <small>{sub}</small>
            </li>
          ))}
        </ul>
      </div>
      <div className="hero-mark-wrap">
        <WindKamon className="hero-mark" />
        <span className="hero-jp" aria-hidden="true">デニス</span>
        <span className="hero-cap">彼岸花 · higanbana</span>
      </div>
    </header>

    <main>
      <section id="why">
        <Chapter label="About" title="The why" sub="How I work" genre="four notes" plate="var(--oat)" drawing={<PlateFace />} />
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

      <section id="work">
        <Chapter label="Now" title="Current arc" sub="Backend at Renesans, 2026 — now" genre="an essay" plate="var(--oat)" drawing={<PlatePath />} />
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

      <section className="epilogue" id="contact">
        <div className="ch-no">Contact</div>
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
  </>
);

export default Index;
