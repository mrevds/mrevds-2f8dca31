import { useRef, useEffect, useState } from "react";
import { Coffee, Clock, Target } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

const AboutSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);
  const { content } = useLanguage();
  const about = content.about;

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
    { icon: Coffee, ...about.stats[0] },
    { icon: Clock, ...about.stats[1] },
    { icon: Target, ...about.stats[2] },
  ];

  return (
    <section id="about" ref={ref} className="relative py-20 px-4 sm:px-6">
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute -top-10 left-10 w-72 h-72 bg-violet-200/30 blur-3xl rounded-full" />
        <div className="absolute bottom-0 right-6 w-80 h-80 bg-emerald-200/30 blur-3xl rounded-full" />
      </div>

      <div className="relative max-w-6xl mx-auto rounded-[36px] bg-white/85 shadow-[0_35px_120px_rgba(79,70,229,0.15)] backdrop-blur px-6 sm:px-10 lg:px-16 py-14">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] items-start">
          <div className={`space-y-8 animate-fade-in-left ${isInView ? '' : 'opacity-0'}`}>
            <div className="inline-flex items-center gap-2 rounded-full bg-white/80 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-slate-500 shadow-sm">
              {about.title}
            </div>
            <h2
              className="text-4xl lg:text-5xl font-light text-slate-900"
              style={{ animationDelay: isInView ? '0.1s' : '0s' }}
            >
              {about.title}
            </h2>

            <div className="space-y-5">
              {about.paragraphs.map((paragraph, idx) => (
                <p
                  key={paragraph}
                  className="text-lg text-slate-600 leading-relaxed"
                  style={{ animationDelay: isInView ? `${0.3 + idx * 0.15}s` : '0s' }}
                >
                  {paragraph}
                </p>
              ))}
            </div>

            <div className="rounded-3xl bg-gradient-to-br from-white via-violet-50/40 to-emerald-50/60 p-6 shadow-md">
              <p className="text-sm uppercase tracking-[0.35em] text-slate-400 mb-4">{about.focusTitle}</p>
              <div className="flex flex-wrap gap-2">
                {about.focusItems.map((area) => (
                  <span key={area} className="text-xs font-semibold px-3 py-1 rounded-full bg-white text-slate-700 shadow-sm">
                    {area}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div
            className={`space-y-6 animate-fade-in-right ${isInView ? '' : 'opacity-0'}`}
            style={{ animationDelay: isInView ? '0.2s' : '0s' }}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {stats.map((stat, index) => (
                <div
                  key={stat.label}
                  className="rounded-3xl bg-white/90 p-5 shadow-[0_15px_35px_rgba(79,70,229,0.12)] transition-all duration-300 hover:-translate-y-1"
                  style={{
                    animationDelay: isInView ? `${0.4 + index * 0.1}s` : '0s',
                  }}
                >
                  <div className="flex items-center gap-3">
                    <div className="rounded-2xl bg-gradient-to-br from-violet-100 to-emerald-100 p-3">
                      <stat.icon className="w-5 h-5 text-violet-700" />
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-[0.3em] text-slate-400">{stat.label}</p>
                      <p className="text-2xl font-semibold text-slate-900 mt-1">{stat.value}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="rounded-[28px] bg-white/80 px-6 py-5 shadow-inner">
              <p className="text-xs uppercase tracking-[0.35em] text-slate-400">{stats[2].label}</p>
              <p className="text-xl font-semibold text-slate-900 mt-2">{stats[2].value}</p>
              <div className="mt-4 h-1 w-full rounded-full bg-gradient-to-r from-violet-400 via-emerald-400 to-violet-500 opacity-60" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
