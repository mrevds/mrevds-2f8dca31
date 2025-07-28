
import { motion } from "framer-motion";
import { useState } from "react";
import { Home, User, Code, Briefcase, Mail, Menu, X } from "lucide-react";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { icon: Home, label: "Main", href: "#home" },
    { icon: User, label: "About me", href: "#about" },
    { icon: Code, label: "Skills", href: "#skills" },
    { icon: Briefcase, label: "Projects", href: "#projects" },
    { icon: Mail, label: "Contacts", href: "#contact" },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    element?.scrollIntoView({ behavior: "smooth" });
    setIsOpen(false);
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <motion.button
        className="lg:hidden fixed top-6 left-6 z-50 p-3 bg-white/80 backdrop-blur-md rounded-xl shadow-lg border border-violet-100"
        onClick={() => setIsOpen(!isOpen)}
        whileTap={{ scale: 0.95 }}
      >
        {isOpen ? <X className="w-5 h-5 text-violet-600" /> : <Menu className="w-5 h-5 text-violet-600" />}
      </motion.button>

      {/* Desktop Sidebar */}
      <motion.nav
        className="hidden lg:flex fixed left-0 top-0 h-full w-20 bg-white/80 backdrop-blur-md border-r border-violet-100 z-40"
        initial={{ x: -100 }}
        animate={{ x: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex flex-col items-center justify-center space-y-8 w-full">
          {navItems.map((item, index) => (
            <motion.button
              key={item.label}
              onClick={() => scrollToSection(item.href)}
              className="group relative p-3 rounded-xl hover:bg-violet-50 transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <item.icon className="w-6 h-6 text-violet-600 group-hover:text-violet-700" />
              <div className="absolute left-full ml-4 px-3 py-2 bg-slate-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                {item.label}
              </div>
            </motion.button>
          ))}
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <motion.div
        className={`lg:hidden fixed inset-0 z-40 ${isOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}
        initial={false}
        animate={{ opacity: isOpen ? 1 : 0 }}
      >
        <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" onClick={() => setIsOpen(false)} />
        <motion.div
          className="absolute left-0 top-0 h-full w-80 bg-white/95 backdrop-blur-md border-r border-violet-100"
          initial={{ x: -320 }}
          animate={{ x: isOpen ? 0 : -320 }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
        >
          <div className="flex flex-col justify-center h-full space-y-6 px-8">
            {navItems.map((item, index) => (
              <motion.button
                key={item.label}
                onClick={() => scrollToSection(item.href)}
                className="flex items-center space-x-4 p-4 rounded-xl hover:bg-violet-50 transition-all duration-300 text-left"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: isOpen ? 1 : 0, x: isOpen ? 0 : -20 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <item.icon className="w-6 h-6 text-violet-600" />
                <span className="text-lg font-medium text-slate-700">{item.label}</span>
              </motion.button>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </>
  );
};

export default Navigation;
