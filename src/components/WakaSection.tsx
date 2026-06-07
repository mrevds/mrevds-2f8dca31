import {
  SiGo, SiPostgresql, SiTypescript, SiLinux, SiVsco,
  SiMarkdown, SiGnubash, SiNeovim, SiApple,
} from "react-icons/si";
import waka from "@/data/wakatime.json";
import MochiFace from "./MochiFace";

type WakaItem = { name: string; percent: number; text: string; color?: string };
type WakaData = {
  ok: boolean;
  fetchedAt: string | null;
  humanReadableTotal?: string;
  humanReadableDailyAverage?: string;
  languages?: WakaItem[];
  editors?: WakaItem[];
  operatingSystems?: WakaItem[];
  projects?: WakaItem[];
  categories?: WakaItem[];
  allTime?: string | null;
  allTimeLanguages?: WakaItem[];
  allTimeEditors?: WakaItem[];
  allTimeOS?: WakaItem[];
  allTimeTotalSeconds?: number;
};

const data = waka as WakaData;

const BAR_TONES = [
  "var(--sakura)", "var(--matcha)", "var(--taro)", "var(--peach)", "var(--butter)",
  "var(--sky)", "var(--sakura-2)", "var(--matcha-2)", "var(--taro)", "var(--peach)",
];

const ALL_TONES = [
  "var(--sakura-2)", "var(--matcha-2)", "var(--taro-2)", "var(--peach-2)", "var(--butter)",
];

const langIcon: Record<string, React.ReactNode> = {
  Go: <SiGo />, TypeScript: <SiTypescript />, SQL: <SiPostgresql />,
  Bash: <SiGnubash />, Markdown: <SiMarkdown />,
};

const ranks = ["①", "②", "③", "④", "⑤", "⑥", "⑦", "⑧", "⑨", "⑩"];

const editorPics: Record<string, React.ReactNode> = {
  "VS Code": <SiVsco />, GoLand: <SiGo />, Neovim: <SiNeovim />,
};

const osPics: Record<string, React.ReactNode> = {
  Linux: <SiLinux />, macOS: <SiApple />, Mac: <SiApple />,
};

