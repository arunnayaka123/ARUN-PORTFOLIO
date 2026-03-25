"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp } from "lucide-react";

export default function BackToTop() {
  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setVisible(y > 500);
      setProgress(max > 0 ? y / max : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const circ = 2 * Math.PI * 18;

  return (
    <AnimatePresence>
      {visible && (
        <motion.button initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-6 right-6 z-50 w-12 h-12 flex items-center justify-center group" aria-label="Back to top">
          <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 40 40">
            <circle cx="20" cy="20" r="18" fill="rgba(10,14,23,0.8)" stroke="rgba(0,245,255,0.15)" strokeWidth="2" />
            <circle cx="20" cy="20" r="18" fill="none" stroke="#00f5ff" strokeWidth="2" strokeLinecap="round"
              strokeDasharray={circ} strokeDashoffset={circ * (1 - progress)} className="transition-all duration-150" />
          </svg>
          <ArrowUp size={16} className="relative z-10 text-accent-cyan group-hover:-translate-y-0.5 transition-transform" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}