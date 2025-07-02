
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
    <section ref={ref} className="py-20 px-6 relative">
      <div className="max-w-4xl mx-auto">
        <motion.h2 
          className="text-3xl md:text-4xl font-light text-gray-900 mb-12 text-center relative"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.6 }}
        >
          Проекты
          <motion.div
            className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-16 h-0.5 bg-gradient-to-r from-blue-600 to-blue-400"
            initial={{ width: 0 }}
            animate={isInView ? { width: 64 } : { width: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          />
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 50, rotateX: 10 }}
              animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : { opacity: 0, y: 50, rotateX: 10 }}
              transition={{ duration: 0.7, delay: 0.2 * index }}
              whileHover={{ y: -8, rotateX: -2 }}
              className="perspective-1000"
            >
              <Card className="h-full hover:shadow-xl transition-all duration-300 group border-gray-200 hover:border-blue-200 bg-gradient-to-br from-white to-gray-50 relative overflow-hidden">
                <motion.div
                  className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 to-blue-400 origin-left"
                  initial={{ scaleX: 0 }}
                  animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 + index * 0.2 }}
                />
                
                <CardHeader className="relative">
                  <div className="flex items-center gap-3 mb-2">
                    <motion.div
                      className="p-2 bg-blue-100 rounded-lg group-hover:bg-blue-200 transition-colors"
                      whileHover={{ rotate: 5, scale: 1.1 }}
                    >
                      <project.icon className="w-5 h-5 text-blue-600" />
                    </motion.div>
                    <CardTitle className="text-xl font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
                      {project.title}
                    </CardTitle>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech, techIndex) => (
                      <motion.span
                        key={tech}
                        className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-full border border-blue-200"
                        initial={{ opacity: 0, scale: 0 }}
                        animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
                        transition={{ duration: 0.3, delay: 0.8 + index * 0.2 + techIndex * 0.1 }}
                      >
                        {tech}
                      </motion.span>
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
                      className="hover:bg-gray-50 transition-all duration-200 hover:scale-105"
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
                      className="hover:bg-blue-50 border-blue-200 text-blue-700 hover:border-blue-300 transition-all duration-200 hover:scale-105"
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
