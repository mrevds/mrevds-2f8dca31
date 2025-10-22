
import { Code2, Terminal, Download } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useEffect, useRef } from "react";
import { animate } from "@motionone/dom";

const Header = () => {
  const bgElement1 = useRef<HTMLDivElement>(null);
  const bgElement2 = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (bgElement1.current) {
      animate(
        bgElement1.current,
        { scale: [1, 1.2, 1], rotate: [0, 180, 360] },
        { duration: 20, repeat: Infinity, easing: "linear" }
      );
    }

    if (bgElement2.current) {
      animate(
        bgElement2.current,
        { scale: [1.2, 1, 1.2], rotate: [360, 180, 0] },
        { duration: 15, repeat: Infinity, easing: "linear" }
      );
    }
  }, []);

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden px-6">
      {/* Background decoration */}
      <div className="absolute inset-0">
        <div
          ref={bgElement1}
          className="absolute top-1/4 right-1/4 w-96 h-96 bg-violet-200/20 rounded-full blur-3xl"
        />
        <div
          ref={bgElement2}
          className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-emerald-200/20 rounded-full blur-3xl"
        />
      </div>

      <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto relative z-10">
        {/* Left side - Text content */}
        <div
          className="text-center lg:text-left animate-fade-in-left px-4 sm:px-0"
        >
          <div
            className="flex items-center justify-center lg:justify-start gap-4 mb-6 sm:mb-8 animate-fade-in-up"
            style={{ animationDelay: '0.2s' }}
          >
            <div className="p-2 sm:p-3 bg-white rounded-xl shadow-lg border border-violet-100">
              <Code2 className="w-5 h-5 sm:w-6 sm:h-6 text-violet-600" />
            </div>
            <div className="p-2 sm:p-3 bg-violet-600 rounded-xl shadow-lg">
              <Terminal className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
          </div>

          <h1 
            className="text-4xl sm:text-5xl lg:text-7xl font-light text-slate-800 mb-4 sm:mb-6 tracking-tight animate-fade-in-up"
            style={{ animationDelay: '0.4s' }}
          >
            Denis
          </h1>

          <div 
            className="flex items-center justify-center lg:justify-start gap-3 mb-6 sm:mb-8 animate-fade-in-up"
            style={{ animationDelay: '0.6s' }}
          >
            <div className="h-px w-12 sm:w-16 bg-gradient-to-r from-violet-400 to-emerald-400" />
            <div className="w-2 h-2 bg-violet-500 rounded-full" />
            <div className="h-px w-12 sm:w-16 bg-gradient-to-r from-emerald-400 to-violet-400" />
          </div>

          <p 
            className="text-lg sm:text-xl lg:text-2xl text-slate-600 font-light mb-6 sm:mb-8 animate-fade-in-up"
            style={{ animationDelay: '0.8s' }}
          >
            Backend Developer
          </p>

          <p 
            className="text-base sm:text-lg text-slate-500 mb-6 sm:mb-8 max-w-md mx-auto lg:mx-0 animate-fade-in-up"
            style={{ animationDelay: '1s' }}
          >
            I build reliable and scalable server solutions in Go
          </p>

          <div
            className="animate-fade-in-up"
            style={{ animationDelay: '1.2s' }}
          >
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-violet-600 to-emerald-600 hover:from-violet-700 hover:to-emerald-700 text-white px-6 sm:px-8 py-2 sm:py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 text-sm sm:text-base"
              onClick={() => {
                const link = document.createElement('a');
                link.href = 'https://www.canva.com/design/DAG1yGcz2N4/KYH2Am9Q9PsAeGQ4CA74sw/edit?utm_content=DAG1yGcz2N4&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton';
                link.download = 'Resume.pdf';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
              }}
            >
              <Download className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
              Download CV
            </Button>
          </div>
        </div>

        {/* Right side - Avatar and decorative elements */}
        <div
          className="flex justify-center lg:justify-end animate-fade-in-right px-4 sm:px-0"
          style={{ animationDelay: '0.4s' }}
        >
          <div className="relative">
            <div
              className="absolute inset-0 bg-gradient-to-r from-violet-400/20 to-emerald-400/20 rounded-full blur-2xl animate-pulse-scale"
            />
            <Avatar className="w-64 h-64 sm:w-72 sm:h-72 lg:w-80 lg:h-80 border-4 sm:border-8 border-white shadow-2xl ring-4 ring-violet-100 relative z-10">
              <AvatarImage 
                src="https://i.pinimg.com/1200x/2d/13/ee/2d13ee206ea3b99173048e407c61fa40.jpg"
                alt="Denis" 
                className="object-cover"
              />
              <AvatarFallback className="bg-gradient-to-br from-violet-100 to-emerald-100 text-violet-700 text-3xl sm:text-4xl font-medium">
                DN
              </AvatarFallback>
            </Avatar>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Header;
