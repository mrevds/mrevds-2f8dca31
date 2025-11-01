import { useRef, useEffect, useState } from "react";
import { Coffee, Clock, Target } from "lucide-react";

const AboutSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: "-100px" }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const stats = [
    { icon: Coffee, label: "Projects", value: "4" },
    { icon: Clock, label: "Experience", value: "2 yrs" },
    { icon: Target, label: "Goal", value: "Prod-ready backend" }
  ];

  return (
    <section id="about" ref={ref} className="py-20 px-6 bg-white/50">
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left side - Stats */}
          <div
            className={`space-y-8 animate-fade-in-left ${isInView ? '' : 'opacity-0'}`}
          >
            <h2 
              className="text-4xl lg:text-5xl font-light text-slate-800 mb-8 animate-fade-in-up"
              style={{ animationDelay: isInView ? '0.2s' : '0s' }}
            >
              About Me
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {stats.map((stat, index) => (
                <div
                  key={stat.label}
                  className={`text-center p-4 sm:p-6 bg-white rounded-2xl shadow-lg border border-violet-100 hover:shadow-xl hover:scale-105 transition-all duration-300 animate-slide-in-up ${
                    isInView ? 'opacity-100' : 'opacity-0'
                  }`}
                  style={{
                    animationDelay: isInView ? `${0.4 + index * 0.1}s` : '0s',
                  }}
                >
                  <div className="p-3 bg-gradient-to-br from-violet-100 to-emerald-100 rounded-xl mx-auto w-fit mb-4 transition-transform duration-300 hover:scale-110">
                    <stat.icon className="w-6 h-6 text-violet-600" />
                  </div>
                  <div className="text-xl sm:text-2xl font-bold text-slate-800 mb-1 break-words">{stat.value}</div>
                  <div className="text-xs sm:text-sm text-slate-500 break-words">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right side - Description */}
          <div
            className={`space-y-6 animate-fade-in-right ${isInView ? '' : 'opacity-0'}`}
            style={{ animationDelay: isInView ? '0.3s' : '0s' }}
          >
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-violet-100 hover:shadow-xl transition-all duration-300">
              <div className="space-y-6">
                <p 
                  className="text-lg text-slate-700 leading-relaxed animate-fade-in-up"
                  style={{ animationDelay: isInView ? '0.5s' : '0s' }}
                >
                  Backend developer focused on building reliable and scalable systems.
                  I specialize in developing high-performance APIs and microservices.
                </p>
                
                <p 
                  className="text-lg text-slate-700 leading-relaxed animate-fade-in-up"
                  style={{ animationDelay: isInView ? '0.7s' : '0s' }}
                >
                  My core stack is Go and PostgreSQL. I enjoy solving complex technical problems 
                  and constantly explore new technologies to boost development efficiency.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
