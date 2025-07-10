import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Badge } from "@/components/ui/badge";
import { Code, Database, Server, GitBranch, Monitor, Terminal, Puzzle, Shield, Layers } from "lucide-react";

const Skills = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const skills = [
    { name: "Go", icon: Code, gradient: "from-blue-500 to-cyan-400", bgGradient: "from-blue-50 to-cyan-50" },
    { name: "Gin", icon: Server, gradient: "from-green-500 to-emerald-400", bgGradient: "from-green-50 to-emerald-50" },
    { name: "PostgreSQL", icon: Database, gradient: "from-indigo-500 to-purple-400", bgGradient: "from-indigo-50 to-purple-50" },
    { name: "REST API", icon: Layers, gradient: "from-orange-500 to-red-400", bgGradient: "from-orange-50 to-red-50" },
    { name: "SQL", icon: Database, gradient: "from-violet-500 to-pink-400", bgGradient: "from-violet-50 to-pink-50" },
    { name: "Docker (теория)", icon: Shield, gradient: "from-cyan-500 to-blue-400", bgGradient: "from-cyan-50 to-blue-50" },
    { name: "Git", icon: GitBranch, gradient: "from-gray-600 to-gray-400", bgGradient: "from-gray-50 to-slate-50" },
    { name: "Linux", icon: Terminal, gradient: "from-yellow-500 to-orange-400", bgGradient: "from-yellow-50 to-orange-50" }
  ];

  return (
      <section ref={ref} className="py-20 px-6 bg-gradient-to-br from-purple-50/30 to-emerald-50/20">
        <div className="max-w-5xl mx-auto">
          <motion.h2
              className="text-3xl md:text-4xl font-light text-foreground mb-12 text-center relative"
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.6 }}
          >
            Навыки
            <motion.div
                className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-12 h-0.5 bg-primary"
                initial={{ width: 0 }}
                animate={isInView ? { width: 48 } : { width: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
            />
          </motion.h2>

          <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.6, delay: 0.2 }}
          >
            {skills.map((skill, index) => (
                <motion.div
                    key={skill.name}
                    className="group cursor-pointer"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.5, delay: 0.1 * index }}
                    whileHover={{ y: -8, scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                >
                  <div className={`relative overflow-hidden bg-gradient-to-br ${skill.bgGradient} p-6 rounded-2xl shadow-lg border border-white/50 hover:shadow-xl transition-all duration-300 group-hover:border-white/80`}>
                    {/* Decorative gradient overlay */}
                    <div className={`absolute inset-0 bg-gradient-to-r ${skill.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />

                    {/* Icon */}
                    <div className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${skill.gradient} mb-4 shadow-lg group-hover:shadow-xl transition-all duration-300`}>
                      <skill.icon className="w-6 h-6 text-white" />
                    </div>

                    {/* Skill name */}
                    <h3 className="text-lg font-semibold text-gray-800 mb-2 group-hover:text-gray-900 transition-colors">
                      {skill.name}
                    </h3>

                    {/* Decorative bottom accent */}
                    <div className={`absolute bottom-0 left-0 h-1 bg-gradient-to-r ${skill.gradient} w-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out`} />

                    {/* Subtle sparkle effect */}
                    <div className="absolute top-4 right-4 w-2 h-2 bg-white/30 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse" />
                  </div>
                </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
  );
};

export default Skills;