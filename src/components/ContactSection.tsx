
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Mail, MessageCircle, Phone, MapPin } from "lucide-react";

const ContactSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const contactMethods = [
    {
      icon: MessageCircle,
      label: "Telegram",
      value: "@your_telegram",
      href: "https://t.me/your_telegram",
      color: "from-blue-400 to-blue-600"
    },
    {
      icon: Mail,
      label: "Email",
      value: "your.email@example.com",
      href: "mailto:your.email@example.com",
      color: "from-violet-400 to-violet-600"
    },
    {
      icon: Phone,
      label: "Телефон",
      value: "+7 (xxx) xxx-xx-xx",
      href: "tel:+7xxxxxxxxxx",
      color: "from-emerald-400 to-emerald-600"
    },
    {
      icon: MapPin,
      label: "Локация",
      value: "Россия",
      href: "#",
      color: "from-orange-400 to-orange-600"
    }
  ];

  return (
    <section id="contact" ref={ref} className="py-20 px-6 bg-gradient-to-br from-slate-50 via-violet-50/30 to-emerald-50/20">
      <div className="max-w-4xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl lg:text-5xl font-light text-slate-800 mb-6">
            Свяжитесь со мной
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Готов к обсуждению новых проектов и интересных задач. 
            Выберите удобный способ связи!
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {contactMethods.map((method, index) => (
            <motion.a
              key={method.label}
              href={method.href}
              target={method.href.startsWith('http') ? '_blank' : undefined}
              rel={method.href.startsWith('http') ? 'noopener noreferrer' : undefined}
              className="group block"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="bg-white p-6 rounded-2xl shadow-lg border border-violet-100 hover:shadow-xl transition-all duration-300 h-full">
                <div className="flex items-center space-x-4">
                  <div className={`p-4 bg-gradient-to-r ${method.color} rounded-xl`}>
                    <method.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-slate-800 mb-1">{method.label}</h3>
                    <p className="text-slate-600 group-hover:text-violet-600 transition-colors">
                      {method.value}
                    </p>
                  </div>
                </div>
              </div>
            </motion.a>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          className="text-center bg-white p-8 rounded-2xl shadow-lg border border-violet-100"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <h3 className="text-2xl font-semibold text-slate-800 mb-4">
            Есть интересный проект?
          </h3>
          <p className="text-slate-600 mb-6 max-w-md mx-auto">
            Буду рад обсудить детали и предложить лучшие технические решения
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
