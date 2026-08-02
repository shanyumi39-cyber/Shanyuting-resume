import { useMemo, useState } from "react";
import { motion } from "motion/react";
import { Download } from "lucide-react";
import portfolio from "../data/portfolio.json";
import type { Project } from "../types";
import ProjectCard from "../components/works/ProjectCard";
import Lightbox from "../components/works/Lightbox";
import SectionHeading from "../components/ui/SectionHeading";

const ALL = "全部";

export default function Works() {
  const projects = portfolio as Project[];
  const categories = useMemo(
    () => [ALL, ...Array.from(new Set(projects.map((p) => p.category)))],
    [projects]
  );
  const [activeCat, setActiveCat] = useState(ALL);
  const [active, setActive] = useState<Project | null>(null);

  const filtered =
    activeCat === ALL
      ? projects
      : projects.filter((p) => p.category === activeCat);

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
          eyebrow="Portfolio"
          title="作品集 Selected Works"
          description="涵盖智能硬件、B 端后台、视觉主题与 C 端应用的设计实践 —— 每一个项目都从信息架构走到落地量产。"
          size="large"
          className="w-full"
          right={
            <motion.a
              href="/portfolio/Jada_Shan_Portfolio.pdf"
              download
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="liquid-glass inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm text-white hover:text-white"
            >
              <Download size={15} />
              下载作品集 PDF
            </motion.a>
          }
        />
      </motion.header>

      {/* Category filter */}
      <section className="flex flex-col gap-5">
        <p className="text-[10px] uppercase tracking-widest text-white/50">
          Category 分类
        </p>
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => {
            const isActive = cat === activeCat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCat(cat)}
                className={`rounded-full px-4 py-2 text-xs transition-colors border ${
                  isActive
                    ? "bg-white text-black border-white"
                    : "liquid-glass text-white/70 hover:text-white border-transparent"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </section>

      {/* Grid */}
      <motion.div
        layout
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6"
      >
        {filtered.map((p, i) => (
          <ProjectCard key={p.id} project={p} index={i} onOpen={setActive} />
        ))}
      </motion.div>

      {filtered.length === 0 && (
        <p className="mt-16 text-center text-sm text-white/40">
          该分类暂无作品
        </p>
      )}

      <Lightbox project={active} onClose={() => setActive(null)} />
    </div>
  );
}
