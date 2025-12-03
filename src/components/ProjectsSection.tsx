import { useRef, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Github, Server, Container } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

const ProjectsSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);
  const { content } = useLanguage();
  const projectsContent = content.projects;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: "-100px" }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const featuredProjects = [
    {
      id: "pizza" as const,
      github: "https://github.com/mrevds/pizza-app",
      demo: "#",
      icon: Server,
      accent: "from-orange-500 to-rose-500",
      meta: "Go · Kafka · Docker",
    },
    {
      id: "laravelDrive" as const,
      github: "#",
      demo: "#",
      icon: Container,
      accent: "from-teal-500 to-indigo-500",
      meta: "Laravel · S3 · Docker",
    },
    {
      id: "auth" as const,
      github: "https://github.com/mrevds/auth-micro",
      demo: "#",
      icon: Container,
      accent: "from-blue-500 to-emerald-500",
      meta: "Go · gRPC · JWT",
    },
  ];

  return (
    <section id="projects" ref={ref} className="relative py-20 px-4 sm:px-6">
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute top-0 sm:top-12 left-6 sm:left-24 w-72 h-72 bg-violet-200/25 blur-3xl rounded-full" />
        <div className="absolute bottom-4 right-10 w-80 h-80 bg-emerald-200/25 blur-3xl rounded-full" />
      </div>

      <div className="relative max-w-7xl mx-auto rounded-[36px] bg-white/85 shadow-[0_40px_120px_rgba(79,70,229,0.15)] backdrop-blur px-6 sm:px-10 lg:px-16 py-14">
        <div className={`text-center mb-16 space-y-4 animate-fade-in-up ${isInView ? '' : 'opacity-0'}`}>
          <p className="text-xs uppercase tracking-[0.4em] text-slate-400">{content.navigation.items.projects}</p>
          <h2 className="text-4xl lg:text-5xl font-light text-slate-900">{projectsContent.title}</h2>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto">
            {projectsContent.description}
          </p>
        </div>

        <div className="space-y-8">
          {featuredProjects.map((project, index) => (
            <div
              key={project.id}
              className={`group relative rounded-[32px] bg-white/85 px-6 py-6 shadow-[0_20px_60px_rgba(79,70,229,0.12)] transition-all duration-400 animate-slide-in-up ${
                isInView ? 'opacity-100' : 'opacity-0'
              }`}
              style={{
                animationDelay: isInView ? `${index * 0.15}s` : '0s',
              }}
            >
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-2xl bg-gradient-to-br ${project.accent} text-white shadow-lg`}>
                    <project.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-[0.35em] text-slate-400">{projectsContent.title}</p>
                    <h3 className="text-xl font-semibold text-slate-900">
                      {projectsContent.cards[project.id].title}
                    </h3>
                    <p className="text-sm text-slate-500 mt-1">{project.meta}</p>
                  </div>
                </div>

                <div className="flex gap-3 sm:ml-auto">
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-violet-100 text-slate-800 hover:text-violet-700"
                    asChild
                  >
                    <a href={project.github} target="_blank" rel="noopener noreferrer">
                      <Github className="w-4 h-4 mr-2" />
                      {projectsContent.githubLabel}
                    </a>
                  </Button>
                  {project.demo !== "#" && (
                    <Button
                      size="sm"
                      className="bg-gradient-to-r from-violet-600 to-emerald-600 text-white"
                      asChild
                    >
                      <a href={project.demo} target="_blank" rel="noopener noreferrer">
                        {projectsContent.liveLabel}
                      </a>
                    </Button>
                  )}
                </div>
              </div>

              <p className="mt-4 text-slate-600 leading-relaxed text-sm sm:text-base">
                {projectsContent.cards[project.id].description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
