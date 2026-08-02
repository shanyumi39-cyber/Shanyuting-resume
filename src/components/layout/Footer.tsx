import { Link } from "react-router-dom";
import { Mail, Phone, MessageCircle, MapPin } from "lucide-react";
import profile from "../../data/profile.json";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/resume", label: "Resume" },
  { to: "/works", label: "Works" },
  { to: "/contact", label: "Contact" },
];

const workCategories = [
  "智能硬件UI设计",
  "B端后台UI设计",
  "视觉/主题设计",
  "C端APP设计",
];

const socials = [
  { Icon: Mail, label: "Email", href: `mailto:${profile.email}` },
  { Icon: Phone, label: "Phone", href: `tel:${profile.phone.replace(/-/g, "")}` },
  { Icon: MessageCircle, label: "WeChat", href: "#" },
  { Icon: MapPin, label: "Location", href: "#" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="liquid-glass w-full rounded-3xl p-6 md:p-10 text-white/70">
      {/* Top grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-12 mb-10">
        {/* Brand column */}
        <div className="md:col-span-5">
          <div className="flex items-center gap-2.5 text-white">
            <span className="grid place-items-center w-9 h-9 rounded-full bg-white/10 border border-white/15 text-xs font-medium">
              JS
            </span>
            <span className="text-xl font-medium">
              Jada Shan
              <span className="text-white/40 text-base font-normal"> / 单玉婷</span>
            </span>
          </div>
          <p className="mt-4 text-sm leading-relaxed max-w-sm">
            {profile.taglineZh}
          </p>
          <p className="mt-2 text-xs leading-relaxed max-w-sm text-white/40">
            {profile.tagline}
          </p>
        </div>

        {/* Links section */}
        <div className="md:col-span-7 grid grid-cols-2 md:grid-cols-3 gap-8">
          <div>
            <h4 className="text-sm uppercase tracking-wider text-white font-medium mb-4">
              Navigate
            </h4>
            <ul className="space-y-2">
              {navLinks.map((l) => (
                <li key={l.to}>
                  <Link
                    to={l.to}
                    className="text-xs hover:text-white transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-sm uppercase tracking-wider text-white font-medium mb-4">
              Works
            </h4>
            <ul className="space-y-2">
              {workCategories.map((c) => (
                <li key={c}>
                  <Link
                    to="/works"
                    className="text-xs hover:text-white transition-colors"
                  >
                    {c}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-sm uppercase tracking-wider text-white font-medium mb-4">
              Contact
            </h4>
            <ul className="space-y-2">
              <li>
                <a
                  href={`mailto:${profile.email}`}
                  className="text-xs hover:text-white transition-colors break-all"
                >
                  邮箱：{profile.email}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${profile.phone.replace(/-/g, "")}`}
                  className="text-xs hover:text-white transition-colors"
                >
                  电话：{profile.phone}
                </a>
              </li>
              <li>
                <span
                  className="text-xs text-white/70 cursor-default"
                  aria-label={`微信：${profile.wechat}`}
                >
                  微信：{profile.wechat}
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="pt-6 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-6 md:gap-4">
        <p className="text-[10px] uppercase tracking-widest opacity-50">
          © {year} Jada Shan · 单玉婷 · {profile.version}
        </p>
        <div className="flex items-center gap-4">
          <span className="text-[10px] uppercase tracking-widest opacity-50">
            Connect:
          </span>
          <div className="flex items-center gap-3">
            {socials.map(({ Icon, label, href }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="opacity-70 hover:opacity-100 transition-colors hover:text-white"
              >
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
