import { useState } from "react";
import { motion } from "motion/react";
import { GraduationCap, User, ImagePlus } from "lucide-react";
import profile from "../data/profile.json";
import SectionHeading from "../components/ui/SectionHeading";

const PHOTO_SRC = "/profile-photo.jpg";

// Render text with highlighted keywords wrapped in heavier font weight
function renderIntro(text: string, highlights?: string[]) {
  if (!highlights || highlights.length === 0) return text;
  const sorted = [...highlights].sort((a, b) => b.length - a.length);
  const escaped = sorted.map((h) => h.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
  const regex = new RegExp(`(${escaped.join("|")})`, "g");
  const parts = text.split(regex);
  return parts.map((part, idx) =>
    highlights.includes(part) ? (
      <span key={idx} className="font-medium text-white">{part}</span>
    ) : (
      <span key={idx}>{part}</span>
    )
  );
}

function PhotoFrame() {
  const [failed, setFailed] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" }}
      className="liquid-glass rounded-3xl overflow-hidden relative aspect-[4/5] w-full h-full"
    >
      {!failed ? (
        <img
          src={PHOTO_SRC}
          alt={`${profile.nameZh} ${profile.nameEn}`}
          className="absolute inset-0 w-full h-full object-cover"
          onError={() => setFailed(true)}
        />
      ) : (
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 gap-3">
          <span className="grid place-items-center w-14 h-14 rounded-full bg-white/5 border border-white/15 text-white/40">
            <User size={22} />
          </span>
          <div>
            <p className="text-sm text-white/80">个人照片</p>
            <p className="mt-1 text-[10px] uppercase tracking-widest text-white/40">
              Photo Frame
            </p>
          </div>
          <p className="flex items-center gap-1.5 text-[11px] text-white/40 max-w-[14rem] leading-relaxed">
            <ImagePlus size={12} className="shrink-0" />
            把照片命名为{" "}
            <code className="text-white/70">profile-photo.jpg</code>{" "}
            放入 <code className="text-white/70">public/</code> 即可显示
          </p>
        </div>
      )}
      {!failed && (
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/60 to-transparent" />
      )}
    </motion.div>
  );
}

export default function About() {
  return (
    <div className="pb-10 flex flex-col gap-16 md:gap-24">
      {/* Page Header */}
      <motion.header
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="pt-6"
      >
        <SectionHeading
          title={
            <span className="flex items-baseline gap-3">
              关于我
              <span className="text-xl md:text-2xl text-white/50">ABOUT ME</span>
            </span>
          }
          size="large"
          className="w-full pl-[14px] md:pl-[22px]"
        />
      </motion.header>

      {/* Photo + intro + profile (bottom aligned) */}
      <section className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-stretch">
        <div className="md:col-span-5 flex min-h-0">
          <PhotoFrame />
        </div>

        <div className="md:col-span-7 flex flex-col justify-between gap-8 min-h-0">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
            className="flex flex-col gap-4 pt-20"
          >
            {profile.intro.map((p, i) => (
              <p key={i} className="text-sm md:text-[15px] leading-relaxed text-white/70">
                {renderIntro(p, (profile as any).introHighlights?.[i])}
              </p>
            ))}
          </motion.div>

          <motion.aside
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="liquid-glass rounded-3xl p-6 text-white"
          >
            <p className="text-[10px] uppercase tracking-widest text-white/50">
              Profile
            </p>
            <dl className="mt-3 grid grid-cols-2 gap-y-3 gap-x-4 text-xs">
              <dt className="text-white/40">中文名</dt>
              <dd className="text-white/90">{profile.nameZh}</dd>
              <dt className="text-white/40">英文名</dt>
              <dd className="text-white/90">{profile.nameEn}</dd>
              <dt className="text-white/40">求职意向</dt>
              <dd className="text-white/90">{profile.jobIntent}</dd>
            </dl>
            <div className="flex items-center gap-2 text-xs text-white/60 pt-4 mt-4 border-t border-white/10">
              <GraduationCap size={15} />
              {profile.school} · {profile.major} · {profile.graduationYear}
            </div>
          </motion.aside>
        </div>
      </section>

      {/* Skills */}
      <section className="flex flex-col gap-5">
        <SectionHeading
          eyebrow="Skills"
          title="技能"
          size="small"
        />
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-5 md:gap-8">
          {profile.skills.map((s, i) => (
            <motion.div
              key={s}
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: (i % 4) * 0.05, ease: "easeOut" }}
              className="liquid-glass liquid-glass-flat rounded-md px-2.5 py-2 text-[11px] md:text-xs text-white/80 flex items-center gap-1.5 whitespace-nowrap justify-center"
            >
              <span className="grid place-items-center w-4 h-4 shrink-0 rounded-full bg-white/10 border border-white/15 text-[8px] text-white/60">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="truncate">{s}</span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Specialties */}
      <section className="flex flex-col gap-5">
        <SectionHeading
          eyebrow="Specialties"
          title="专业方向"
          size="small"
        />
        <div className="flex flex-wrap gap-2.5">
          {profile.specialties.map((t) => (
            <span
              key={t}
              className="rounded-full px-4 py-2 text-xs text-white/70 border border-white/15"
            >
              {t}
            </span>
          ))}
        </div>
      </section>

      {/* Hobbies */}
      <section className="flex flex-col gap-5">
        <SectionHeading
          eyebrow="Hobbies"
          title="兴趣"
          size="small"
        />
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="liquid-glass rounded-2xl px-6 md:px-8 py-4 flex flex-wrap items-center justify-center gap-x-6 md:gap-x-10 gap-y-3"
        >
          {profile.hobbies.map((h, i) => (
            <span key={h} className="flex items-center gap-6 md:gap-10">
              {i > 0 && (
                <span className="w-px h-4 bg-white/20" aria-hidden />
              )}
              <span className="text-xs md:text-sm text-white/80">{h}</span>
            </span>
          ))}
        </motion.div>
      </section>
    </div>
  );
}
