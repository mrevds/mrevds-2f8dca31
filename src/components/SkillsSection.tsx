import { useRef, useEffect, useState } from "react";
import { Server, Database, Container, Terminal, Shield } from "lucide-react";
import { getSkillIcon } from "@/lib/skillIcons";

const SkillsSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);

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

const skillCategories = [
  {
    title: "Backend Development",
    icon: Server,
    gradient: "from-violet-500 to-purple-600",
    skills: ["Go", "REST API", "Gin", "gRPC", "Microservices", "JWT"],
  },
  {
    title: "Databases & Caching",
    icon: Database,
    gradient: "from-blue-500 to-cyan-600",
    skills: ["PostgreSQL", "Redis", "MongoDB", "Apache Kafka", "GORM", "PGx", "Goose Migrations"],
  },
  {
    title: "DevOps & Tools",
    icon: Container,
    gradient: "from-emerald-500 to-teal-600",
    skills: ["Docker", "CI/CD", "Git", "Taskfile", "Make"],
  },
  {
    title: "System & Scripting",
    icon: Terminal,
    gradient: "from-orange-500 to-red-600",
    skills: ["Linux", "Bash", "Viper", "DI (Uber FX)"],
  },
  {
    title: "Testing & Quality",
    icon: Shield,
    gradient: "from-pink-500 to-rose-600",
    skills: ["Unit Testing", "Integration Testing", "Rate Limiting"],
  },
];

  return (
      <section id="skills" ref={ref} className="py-20 px-6 bg-gradient-to-br from-violet-50/50 to-emerald-50/30">
        <div className="max-w-7xl mx-auto">
          <h2
              className={`text-4xl lg:text-5xl font-light text-slate-800 text-center mb-4 animate-fade-in-up ${isInView ? '' : 'opacity-0'}`}
          >
            Technical Skills
          </h2>
          
          <p
              className={`text-lg text-slate-600 text-center mb-16 max-w-2xl mx-auto animate-fade-in-up ${isInView ? '' : 'opacity-0'}`}
              style={{ animationDelay: isInView ? '0.2s' : '0s' }}
          >
            Technologies and tools I use to build scalable backend solutions
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skillCategories.map((category, categoryIndex) => (
                <div
                    key={category.title}
                    className={`group relative bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-violet-100 hover:shadow-2xl hover:scale-105 transition-all duration-500 overflow-hidden animate-slide-in-up ${
                      isInView ? 'opacity-100' : 'opacity-0'
                    }`}
                    style={{
                      animationDelay: isInView ? `${categoryIndex * 0.15}s` : '0s',
                    }}
                >
                  {/* Gradient top border */}
                  <div className={`h-1.5 bg-gradient-to-r ${category.gradient}`} />
                  
                  <div className="p-6">
                    {/* Icon and Title */}
                    <div className="flex items-center gap-4 mb-6">
                      <div className={`p-3 bg-gradient-to-r ${category.gradient} rounded-xl shadow-md group-hover:shadow-lg transition-all duration-300 group-hover:scale-110`}>
                        <category.icon className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="text-lg font-semibold text-slate-800">
                        {category.title}
                      </h3>
                    </div>

                    {/* Skills Grid */}
                    <div className="flex flex-wrap gap-3">
                      {category.skills.map((skill) => {
                        const { icon: IconComponent, color } = getSkillIcon(skill);
                        return (
                          <div
                            key={skill}
                            className="group relative flex flex-col items-center gap-2 p-3 bg-gradient-to-r from-violet-50 to-emerald-50 rounded-lg border border-violet-100/50 hover:border-violet-300 hover:shadow-md transition-all duration-200 cursor-default hover:scale-110"
                            title={skill}
                          >
                            <IconComponent 
                              size={24} 
                              style={{ color }} 
                              className="transition-transform group-hover:scale-110"
                            />
                            <span className="text-xs font-medium text-slate-700 text-center max-w-[80px] break-words">
                              {skill}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Bottom gradient line on hover */}
                  <div className={`absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r ${category.gradient} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500`} />
                </div>
            ))}
          </div>
        </div>
      </section>
  );
};

export default SkillsSection;
