
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-20 px-6 max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-8 text-center">
          О себе
        </h2>
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-lg md:text-xl text-gray-600 leading-relaxed mb-4">
            Backend-разработчик с фокусом на создание надежных систем.
          </p>
          <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
            Специализация — Go и разработка высокопроизводительных API.
          </p>
        </div>
      </motion.div>
    </section>
  );
};

export default About;
