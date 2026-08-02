import { Link } from "react-router-dom";
import { motion } from "motion/react";

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center">
      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="text-[10px] uppercase tracking-widest text-white/50"
      >
        404
      </motion.p>
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
        className="mt-3 text-4xl md:text-6xl font-medium text-white"
      >
        Page not found
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        className="mt-4 text-sm text-white/60"
      >
        你访问的页面不存在。
      </motion.p>
      <Link
        to="/"
        className="mt-8 liquid-glass inline-flex items-center rounded-full px-6 py-3 text-sm text-white hover:text-white"
      >
        返回首页 Back home
      </Link>
    </div>
  );
}
