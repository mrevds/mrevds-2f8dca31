import { useRef, useEffect, useState } from "react";
import { Server, Database, Container, Terminal, Shield } from "lucide-react";
import { getSkillIcon } from "@/lib/skillIcons";
import { useLanguage } from "@/context/LanguageContext";

const SkillsSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);
  const { content } = useLanguage();
  const skillsContent = content.skills;

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

  const skillClusters = [
    {
      title: skillsContent.categories.backend,
      subtitle: skillsContent.categories.data,
      icon: Server,
      accent: "from-violet-500 to-emerald-500",
      skills: ["Go", "PHP", "Laravel", "REST API", "Gin", "gRPC", "Microservices", "JWT", "PostgreSQL", "Redis", "MongoDB", "Kafka", "S3", "GORM"],
    },
    {
      title: skillsContent.categories.devops,
      subtitle: skillsContent.categories.system,
      icon: Container,
      accent: "from-emerald-500 to-cyan-500",
      skills: ["Docker", "CI/CD", "Git", "Taskfile", "Linux", "Bash", "Viper", "DI (Uber FX)", "Rate Limiting"],
    },
    {
      title: skillsContent.categories.quality,
      subtitle: "",
      icon: Shield,
      accent: "from-pink-500 to-rose-500",
      skills: ["Unit Testing", "Integration Testing", "Rate Limiting"],
    },
  ];

  return (
    <section id="skills" ref={ref} className="relative py-20 px-4 sm:px-6">
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute top-12 right-8 w-72 h-72 rounded-full bg-violet-200/35 blur-3xl" />
        <div className="absolute bottom-4 left-6 w-80 h-80 rounded-full bg-emerald-200/35 blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto rounded-[36px] bg-white/85 shadow-[0_35px_120px_rgba(79,70,229,0.15)] backdrop-blur px-6 sm:px-10 lg:px-16 py-14">
        <div className={`text-center max-w-3xl mx-auto mb-14 animate-fade-in-up ${isInView ? '' : 'opacity-0'}`}>
          <p className="text-xs uppercase tracking-[0.4em] text-slate-400">{skillsContent.title}</p>
          <h2 className="mt-4 text-4xl lg:text-5xl font-light text-slate-900">{skillsContent.title}</h2>
          <p className="mt-4 text-lg text-slate-600">{skillsContent.description}</p>
        </div>

        <div className="space-y-6">
          {skillClusters.map((cluster, index) => (
            <div
              key={cluster.title}
              className={`relative rounded-[32px] bg-white/85 px-6 py-6 shadow-[0_20px_60px_rgba(79,70,229,0.12)] animate-slide-in-up ${
                isInView ? 'opacity-100' : 'opacity-0'
              }`}
              style={{ animationDelay: isInView ? `${index * 0.1}s` : '0s' }}
            >
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-2xl bg-gradient-to-br ${cluster.accent} text-white shadow-lg`}>
                    <cluster.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm uppercase tracking-[0.35em] text-slate-400">{cluster.title}</p>
                    {cluster.subtitle && (
                      <p className="text-base text-slate-500 mt-1">{cluster.subtitle}</p>
                    )}
                  </div>
                </div>
              </div>

              <div className="mt-5 flex flex-wrap gap-2">
                {cluster.skills.map((skill) => {
                  const { icon: IconComponent, color } = getSkillIcon(skill);
                  return (
                    <span
                      key={skill}
                      className="inline-flex items-center gap-2 rounded-2xl bg-white/90 px-3 py-1.5 text-xs font-semibold text-slate-700 shadow-sm"
                    >
                      <IconComponent size={16} style={{ color }} />
                      {skill}
                    </span>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
