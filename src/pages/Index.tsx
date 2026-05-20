import { useEffect, useRef } from "react";
import WakaSection from "@/components/WakaSection";

/* ------- inline SVG icons used in the design ------- */

const StarPink = () => (
  <svg width="38" height="38" viewBox="0 0 40 40" aria-hidden="true">
    <path
      d="M20 4 L23 17 L36 20 L23 23 L20 36 L17 23 L4 20 L17 17 Z"
      fill="oklch(86% 0.078 12)"
      stroke="oklch(36% 0.045 35)"
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
  </svg>
);

const StarButter = () => (
  <svg width="32" height="32" viewBox="0 0 40 40" aria-hidden="true">
    <circle cx="20" cy="20" r="14" fill="oklch(92% 0.085 95)" stroke="oklch(36% 0.045 35)" strokeWidth="1.5" />
    <circle cx="20" cy="20" r="5" fill="oklch(36% 0.045 35)" />
  </svg>
);

const StarMatcha = () => (
  <svg width="34" height="34" viewBox="0 0 40 40" aria-hidden="true">
    <path
      d="M20 4 L23 17 L36 20 L23 23 L20 36 L17 23 L4 20 L17 17 Z"
      fill="oklch(87% 0.06 155)"
      stroke="oklch(36% 0.045 35)"
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
  </svg>
);

const StarTaro = () => (
  <svg width="36" height="36" viewBox="0 0 40 40" aria-hidden="true">
    <path
      d="M20 6 Q24 14 32 14 Q24 18 24 28 Q20 22 12 22 Q20 18 20 6 Z"
      fill="oklch(85% 0.06 295)"
      stroke="oklch(36% 0.045 35)"
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
  </svg>
);

const MochiMini = () => (
  <svg viewBox="0 0 100 100" width="28" height="28" aria-hidden="true">
    <ellipse cx="50" cy="92" rx="22" ry="3" fill="rgba(0,0,0,0.08)" />
    <ellipse cx="50" cy="56" rx="34" ry="30" fill="oklch(99% 0.008 75)" stroke="oklch(36% 0.045 35)" strokeWidth="3" />
    <ellipse className="blink" cx="40" cy="55" rx="3" ry="5" fill="oklch(36% 0.045 35)" />
    <ellipse className="blink" cx="60" cy="55" rx="3" ry="5" fill="oklch(36% 0.045 35)" />
    <ellipse cx="33" cy="66" rx="4" ry="2.5" fill="oklch(86% 0.078 12)" opacity="0.85" />
    <ellipse cx="67" cy="66" rx="4" ry="2.5" fill="oklch(86% 0.078 12)" opacity="0.85" />
    <path d="M 45 64 Q 50 70 55 64" stroke="oklch(36% 0.045 35)" strokeWidth="2.5" fill="none" strokeLinecap="round" />
  </svg>
);

const MochiBig = () => (
  <svg viewBox="0 0 100 100" width="200" height="200" className="mochi-svg" style={{ position: "relative", zIndex: 1 }}>
    <g className="mochi-bounce">
      <ellipse cx="50" cy="58" rx="36" ry="32" fill="oklch(99% 0.008 75)" stroke="oklch(36% 0.045 35)" strokeWidth="2.5" />
      <ellipse cx="32" cy="68" rx="6" ry="3.5" fill="oklch(86% 0.078 12)" opacity="0.85" />
      <ellipse cx="68" cy="68" rx="6" ry="3.5" fill="oklch(86% 0.078 12)" opacity="0.85" />
      <ellipse className="blink" cx="38" cy="56" rx="3.2" ry="5" fill="oklch(36% 0.045 35)" />
      <ellipse className="blink" cx="62" cy="56" rx="3.2" ry="5" fill="oklch(36% 0.045 35)" />
      <circle cx="37" cy="54" r="1.1" fill="white" />
      <circle cx="61" cy="54" r="1.1" fill="white" />
      <path d="M 44 66 Q 50 72 56 66" stroke="oklch(36% 0.045 35)" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <ellipse cx="14" cy="62" rx="5" ry="4" fill="oklch(99% 0.008 75)" stroke="oklch(36% 0.045 35)" strokeWidth="2.5" />
      <ellipse cx="86" cy="62" rx="5" ry="4" fill="oklch(99% 0.008 75)" stroke="oklch(36% 0.045 35)" strokeWidth="2.5" />
      <path d="M 50 27 Q 52 22 55 24" stroke="oklch(36% 0.045 35)" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <circle cx="55" cy="24" r="2.2" fill="oklch(86% 0.078 12)" stroke="oklch(36% 0.045 35)" strokeWidth="2" />
    </g>
  </svg>
);

