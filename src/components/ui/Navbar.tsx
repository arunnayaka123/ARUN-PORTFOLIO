"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { NAV_LINKS } from "@/lib/constants";
import { soundManager } from "@/lib/sounds";
import { cn } from "@/lib/utils";

export default function Navbar({ soundEnabled }: { soundEnabled: boolean }) {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [lastY, setLastY] = useState(0);
  const [active, setActive] = useState("");

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 50);
      setHidden(y > lastY && y > 200);
      setLastY(y);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [lastY]);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) setActive(`#${e.target.id}`); }),
      { threshold: 0.3, rootMargin: "-80px 0px 0px 0px" }
    );
    NAV_LINKS.forEach((l) => { const s = document.querySelector(l.href); if (s) obs.observe(s); });
    return () => obs.disconnect();
  }, []);

  const navClick = (href: string) => {
    if (soundEnabled) soundManager.play("click");
    setMobileOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <header className={cn("fixed top-0 left-0 right-0 z-50 transition-all duration-500", scrolled ? "py-3" : "py-5", hidden && !mobileOpen ? "-translate-y-full" : "translate-y-0")}>
        <nav className={cn("mx-auto max-w-6xl px-6 py-3 rounded-2xl transition-all duration-500", scrolled ? "glass-strong shadow-glow-sm" : "bg-transparent")}>
          <div className="flex items-center justify-between">
            <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="group flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-accent-cyan to-accent-violet flex items-center justify-center">
                <span className="font-syne font-bold text-neural-base text-sm">A</span>
              </div>
              <span className="font-syne font-bold text-lg hidden sm:block group-hover:text-accent-cyan transition-colors">Arun<span className="text-accent-cyan">.</span></span>
            </button>

            <div className="hidden md:flex items-center gap-1">
              {NAV_LINKS.map((link) => (
                <button key={link.href} onClick={() => navClick(link.href)}
                  className={cn("relative px-4 py-2 font-mono text-sm rounded-lg transition-colors", active === link.href ? "text-accent-cyan" : "text-text-secondary hover:text-text-primary")}>
                  {link.label}
                  {active === link.href && (
                    <motion.div layoutId="navActive" className="absolute inset-0 rounded-lg bg-accent-cyan/10 border border-accent-cyan/20"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }} />
                  )}
                </button>
              ))}
            </div>

            <a href="/resume/Arun_Nayak_Resume.pdf" target="_blank" rel="noopener noreferrer"
              className="hidden md:inline-flex items-center gap-2 px-5 py-2 border border-accent-cyan/40 text-accent-cyan font-mono text-xs tracking-wider rounded-full hover:bg-accent-cyan/10 transition-all">
              RESUME ↗
            </a>

            <button className="md:hidden p-2 text-text-primary z-50" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Toggle menu">
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div initial={{ clipPath: "circle(0% at calc(100% - 40px) 40px)" }} animate={{ clipPath: "circle(150% at calc(100% - 40px) 40px)" }} exit={{ clipPath: "circle(0% at calc(100% - 40px) 40px)" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-40 bg-neural-base/98 backdrop-blur-xl flex flex-col items-center justify-center gap-8">
            {NAV_LINKS.map((link, i) => (
              <motion.button key={link.href} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 + i * 0.05 }}
                onClick={() => navClick(link.href)}
                className={cn("font-syne text-3xl font-bold", active === link.href ? "text-accent-cyan text-glow-cyan" : "text-text-primary hover:text-accent-cyan")}>
                {link.label}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}