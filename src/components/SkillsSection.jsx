
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const SkillsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const skillCategories = [
    {
      title: "Backend",
      skills: [
        { name: "Go", color: "from-blue-500 to-cyan-500" },
        { name: "Gin", color: "from-green-500 to-emerald-500" },
        { name: "REST API", color: "from-purple-500 to-pink-500" },
      ]
    },
    {
      title: "Базы данных",
      skills: [
        { name: "PostgreSQL", color: "from-indigo-500 to-blue-500" },
        { name: "SQL", color: "from-violet-500 to-purple-500" },
      ]
    },
    {
      title: "Инструменты",
      skills: [
        { name: "Git", color: "from-orange-500 to-red-500" },
        { name: "Docker", color: "from-cyan-500 to-blue-500" },
        { name: "Linux", color: "from-yellow-500 to-orange-500" },
      ]
    }
  ];

  return (
    <section id="skills" ref={ref} className="py-20 px-6 bg-gradient-to-br from-violet-50/50 to-emerald-50/30">
      <div className="max-w-6xl mx-auto">
        <motion.h2 
          className="text-4xl lg:text-5xl font-light text-slate-800 text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
        >
          Технические навыки
        </motion.h2>

        <div className="grid lg:grid-cols-3 gap-8">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg border border-violet-100 hover:shadow-xl transition-all duration-300"
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.6, delay: categoryIndex * 0.2 }}
              whileHover={{ y: -5 }}
            >
              <h3 className="text-xl font-semibold text-slate-800 mb-6 text-center">
                {category.title}
              </h3>
              
              <div className="space-y-4">
                {category.skills.map((skill, skillIndex) => (
                  <motion.div
                    key={skill.name}
                    className={`px-4 py-3 bg-gradient-to-r ${skill.color} text-white rounded-lg text-center font-medium shadow-md`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                    transition={{ duration: 0.5, delay: (categoryIndex * 0.2) + (skillIndex * 0.1) }}
                    whileHover={{ scale: 1.05 }}
                  >
                    {skill.name}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* LeetCode Badge */}
        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <div className="inline-block bg-white p-6 rounded-2xl shadow-lg border border-emerald-100">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-gradient-to-br from-emerald-100 to-green-100 rounded-xl">
                <span className="text-2xl">🧩</span>
              </div>
              <div>
                <h4 className="font-semibold text-slate-800">LeetCode</h4>
                <p className="text-slate-600">~70 решенных задач</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SkillsSection;
