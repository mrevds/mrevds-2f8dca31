import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/data/projects";
import { PlateClip, PlateWindow } from "./Drawings";

const drawings: Record<string, JSX.Element> = { clipkeep: <PlateClip />, "droplet-browser": <PlateWindow /> };

/* One project told as a short entry: plate, name, what it is good at, the stack */
const ProjectCard = ({ p, full = false }: { p: Project; full?: boolean }) => (
  <li className="project">
    <div className="plate" style={{ background: p.plate }}>{drawings[p.name]}</div>
    <div className="project-body">
      <div className="ch-no">{p.kind} · {p.year} · {p.status}</div>
      <h3>{p.name}</h3>
      <p className="project-summary">{p.summary}</p>
      {full && (
        <ol className="strengths">
          {p.strengths.map(([title, text], i) => (
            <li key={title}>
              <span className="note-n">{String(i + 1).padStart(2, "0")}</span>
              <h4>{title}</h4>
              <p>{text}</p>
            </li>
          ))}
        </ol>
      )}
      {full && <p className="project-note">{p.note}</p>}
      <p className="project-stack">{p.stack.join(" · ")}</p>
      <a className="lc-link" href={p.repo} target="_blank" rel="noopener noreferrer">
        {p.repo.replace("https://", "")} <ArrowUpRight size={14} strokeWidth={1.5} />
      </a>
    </div>
  </li>
);

export default ProjectCard;
