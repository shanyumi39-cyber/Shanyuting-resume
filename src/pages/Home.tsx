import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { ArrowRight, Sparkles } from "lucide-react";
import profile from "../data/profile.json";
import portfolio from "../data/portfolio.json";
import type { Project } from "../types";
import ProjectCard from "../components/works/ProjectCard";
import Lightbox from "../components/works/Lightbox";
import SectionHeading from "../components/ui/SectionHeading";

const MotionLink = motion(Link);
const featured = (portfolio as Project[]).slice(0, 3);

export default function Home() {
  const [active, setActive] = useState<Project | null>(null);

  return (
    <div className="flex flex-col gap-24 md:gap-32 pb-10">
      {/* Hero */}
      <section className="flex flex-col items-center text-center pt-10 md:pt-16">
        <motion.span
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="liquid-glass inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-[10px] uppercase tracking-widest text-white/70"
        >
          <Sparkles size={12} />
          {profile.role} · {profile.version}
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.1, ease: "easeOut" }}
          className="mt-6 text-5xl md:text-7xl lg:text-8xl font-medium text-white tracking-tight"
        >
          Jada Shan
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
          className="mt-3 text-lg md:text-xl text-white/50 tracking-wide"
        >
          单玉婷 · {profile.roleZh}
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
          className="mt-7 max-w-xl text-base md:text-lg leading-relaxed text-white/70"
        >
          {profile.tagline}
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.38, ease: "easeOut" }}
          className="mt-2 max-w-xl text-sm leading-relaxed text-white/40"
        >
          {profile.taglineZh}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.46, ease: "easeOut" }}
          className="mt-10 flex flex-wrap items-center justify-center gap-3"
        >
          <MotionLink
            to="/works"
            whileHover={{ scale: 1.025 }}
            transition={{ type: "spring", stiffness: 500, damping: 22 }}
            className="liquid-glass inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm text-white hover:text-white"
          >
            查看作品 View Works
            <ArrowRight size={15} />
          </MotionLink>
          <Link
            to="/about"
            className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm text-white/70 border border-white/15 hover:text-white hover:border-white/40 transition-colors"
          >
            关于我 About Me
          </Link>
        </motion.div>
      </section>

      {/* Featured works */}
      <section className="flex flex-col gap-5">
        <SectionHeading
          eyebrow="Selected Works"
          title="精选作品"
          size="small"
          right={
            <Link
              to="/works"
              className="inline-flex items-center gap-1.5 text-xs text-white/60 hover:text-white transition-colors"
            >
              全部 All <ArrowRight size={14} />
            </Link>
          }
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {featured.map((p, i) => (
            <ProjectCard key={p.id} project={p} index={i} onOpen={setActive} />
          ))}
        </div>
      </section>

      <Lightbox project={active} onClose={() => setActive(null)} />
    </div>
  );
}
