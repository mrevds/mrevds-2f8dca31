import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const SkillsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

 const skillCategories = [
  {
    title: "Backend",
    skills: ["Go", "REST API", "Gin"]
  },
  {
    title: "Database",
    skills: ["PostgreSQL", "Redis", "GORM"]
  },
  {
    title: "Message Brokers",
    skills: ["Kafka(Basic)"]
  },
  {
    title: "Tools",
    skills: ["Git", "Docker", "Linux", "Taskfile", "CI/CD (GitHub Actions)"]
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
            Technical skills
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

                  <div className="space-y-3">
                    {category.skills.map((skill, skillIndex) => (
                        <motion.div
                            key={skill}
                            className="bg-gradient-to-r from-violet-50 to-emerald-50 px-4 py-3 rounded-lg text-center font-medium text-slate-700 hover:from-violet-100 hover:to-emerald-100 transition-all duration-200 hover:shadow-md"
                            initial={{ opacity: 0, x: -20 }}
                            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                            transition={{ duration: 0.5, delay: (categoryIndex * 0.2) + (skillIndex * 0.1) }}
                        >
                          {skill}
                        </motion.div>
                    ))}
                  </div>
                </motion.div>
            ))}
          </div>


        </div>
      </section>
  );
};

export default SkillsSection;
