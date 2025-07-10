
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Mail, MessageCircle, Github, Linkedin } from "lucide-react";

const ContactSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const contactMethods = [
    {
      icon: MessageCircle,
      label: "Telegram",
      href: "https://t.me/your_telegram",
      color: "from-blue-500 to-cyan-500",
      description: "Быстрый ответ"
    },
    {
      icon: Mail,
      label: "Email",
      href: "mailto:your.email@example.com",
      color: "from-violet-500 to-purple-500",
      description: "Деловая переписка"
    },
    {
      icon: Github,
      label: "GitHub",
      href: "https://github.com/your-github",
      color: "from-slate-500 to-gray-600",
      description: "Мой код"
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      href: "https://linkedin.com/in/your-profile",
      color: "from-blue-600 to-indigo-600",
      description: "Профессиональная сеть"
    }
  ];

  return (
    <section id="contact" ref={ref} className="py-20 px-6 bg-gradient-to-br from-emerald-50/30 to-violet-50/50">
      <div className="max-w-4xl mx-auto text-center">
        <motion.h2 
          className="text-4xl lg:text-5xl font-light text-slate-800 mb-6"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
        >
          Связаться со мной
        </motion.h2>

        <motion.p 
          className="text-xl text-slate-600 mb-12 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Готов к обсуждению интересных проектов и новых возможностей
        </motion.p>

        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {contactMethods.map((method, index) => (
            <motion.a
              key={method.label}
              href={method.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group block"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-violet-100 hover:shadow-xl transition-all duration-300">
                <div className="flex items-center space-x-4">
                  <div className={`p-3 bg-gradient-to-r ${method.color} rounded-xl`}>
                    <method.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-left">
                    <h3 className="font-semibold text-slate-800 group-hover:text-violet-700 transition-colors">
                      {method.label}
                    </h3>
                    <p className="text-sm text-slate-500">{method.description}</p>
                  </div>
                </div>
              </div>
            </motion.a>
          ))}
        </div>

        <motion.div
          className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg border border-violet-100"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <h3 className="text-xl font-semibold text-slate-800 mb-4">
            Открыт для новых возможностей
          </h3>
          <p className="text-slate-600 mb-6">
            Ищу интересные проекты в области backend-разработки. 
            Готов к удаленной работе и интересным техническим вызовам.
          </p>
          <Button
            size="lg"
            className="bg-gradient-to-r from-violet-600 to-emerald-600 hover:from-violet-700 hover:to-emerald-700 text-white px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
            asChild
          >
            <a href="mailto:your.email@example.com">
              <Mail className="w-5 h-5 mr-2" />
              Написать письмо
            </a>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;
