import { useRef, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Send, MessageCircle, Linkedin, Twitter, Code, Phone } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

const ContactSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);
  const { content } = useLanguage();
  const contact = content.contact;

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

  const iconMap: Record<string, typeof MessageCircle> = {
    telegram: MessageCircle,
    linkedin: Linkedin,
    twitter: Twitter,
    leetcode: Code,
  };

  return (
    <section
      id="contact"
      ref={ref}
      className="relative py-20 px-4 sm:px-6"
    >
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute top-10 right-10 w-72 h-72 rounded-full bg-violet-200/25 blur-3xl" />
        <div className="absolute bottom-0 left-8 w-80 h-80 rounded-full bg-emerald-200/25 blur-3xl" />
      </div>

      <div className="relative max-w-5xl mx-auto rounded-[32px] bg-white/85 shadow-[0_30px_100px_rgba(79,70,229,0.15)] backdrop-blur px-5 sm:px-10 lg:px-14 py-12">
        <div className={`text-center mb-12 space-y-4 animate-fade-in-up ${isInView ? '' : 'opacity-0'}`}>
          <p className="text-xs uppercase tracking-[0.4em] text-slate-400">{content.navigation.items.contact}</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-slate-900">{contact.title}</h2>
          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto">{contact.description}</p>
        </div>

        <div
          className={`mb-12 animate-fade-in-up ${isInView ? '' : 'opacity-0'}`}
          style={{ animationDelay: isInView ? '0.2s' : '0s' }}
        >
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center justify-between rounded-3xl bg-white/90 shadow-[0_15px_50px_rgba(79,70,229,0.12)] px-5 sm:px-9 py-5">
            <div>
              <p className="text-sm uppercase tracking-[0.35em] text-slate-400">{contact.ctaLabel}</p>
              <p className="text-xl font-semibold text-slate-900 mt-2">{contact.ctaSubtitle}</p>
            </div>
            <Button
              className="bg-gradient-to-r from-violet-600 to-emerald-600 hover:from-violet-700 hover:to-emerald-700 text-white"
              onClick={() => window.open('https://t.me/mrevds', '_blank', 'noopener,noreferrer')}
            >
              <Send className="mr-2 h-5 w-5" />
              {contact.ctaButton}
            </Button>
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-4">
          {contact.methods.map((method, index) => {
            const Icon = iconMap[method.id] || Phone;
            return (
              <a
                key={method.id}
                href={method.href}
                target={method.href.startsWith('http') ? '_blank' : undefined}
                rel={method.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className={`inline-flex items-center gap-2 rounded-full bg-white/80 px-3.5 py-1.5 text-sm font-semibold text-slate-700 shadow-sm backdrop-blur transition-colors animate-slide-in-up ${
                  isInView ? 'opacity-100' : 'opacity-0'
                }`}
                style={{ animationDelay: isInView ? `${0.3 + index * 0.1}s` : '0s' }}
              >
                <span className={`inline-flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br ${method.color} text-white`}>
                  <Icon className="w-4 h-4" />
                </span>
                <span>{method.label}</span>
              </a>
            );
          })}
        </div>

        <div
          className={`text-center mt-8 pt-4 text-slate-500 text-sm animate-fade-in-up ${isInView ? '' : 'opacity-0'}`}
          style={{ animationDelay: isInView ? '0.6s' : '0s' }}
        >
          © {new Date().getFullYear()} {contact.footer}
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
