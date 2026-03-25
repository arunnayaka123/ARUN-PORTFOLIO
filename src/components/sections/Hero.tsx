"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ChevronDown, Download, MessageCircle } from "lucide-react";
import dynamic from "next/dynamic";
import { HERO_ROLES } from "@/lib/constants";
import { soundManager } from "@/lib/sounds";

const HeroIcosahedron = dynamic(() => import("@/components/three/HeroIcosahedron"), { ssr: false });

export default function Hero({ soundEnabled }: { soundEnabled: boolean }) {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentRole = HERO_ROLES[roleIndex];
    let timeout: NodeJS.Timeout;
    if (!isDeleting) {
      if (displayText.length < currentRole.length) {
        timeout = setTimeout(() => setDisplayText(currentRole.slice(0, displayText.length + 1)), 80);
      } else {
        timeout = setTimeout(() => setIsDeleting(true), 2000);
      }
    } else {
      if (displayText.length > 0) {
        timeout = setTimeout(() => setDisplayText(displayText.slice(0, -1)), 40);
      } else {
        setIsDeleting(false);
        setRoleIndex((prev) => (prev + 1) % HERO_ROLES.length);
      }
    }
    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, roleIndex]);

  return (
    <section id="hero" className="relative min-h-screen flex items-center overflow-hidden">
      <div className="section-container grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="relative z-10 space-y-6">
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="font-mono text-sm text-accent-cyan/70 tracking-[0.2em]">
            &gt; Hello World, I&apos;m
          </motion.p>

          <div className="overflow-visible">
            <motion.h1
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="font-syne font-bold leading-tight"
            >
              <span className="block text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-text-primary">
                ARUN
              </span>
              <span className="block text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-accent-cyan">
                NAYAK
              </span>
            </motion.h1>
          </div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }} className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-accent-cyan animate-pulse-glow" />
            <span className="font-mono text-lg sm:text-xl md:text-2xl text-accent-cyan">
              {displayText}
              <span className="inline-block w-[2px] h-6 bg-accent-cyan ml-1 animate-cursor-blink" />
            </span>
          </motion.div>

          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.5 }}
            className="font-mono text-sm text-text-secondary max-w-md leading-relaxed">
            Building the reasoning layer between humans and machines.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.8 }}
            className="flex flex-wrap gap-4 pt-4">
            <button onClick={() => { if (soundEnabled) soundManager.play("click"); document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" }); }}
              className="btn-primary">
              <MessageCircle size={18} /> Let&apos;s Connect
            </button>
            <a href="/resume/Arun_Nayak_Resume.pdf" target="_blank" rel="noopener noreferrer" className="btn-ghost"
              onClick={() => soundEnabled && soundManager.play("click")}>
              <Download size={18} /> Resume
            </a>
          </motion.div>
        </div>

        <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8, duration: 1 }}
          className="relative w-full h-[400px] lg:h-[600px] hidden lg:block">
          <HeroIcosahedron />
          <div className="absolute inset-0 bg-gradient-radial from-accent-cyan/10 to-transparent pointer-events-none" />
        </motion.div>
      </div>

      <motion.button initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.5 }}
        onClick={() => document.querySelector("#about")?.scrollIntoView({ behavior: "smooth" })}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-text-muted hover:text-accent-cyan transition-colors"
        aria-label="Scroll to explore">
        <span className="font-mono text-xs tracking-[0.2em]">scroll to explore</span>
        <ChevronDown size={20} className="animate-bounce-gentle" />
      </motion.button>
    </section>
  );
}