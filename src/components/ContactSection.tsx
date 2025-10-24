import { useRef, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Mail, MessageCircle, Linkedin, Twitter, Code, Phone } from "lucide-react";

const ContactSection = () => {
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

  const contactMethods = [
    {
      icon: Mail,
      label: "Email",
      value: "yakhlovemoon@gmail.com",
      href: "mailto:yakhlovemoon@gmail.com",
      color: "from-red-400 to-red-600",
    },
    {
      icon: Phone,
      label: "Phone",
      value: "+998913798151",
      href: "tel:+998913798151",
      color: "from-green-400 to-green-600",
    },
    {
      icon: MessageCircle,
      label: "Telegram",
      value: "@mrevds",
      href: "https://t.me/mrevds",
      color: "from-blue-400 to-blue-600",
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      value: "linkedin.com/in/mrevds",
      href: "https://www.linkedin.com/in/mrevds",
      color: "from-sky-500 to-blue-700",
    },
    {
      icon: Twitter,
      label: "X (Twitter)",
      value: "@mrevds17",
      href: "https://x.com/mrevds17",
      color: "from-gray-800 to-black",
    },
    {
      icon: Code,
      label: "LeetCode",
      value: "leetcode.com/mrevds",
      href: "https://leetcode.com/mrevds",
      color: "from-yellow-400 to-yellow-600",
    },
  ];

  return (
    <section
      id="contact"
      ref={ref}
      className="py-16 sm:py-20 px-4 sm:px-6 bg-gradient-to-br from-slate-50 via-violet-50/30 to-emerald-50/20"
    >
      <div className="max-w-4xl mx-auto">
        <div
          className={`text-center mb-12 sm:mb-16 animate-fade-in-up ${isInView ? '' : 'opacity-0'}`}
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-slate-800 mb-4 sm:mb-6">
            Contacts
          </h2>
          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto px-2">
            Ready to discuss new projects and interesting challenges.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-10 sm:mb-12">
          {contactMethods.map((method, index) => (
            <a
              key={method.label}
              href={method.href}
              target={method.href.startsWith("http") ? "_blank" : undefined}
              rel={
                method.href.startsWith("http")
                  ? "noopener noreferrer"
                  : undefined
              }
              className={`group block animate-slide-in-up ${isInView ? 'opacity-100' : 'opacity-0'}`}
              style={{
                animationDelay: isInView ? `${index * 0.1}s` : '0s',
              }}
            >
              <div className="bg-white p-4 sm:p-6 rounded-lg sm:rounded-2xl shadow-lg border border-violet-100 hover:shadow-xl hover:scale-105 transition-all duration-300 h-full">
                <div className="flex items-center space-x-3 sm:space-x-4">
                  <div
                    className={`p-2 sm:p-4 bg-gradient-to-r ${method.color} rounded-lg sm:rounded-xl transition-transform duration-300 group-hover:scale-110 flex-shrink-0`}
                  >
                    <method.icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-slate-800 mb-1 text-sm sm:text-base">
                      {method.label}
                    </h3>
                    <p className="text-slate-600 group-hover:text-violet-600 transition-colors break-words text-xs sm:text-sm">
                      {method.value}
                    </p>
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* Footer */}
        <div
          className={`text-center mt-10 sm:mt-12 pt-6 sm:pt-8 border-t border-violet-100 animate-fade-in-up ${isInView ? '' : 'opacity-0'}`}
          style={{
            animationDelay: isInView ? '0.7s' : '0s',
          }}
        >
          <p className="text-slate-500 text-sm sm:text-base">
            © {new Date().getFullYear()} Denis. Backend Developer
          </p>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