const MochiAvatar = () => (
  <svg viewBox="0 0 100 100" width="100" height="100" aria-hidden="true">
    <ellipse cx="50" cy="58" rx="34" ry="30" fill="oklch(99% 0.008 75)" stroke="oklch(36% 0.045 35)" strokeWidth="3" />
    <ellipse cx="32" cy="68" rx="6" ry="3.5" fill="oklch(86% 0.078 12)" opacity="0.85" />
    <ellipse cx="68" cy="68" rx="6" ry="3.5" fill="oklch(86% 0.078 12)" opacity="0.85" />
    <ellipse className="blink" cx="38" cy="56" rx="3.2" ry="5" fill="oklch(36% 0.045 35)" />
    <ellipse className="blink" cx="62" cy="56" rx="3.2" ry="5" fill="oklch(36% 0.045 35)" />
    <circle cx="37" cy="54" r="1.1" fill="white" />
    <circle cx="61" cy="54" r="1.1" fill="white" />
    <path d="M 44 66 Q 50 72 56 66" stroke="oklch(36% 0.045 35)" strokeWidth="2.5" fill="none" strokeLinecap="round" />
  </svg>
);

/* ------- data ------- */

const charms: { emoji: string; label: string; meta: string }[] = [
  { emoji: "🐹", label: "Go", meta: "main lang" },
  { emoji: "🐘", label: "PostgreSQL", meta: "SQL · queries" },
  { emoji: "🐳", label: "Docker", meta: "container life" },
  { emoji: "🌐", label: "REST API", meta: "json all day" },
  { emoji: "🚀", label: "gRPC", meta: "proto buf!" },
  { emoji: "🌿", label: "Git", meta: "commit chaos" },
  { emoji: "🔴", label: "Redis", meta: "cache me" },
  { emoji: "🐧", label: "Linux", meta: "bash + vibes" },
  { emoji: "📮", label: "Postman", meta: "poke endpoints" },
  { emoji: "💻", label: "VS Code", meta: "daily driver" },
  { emoji: "⚙️", label: "GoLand", meta: "sometimes" },
  { emoji: "🐙", label: "GitHub", meta: "push & pray" },
];

const stripItems: { icon: string; jp: string; en: string }[] = [
  { icon: "🍡", jp: "ふわふわ", en: "soft code" },
  { icon: "✦", jp: "きらきら", en: "sparkly tests" },
  { icon: "♡", jp: "ぴょん", en: "bouncy APIs" },
  { icon: "🎧", jp: "しんしん", en: "lo-fi loops" },
  { icon: "🐹", jp: "ごー", en: "go go go" },
];

const contacts: { href: string; label: string; jp: string }[] = [
  { href: "https://github.com/mrevds", label: "github", jp: "ぎっとはぶ" },
  { href: "https://t.me/mrevds", label: "telegram", jp: "てれぐらむ" },
  { href: "https://linkedin.com/in/mrevds", label: "linkedin", jp: "りんくといん" },
];

