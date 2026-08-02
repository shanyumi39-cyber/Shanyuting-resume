import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, ChevronDown, ChevronUp } from "lucide-react";
import type { Project } from "../../types";

interface Props {
  project: Project | null;
  onClose: () => void;
}

export default function Lightbox({ project, onClose }: Props) {
  const [contentOpen, setContentOpen] = useState(true);

  // Reset content-open state when switching projects
  useEffect(() => {
    if (project) setContentOpen(true);
  }, [project?.id]);

  useEffect(() => {
    if (!project) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-start md:items-center justify-center p-4 md:p-8 overflow-y-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <div className="absolute inset-0 bg-black/75 backdrop-blur-md" />
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: 12 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            onClick={(e) => e.stopPropagation()}
            className="liquid-glass relative w-full max-w-5xl my-auto rounded-3xl text-white overflow-hidden"
          >
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="absolute top-4 right-4 z-20 grid place-items-center w-9 h-9 rounded-full bg-black/40 backdrop-blur-md border border-white/15 text-white hover:bg-black/60 transition-colors"
            >
              <X size={16} />
            </button>

            {/* Cover */}
            <div className="relative aspect-[16/9] overflow-hidden bg-black">
              <img
                src={`${import.meta.env.BASE_URL}${project.cover}`}
                alt={project.title}
                className={`absolute inset-0 w-full h-full ${
                  project.id === "2" || project.id === "6" ? "object-contain" : "object-cover"
                }`}
              />
              <div className="absolute inset-x-0 bottom-0 p-6 md:p-8">
                <span className="text-[10px] uppercase tracking-widest text-white/60">
                  {project.category}
                </span>
                <h3 className="mt-2 text-2xl md:text-3xl font-medium text-white">
                  {project.title}
                </h3>
              </div>
            </div>

            {/* Body */}
            <div className="p-6 md:p-8 flex flex-col gap-8">
              {/* Summary */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8">
                <div className="md:col-span-8">
                  <p className="text-sm md:text-[15px] leading-relaxed text-white/75">
                    {project.desc}
                  </p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {project.tags.map((t) => (
                      <span
                        key={t}
                        className="text-[11px] px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-white/60"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="md:col-span-4">
                  <dl className="grid grid-cols-2 gap-y-3 gap-x-4 text-xs">
                    <dt className="text-white/40">编号</dt>
                    <dd className="text-white/85">#{project.id.padStart(2, "0")}</dd>
                    <dt className="text-white/40">分类</dt>
                    <dd className="text-white/85">{project.category}</dd>
                    <dt className="text-white/40">内容</dt>
                    <dd className="text-white/85">{project.images.length} 张</dd>
                  </dl>
                </div>
              </div>

              {/* Content Showcase */}
              <section className="border-t border-white/10 pt-6 flex flex-col gap-4">
                <button
                  type="button"
                  onClick={() => setContentOpen((o) => !o)}
                  className="flex items-center justify-between group"
                >
                  <div className="flex items-center gap-2">
                    <span className="relative flex h-2 w-2">
                      <span className="absolute inline-flex h-full w-full rounded-full bg-white/50 animate-ping" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-white/80" />
                    </span>
                    <h4 className="text-base md:text-lg font-medium text-white">
                      内容展示
                    </h4>
                    <span className="text-xs text-white/40">
                      Content Showcase
                    </span>
                  </div>
                  <span className="grid place-items-center w-8 h-8 rounded-full border border-white/15 text-white/70 group-hover:bg-white/10 transition-colors">
                    {contentOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {contentOpen && (
                    <motion.div
                      key="images"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.35, ease: "easeOut" }}
                      className="overflow-hidden"
                    >
                      <div className="flex flex-col gap-3 md:gap-4 pt-2">
                        {project.images.map((src, i) => (
                          <div
                            key={i}
                            className="rounded-2xl overflow-hidden relative group"
                          >
                            <img
                              src={`${import.meta.env.BASE_URL}${src}`}
                              alt={`${project.title} - ${i + 1}`}
                              loading="lazy"
                              className="w-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                            />
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </section>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
