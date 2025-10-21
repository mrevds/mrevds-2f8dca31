
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
      <button
        className="lg:hidden fixed top-6 left-6 z-50 p-3 bg-white/80 backdrop-blur-md rounded-xl shadow-lg border border-violet-100 transition-transform duration-300 hover:scale-110 active:scale-95"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X className="w-5 h-5 text-violet-600" /> : <Menu className="w-5 h-5 text-violet-600" />}
      </button>

      {/* Desktop Sidebar */}
      <nav
        className="hidden lg:flex fixed left-0 top-0 h-full w-20 bg-white/80 backdrop-blur-md border-r border-violet-100 z-40 animate-fade-in-left"
        style={{ animationDelay: '0s' }}
      >
        <div className="flex flex-col items-center justify-center space-y-8 w-full">
          {navItems.map((item, index) => (
            <button
              key={item.label}
              onClick={() => scrollToSection(item.href)}
              className="group relative p-3 rounded-xl hover:bg-violet-50 transition-all duration-300 animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <item.icon className="w-6 h-6 text-violet-600 group-hover:text-violet-700 transition-colors duration-300" />
              <div className="absolute left-full ml-4 px-3 py-2 bg-slate-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                {item.label}
              </div>
            </button>
          ))}
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden fixed inset-0 z-40 transition-opacity duration-300 ${isOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}
        style={{ opacity: isOpen ? 1 : 0 }}
      >
        <div 
          className="absolute inset-0 bg-black/20 backdrop-blur-sm" 
          onClick={() => setIsOpen(false)} 
        />
        <div
          className={`absolute left-0 top-0 h-full w-80 bg-white/95 backdrop-blur-md border-r border-violet-100 transition-transform duration-300 ${
            isOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <div className="flex flex-col justify-center h-full space-y-6 px-8">
            {navItems.map((item, index) => (
              <button
                key={item.label}
                onClick={() => scrollToSection(item.href)}
                className={`flex items-center space-x-4 p-4 rounded-xl hover:bg-violet-50 transition-all duration-300 text-left animate-fade-in-left ${
                  isOpen ? 'opacity-100' : 'opacity-0'
                }`}
                style={{
                  transitionDelay: isOpen ? `${index * 0.05}s` : '0s'
                }}
              >
                <item.icon className="w-6 h-6 text-violet-600" />
                <span className="text-lg font-medium text-slate-700">{item.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Navigation;
