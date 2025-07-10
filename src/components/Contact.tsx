
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Mail, MessageCircle } from "lucide-react";

const Contact = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-20 px-6 bg-gray-50">
      <div className="max-w-3xl mx-auto text-center">
        <motion.h2 
          className="text-3xl md:text-4xl font-light text-gray-900 mb-12 relative"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.6 }}
        >
          Контакты
          <motion.div
            className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-12 h-0.5 bg-blue-600"
            initial={{ width: 0 }}
            animate={isInView ? { width: 48 } : { width: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          />
        </motion.h2>

        <motion.p
          className="text-gray-600 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Готов к обсуждению проектов
        </motion.p>
        
        <motion.div 
          className="flex flex-col sm:flex-row gap-4 justify-center"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Button 
            variant="outline" 
            size="lg" 
            className="hover:bg-blue-50 border-blue-200 text-blue-700 hover:border-blue-300"
            asChild
          >
            <a href="https://t.me/your_telegram" target="_blank" rel="noopener noreferrer">
              <MessageCircle className="w-5 h-5 mr-2" />
              Telegram
            </a>
          </Button>

          <Button 
            variant="outline" 
            size="lg" 
            className="hover:bg-gray-50"
            asChild
          >
            <a href="mailto:your.email@example.com">
              <Mail className="w-5 h-5 mr-2" />
              Email
            </a>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
