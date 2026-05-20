import waka from "@/data/wakatime.json";

type WakaItem = { name: string; percent: number; text: string; color?: string };
type WakaData = {
  ok: boolean;
  fetchedAt: string | null;
  range?: string;
  humanReadableTotal?: string;
  humanReadableDailyAverage?: string;
  languages?: WakaItem[];
  editors?: WakaItem[];
  operatingSystems?: WakaItem[];
  projects?: WakaItem[];
  allTime?: string | null;
};

const data = waka as WakaData;

const BAR_TONES = [
  "var(--sakura)",
  "var(--matcha)",
  "var(--taro)",
  "var(--peach)",
  "var(--butter)",
  "var(--sky)",
  "var(--sakura-2)",
  "var(--matcha-2)",
];

const editorEmoji: Record<string, string> = {
  GoLand: "🐹",
  "VS Code": "💻",
  WebStorm: "🌐",
  PhpStorm: "🐘",
  IntelliJ: "🧠",
  Vim: "⌨️",
  Neovim: "⌨️",
};

const osEmoji: Record<string, string> = {
  Mac: "🍎",
  macOS: "🍎",
  Linux: "🐧",
  Windows: "🪟",
  Arch: "🐧",
  Ubuntu: "🐧",
};

const WakaSection = () => {
  if (!data.ok || !data.languages?.length) return null;

  return (
    <section className="block reveal" id="waka">
      <div className="eyebrow"><span className="num">03</span> · what i actually write · じっせきデータ</div>
      <h2>
        What I <span className="accent">actually</span> write
        <span className="jp">てを うごかすデータ</span>
      </h2>

      <div className="waka-grid">
        <div className="waka-stat-card">
          <div className="waka-stat-label">last 7 days</div>
          <div className="waka-stat-num">{data.humanReadableTotal}</div>
          <div className="waka-stat-sub">
            avg <span className="waka-hl">{data.humanReadableDailyAverage}</span> / day
          </div>
          {data.allTime && (
            <div className="waka-stat-foot">all-time · {data.allTime}</div>
          )}
        </div>

        <div className="waka-langs">
          <div className="waka-langs-head">
            <span className="waka-langs-title">top languages</span>
            <span className="waka-langs-jp">ことば</span>
          </div>
          <ul className="waka-bars">
            {data.languages.slice(0, 6).map((lang, i) => (
              <li key={lang.name} className="waka-bar-row">
                <span className="waka-bar-label">{lang.name}</span>
                <span className="waka-bar">
                  <span
                    className="waka-bar-fill"
                    style={{
                      width: `${Math.max(lang.percent, 4)}%`,
                      background: BAR_TONES[i % BAR_TONES.length],
                    }}
                  />
                </span>
                <span className="waka-bar-pct">{lang.percent.toFixed(1)}%</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="waka-meta">
        {data.editors?.[0] && (
          <div className="waka-tile" style={{ background: "var(--taro)" }}>
            <div className="waka-tile-label">// editor</div>
            <div className="waka-tile-name">
              <span className="waka-tile-emoji">{editorEmoji[data.editors[0].name] || "✏️"}</span>
              {data.editors[0].name}
            </div>
            <div className="waka-tile-meta">{data.editors[0].text}</div>
          </div>
        )}
        {data.operatingSystems?.[0] && (
          <div className="waka-tile" style={{ background: "var(--sky)" }}>
            <div className="waka-tile-label">// os</div>
            <div className="waka-tile-name">
              <span className="waka-tile-emoji">{osEmoji[data.operatingSystems[0].name] || "🖥️"}</span>
              {data.operatingSystems[0].name}
            </div>
            <div className="waka-tile-meta">{data.operatingSystems[0].text}</div>
          </div>
        )}
        {data.projects?.[0] && (
          <div className="waka-tile" style={{ background: "var(--butter)" }}>
            <div className="waka-tile-label">// top project</div>
            <div className="waka-tile-name">
              <span className="waka-tile-emoji">📦</span>
              {data.projects[0].name}
            </div>
            <div className="waka-tile-meta">{data.projects[0].text}</div>
          </div>
        )}
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
