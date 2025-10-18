import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Coffee, Clock, Target } from "lucide-react";

const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const stats = [
    { icon: Coffee, label: "Projects", value: "3" },
    { icon: Clock, label: "Experience", value: "2 yrs" },
    { icon: Target, label: "Goal", value: "Prod-ready backend" }
  ];

  return (
    <section id="about" ref={ref} className="py-20 px-6 bg-white/50">
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left side - Stats */}
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
              About Me
            </motion.h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  className="text-center p-4 sm:p-6 bg-white rounded-2xl shadow-lg border border-violet-100 hover:shadow-xl transition-all duration-300"
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                  transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                  whileHover={{ y: -5 }}
                >
                  <div className="p-3 bg-gradient-to-br from-violet-100 to-emerald-100 rounded-xl mx-auto w-fit mb-4">
                    <stat.icon className="w-6 h-6 text-violet-600" />
                  </div>
                  <div className="text-xl sm:text-2xl font-bold text-slate-800 mb-1 break-words">{stat.value}</div>
                  <div className="text-xs sm:text-sm text-slate-500 break-words">{stat.label}</div>
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
                  Backend developer focused on building reliable and scalable systems.
                  I specialize in developing high-performance APIs and microservices.
                </motion.p>
                
                <motion.p 
                  className="text-lg text-slate-700 leading-relaxed"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.6, delay: 0.7 }}
                >
                  My core stack is Go and PostgreSQL. I enjoy solving complex technical problems 
                  and constantly explore new technologies to boost development efficiency.
                </motion.p>

                {/* Uncomment if you want to use the quote */}
                {/*<motion.div
                  className="pt-4 border-t border-violet-100"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.6, delay: 0.9 }}
                >
                  <p className="text-violet-600 font-medium">
                    "Clean code is not a luxury, it's a necessity"
                  </p>
                </motion.div>*/}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
