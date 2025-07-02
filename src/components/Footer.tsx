
import { motion } from "framer-motion";

const Footer = () => {
  return (
    <motion.footer 
      className="py-8 px-6 border-t border-gray-200"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.8 }}
    >
      <div className="max-w-4xl mx-auto text-center">
        <p className="text-gray-500 text-sm">
          © {new Date().getFullYear()} Denis. Backend Developer.
        </p>
      </div>
    </motion.footer>
  );
};

export default Footer;
