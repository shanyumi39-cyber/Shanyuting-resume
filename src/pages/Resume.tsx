import { motion } from "motion/react";
import { Download, GraduationCap, Briefcase } from "lucide-react";
import resume from "../data/resume.json";
import type { TimelineEntry } from "../types";
import SectionHeading from "../components/ui/SectionHeading";

export default function Resume() {
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
          eyebrow="Resume"
          title="简历"
          description="教育、工作与课题实践 —— 一份完整的时间线。"
          size="large"
          className="w-full"
          right={
            <motion.a
              href={resume.pdfPath}
              download
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="liquid-glass inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm text-white hover:text-white"
            >
              <Download size={15} />
              下载 PDF 简历
            </motion.a>
          }
        />
      </motion.header>

      {/* Education timeline */}
      <section className="flex flex-col gap-5">
        <SectionHeading
          eyebrow="Education"
          title={
            <span className="flex items-center gap-2.5">
              <GraduationCap size={18} className="opacity-70" />
              教育
            </span>
          }
          size="small"
        />
        <VerticalTimeline entries={resume.education} />
      </section>

      {/* Experience timeline */}
      <section className="flex flex-col gap-5">
        <SectionHeading
          eyebrow="Experience"
          title={
            <span className="flex items-center gap-2.5">
              <Briefcase size={18} className="opacity-70" />
              经历
            </span>
          }
          size="small"
        />
        <VerticalTimeline entries={resume.experience} />
      </section>
    </div>
  );
}

// Shared white style: solid white dot + rail that fades from opaque at top to transparent at bottom.
const WHITE_STYLE = {
  dot: "bg-white",
  line: "from-white/80 via-white/40 to-transparent",
  tag: "text-white/80 bg-white/10 border-white/25",
};

// Render text with highlighted keywords wrapped in styled spans
function renderHighlighted(text: string, highlights?: string[]) {
  if (!highlights || highlights.length === 0) return text;
  // Build a regex that matches any highlight term (longest first for overlap)
  const sorted = [...highlights].sort((a, b) => b.length - a.length);
  const escaped = sorted.map((h) => h.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
  const regex = new RegExp(`(${escaped.join("|")})`, "g");
  const parts = text.split(regex);
  return parts.map((part, idx) =>
    highlights.includes(part) ? (
      <mark
        key={idx}
        className="bg-white/15 text-white rounded px-1 py-0.5 mx-0.5"
      >
        {part}
      </mark>
    ) : (
      <span key={idx}>{part}</span>
    )
  );
}

function VerticalTimeline({
  entries,
}: {
  entries: TimelineEntry[];
}) {
  const rail = WHITE_STYLE.line;

  return (
    <ol className="relative">
      {/* Timeline rail: white, opacity fades from top to bottom — positioned at right edge of left grid-col */}
      <div
        className={`absolute left-[2.5rem] md:left-[8.5rem] top-4 bottom-4 w-px bg-gradient-to-b ${rail}`}
        aria-hidden
      />

      <ul className="flex flex-col gap-8">
        {entries.map((entry, i) => {
          return (
            <motion.li
              key={`${entry.period}-${i}`}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: 0.7,
                delay: i * 0.08,
                ease: "easeOut",
              }}
              className="relative grid grid-cols-[2.5rem_1fr] md:grid-cols-[8.5rem_1fr] gap-4 md:gap-8"
            >
              {/* Left column — period (desktop) + dot column */}
              <div className="relative">
                {/* Dot: w-2 h-2 (8px). Center must lie exactly on the rail.
                    Rail left = X (2.5rem / 8.5rem). Radius = 0.25rem. Dot left = X - radius.
                    Dot center y kept at same vertical line as before (2rem from li top). */}
                <span
                  className="absolute left-[calc(2.5rem-0.25rem)] md:left-[calc(8.5rem-0.25rem)] top-[calc(1.5rem+0.25rem)] w-2 h-2 rounded-full bg-white ring-[3px] ring-black/30 shadow-[0_0_0_1px_rgba(255,255,255,0.25)]"
                  aria-hidden
                />
                {/* Period text: on desktop, right aligned in the 8.5rem col, on one line, aligned to card title baseline */}
                <div
                  className="hidden md:block pt-[calc(1.5rem-0.1rem)] pr-4 text-right"
                  style={{ lineHeight: "1.2" }}
                >
                  <span className="inline-block whitespace-nowrap text-[11px] uppercase tracking-widest px-2 py-1 rounded-full border text-white/80 bg-white/10 border-white/25">
                    {entry.period}
                  </span>
                </div>
              </div>

              {/* Right column — card content */}
              <div className="liquid-glass rounded-3xl p-5 md:p-6 text-white">
                {/* Mobile period (shown only on small screens) */}
                <div className="md:hidden mb-3">
                  <span
                    className="inline-block whitespace-nowrap text-[10px] uppercase tracking-widest px-2 py-0.5 rounded-full border text-white/80 bg-white/10 border-white/25"
                  >
                    {entry.period}
                  </span>
                </div>

                <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-1 md:gap-4">
                  <h3 className="text-base md:text-lg font-medium text-white leading-tight">
                    {entry.title}
                  </h3>
                </div>
                <p className="mt-1.5 text-xs md:text-sm text-white/60">
                  {entry.org}
                </p>

                {entry.points.length === 1 ? (
                  <p className="mt-4 text-sm md:text-[15px] leading-relaxed text-white/70">
                    {renderHighlighted(entry.points[0], entry.highlights)}
                  </p>
                ) : (
                  <ul className="mt-4 flex flex-col gap-2">
                    {entry.points.map((p, pi) => (
                      <li
                        key={pi}
                        className="text-sm text-white/70 flex gap-2.5"
                      >
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white/40 shrink-0" />
                        {renderHighlighted(p, entry.highlights)}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </motion.li>
          );
        })}
      </ul>
    </ol>
  );
}
