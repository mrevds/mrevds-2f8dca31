import { ArrowUpRight } from "lucide-react";
import Chapter from "./Chapter";
import { PlateChecks } from "./Drawings";
import { lc, formatDate } from "@/lib/data";

const LEVELS = [
  { key: "easy", label: "Easy" },
  { key: "medium", label: "Medium" },
  { key: "hard", label: "Hard" },
] as const;

/* Chapter 04: LeetCode progress as a quiet practice log */
const LeetCodeSection = () => {
  if (!lc.ok) return null;
  const profile = `https://leetcode.com/u/${lc.username}/`;

  return (
    <section id="practice">
      <Chapter n={4} title="Practice" sub={`LeetCode · @${lc.username}`} genre="a practice log" plate="var(--rose)" drawing={<PlateChecks />} />
      <div className="chapter-body lc">
        <div className="lc-main">
          <div className="lc-total">
            <span className="lc-num">{lc.solved.all}</span>
            <span className="muted">problems solved</span>
          </div>
          <ul className="lc-levels">
            {LEVELS.map(({ key, label }) => (
              <li key={key} className={`lv-${key}`}>
                <span>{label}</span>
                <span className="lc-bar"><i style={{ width: `${(lc.solved[key] / lc.solved.all) * 100}%` }} /></span>
                <span className="lc-count">{lc.solved[key]}</span>
              </li>
            ))}
          </ul>
          <p className="lc-langs">
            {lc.languages.slice(0, 3).map((l, i) => (
              <span key={l.name}>{i > 0 && " · "}<b>{l.name}</b> {l.solved}</span>
            ))}
          </p>
        </div>

        <div className="lc-side">
          <h3 className="ch-no">Topics</h3>
          <ul className="lc-tags">
            {lc.tags.map((t) => <li key={t.name}><span>{t.name}</span><span className="muted">{t.solved}</span></li>)}
          </ul>
          <h3 className="ch-no">Recently solved</h3>
          <ul className="lc-recent">
            {lc.recent.slice(0, 4).map((r) => (
              <li key={r.slug}>
                <a href={`https://leetcode.com/problems/${r.slug}/`} target="_blank" rel="noopener noreferrer">{r.title}</a>
                <span className="muted">{formatDate(new Date(r.at * 1000).toISOString())}</span>
              </li>
            ))}
          </ul>
          <a className="lc-link" href={profile} target="_blank" rel="noopener noreferrer">
            Profile on LeetCode <ArrowUpRight size={14} strokeWidth={1.5} />
          </a>
        </div>
      </div>
    </section>
  );
};

export default LeetCodeSection;
