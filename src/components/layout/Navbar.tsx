import { useState, useEffect, useRef } from "react";
import { NavLink, Link, useLocation } from "react-router-dom";
import { Menu, X, Volume2, VolumeX } from "lucide-react";
import profile from "../../data/profile.json";

const links = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/resume", label: "Resume" },
  { to: "/works", label: "Works" },
  { to: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const audioRef = useRef<HTMLAudioElement>(null);
  const clickAudioRef = useRef<HTMLAudioElement>(null);
  const [muted, setMuted] = useState(false);

  // Autoplay ambient audio on mount; keep playing across all pages
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = 0.4;
    audio
      .play()
      .catch(() => {
        const start = () => {
          audio.play().catch(() => {});
          document.removeEventListener("click", start);
          document.removeEventListener("touchstart", start);
        };
        document.addEventListener("click", start, { once: true });
        document.addEventListener("touchstart", start, { once: true });
      });
  }, []);

  useEffect(() => {
    if (audioRef.current) audioRef.current.muted = muted;
  }, [muted]);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  // Play click sound effect when a nav link is clicked
  const playClick = () => {
    const a = clickAudioRef.current;
    if (!a) return;
    a.currentTime = 0;
    a.play().catch(() => {});
  };

  return (
    <header className="fixed top-0 inset-x-0 z-50 flex justify-center px-4 pt-4">
      <nav className="liquid-glass w-full max-w-6xl rounded-full px-4 md:px-6 py-2.5 md:py-3 flex items-center justify-between text-white">
        {/* Left: brand */}
        <Link to="/" className="flex items-center gap-2.5 min-w-0">
          <span className="grid place-items-center w-7 h-7 rounded-full bg-white/10 border border-white/15 text-[11px] font-medium shrink-0">
            JS
          </span>
          <span className="hidden sm:block text-xs tracking-wide text-white/80 truncate">
            Jada Shan{" "}
            <span className="text-white/40">
              / UI DESIGNER · {profile.version}
            </span>
          </span>
        </Link>

        {/* Right: links + audio toggle (desktop) */}
        <div className="hidden md:flex items-center gap-1">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === "/"}
              onClick={playClick}
              className={({ isActive }) =>
                `px-3.5 py-1.5 rounded-full text-xs transition-colors ${
                  isActive
                    ? "bg-white/15 text-white"
                    : "text-white/60 hover:text-white"
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}
          <button
            type="button"
            onClick={() => setMuted((m) => !m)}
            aria-label={muted ? "取消静音" : "静音"}
            className="ml-2 grid place-items-center w-9 h-9 rounded-full bg-white/10 border border-white/15 text-white/70 hover:text-white transition-colors"
          >
            {muted ? <VolumeX size={16} /> : <Volume2 size={16} />}
          </button>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-label="Toggle menu"
          className="md:hidden grid place-items-center w-9 h-9 rounded-full bg-white/10 border border-white/15 text-white"
        >
          {open ? <X size={16} /> : <Menu size={16} />}
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden absolute top-full inset-x-4 mt-2 liquid-glass rounded-3xl p-3 flex flex-col gap-1 text-white">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === "/"}
              onClick={playClick}
              className={({ isActive }) =>
                `px-4 py-2.5 rounded-2xl text-sm transition-colors ${
                  isActive
                    ? "bg-white/15 text-white"
                    : "text-white/70 hover:text-white hover:bg-white/5"
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}
          <div className="px-4 py-2.5 flex items-center gap-2 text-[10px] uppercase tracking-widest text-white/60">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
            </span>
            STATUS: {profile.status}
          </div>
        </div>
      )}

      {/* Ambient background audio — plays on Home only */}
      <audio ref={audioRef} src="/ambient.mp3" loop />
      {/* Click sound effect for nav links */}
      <audio ref={clickAudioRef} src="/click.mp3" preload="auto" />
    </header>
  );
}
