import { useEffect } from "react";
import Chapter from "@/components/Chapter";
import ClaudeMark from "@/components/ClaudeMark";
import PageHead from "@/components/PageHead";
import WakaSection from "@/components/WakaSection";
import LeetCodeSection from "@/components/LeetCodeSection";
import { PlateNodes, Schematic } from "@/components/Drawings";

const stack = ["Go", "PostgreSQL", "Redis", "gRPC", "REST", "Docker", "Linux", "GoLand", "GitHub"];

const Stack = () => {
  useEffect(() => {
    const prev = document.title;
    document.title = "Stack — Denis Muratbaev";
    return () => { document.title = prev; };
  }, []);

  return (
    <>
      <PageHead kicker="Stack · tools and practice" lede="The tools a request passes through, the hours behind them and the problems that keep them sharp.">
        What a request <em>passes through</em>
      </PageHead>
      <main>
        <section id="stack">
          <Chapter label="Stack" title="The path" sub="From the client to the database and back" genre="a system diagram" plate="var(--sky)" drawing={<PlateNodes />} />
          <div className="chapter-body">
            <div className="schematic">
              <div className="schematic-scroll"><Schematic /></div>
              <ul className="legend">
                {stack.map((s) => <li key={s}>{s}</li>)}
                <li className="legend-ai"><ClaudeMark size={14} />Claude Code</li>
              </ul>
            </div>
          </div>
        </section>
        <WakaSection />
        <LeetCodeSection />
      </main>
    </>
  );
};

export default Stack;
