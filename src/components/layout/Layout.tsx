import { Outlet, ScrollRestoration } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

const VIDEO_SRC = `${import.meta.env.BASE_URL}video.mp4`;

export default function Layout() {
  return (
    <div className="relative min-h-screen w-full overflow-x-hidden flex flex-col font-sans selection:bg-white/20 selection:text-white">
      {/* Video background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="fixed inset-0 w-full h-full object-cover z-[0]"
        src={VIDEO_SRC}
      />
      {/* Legibility overlay */}
      <div className="fixed inset-0 z-[1] bg-gradient-to-b from-black/50 via-black/30 to-black/70 pointer-events-none" />

      <Navbar />

      <main className="relative z-10 w-full max-w-7xl mx-auto flex-1 px-5 md:px-8 pt-28 md:pt-32">
        <Outlet />
      </main>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-5 md:px-8 pb-10 mt-16 md:mt-24">
        <Footer />
      </div>

      <ScrollRestoration />
    </div>
  );
}
