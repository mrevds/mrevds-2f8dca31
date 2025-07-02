
import { motion } from "framer-motion";
import { Code2, Heart } from "lucide-react";

const Footer = () => {
  return (
    <motion.footer 
      className="py-12 px-6 border-t border-gray-200 bg-gradient-to-r from-gray-50 to-white relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.8 }}
    >
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute bottom-0 left-1/4 w-20 h-20 bg-blue-50 rounded-full opacity-30"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <motion.div
          className="flex items-center justify-center gap-2 mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
        >
          <motion.div
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.5 }}
          >
            <Code2 className="w-5 h-5 text-blue-600" />
          </motion.div>
          <span className="text-gray-600">Сделано с</span>
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Heart className="w-4 h-4 text-red-500 fill-current" />
          </motion.div>
          <span className="text-gray-600">и кофе</span>
        </motion.div>

        <motion.p 
          className="text-gray-500 text-sm"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.2 }}
        >
          © {new Date().getFullYear()} Denis. Backend Developer.
        </motion.p>

        <motion.div
          className="mt-4 flex justify-center gap-1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.4 }}
        >
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="w-1 h-1 bg-blue-400 rounded-full"
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ 
                duration: 2, 
                repeat: Infinity, 
                delay: i * 0.2,
                ease: "easeInOut"
              }}
            />
          ))}
        </motion.div>
      </div>
    </motion.footer>
  );
};

export default Footer;
