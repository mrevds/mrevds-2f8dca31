
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-20 px-6 max-w-4xl mx-auto relative">
      {/* Decorative elements */}
      <motion.div
        className="absolute top-10 right-10 w-16 h-16 border-2 border-blue-200 rounded-full opacity-30"
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      />
      
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.6 }}
        className="relative"
      >
        <motion.h2 
          className="text-3xl md:text-4xl font-light text-gray-900 mb-8 text-center relative"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          О себе
          <motion.div
            className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-12 h-0.5 bg-gradient-to-r from-blue-600 to-blue-400"
            initial={{ width: 0 }}
            animate={isInView ? { width: 48 } : { width: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          />
        </motion.h2>

        <div className="max-w-2xl mx-auto text-center space-y-6">
          <motion.div
            className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            whileHover={{ y: -2 }}
          >
            <p className="text-lg md:text-xl text-gray-600 leading-relaxed mb-4">
              Backend-разработчик с фокусом на создание надежных систем.
            </p>
            <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
              Специализация — Go и разработка высокопроизводительных API.
            </p>
          </motion.div>

          <motion.div
            className="flex justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse" />
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }} />
            <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default About;
