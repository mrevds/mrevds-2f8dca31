import { useRef, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Github, Server, Terminal, Container } from "lucide-react";
import { getSkillIcon } from "@/lib/skillIcons";

const ProjectsSection = () => {
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

  const projects = [
    {
      title: "Pizza App",
      description:
        "Microservices-based food delivery platform with user authentication, card payment integration, order management, and real-time updates. Multiple gRPC services with event streaming via Kafka.",
      github: "https://github.com/mrevds/pizza-app",
      demo: "#",
      icon: Server,
      tech: ["Go", "gRPC", "PostgreSQL",  "Apache Kafka", "Docker", "JWT", "Microservices", "Api Gateway", "Rate Limiting", "CI/CD", "Bash", "Make", "Viper", "Uber FX (DI)"],
      gradient: "from-orange-500 to-red-500",
    },
    {
      title: "Auth Microservice",
      description:
        "Authentication microservice using gRPC with JWT tokens, registration, authorization, and user management. PostgreSQL, Docker, and database migrations.",
      github: "https://github.com/mrevds/auth-micro",
      demo: "#",
      icon: Container,
      tech: ["Go", "gRPC", "PostgreSQL", "Docker", "JWT", "Uber Ratelimit", "Goose Migrations", "Bash", "Make", "Viper", "PGx", "Uber FX (DI)"],
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      title: "REST API services",
      description:
        "Go microservice using Gin framework and PostgreSQL. Implementation of CRUD operations, middleware for authentication in the format of Posts and comments.",
      github: "https://github.com/mrevds/freeTitle",
      demo: "#",
      icon: Server,
      tech: ["Go", "Gin", "PostgreSQL", "JWT", "Docker", "GORM", "Redis", "TaskFile"],
      gradient: "from-blue-500 to-purple-500",
    },
    {
      title: "CLI AI Chat",
      description:
        "A console client for interacting with AI models via the AIML API. Supports message history, context management, and works with GPT-4o.",
      github: "https://github.com/mrevds/cli-ai-chat",
      demo: "#",
      icon: Terminal,
      tech: ["Go", "GPT-4o", "AIML API", "CLI", "Chat"],
      gradient: "from-purple-500 to-pink-500",
    },
    
  ];

  return (
    <section id="projects" ref={ref} className="py-20 px-6 bg-white/30">
      <div className="max-w-7xl mx-auto">
        <h2
          className={`text-4xl lg:text-5xl font-light text-slate-800 text-center mb-16 animate-fade-in-up ${isInView ? '' : 'opacity-0'}`}
        >
          My projects
        </h2>

        <div className="grid lg:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <div
              key={project.title}
              className={`group relative bg-white rounded-2xl shadow-lg border border-violet-100 overflow-hidden hover:shadow-2xl hover:scale-105 transition-all duration-500 animate-slide-in-up ${
                isInView ? 'opacity-100' : 'opacity-0'
              }`}
              style={{
                animationDelay: isInView ? `${index * 0.2}s` : '0s',
              }}
            >
              {/* Gradient Header */}
              <div className={`h-2 bg-gradient-to-r ${project.gradient}`} />

              <div className="p-8">
                {/* Header */}
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center space-x-4">
                    <div className={`p-3 bg-gradient-to-r ${project.gradient} rounded-xl transition-transform duration-300 group-hover:scale-110`}>
                      <project.icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-slate-800">{project.title}</h3>
                  </div>
                </div>

                {/* Description */}
                <p className="text-slate-600 leading-relaxed mb-6">{project.description}</p>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-3 mb-6">
                  {project.tech.map((tech) => {
                    const { icon: IconComponent, color } = getSkillIcon(tech);
                    return (
                      <div
                        key={tech}
                        className="group relative flex flex-col items-center gap-1 p-2 bg-violet-50 rounded-lg border border-violet-200 hover:border-violet-300 hover:shadow-md transition-all duration-200 hover:scale-110"
                        title={tech}
                      >
                        <IconComponent 
                          size={20} 
                          style={{ color }} 
                          className="transition-transform group-hover:scale-110"
                        />
                        <span className="text-xs font-medium text-slate-700 text-center max-w-[70px] break-words">
                          {tech}
                        </span>
                      </div>
                    );
                  })}
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-3">
                  <Button
                    variant="outline"
                    size="sm"
                    className="hover:bg-slate-50 border-slate-200 flex-1 transition-all duration-300"
                    asChild
                  >
                    <a href={project.github} target="_blank" rel="noopener noreferrer">
                      <Github className="w-4 h-4 mr-2" />
                      GitHub
                    </a>
                  </Button>
                </div>
              </div>

              {/* Hover Effect */}
              <div
                className={`absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r ${project.gradient} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300`}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
