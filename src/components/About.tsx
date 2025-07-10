
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-20 px-6 max-w-3xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.6 }}
      >
        <motion.h2 
          className="text-3xl md:text-4xl font-light text-gray-900 mb-12 text-center relative"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          О себе
          <motion.div
            className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-12 h-0.5 bg-blue-600"
            initial={{ width: 0 }}
            animate={isInView ? { width: 48 } : { width: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          />
        </motion.h2>

        <motion.div
          className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <p className="text-lg md:text-xl text-gray-700 leading-relaxed mb-4">
            Backend-разработчик с фокусом на создание надежных систем.
          </p>
          <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
            Специализация — Go и разработка высокопроизводительных API.
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default About;
