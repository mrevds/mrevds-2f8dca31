
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github, Server, Terminal, Database, Globe } from "lucide-react";

const ProjectsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const projects = [
    {
      title: "REST API services",
      description: "Go microservice using Gin framework and PostgreSQL. Implementation of CRUD operations, middleware for authentication in the format of Posts and comments.",
      github: "https://github.com/mrevds/freeTitle",
      demo: "#",
      icon: Server,
      tech: ["Go", "Gin", "PostgreSQL", "JWT", "Docker", "GORM", "Redis", "TaskFile"],
      gradient: "from-blue-500 to-purple-500"
    },
    {
      "title": "CLI AI Chat",
      "description": "A console client for interacting with AI models via the AIML API. Supports message history, context management, and works with GPT-4o.",
      "github": "https://github.com/mrevds/cli-ai-chat",
      "demo": "#",
      "icon": Terminal,
      "tech": ["Go", "GPT-4o", "AIML API", "CLI", "Chat"],
      "gradient": "from-purple-500 to-pink-500"
    },{
  title: "Auth Microservice",
  description: "Микросервис аутентификации на gRPC с JWT токенами, регистрацией, авторизацией и управлением пользователями. PostgreSQL, Docker, миграции базы данных.",
  github: "https://github.com/mrevds/auth-micro", // замените на ваш URL
  demo: "#",
  icon: Shield, // или Lock, UserCheck - в зависимости от доступных иконок
  tech: ["Go", "gRPC", "PostgreSQL", "Docker", "JWT"],
  gradient: "from-blue-500 to-cyan-500"
}
    // {
    //   title: "API Gateway",
    //   description: "Шлюз для маршрутизации запросов между микросервисами с функциями балансировки нагрузки, кэширования и мониторинга.",
    //   github: "#",
    //   demo: "#",
    //   icon: Globe,
    //   tech: ["Go", "Redis", "Docker", "Load Balancing"],
    //   gradient: "from-orange-500 to-red-500"
    // }
  ];

  return (
    <section id="projects" ref={ref} className="py-20 px-6 bg-white/30">
      <div className="max-w-7xl mx-auto">
        <motion.h2 
          className="text-4xl lg:text-5xl font-light text-slate-800 text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
        >
          My projects
        </motion.h2>

        <div className="grid lg:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              className="group relative bg-white rounded-2xl shadow-lg border border-violet-100 overflow-hidden hover:shadow-2xl transition-all duration-500"
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.7, delay: index * 0.2 }}
              whileHover={{ y: -10 }}
            >
              {/* Gradient Header */}
              <div className={`h-2 bg-gradient-to-r ${project.gradient}`} />
              
              <div className="p-8">
                {/* Header */}
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center space-x-4">
                    <div className={`p-3 bg-gradient-to-r ${project.gradient} rounded-xl`}>
                      <project.icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-slate-800">
                      {project.title}
                    </h3>
                  </div>
                </div>

                {/* Description */}
                <p className="text-slate-600 leading-relaxed mb-6">
                  {project.description}
                </p>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-violet-50 text-violet-600 text-sm rounded-full border border-violet-200"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-3">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="hover:bg-slate-50 border-slate-200 flex-1"
                    asChild
                  >
                    <a href={project.github} target="_blank" rel="noopener noreferrer">
                      <Github className="w-4 h-4 mr-2" />
                      GitHub
                    </a>
                  </Button>
                  {/* <Button 
                    size="sm" 
                    className={`bg-gradient-to-r ${project.gradient} hover:opacity-90 text-white flex-1`}
                    asChild
                  >
                    <a href={project.demo} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Demo
                    </a>
                  </Button> */}
                </div>
              </div>

              {/* Hover Effect */}
              <div className={`absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r ${project.gradient} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300`} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
