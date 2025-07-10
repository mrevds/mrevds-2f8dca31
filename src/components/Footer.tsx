
import { motion } from "framer-motion";
import { Code2 } from "lucide-react";

const Footer = () => {
  return (
    <motion.footer 
      className="py-8 px-6 border-t border-gray-200 bg-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.8 }}
    >
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          className="flex items-center justify-center gap-2 mb-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
        >
          <Code2 className="w-4 h-4 text-blue-600" />
          <span className="text-gray-600 text-sm">Backend Developer</span>
        </motion.div>

        <motion.p 
          className="text-gray-500 text-sm"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.2 }}
        >
          © {new Date().getFullYear()} Denis
        </motion.p>
      </div>
    </motion.footer>
  );
};

export default Footer;
