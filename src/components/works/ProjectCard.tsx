import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "../../types";

interface Props {
  project: Project;
  index?: number;
  onOpen: (project: Project) => void;
}

export default function ProjectCard({ project, index = 0, onOpen }: Props) {
  return (
    <motion.button
      type="button"
      onClick={() => onOpen(project)}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay: (index % 3) * 0.08, ease: "easeOut" }}
      className="liquid-glass group text-left w-full rounded-3xl overflow-hidden text-white flex flex-col"
    >
      {/* Cover */}
      <div className="relative aspect-[16/9] overflow-hidden bg-black">
        <img
          src={project.cover}
          alt={project.title}
          loading="lazy"
          className={`absolute inset-0 w-full h-full transition-transform duration-700 group-hover:scale-105 ${
            project.id === "2" || project.id === "6" ? "object-contain" : "object-cover"
          }`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
        <span className="absolute top-3 left-3 text-[10px] uppercase tracking-widest px-2.5 py-1 rounded-full bg-black/40 backdrop-blur-md border border-white/15 text-white/80">
          {project.category}
        </span>
        <span className="absolute top-3 right-3 grid place-items-center w-8 h-8 rounded-full bg-black/40 backdrop-blur-md border border-white/15 text-white opacity-0 group-hover:opacity-100 transition-opacity">
          <ArrowUpRight size={15} />
        </span>
      </div>

      {/* Body */}
      <div className="p-5 flex flex-col gap-3 flex-1">
        <h3 className="text-base font-medium text-white">{project.title}</h3>
        <p className="text-xs leading-relaxed text-white/60 line-clamp-2">
          {project.desc}
        </p>
        <div className="mt-auto flex flex-wrap gap-1.5 pt-1">
          {project.tags.map((t) => (
            <span
              key={t}
              className="text-[10px] px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-white/50"
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </motion.button>
  );
}