const WakaSection = () => {
  if (!data.ok || !data.languages?.length) return null;

  const aiCat = data.categories?.find(c => c.name === "AI Coding");

  return (
    <section className="block reveal" id="waka">
      <div className="eyebrow"><span className="num">03</span> · what i actually write · じっせきデータ</div>
      <h2>
        What I <span className="accent">actually</span> write
        <span className="jp">てを うごかすデータ</span>
      </h2>

      <div className="waka-duo">
        {/* ── left card: stats + all-time + meta ── */}
        <div className="waka-card waka-card-left">
          <div className="waka-tape">wakatime · ✦</div>

          <div className="waka-blob-grid">
            {data.humanReadableTotal && (
              <div className="waka-blob" style={{ background: "var(--sakura)" }}>
                <span className="waka-blob-label">14d</span>
                <span className="waka-blob-val">{data.humanReadableTotal}</span>
              </div>
            )}
            {data.allTime && (
              <div className="waka-blob" style={{ background: "var(--matcha)" }}>
                <span className="waka-blob-label">all time</span>
                <span className="waka-blob-val">{data.allTime}</span>
              </div>
            )}
            {data.humanReadableDailyAverage && (
              <div className="waka-blob" style={{ background: "var(--peach)" }}>
                <span className="waka-blob-label">&nbsp;/ day</span>
                <span className="waka-blob-val">{data.humanReadableDailyAverage}</span>
              </div>
            )}
            {aiCat && (
              <div className="waka-blob" style={{ background: "var(--taro)" }}>
                <span className="waka-blob-label">ai · {aiCat.text}</span>
                <span className="waka-blob-val">{aiCat.percent.toFixed(1)}%</span>
              </div>
            )}
          </div>

          <div className="waka-all-section">
            <div className="waka-all-head">
              <span className="waka-all-title">all-time languages</span>
              <span className="waka-all-jp">ぜんきろく</span>
            </div>
            {data.allTimeLanguages?.length ? (
              <ul className="waka-all-bars">
                {(data.allTimeLanguages ?? []).slice(0, 5).map((lang, i) => (
                  <li key={lang.name} className="waka-all-row">
                    <span className="waka-all-label">
                      <span className="waka-bar-emoji">{langIcon[lang.name] || "◈"}</span>
                      {lang.name}
                    </span>
                    <span className="waka-all-track">
                      <span className="waka-all-fill" style={{
                        width: `${Math.max(lang.percent, 3)}%`,
                        background: ALL_TONES[i % ALL_TONES.length],
                      }} />
                    </span>
                    <span className="waka-all-pct">{lang.percent.toFixed(1)}%</span>
                  </li>
                ))}
              </ul>
            ) : (
              <ul className="waka-all-bars">
                {data.languages.slice(0, 5).map((lang, i) => (
                  <li key={lang.name} className="waka-all-row">
                    <span className="waka-all-label">
                      <span className="waka-bar-emoji">{langIcon[lang.name] || "◈"}</span>
                      {lang.name}
                    </span>
                    <span className="waka-all-track">
                      <span className="waka-all-fill" style={{
                        width: `${Math.max(lang.percent, 3)}%`,
                        background: ALL_TONES[i % ALL_TONES.length],
                      }} />
                    </span>
                    <span className="waka-all-pct">{lang.percent.toFixed(1)}%</span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="waka-stamp-row">
            {data.editors?.[0] && (
              <span className="waka-stamp">
                {editorPics[data.editors[0].name] || "✏️"}
                {data.editors[0].name}
                <span className="waka-stamp-text">{data.editors[0].text}</span>
              </span>
            )}
            {data.operatingSystems?.[0] && (
              <span className="waka-stamp">
                {osPics[data.operatingSystems[0].name] || "🖥️"}
                {data.operatingSystems[0].name}
                <span className="waka-stamp-text">{data.operatingSystems[0].text}</span>
              </span>
            )}
            {data.projects?.[0] && (
              <span className="waka-stamp">
                📦
                {data.projects[0].name}
                <span className="waka-stamp-text">{data.projects[0].text}</span>
              </span>
            )}
          </div>
        </div>

        {/* ── right card: 7d languages ── */}
        <div className="waka-card waka-card-right">
          <div className="waka-langs-head">
            <span className="waka-langs-title">top languages</span>
            <span className="waka-langs-jp">ことば</span>
          </div>
          <ul className="waka-bars">
            {data.languages.slice(0, 10).map((lang, i) => (
              <li key={lang.name} className="waka-bar-row" style={{ animationDelay: `${i * 0.06}s` }}>
                <span className="waka-bar-rank">{ranks[i]}</span>
                <span className="waka-bar-label">
                  <span className="waka-bar-emoji">{langIcon[lang.name] || "◈"}</span>
                  {lang.name}
                </span>
                <span className="waka-bar-track">
                  <span className="waka-bar-fill"
                    style={{
                      width: `${Math.max(lang.percent, 3)}%`,
                      background: BAR_TONES[i % BAR_TONES.length],
                      animationDelay: `${i * 0.06}s`,
                    }}
                  />
                </span>
                <span className="waka-bar-pct">{lang.percent.toFixed(1)}%</span>
              </li>
            ))}
          </ul>
          <div className="waka-mochi-corner">
            <MochiFace mood="genki" size={40} blink antenna={false} />
          </div>
        </div>
      </div>

      {data.fetchedAt && (
        <div className="waka-foot">
          // synced from wakatime · {new Date(data.fetchedAt).toLocaleDateString("en-GB")}
        </div>
      )}
    </section>
  );
};

export default WakaSection;
