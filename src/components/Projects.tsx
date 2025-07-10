
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github, Server, Terminal } from "lucide-react";

const Projects = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const projects = [
    {
      title: "REST API сервис",
      description: "Микросервис на Go с использованием Gin фреймворка и PostgreSQL. Реализация CRUD операций, middleware для аутентификации.",
      github: "#",
      demo: "#",
      icon: Server,
      tech: ["Go", "Gin", "PostgreSQL"]
    },
    {
      title: "CLI утилита",
      description: "Инструмент командной строки для автоматизации развертывания. Написан на Go с использованием Cobra библиотеки.",
      github: "#",
      demo: "#",
      icon: Terminal,
      tech: ["Go", "Cobra", "CLI"]
    }
  ];

  return (
    <section ref={ref} className="py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.h2 
          className="text-3xl md:text-4xl font-light text-gray-900 mb-12 text-center relative"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.6 }}
        >
          Проекты
          <motion.div
            className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-12 h-0.5 bg-blue-600"
            initial={{ width: 0 }}
            animate={isInView ? { width: 48 } : { width: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          />
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.7, delay: 0.2 * index }}
              whileHover={{ y: -8 }}
            >
              <Card className="h-full hover:shadow-xl transition-all duration-300 border-gray-200 hover:border-blue-200">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <project.icon className="w-5 h-5 text-blue-600" />
                    </div>
                    <CardTitle className="text-xl font-medium text-gray-900">
                      {project.title}
                    </CardTitle>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-full border border-blue-200"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </CardHeader>

                <CardContent>
                  <CardDescription className="text-gray-600 mb-6 leading-relaxed">
                    {project.description}
                  </CardDescription>
                  
                  <div className="flex gap-3">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="hover:bg-gray-50"
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
                      className="hover:bg-blue-50 border-blue-200 text-blue-700"
                      asChild
                    >
                      <a href={project.demo} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Demo
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
