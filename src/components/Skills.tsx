
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
    <section ref={ref} className="py-20 px-6 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <motion.h2 
          className="text-3xl md:text-4xl font-light text-gray-900 mb-12 text-center relative"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.6 }}
        >
          Навыки
          <motion.div
            className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-12 h-0.5 bg-blue-600"
            initial={{ width: 0 }}
            animate={isInView ? { width: 48 } : { width: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          />
        </motion.h2>

        <motion.div 
          className="grid grid-cols-2 md:grid-cols-3 gap-4"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {skills.map((skill, index) => (
            <motion.div
              key={skill.name}
              className="group"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              whileHover={{ y: -4 }}
            >
              <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-all duration-300 relative overflow-hidden">
                <motion.div
                  className="absolute top-0 left-0 h-1 bg-blue-600"
                  initial={{ width: 0 }}
                  animate={isInView ? { width: `${skill.level}%` } : { width: 0 }}
                  transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                />
                <Badge 
                  variant="outline" 
                  className="w-full justify-center border-transparent bg-transparent text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-colors"
                >
                  {skill.name}
                </Badge>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
