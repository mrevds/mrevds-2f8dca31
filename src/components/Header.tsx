
import { motion } from "framer-motion";
import { Code, Terminal } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

const Header = () => {
  return (
    <motion.header 
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white via-gray-50 to-blue-50 relative overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      {/* Minimal background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div 
          className="absolute top-20 right-20 w-32 h-32 bg-blue-100 rounded-full opacity-10"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="text-center relative z-10 max-w-2xl mx-auto px-6">
        {/* Avatar */}
        <motion.div
          className="mb-8 flex justify-center"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <Avatar className="w-32 h-32 border-4 border-white shadow-xl">
            <AvatarImage 
              src="https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?w=400&h=400&fit=crop&crop=face" 
              alt="Denis" 
              className="object-cover"
            />
            <AvatarFallback className="bg-blue-100 text-blue-600 text-2xl font-medium">
              DN
            </AvatarFallback>
          </Avatar>
        </motion.div>

        {/* Icons */}
        <motion.div
          className="flex items-center justify-center gap-4 mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="p-2 bg-white rounded-lg shadow-sm border border-gray-100">
            <Code className="w-6 h-6 text-blue-600" />
          </div>
          <div className="p-2 bg-blue-600 rounded-lg shadow-sm">
            <Terminal className="w-6 h-6 text-white" />
          </div>
        </motion.div>

        {/* Name */}
        <motion.h1 
          className="text-5xl md:text-6xl font-light text-gray-900 mb-4 tracking-tight"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          Denis
        </motion.h1>

        {/* Divider */}
        <motion.div 
          className="flex items-center justify-center gap-2 mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <div className="w-12 h-px bg-gradient-to-r from-transparent via-blue-600 to-transparent" />
          <div className="w-2 h-2 bg-blue-600 rounded-full" />
          <div className="w-12 h-px bg-gradient-to-r from-transparent via-blue-600 to-transparent" />
        </motion.div>

        {/* Title */}
        <motion.p 
          className="text-xl md:text-2xl text-gray-600 font-light"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          Backend Developer
        </motion.p>
      </div>
    </motion.header>
  );
};

export default Header;