/* ------- name letters for intro animation ------- */

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

  /* mochi giggle on click */
  useEffect(() => {
    const handlers: Array<() => void> = [];
    document.querySelectorAll<SVGSVGElement>(".mochi-svg, .mochi-mini svg").forEach((svg) => {
      svg.style.cursor = "pointer";
      const handler = () => {
        svg.style.transition = "transform .4s cubic-bezier(.34,1.6,.64,1)";
        svg.style.transform = "scale(1.15) rotate(-8deg)";
        setTimeout(() => {
          svg.style.transform = "";
        }, 350);
      };
      svg.addEventListener("click", handler);
      handlers.push(() => svg.removeEventListener("click", handler));
    });
    return () => handlers.forEach((off) => off());
  }, []);

  return (
    <>
      <div className="decor" aria-hidden="true">
        <div className="star s1"><StarPink /></div>
        <div className="star s2"><StarButter /></div>
        <div className="star s3"><StarMatcha /></div>
        <div className="star s4"><StarTaro /></div>
      </div>

      <div className="page">
        {/* NAV */}
        <nav className="nav" aria-label="primary">
          <div className="brand">
            <span className="mochi-mini"><MochiMini /></span>
            <span><span style={{ color: "var(--sakura-2)" }}>@</span>mrevds</span>
          </div>
          <ul>
            <li><a href="#about">about</a></li>
            <li><a href="#stack">stack</a></li>
            <li><a href="#work">work</a></li>
            <li><a href="#say-hi">say hi</a></li>
          </ul>
          <div className="status"><span className="dot"></span>genki!</div>
        </nav>

        {/* HERO */}
        <header className="hero">
          <span className="bubble">
            <span className="jp">やあ!</span> hi, you found me &nbsp;✨
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
              <span style={{ position: "relative" }}>
                <span className="sparkle" style={{ top: "-10px", right: "-30px" }}>✦</span>
              </span>
            </span>
            <span className="jp">デニス · じゅにあ ごー でべろっぱー</span>
          </h1>

          <div className="hero-row">
            <p className="lede">
              <strong>Backend developer</strong> based in Tashkent. I ship Go services at{" "}
              <span className="renesans">RENESANS</span> — APIs, data layers, and the infrastructure between.
              Clean architecture, careful with details, <em>steady delivery</em>.
            </p>

            <div className="hero-mochi">
              <MochiBig />
              <div className="ground"></div>
            </div>
          </div>

          <div className="hero-chips">
            <span className="pill p1">🎧 lo-fi loops</span>
            <span className="pill p2">📍 tashkent</span>
            <span className="pill p3">⏰ utc+5</span>
            <span className="pill p4">📺 manga + anime</span>
          </div>
        </header>

        {/* STRIP */}
        <div className="strip" aria-hidden="true">
          <div className="track">
            {[...stripItems, ...stripItems].map((s, i) => (
              <span className="item" key={i}>
                <span className="icon">{s.icon}</span> {s.jp} &nbsp;・&nbsp; {s.en}
              </span>
            ))}
          </div>
        </div>

        {/* ABOUT */}
        <section className="block reveal" id="about">
          <div className="eyebrow"><span className="num">01</span> · about me · じこしょうかい</div>
          <h2>
            A little <span className="accent">about</span> me
            <span className="jp">わたしのこと</span>
          </h2>

          <div className="about-card">
            <div className="tape">memo · ✿</div>
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
        <section className="block reveal" id="stack">
          <div className="eyebrow"><span className="num">02</span> · my toolbox · どうぐばこ</div>
          <h2>
            Tools I <span className="accent">play with</span>
            <span className="jp">あそぶ どうぐ</span>
          </h2>

          <div className="charms">
            {charms.map((c) => (
              <div className="charm" key={c.label}>
                <div className="emoji">{c.emoji}</div>
                <div className="label">{c.label}</div>
                <div className="meta">{c.meta}</div>
              </div>
            ))}
          </div>
        </section>

        {/* WAKATIME */}
        <WakaSection />

        {/* WORK */}
        <section className="block reveal" id="work">
          <div className="eyebrow"><span className="num">04</span> · where i show up · しごと</div>
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
        <section className="block reveal" id="say-hi">
          <div className="eyebrow"><span className="num">05</span> · say hi · よろしく</div>
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
