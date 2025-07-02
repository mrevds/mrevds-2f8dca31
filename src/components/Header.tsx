
import { motion } from "framer-motion";
import { Code, Terminal } from "lucide-react";

const Header = () => {
  return (
    <motion.header 
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white via-gray-50 to-blue-50 relative overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      {/* Geometric background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div 
          className="absolute top-20 left-20 w-32 h-32 bg-blue-100 rounded-full opacity-20"
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360] 
          }}
          transition={{ 
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <motion.div 
          className="absolute bottom-20 right-20 w-24 h-24 bg-gradient-to-r from-blue-200 to-blue-300 rounded-lg opacity-30"
          animate={{ 
            rotate: [0, -180, 0],
            scale: [1, 0.8, 1]
          }}
          transition={{ 
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute top-1/2 left-10 w-2 h-20 bg-blue-600 opacity-20"
          animate={{ 
            scaleY: [1, 1.5, 1],
            x: [0, 10, 0]
          }}
          transition={{ 
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      <div className="text-center relative z-10">
        <motion.div
          className="flex items-center justify-center gap-4 mb-6"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <motion.div
            className="p-3 bg-white rounded-full shadow-lg border border-gray-100"
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ duration: 0.3 }}
          >
            <Code className="w-8 h-8 text-blue-600" />
          </motion.div>
          <motion.div
            className="p-3 bg-gradient-to-r from-blue-600 to-blue-700 rounded-full shadow-lg"
            whileHover={{ scale: 1.1, rotate: -5 }}
            transition={{ duration: 0.3 }}
          >
            <Terminal className="w-8 h-8 text-white" />
          </motion.div>
        </motion.div>

        <motion.h1 
          className="text-6xl md:text-8xl font-light text-gray-900 mb-4 tracking-tight relative"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <span className="relative">
            Denis
            <motion.div
              className="absolute -bottom-2 left-0 h-1 bg-gradient-to-r from-blue-600 to-blue-400 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 1, delay: 1.2 }}
            />
          </span>
        </motion.h1>

        <motion.div 
          className="flex items-center justify-center gap-2 mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <div className="w-8 h-px bg-gradient-to-r from-transparent via-blue-600 to-transparent" />
          <div className="w-2 h-2 bg-blue-600 rounded-full" />
          <div className="w-8 h-px bg-gradient-to-r from-transparent via-blue-600 to-transparent" />
        </motion.div>

        <motion.p 
          className="text-xl md:text-2xl text-gray-600 font-light tracking-wide"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          Backend Developer
        </motion.p>
      </div>
    </motion.header>
  );
};

export default Header;
