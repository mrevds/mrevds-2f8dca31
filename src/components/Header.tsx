
import { motion } from "framer-motion";

const Header = () => {
  return (
    <motion.header 
      className="min-h-screen flex items-center justify-center bg-white"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="text-center">
        <motion.h1 
          className="text-6xl md:text-8xl font-light text-gray-900 mb-4 tracking-tight"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Denis
        </motion.h1>
        <motion.div 
          className="w-16 h-px bg-blue-600 mx-auto mb-6"
          initial={{ width: 0 }}
          animate={{ width: 64 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        />
        <motion.p 
          className="text-xl md:text-2xl text-gray-600 font-light"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          Backend Developer
        </motion.p>
      </div>
    </motion.header>
  );
};

export default Header;
