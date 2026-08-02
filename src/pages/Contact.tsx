import { motion } from "motion/react";
import { Mail, Phone, MessageCircle, MapPin } from "lucide-react";
import profile from "../data/profile.json";
import ContactForm from "../components/contact/ContactForm";
import SectionHeading from "../components/ui/SectionHeading";

const items = [
  { Icon: Mail, label: "邮箱", value: profile.email, href: `mailto:${profile.email}` },
  { Icon: Phone, label: "电话", value: profile.phone, href: `tel:${profile.phone.replace(/-/g, "")}` },
  { Icon: MessageCircle, label: "WeChat", value: profile.wechat, href: "#", clickable: false },
  { Icon: MapPin, label: "Location", value: profile.location, href: "#", clickable: false },
];

export default function Contact() {
  return (
    <div className="pb-10 flex flex-col gap-14 md:gap-16">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="pt-6"
      >
        <SectionHeading
          eyebrow="Contact"
          title="联系我"
          description="有合作、机会或只想打个招呼？留下你的信息，我会尽快回复。"
          size="large"
          className="w-full"
        />
      </motion.header>

      <section className="flex flex-col gap-5">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 items-start">
          {/* Info */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
            className="md:col-span-5 flex flex-col gap-3"
          >
            {items.map(({ Icon, label, value, href, clickable = true }) => {
              const inner = (
                <div className="liquid-glass rounded-2xl p-5 flex items-center gap-4 text-white w-full h-full">
                  <span className="grid place-items-center w-10 h-10 rounded-full bg-white/10 border border-white/15 shrink-0">
                    <Icon size={16} />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-[10px] uppercase tracking-widest text-white/50">
                      {label}
                    </span>
                    <span className="block text-sm text-white/90 truncate">
                      {value}
                    </span>
                  </span>
                </div>
              );
              if (!clickable) {
                return (
                  <div
                    key={label}
                    className="cursor-default"
                    aria-label={`${label}: ${value}`}
                  >
                    {inner}
                  </div>
                );
              }
              return (
                <a
                  key={label}
                  href={href}
                  className="block text-white hover:text-white"
                >
                  {inner}
                </a>
              );
            })}

            <div className="liquid-glass rounded-2xl p-5 flex items-center gap-4 text-white">
              <span className="relative flex h-2.5 w-2.5 shrink-0">
                <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400" />
              </span>
              <span className="text-sm text-white/80">
                当前状态：{profile.status} · 欢迎联系
              </span>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="md:col-span-7"
          >
            <ContactForm />
          </motion.div>
        </div>
      </section>
    </div>
  );
}
