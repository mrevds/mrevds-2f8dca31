import { useCallback, useEffect, useRef, useState } from "react";
import WakaSection from "@/components/WakaSection";
import YandexMusicSection from "@/components/YandexMusicSection";
import MochiFace, { type MochiMood } from "@/components/MochiFace";
import MochiPet from "@/components/MochiPet";
import { SiGo, SiPostgresql, SiDocker, SiGit, SiRedis, SiLinux, SiPostman, SiVsco, SiGoland, SiGithub, SiFastapi } from "react-icons/si";
import { VscSymbolMethod } from "react-icons/vsc";

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

const MochiMini = () => <MochiFace mood="genki" size={28} blink antenna={false} />;

const MochiAvatar = () => <MochiFace mood="genki" size={100} blink antenna={false} />;

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
  const mochiRef = useRef<HTMLDivElement>(null);
  const [mood, setMood] = useState<MochiMood>("genki");
  const [clickBurst, setClickBurst] = useState<string | null>(null);
  const burstTimer = useRef<ReturnType<typeof setTimeout>>();

  /* mood cycle */
  useEffect(() => {
    const moods: MochiMood[] = ["genki", "happy", "surprised"];
    const t = setInterval(() => {
      setMood(moods[Math.floor(Math.random() * moods.length)]);
    }, 5000 + Math.random() * 4000);
    return () => clearInterval(t);
  }, []);

  /* mochi click */
  const handleMochiClick = useCallback(() => {
    const emojis = ["♡", "✦", "☆", "♥", "♪", "✿"];
    setClickBurst(emojis[Math.floor(Math.random() * emojis.length)]);
    clearTimeout(burstTimer.current);
    burstTimer.current = setTimeout(() => setClickBurst(null), 600);
    setMood("happy");
    setTimeout(() => setMood("genki"), 800);
  }, []);

  /* mochi parallax tilt */
  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const el = mochiRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const cx = r.left + r.width / 2;
    const cy = r.top + r.height / 2;
    const dx = (e.clientX - cx) / r.width;
    const dy = (e.clientY - cy) / r.height;
    el.style.transform = `perspective(400px) rotateY(${dx * -12}deg) rotateX(${dy * 12}deg)`;
  }, []);

  const handleMouseLeave = useCallback(() => {
    const el = mochiRef.current;
    if (el) el.style.transform = "";
  }, []);

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
        <div className="star s1"><StarPink /></div>
        <div className="star s2"><StarButter /></div>
        <div className="star s3"><StarMatcha /></div>
        <div className="star s4"><StarTaro /></div>
      </div>
      <div className="bg-scroll" aria-hidden="true" />

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
            <li><a href="#music">music</a></li>
            <li><a href="#work">work</a></li>
            <li><a href="#say-hi">say hi</a></li>
          </ul>
          <div className="status"><span className="dot"></span>genki!</div>
        </nav>

        {/* HERO */}
        <header className="hero" data-section="hero">
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

            <div
              ref={mochiRef}
              className="hero-mochi"
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              onClick={handleMochiClick}
            >
              <div className="mochi-bounce-wrap">
                <MochiFace mood={mood} size={200} blink={mood !== "sleepy"} />
              </div>
              <div className="ground"></div>
              {clickBurst && <span className="mochi-burst" key={clickBurst + Date.now()}>{clickBurst}</span>}
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
        <section className="block reveal" id="about" data-section="about">
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
        <section className="block reveal" id="stack" data-section="stack">
          <div className="eyebrow"><span className="num">02</span> · my toolbox · どうぐばこ</div>
          <h2>
            Tools I <span className="accent">play with</span>
            <span className="jp">あそぶ どうぐ</span>
          </h2>

          <div className="polaroids">
            {tools.map((t, i) => (
              <div className="polaroid" key={t.label} style={{ "--i": i } as React.CSSProperties}>
                <div className="polaroid-pic">
                  <span className="polaroid-icon">{t.icon}</span>
                </div>
                <div className="polaroid-label">{t.label}</div>
                <div className="polaroid-meta">{t.meta}</div>
                <div className="polaroid-shadow" aria-hidden="true" />
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

      <MochiPet />
    </>
  );
};

export default Index;
