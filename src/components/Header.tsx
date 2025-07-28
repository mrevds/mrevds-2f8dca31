
import { motion } from "framer-motion";
import { Code2, Terminal, Download } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

const Header = () => {
  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden px-6">
      {/* Background decoration */}
      <div className="absolute inset-0">
        <motion.div 
          className="absolute top-1/4 right-1/4 w-96 h-96 bg-violet-200/20 rounded-full blur-3xl"
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
        <motion.div 
          className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-emerald-200/20 rounded-full blur-3xl"
          animate={{ 
            scale: [1.2, 1, 1.2],
            rotate: [360, 180, 0]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        />
      </div>

      <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto relative z-10">
        {/* Left side - Text content */}
        <motion.div
          className="text-center lg:text-left"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="flex items-center justify-center lg:justify-start gap-4 mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="p-3 bg-white rounded-xl shadow-lg border border-violet-100">
              <Code2 className="w-6 h-6 text-violet-600" />
            </div>
            <div className="p-3 bg-violet-600 rounded-xl shadow-lg">
              <Terminal className="w-6 h-6 text-white" />
            </div>
          </motion.div>

          <motion.h1 
            className="text-5xl lg:text-7xl font-light text-slate-800 mb-4 tracking-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Denis
          </motion.h1>

          <motion.div 
            className="flex items-center justify-center lg:justify-start gap-3 mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <div className="h-px w-16 bg-gradient-to-r from-violet-400 to-emerald-400" />
            <div className="w-2 h-2 bg-violet-500 rounded-full" />
            <div className="h-px w-16 bg-gradient-to-r from-emerald-400 to-violet-400" />
          </motion.div>

          <motion.p 
            className="text-xl lg:text-2xl text-slate-600 font-light mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            Backend Developer
          </motion.p>

          <motion.p 
            className="text-lg text-slate-500 mb-8 max-w-md mx-auto lg:mx-0"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            I build reliable and scalable server solutions in Go
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
          >
            {/* <Button 
              size="lg" 
              className="bg-gradient-to-r from-violet-600 to-emerald-600 hover:from-violet-700 hover:to-emerald-700 text-white px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
              onClick={() => {
                const link = document.createElement('a');
                link.href = '/resume.pdf';
                link.download = 'Resume.pdf';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
              }}
            >
              <Download className="w-5 h-5 mr-2" />
              Скачать резюме
            </Button> */}
          </motion.div>
        </motion.div>

        {/* Right side - Avatar and decorative elements */}
        <motion.div
          className="flex justify-center lg:justify-end"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="relative">
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-violet-400/20 to-emerald-400/20 rounded-full blur-2xl"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />
            <Avatar className="w-80 h-80 border-8 border-white shadow-2xl ring-4 ring-violet-100 relative z-10">
              <AvatarImage 
                src="https://i.pinimg.com/1200x/2d/13/ee/2d13ee206ea3b99173048e407c61fa40.jpg"
                alt="Denis" 
                className="object-cover"
              />
              <AvatarFallback className="bg-gradient-to-br from-violet-100 to-emerald-100 text-violet-700 text-4xl font-medium">
                DN
              </AvatarFallback>
            </Avatar>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Header;
