
import { motion } from "framer-motion";
import { Code, Terminal } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

const Header = () => {
  return (
    <motion.header 
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-purple-50/30 to-emerald-50/20 relative overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      {/* Minimal background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div 
          className="absolute top-20 right-20 w-32 h-32 bg-primary/10 rounded-full"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute bottom-40 left-20 w-24 h-24 bg-accent/10 rounded-full"
          animate={{ scale: [1.1, 1, 1.1] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
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
          <Avatar className="w-32 h-32 border-4 border-white shadow-2xl ring-2 ring-primary/20">
            <AvatarImage 
              src="https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?w=400&h=400&fit=crop&crop=face" 
              alt="Denis" 
              className="object-cover"
            />
            <AvatarFallback className="bg-primary/10 text-primary text-2xl font-medium">
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
          <div className="p-3 bg-white rounded-xl shadow-lg border border-primary/10 hover:border-primary/20 transition-colors">
            <Code className="w-6 h-6 text-primary" />
          </div>
          <div className="p-3 bg-primary rounded-xl shadow-lg hover:bg-primary/90 transition-colors">
            <Terminal className="w-6 h-6 text-white" />
          </div>
        </motion.div>

        {/* Name */}
        <motion.h1 
          className="text-5xl md:text-6xl font-light text-foreground mb-4 tracking-tight"
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
          <div className="w-12 h-px bg-gradient-to-r from-transparent via-primary to-transparent" />
          <div className="w-2 h-2 bg-primary rounded-full" />
          <div className="w-12 h-px bg-gradient-to-r from-transparent via-primary to-transparent" />
        </motion.div>

        {/* Title */}
        <motion.p 
          className="text-xl md:text-2xl text-muted-foreground font-light"
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
