import { useEffect } from "react";
import { ArrowUpRight } from "lucide-react";
import PageHead from "@/components/PageHead";
import ProjectCard from "@/components/ProjectCard";
import { githubProfile, projects } from "@/data/projects";

const Projects = () => {
  useEffect(() => {
    const prev = document.title;
    document.title = "Projects — Denis Muratbaev";
    return () => { document.title = prev; };
  }, []);

  return (
    <>
      <PageHead kicker="Projects · from GitHub" lede="Personal projects, open source. Each one starts as something I wanted to use myself.">
        Things I <em>built</em>
      </PageHead>
      <main className="chapter-body">
        <ul className="projects">
          {projects.map((p) => <ProjectCard key={p.name} p={p} full />)}
        </ul>
        <a className="lc-link projects-more" href={`${githubProfile}?tab=repositories`} target="_blank" rel="noopener noreferrer">
          More on GitHub <ArrowUpRight size={14} strokeWidth={1.5} />
        </a>
      </main>
    </>
  );
};

export default Projects;
