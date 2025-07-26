import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Mail, MessageCircle, Linkedin, Twitter, Code } from "lucide-react";

const ContactSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const contactMethods = [
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
      value: "@mrevds",
      href: "https://x.com/mrevds",
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
      className="py-20 px-6 bg-gradient-to-br from-slate-50 via-violet-50/30 to-emerald-50/20"
    >
      <div className="max-w-4xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl lg:text-5xl font-light text-slate-800 mb-6">
            Контакты
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Готов к обсуждению новых проектов и интересных задач.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {contactMethods.map((method, index) => (
            <motion.a
              key={method.label}
              href={method.href}
              target={method.href.startsWith("http") ? "_blank" : undefined}
              rel={
                method.href.startsWith("http")
                  ? "noopener noreferrer"
                  : undefined
              }
              className="group block"
              initial={{ opacity: 0, y: 30 }}
              animate={
                isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }
              }
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="bg-white p-6 rounded-2xl shadow-lg border border-violet-100 hover:shadow-xl transition-all duration-300 h-full">
                <div className="flex items-center space-x-4">
                  <div
                    className={`p-4 bg-gradient-to-r ${method.color} rounded-xl`}
                  >
                    <method.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-slate-800 mb-1">
                      {method.label}
                    </h3>
                    <p className="text-slate-600 group-hover:text-violet-600 transition-colors break-words">
                      {method.value}
                    </p>
                  </div>
                </div>
              </div>
            </motion.a>
          ))}
        </div>

        {/* Footer */}
        <motion.div
          className="text-center mt-12 pt-8 border-t border-violet-100"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
        >
          <p className="text-slate-500">
            © {new Date().getFullYear()} Denis. Backend Developer
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;
