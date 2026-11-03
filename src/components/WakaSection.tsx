import Chapter from "./Chapter";
import { PlateClock } from "./Drawings";
import { waka, wakaView, formatDate } from "@/lib/data";

/* Chapter 03: WakaTime numbers printed as a receipt, with a short essay beside it */
const WakaSection = () => {
  const v = wakaView();
  if (!waka.ok || !v.languages.length) return null;

  const langs = v.languages.slice(0, 4);
  const lead = langs[0];
  const max = lead.percent;
  const total = v.recentTotal ?? v.allTime;

  return (
    <section id="hours">
      <Chapter
        n={3}
        title="The hours"
        sub={`Measured by WakaTime · ${v.period}`}
        genre="a printed receipt"
        plate="var(--sage)"
        drawing={<PlateClock />}
      />
      <div className="chapter-body two">
        <div className="receipt">
          <div className="row"><b>GET /denis/hours</b><span className="ok">200 OK</span></div>
          <hr />
          <div className="row"><span className="muted">total</span><span>{total}</span></div>
          <hr />
          {langs.map((l, i) => (
            <div key={l.name}>
              <div className="row"><span>{l.name}</span><span>{l.percent.toFixed(1)}%</span></div>
              <div className={`bar${i === 0 ? " lead" : ""}`}><i style={{ width: `${(l.percent / max) * 100}%` }} /></div>
            </div>
          ))}
          <hr />
          {v.editors[0] && <div className="row"><span className="muted">editor</span><span>{v.editors[0].name} {Math.round(v.editors[0].percent)}%</span></div>}
          {v.os[0] && <div className="row"><span className="muted">os</span><span>{v.os[0].name} {Math.round(v.os[0].percent)}%</span></div>}
          <hr />
          <div className="row muted"><span>synced {formatDate(waka.fetchedAt)}</span><span>デニス</span></div>
        </div>
        <div className="essay">
          <p>Most of {total} went into {lead.name}: handlers, repositories, services that stay boring.</p>
          <p className="small">The rest is SQL, some TypeScript and Bash. Updated daily.</p>
        </div>
      </div>
    </section>
  );
};

export default WakaSection;
