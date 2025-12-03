import { Code2, Terminal, Send, Github } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useEffect, useRef } from "react";
import { animate } from "@motionone/dom";
import { useLanguage } from "@/context/LanguageContext";

const Header = () => {
  const bgElement1 = useRef<HTMLDivElement>(null);
  const bgElement2 = useRef<HTMLDivElement>(null);
  const { content } = useLanguage();
  const hero = content.hero;

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

  const openTelegram = () => {
    window.open("https://t.me/mrevds", "_blank", "noopener,noreferrer");
  };

  const openGithub = () => {
    window.open("https://github.com/mrevds", "_blank", "noopener,noreferrer");
  };

  return (
    <section id="home" className="relative overflow-hidden pt-24 pb-16 sm:pb-24">
      <div className="absolute inset-0 pointer-events-none">
        <div
          ref={bgElement1}
          className="absolute top-10 right-0 sm:right-1/4 w-72 sm:w-96 h-72 sm:h-96 bg-violet-200/30 rounded-full blur-3xl"
        />
        <div
          ref={bgElement2}
          className="absolute -bottom-6 left-0 sm:left-1/4 w-64 sm:w-80 h-64 sm:h-80 bg-emerald-200/30 rounded-full blur-3xl"
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] items-center">
          <div className="text-center lg:text-left space-y-6">
            <div className="inline-flex flex-wrap items-center justify-center gap-3 rounded-full border border-violet-100 bg-white/80 px-5 py-2 text-sm font-semibold text-slate-600 shadow-sm">
              <div className="flex items-center gap-2">
                <div className="rounded-full bg-violet-100 p-1.5">
                  <Code2 className="h-4 w-4 text-violet-700" />
                </div>
                <span>{hero.badge}</span>
              </div>
              <div className="hidden sm:inline-block h-4 w-px bg-slate-200" />
              <div className="flex items-center gap-2">
                <div className="rounded-full bg-emerald-100 p-1.5">
                  <Terminal className="h-4 w-4 text-emerald-700" />
                </div>
                <span>{hero.stack}</span>
              </div>
            </div>

            <div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold text-slate-900 tracking-tight">
                {hero.name}
              </h1>
              <p className="mt-3 text-xl sm:text-2xl text-violet-700 font-medium">{hero.role}</p>
            </div>

            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto lg:mx-0">
              {hero.summary}
            </p>
            <p className="text-base text-slate-500 leading-relaxed max-w-2xl mx-auto lg:mx-0">
              {hero.secondary}
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 pt-2">
              <Button
                size="lg"
                className="w-full sm:w-auto bg-gradient-to-r from-violet-600 to-emerald-600 hover:from-violet-700 hover:to-emerald-700 text-white shadow-lg"
                onClick={openTelegram}
              >
                <Send className="mr-2 h-5 w-5" />
                {hero.ctaPrimary}
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto border-violet-200 text-slate-700 hover:text-violet-700"
                onClick={openGithub}
              >
                <Github className="mr-2 h-5 w-5" />
                {hero.ctaSecondary}
              </Button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4">
              {hero.stats.map((stat) => (
                <div key={stat.label} className="rounded-2xl border border-violet-100 bg-white/80 px-4 py-3 text-left shadow-sm">
                  <p className="text-xs uppercase tracking-[0.3em] text-slate-400">{stat.label}</p>
                  <p className="text-lg font-semibold text-slate-900 mt-2">{stat.value}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative flex justify-center">
            <div className="absolute -inset-4 rounded-full bg-gradient-to-br from-violet-200/40 to-emerald-200/40 blur-3xl" />
            <div className="relative">
              <Avatar className="w-64 h-64 sm:w-72 sm:h-72 lg:w-80 lg:h-80 border-4 border-white shadow-2xl ring-4 ring-violet-50">
                <AvatarImage
                  src="https://i.pinimg.com/736x/3b/8a/41/3b8a41561703856730267c937b91db8f.jpg"
                  alt={hero.name}
                  className="object-cover"
                />
                <AvatarFallback className="bg-gradient-to-br from-violet-100 to-emerald-100 text-violet-700 text-3xl sm:text-4xl font-medium">
                  DN
                </AvatarFallback>
              </Avatar>
              <div className="absolute -bottom-8 left-1/2 w-64 -translate-x-1/2 rounded-3xl border border-white/60 bg-white/90 px-5 py-4 shadow-xl backdrop-blur">
                <p className="text-sm font-semibold text-slate-900">{hero.availability}</p>
                <p className="text-xs text-slate-500 mt-1">{hero.location}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Header;
