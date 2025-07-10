
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Coffee, Clock, Target } from "lucide-react";

const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const stats = [
    { icon: Coffee, label: "Проектов", value: "15+" },
    { icon: Clock, label: "Опыт", value: "2 года" },
    { icon: Target, label: "Решено задач", value: "70+" },
  ];

  return (
    <section id="about" ref={ref} className="py-20 px-6 bg-white/50">
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left side - Photo and Stats */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8 }}
          >
            <motion.h2 
              className="text-4xl lg:text-5xl font-light text-slate-800 mb-8"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              О себе
            </motion.h2>

            {/* Photo */}
            <motion.div
              className="mb-8"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <div className="w-48 h-48 mx-auto bg-gradient-to-br from-violet-200 to-emerald-200 rounded-2xl shadow-lg border border-violet-100 flex items-center justify-center">
                <span className="text-6xl">👨‍💻</span>
              </div>
            </motion.div>

            <div className="grid grid-cols-3 gap-6">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  className="text-center p-6 bg-white rounded-2xl shadow-lg border border-violet-100 hover:shadow-xl transition-all duration-300"
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                  transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                  whileHover={{ y: -5 }}
                >
                  <div className="p-3 bg-gradient-to-br from-violet-100 to-emerald-100 rounded-xl mx-auto w-fit mb-4">
                    <stat.icon className="w-6 h-6 text-violet-600" />
                  </div>
                  <div className="text-2xl font-bold text-slate-800 mb-1">{stat.value}</div>
                  <div className="text-sm text-slate-500">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right side - Description */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-violet-100 hover:shadow-xl transition-all duration-300">
              <div className="space-y-6">
                <motion.p 
                  className="text-lg text-slate-700 leading-relaxed"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                >
                  Backend разработчик, пишу на Go. Делаю API и работаю с базами данных.
                </motion.p>
                
                <motion.p 
                  className="text-lg text-slate-700 leading-relaxed"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.6, delay: 0.7 }}
                >
                  Использую PostgreSQL, знаком с Docker и Linux. Люблю решать алгоритмические задачи.
                </motion.p>
                
                <motion.p 
                  className="text-lg text-slate-700 leading-relaxed"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.6, delay: 0.9 }}
                >
                  Постоянно изучаю новое в области разработки.
                </motion.p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
