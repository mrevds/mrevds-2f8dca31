
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Badge } from "@/components/ui/badge";

const Skills = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const skills = [
    { name: "Go", level: 90 },
    { name: "Gin", level: 85 },
    { name: "PostgreSQL", level: 80 },
    { name: "REST API", level: 88 },
    { name: "SQL", level: 85 },
    { name: "Docker (теория)", level: 70 },
    { name: "Git", level: 90 },
    { name: "Linux", level: 75 },
    { name: "LeetCode (~70 задач)", level: 65 }
  ];

  return (
    <section ref={ref} className="py-20 px-6 bg-gradient-to-br from-gray-50 via-white to-blue-50 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div 
          className="absolute top-10 left-1/4 w-20 h-20 bg-blue-100 rounded-full opacity-20"
          animate={{ y: [-10, 10, -10] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute bottom-10 right-1/4 w-12 h-12 bg-blue-200 rounded-lg opacity-30"
          animate={{ rotate: [0, 45, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        <motion.h2 
          className="text-3xl md:text-4xl font-light text-gray-900 mb-12 text-center relative"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.6 }}
        >
          Навыки
          <motion.div
            className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-16 h-0.5 bg-gradient-to-r from-blue-600 to-blue-400"
            initial={{ width: 0 }}
            animate={isInView ? { width: 64 } : { width: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          />
        </motion.h2>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {skills.map((skill, index) => (
            <motion.div
              key={skill.name}
              className="group"
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={isInView ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.8, y: 20 }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              whileHover={{ scale: 1.05, y: -5 }}
            >
              <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 hover:border-blue-200 relative overflow-hidden">
                <motion.div
                  className="absolute top-0 left-0 h-1 bg-gradient-to-r from-blue-600 to-blue-400"
                  initial={{ width: 0 }}
                  animate={isInView ? { width: `${skill.level}%` } : { width: 0 }}
                  transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                />
                <Badge 
                  variant="outline" 
                  className="w-full justify-center px-4 py-2 text-sm md:text-base border-transparent bg-transparent text-blue-700 group-hover:bg-blue-50 transition-colors"
                >
                  {skill.name}
                </Badge>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: 1.5 }}
        >
          <div className="flex justify-center items-center gap-2">
            <motion.div
              className="w-3 h-3 bg-blue-600 rounded-full"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <span className="text-sm text-gray-500">Постоянно развиваюсь</span>
            <motion.div
              className="w-3 h-3 bg-blue-400 rounded-full"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity, delay: 1 }}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
