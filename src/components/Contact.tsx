
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Mail, MessageCircle, Send, User } from "lucide-react";

const Contact = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-20 px-6 bg-gradient-to-br from-gray-50 via-white to-blue-50 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div 
          className="absolute top-20 right-20 w-32 h-32 border border-blue-200 rounded-full opacity-20"
          animate={{ 
            scale: [1, 1.1, 1],
            rotate: [0, 180, 360] 
          }}
          transition={{ 
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <motion.div 
          className="absolute bottom-20 left-20 w-16 h-16 bg-blue-100 rounded-lg opacity-30"
          animate={{ 
            y: [-10, 10, -10],
            rotate: [0, 5, 0]
          }}
          transition={{ 
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        <motion.h2 
          className="text-3xl md:text-4xl font-light text-gray-900 mb-12 text-center relative"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.6 }}
        >
          Контакты
          <motion.div
            className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-16 h-0.5 bg-gradient-to-r from-blue-600 to-blue-400"
            initial={{ width: 0 }}
            animate={isInView ? { width: 64 } : { width: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          />
        </motion.h2>

        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <motion.div
              className="p-2 bg-blue-100 rounded-full"
              whileHover={{ scale: 1.1, rotate: 5 }}
            >
              <User className="w-5 h-5 text-blue-600" />
            </motion.div>
            <p className="text-gray-600">Готов к обсуждению проектов</p>
          </div>
        </motion.div>
        
        <motion.div 
          className="flex flex-col sm:flex-row gap-6 justify-center items-center"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <motion.div
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            <Button 
              variant="outline" 
              size="lg" 
              className="w-full sm:w-auto hover:bg-blue-50 border-blue-200 text-blue-700 hover:border-blue-300 transition-all duration-300 shadow-sm hover:shadow-md group relative overflow-hidden"
              asChild
            >
              <a href="https://t.me/your_telegram" target="_blank" rel="noopener noreferrer">
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-400 opacity-0 group-hover:opacity-10 transition-opacity duration-300"
                />
                <MessageCircle className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform duration-200" />
                Telegram
                <Send className="w-4 h-4 ml-2 opacity-0 group-hover:opacity-100 transition-all duration-200 transform translate-x-2 group-hover:translate-x-0" />
              </a>
            </Button>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            <Button 
              variant="outline" 
              size="lg" 
              className="w-full sm:w-auto hover:bg-gray-50 border-gray-200 hover:border-gray-300 transition-all duration-300 shadow-sm hover:shadow-md group relative overflow-hidden"
              asChild
            >
              <a href="mailto:your.email@example.com">
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-gray-600 to-gray-400 opacity-0 group-hover:opacity-10 transition-opacity duration-300"
                />
                <Mail className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform duration-200" />
                Email
                <Send className="w-4 h-4 ml-2 opacity-0 group-hover:opacity-100 transition-all duration-200 transform translate-x-2 group-hover:translate-x-0" />
              </a>
            </Button>
          </motion.div>
        </motion.div>

        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <div className="flex justify-center items-center gap-2">
            <motion.div
              className="w-2 h-2 bg-blue-600 rounded-full"
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <span className="text-sm text-gray-500">Отвечу в течение дня</span>
            <motion.div
              className="w-2 h-2 bg-blue-400 rounded-full"
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 2, repeat: Infinity, delay: 1 }}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
