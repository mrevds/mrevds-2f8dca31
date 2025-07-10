
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
      title: "REST API сервис",
      description: "Высокопроизводительный микросервис на Go с использованием фреймворка Gin и PostgreSQL. Полная реализация CRUD операций с аутентификацией через JWT.",
      github: "#",
      demo: "#",  
      icon: Server,
      tech: ["Go", "Gin", "PostgreSQL", "JWT"],
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      title: "CLI утилита для развертывания",
      description: "Мощная утилита командной строки для автоматизации процесса развертывания приложений с поддержкой различных сред и конфигураций.",
      github: "#",
      demo: "#",
      icon: Terminal,
      tech: ["Go", "Cobra", "Docker", "CI/CD"],
      gradient: "from-green-500 to-emerald-500"
    },
    {
      title: "Система управления БД",
      description: "Инструмент для миграций и управления схемами баз данных с поддержкой версионирования и откатов изменений.",
      github: "#",
      demo: "#",
      icon: Database,
      tech: ["Go", "PostgreSQL", "Migrations", "CLI"],
      gradient: "from-purple-500 to-pink-500"
    },
    {
      title: "API Gateway",
      description: "Шлюз для маршрутизации запросов между микросервисами с функциями балансировки нагрузки, кэширования и мониторинга.",
      github: "#",
      demo: "#",
      icon: Globe,
      tech: ["Go", "Redis", "Docker", "Load Balancing"],
      gradient: "from-orange-500 to-red-500"
    }
  ];

  return (
    <section id="projects" ref={ref} className="py-20 px-6 bg-gradient-to-br from-slate-50 to-violet-50/30">
      <div className="max-w-6xl mx-auto">
        <motion.h2 
          className="text-4xl lg:text-5xl font-light text-slate-800 text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
        >
          Проекты
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              className="group bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-violet-100 hover:shadow-xl transition-all duration-300"
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              whileHover={{ y: -5 }}
            >
              <div className="flex items-center gap-4 mb-6">
                <div className={`p-3 bg-gradient-to-r ${project.gradient} rounded-xl`}>
                  <project.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-slate-800">{project.title}</h3>
              </div>

              <p className="text-slate-600 mb-6 leading-relaxed">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2 mb-6">
                {project.tech.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 bg-gradient-to-r from-violet-100 to-emerald-100 text-slate-700 text-sm rounded-full border border-violet-200"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div className="flex gap-3">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1 hover:bg-violet-50 border-violet-200 text-violet-700"
                  asChild
                >
                  <a href={project.github} target="_blank" rel="noopener noreferrer">
                    <Github className="w-4 h-4 mr-2" />
                    GitHub
                  </a>
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1 hover:bg-emerald-50 border-emerald-200 text-emerald-700"
                  asChild
                >
                  <a href={project.demo} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Demo
                  </a>
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
