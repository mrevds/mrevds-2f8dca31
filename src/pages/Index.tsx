import { useEffect, useRef } from "react";
import WakaSection from "@/components/WakaSection";
import YandexMusicSection from "@/components/YandexMusicSection";
import MochiFace from "@/components/MochiFace";
import { SiGo, SiPostgresql, SiDocker, SiGit, SiRedis, SiLinux, SiPostman, SiVsco, SiGoland, SiGithub, SiFastapi } from "react-icons/si";
import { VscSymbolMethod } from "react-icons/vsc";

/* ------- inline SVG — spider lily (tokyo ghoul) ------- */

const SpiderLily = ({ size = 48 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" aria-hidden="true" fill="none">
    <g stroke="oklch(48% 0.18 28 / 1)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M24 40 L24 26" strokeWidth="1.5" />
      <path d="M24 26 Q14 18 8 22" strokeWidth="1.2" />
      <path d="M24 26 Q34 18 40 22" strokeWidth="1.2" />
      <path d="M24 26 Q14 28 10 34" strokeWidth="1.2" />
      <path d="M24 26 Q34 28 38 34" strokeWidth="1.2" />
      <path d="M24 26 Q16 22 12 16" strokeWidth="1" />
      <path d="M24 26 Q32 22 36 16" strokeWidth="1" />
      <path d="M8 22 Q12 20 16 24" strokeWidth="0.8" />
      <path d="M40 22 Q36 20 32 24" strokeWidth="0.8" />
      <path d="M10 34 Q14 30 18 32" strokeWidth="0.8" />
      <path d="M38 34 Q34 30 30 32" strokeWidth="0.8" />
    </g>
    <circle cx="24" cy="26" r="2.5" fill="oklch(48% 0.18 28 / 0.8)" />
  </svg>
);

const SpiderLilySmall = () => <SpiderLily size={28} />;

const MochiMini = () => <MochiFace size={24} />;
const MochiAvatar = () => <MochiFace size={100} />;

/* ------- data ------- */

type ToolItem = { icon: React.ReactNode; label: string; meta: string };

const tools: ToolItem[] = [
  { icon: <SiGo />, label: "Go", meta: "backend · services" },
  { icon: <SiPostgresql />, label: "PostgreSQL", meta: "data · sql" },
  { icon: <SiDocker />, label: "Docker", meta: "containers" },
  { icon: <SiFastapi />, label: "REST API", meta: "json · http" },
  { icon: <VscSymbolMethod />, label: "gRPC", meta: "proto · rpc" },
  { icon: <SiGit />, label: "Git", meta: "vcs" },
  { icon: <SiRedis />, label: "Redis", meta: "cache · queue" },
  { icon: <SiLinux />, label: "Linux", meta: "os · bash" },
  { icon: <SiPostman />, label: "Postman", meta: "testing" },
  { icon: <SiVsco />, label: "VS Code", meta: "editor · daily" },
  { icon: <SiGoland />, label: "GoLand", meta: "ide" },
  { icon: <SiGithub />, label: "GitHub", meta: "ci · prs" },
];

const stripItems: string[] = [
  "backend · go · services",
  "sql · postgresql · data",
  "docker · containers · infra",
  "rest · grpc · protocols",
  "git · github · ci/cd",
  "linux · bash · devops",
];

const contacts: { href: string; label: string; jp: string }[] = [
  { href: "https://github.com/mrevds", label: "github", jp: "ぎっとはぶ" },
  { href: "https://t.me/mrevds", label: "telegram", jp: "てれぐらむ" },
  { href: "https://linkedin.com/in/mrevds", label: "linkedin", jp: "りんくといん" },
];

const Index = () => {
  const nameLettersRef = useRef<HTMLHeadingElement>(null);

  /* scroll reveal */
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    document.querySelectorAll(".reveal").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  /* letter intro animation */
  useEffect(() => {
    const root = nameLettersRef.current;
    if (!root) return;
    const letters = root.querySelectorAll<HTMLElement>(".letter, .accent");
    letters.forEach((l, i) => {
      l.style.opacity = "0";
      l.style.transform = "translateY(30px) scale(0.7)";
      l.style.transition = "opacity .55s ease, transform .55s cubic-bezier(.34,1.6,.64,1)";
      l.style.transitionDelay = i * 0.06 + "s";
      requestAnimationFrame(() =>
        requestAnimationFrame(() => {
          l.style.opacity = "1";
          l.style.transform = "translateY(0) scale(1)";
        })
      );
    });
  }, []);

  /* section background tracking */
  useEffect(() => {
    const sections = document.querySelectorAll<HTMLElement>("[data-section]");
    const visible = new Map<Element, number>();
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          visible.set(e.target, e.intersectionRatio);
        });
        let best: Element | null = null;
        let bestRatio = 0;
        for (const [el, r] of visible) {
          if (r > bestRatio) { bestRatio = r; best = el; }
        }
        document.documentElement.dataset.section = best?.getAttribute("data-section") ?? "";
      },
      { threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1] }
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  return (
    <>
      <div className="decor" aria-hidden="true">
        <div className="lily l1"><SpiderLily /></div>
        <div className="lily l2"><SpiderLilySmall /></div>
        <div className="lily l3"><SpiderLily /></div>
        <div className="lily l4"><SpiderLilySmall /></div>
      </div>
      <div className="bg-scroll" aria-hidden="true" />

      <div className="page">
        {/* NAV */}
        <nav className="nav" aria-label="primary">
          <div className="brand">
            <span className="mochi-mini"><MochiMini /></span>
            <span>mrevds</span>
          </div>
          <ul>
            <li><a href="#about">about</a></li>
            <li><a href="#stack">stack</a></li>
            <li><a href="#music">music</a></li>
            <li><a href="#work">work</a></li>
            <li><a href="#say-hi">say hi</a></li>
          </ul>
          <div className="status"><span className="dot"></span>online</div>
        </nav>

        {/* HERO */}
        <header className="hero" data-section="hero">
          <span className="bubble">
            <span className="accent">◆</span> denis muratbaev · backend
          </span>

          <h1 className="name" aria-label="Denis Muratbaev" ref={nameLettersRef}>
            <span className="row">
              <span className="letter">D</span>
              <span className="letter">e</span>
              <span className="letter">n</span>
              <span className="letter">i</span>
              <span className="letter">s</span>
            </span>
            <span className="row">
              <span className="accent">Muratbaev</span>
            </span>
            <span className="jp">デニス · backend · go</span>
          </h1>

          <div className="hero-row">
            <p className="lede">
              <strong>Backend developer</strong> based in Tashkent. I ship Go services at{" "}
              <span className="renesans">RENESANS</span> — APIs, data layers, and the infrastructure between.
              Clean architecture, careful with details, <em>steady delivery</em>.
            </p>

            <div className="hero-flower">
              <SpiderLily size={180} />
            </div>
          </div>

          <div className="hero-chips">
            <span className="pill">lo-fi · ambient</span>
            <span className="pill">tashkent</span>
            <span className="pill">utc+5</span>
            <span className="pill">manga · anime</span>
          </div>
        </header>

        {/* STRIP */}
        <div className="strip" aria-hidden="true">
          <div className="track">
            {[...stripItems, ...stripItems].map((s, i) => (
              <span className="item" key={i}>{s}</span>
            ))}
          </div>
        </div>

        {/* ABOUT */}
        <section className="block reveal" id="about" data-section="about">
          <div className="eyebrow"><span className="num">01</span> · about me · じこしょうかい</div>
          <h2>
            A little <span className="accent">about</span> me
            <span className="jp">わたしのこと</span>
          </h2>

          <div className="about-card">
            <div className="tape" />
            <div className="about-grid">
              <div>
                <p>
                  I care about <em>the why</em>. A bug that gets patched without understanding is a bug that
                  comes back — usually in <span className="hl-1">production</span>. I want to see the shape of
                  the problem before I write the fix.
                </p>
                <p>
                  I move at the pace the work needs — fast on what <span className="hl-2">matters</span>, slow on
                  what doesn't. I work best with people who draw the system on a whiteboard instead of describing
                  it for an hour.
                </p>
                <p>
                  Outside of work I notice the <span className="hl-3">small wins</span>: a manga chapter that
                  lands the cliffhanger, a clean <span className="kbd">git status</span>, a function that returns
                  the right thing on the first run.
                </p>
              </div>

              <div className="me-card">
                <div className="avatar"><MochiAvatar /></div>
                <div className="name">Denis · デニス</div>
                <div className="role">go developer</div>
                <ul className="facts">
                  {/* <li><span className="k">based</span><span>Tashkent 🇺🇿</span></li> */}
                  <li><span className="k">speaks</span><span>ru · en</span></li>
                  <li><span className="k">intake</span><span>manga · anime · lo-fi</span></li>
                  <li><span className="k">mood</span><span>genki ✦</span></li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* STACK */}
        <section className="block reveal" id="stack" data-section="stack">
          <div className="eyebrow"><span className="num">02</span> · my toolbox · どうぐばこ</div>
          <h2>
            Tools I <span className="accent">play with</span>
            <span className="jp">あそぶ どうぐ</span>
          </h2>

          <div className="crests">
            {tools.map((t, i) => (
              <div className="crest" key={t.label} style={{ "--i": i } as React.CSSProperties}>
                <div className="crest-icon">{t.icon}</div>
                <div className="crest-label">{t.label}</div>
                <div className="crest-meta">{t.meta}</div>
              </div>
            ))}
          </div>
        </section>

        {/* WAKATIME */}
        <div data-section="waka"><WakaSection /></div>

        {/* YANDEX MUSIC */}
        <div data-section="music"><YandexMusicSection /></div>

        {/* WORK */}
        <section className="block reveal" id="work" data-section="work">
          <div className="eyebrow"><span className="num">05</span> · where i show up · しごと</div>
          <h2>
            Currently <span className="accent">shipping</span> at —
            <span className="jp">いま はたらいてる</span>
          </h2>

          <article className="company-card">
            <div className="logo-wrap">
              <img src="/assets/renesans-logo.png" alt="Renesans logo" />
            </div>
            <div>
              <div className="meta">// 2026 — present · backend</div>
              <h3>Renesans<span className="accent"></span></h3>
              <p className="role">
                Writing services in Go, designing little corners of the API, learning the codebase one PR at a time.
                A place where I get to ask <span className="hl">"why?"</span> and someone actually answers.
              </p>
            </div>
            <span className="stamp">★ ima koko ★</span>
          </article>
        </section>

        {/* CONTACTS */}
        <section className="block reveal" id="say-hi" data-section="sayhi">
          <div className="eyebrow"><span className="num">06</span> · say hi · よろしく</div>
          <h2>
            Let's <span className="accent">talk</span>
            <span className="jp">はなしましょう</span>
          </h2>
          <p className="contact-intro">
            I'm <strong>@mrevds</strong> basically everywhere. Down for a code review, a playlist swap, or just to say hi 👋
          </p>

          <div className="contact-grid">
            {contacts.map((c) => (
              <a key={c.label} className="contact" href={c.href} target="_blank" rel="noopener noreferrer">
                <div className="label">// {c.label}</div>
                <div className="handle">@mrevds</div>
                <div className="jp">{c.jp}</div>
                <div className="arrow-ico">↗</div>
              </a>
            ))}
          </div>
        </section>

        <footer>
          <div className="made">
            made with <span className="heart">♡</span> mochi · denis · 2026
          </div>
          <div>no cookies · no analytics · just ふわふわ vibes</div>
        </footer>
      </div>

    </>
  );
};

export default Index;
