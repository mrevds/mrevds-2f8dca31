
import { useState } from "react";
import { Home, User, Code, Briefcase, Mail, Menu, X } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import type { NavItemId } from "@/lib/i18n";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { content, language, toggleLanguage } = useLanguage();
  const nextLanguage = language === "en" ? "ru" : "en";

  const navItems: { id: NavItemId; icon: typeof Home; href: string }[] = [
    { id: "home", icon: Home, href: "#home" },
    { id: "about", icon: User, href: "#about" },
    { id: "skills", icon: Code, href: "#skills" },
    { id: "projects", icon: Briefcase, href: "#projects" },
    { id: "contact", icon: Mail, href: "#contact" },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    element?.scrollIntoView({ behavior: "smooth" });
    setIsOpen(false);
  };

  return (
    <>
      {/* Floating Language Toggle */}
      <button
        onClick={toggleLanguage}
        className="fixed top-4 right-4 sm:top-6 sm:right-6 z-50 px-4 py-2 rounded-2xl bg-white/90 shadow-[0_10px_30px_rgba(79,70,229,0.15)] backdrop-blur text-sm font-semibold text-slate-700 hover:bg-violet-50 transition-colors"
        aria-label={content.navigation.languageToggleHint}
      >
        <div className="flex items-center gap-2">
          <span className="text-xs uppercase tracking-[0.35em] text-slate-400">
            {content.navigation.languageToggleHint}
          </span>
          <span className="text-base text-violet-600">
            {language.toUpperCase()} → {nextLanguage.toUpperCase()}
          </span>
        </div>
      </button>

      {/* Mobile Menu Button */}
      <button
        className="lg:hidden fixed top-4 left-4 sm:top-6 sm:left-6 z-50 p-3 bg-white/90 backdrop-blur-md rounded-xl shadow-[0_15px_35px_rgba(79,70,229,0.2)] transition-transform duration-300 hover:scale-105 active:scale-95"
        aria-label="Toggle navigation"
        aria-expanded={isOpen}
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X className="w-5 h-5 text-violet-600" /> : <Menu className="w-5 h-5 text-violet-600" />}
      </button>

      {/* Desktop Sidebar */}
      <nav
        className="hidden lg:flex fixed left-6 top-1/2 -translate-y-1/2 z-40 animate-fade-in-left"
        style={{ animationDelay: '0s' }}
      >
        <div className="flex flex-col items-center gap-5 bg-white/80 backdrop-blur-2xl rounded-full shadow-[0_25px_90px_rgba(79,70,229,0.25)] px-4 py-6">
          {navItems.map((item, index) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.href)}
              className="group relative p-3 rounded-full hover:bg-violet-50/80 transition-all duration-300 shadow-sm"
              style={{ animationDelay: `${index * 0.08}s` }}
            >
              <item.icon className="w-5 h-5 text-violet-600 group-hover:text-violet-700 transition-colors duration-300" />
              <div className="absolute left-full ml-4 px-3 py-1.5 bg-slate-900/90 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                {content.navigation.items[item.id]}
              </div>
            </button>
          ))}
          <button
            onClick={toggleLanguage}
            className="mt-2 rounded-full bg-gradient-to-r from-violet-500 to-emerald-500 px-4 py-2 text-xs font-semibold text-white shadow-lg"
          >
            {language.toUpperCase()}
          </button>
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
          className={`absolute left-0 top-0 h-full w-[min(19rem,85vw)] bg-white/95 backdrop-blur-md shadow-[0_25px_80px_rgba(79,70,229,0.25)] rounded-r-3xl transition-transform duration-300 ${
            isOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <div className="flex flex-col justify-between h-full py-10">
            <div className="px-8">
              <p className="text-xs uppercase tracking-[0.2em] text-slate-400 mb-2">{content.navigation.mobileTitle}</p>
              <h2 className="text-2xl font-semibold text-slate-800">{content.navigation.introTitle}</h2>
              <p className="text-sm text-slate-500">{content.navigation.introSubtitle}</p>
            </div>
            <div className="flex-1 flex flex-col justify-center space-y-4 px-6">
              {navItems.map((item, index) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.href)}
                  className={`flex items-center space-x-4 p-4 rounded-2xl hover:bg-violet-50/70 transition-all duration-300 text-left animate-fade-in-left ${
                    isOpen ? 'opacity-100' : 'opacity-0'
                  }`}
                  style={{
                    transitionDelay: isOpen ? `${index * 0.05}s` : '0s'
                  }}
                >
                  <item.icon className="w-6 h-6 text-violet-600" />
                  <span className="text-lg font-medium text-slate-700">{content.navigation.items[item.id]}</span>
                </button>
              ))}
            </div>
            <div className="px-8 pb-8 flex items-center justify-between text-sm text-slate-500">
              <p>{content.navigation.languageToggleHint}</p>
              <button
                onClick={toggleLanguage}
                className="rounded-full bg-gradient-to-r from-violet-500 to-emerald-500 text-white px-4 py-2 font-semibold shadow-lg"
              >
                {language.toUpperCase()}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navigation;
