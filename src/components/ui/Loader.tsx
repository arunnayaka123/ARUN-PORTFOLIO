"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function Loader() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) { clearInterval(interval); return 100; }
        const inc = prev < 30 ? 3 : prev < 70 ? 1 : prev < 90 ? 2 : 4;
        return Math.min(prev + inc, 100);
      });
    }, 30);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-neural-base"
      exit={{ opacity: 0, scale: 1.05, filter: "blur(10px)" }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
    >
      <div className="relative w-48 h-48 mb-8">
        <svg viewBox="0 0 200 200" className="w-full h-full">
          {[
            { cx: 100, cy: 30, d: 0 }, { cx: 40, cy: 80, d: 0.1 },
            { cx: 160, cy: 80, d: 0.2 }, { cx: 70, cy: 140, d: 0.3 },
            { cx: 130, cy: 140, d: 0.4 }, { cx: 100, cy: 180, d: 0.5 },
          ].map((n, i) => (
            <motion.circle key={i} cx={n.cx} cy={n.cy} r="5" fill="#00f5ff"
              initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: n.d, duration: 0.5 }} />
          ))}
          {[
            { x1: 100, y1: 30, x2: 40, y2: 80, d: 0.6 },
            { x1: 100, y1: 30, x2: 160, y2: 80, d: 0.7 },
            { x1: 40, y1: 80, x2: 70, y2: 140, d: 0.8 },
            { x1: 40, y1: 80, x2: 130, y2: 140, d: 0.9 },
            { x1: 160, y1: 80, x2: 70, y2: 140, d: 1.0 },
            { x1: 160, y1: 80, x2: 130, y2: 140, d: 1.1 },
            { x1: 70, y1: 140, x2: 100, y2: 180, d: 1.2 },
            { x1: 130, y1: 140, x2: 100, y2: 180, d: 1.3 },
          ].map((e, i) => (
            <motion.line key={i} x1={e.x1} y1={e.y1} x2={e.x2} y2={e.y2}
              stroke="rgba(0,245,255,0.3)" strokeWidth="1"
              initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 1 }}
              transition={{ delay: e.d, duration: 0.5 }} />
          ))}
        </svg>
      </div>
      <motion.p className="font-mono text-sm text-accent-cyan/70 tracking-widest mb-6"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
        Initializing Neural Architecture...
      </motion.p>
      <div className="w-64 h-[2px] bg-neural-surface rounded-full overflow-hidden mb-4">
        <div className="h-full bg-gradient-to-r from-accent-cyan to-accent-violet transition-all duration-100"
          style={{ width: `${progress}%` }} />
      </div>
      <p className="font-mono text-xs text-text-muted tracking-[0.2em]">
        {String(progress).padStart(3, "0")}%
      </p>
    </motion.div>
  );
}