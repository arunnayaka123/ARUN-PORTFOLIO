"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useInView } from "@/lib/hooks/useInView";
import { STATS } from "@/lib/constants";

function Counter({
  value,
  suffix,
  label,
  inView,
}: {
  value: number;
  suffix: string;
  label: string;
  inView: boolean;
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const duration = 2000;
    const start = performance.now();
    const animate = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * value));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [inView, value]);

  return (
    <div className="text-center">
      <div className="font-bebas text-4xl md:text-5xl text-accent-cyan text-glow-cyan">
        {count}
        {suffix}
      </div>
      <div className="font-mono text-xs text-text-muted mt-1">{label}</div>
    </div>
  );
}

const BADGES = [
  "LangChain",
  "AWS",
  "PyTorch",
  "Claude API",
  "Docker",
  "HuggingFace",
];

export default function About() {
  const { ref, isInView } = useInView({ threshold: 0.1 });

  return (
    <section id="about" className="relative">
      <div ref={ref} className="section-container">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <p className="section-label">// About Me</p>
          <h2 className="section-title">
            The Neural
            <br />
            <span className="text-accent-cyan">Architect</span>
          </h2>
          <div className="gradient-line mb-12" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">
          {/* ════ Left - Bio (3 cols) ════ */}
          <motion.div
            className="lg:col-span-3 space-y-8"
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <p className="font-mono text-base text-text-secondary leading-relaxed">
              I engineer intelligence. As an AI Engineer with deep expertise in
              LLM systems, agentic workflows, and multimodal pipelines, I
              specialize in bridging the gap between foundation model research
              and production-grade deployment. From fine-tuning Claude and LLaMA
              to orchestrating multi-agent systems with LangGraph — I build AI
              that reasons, retrieves, and acts.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 py-8 px-6 glass rounded-2xl">
              {STATS.map((stat, i) => (
                <Counter
                  key={i}
                  value={stat.value}
                  suffix={stat.suffix}
                  label={stat.label}
                  inView={isInView}
                />
              ))}
            </div>

            {/* Quote */}
            <div className="border-l-2 border-accent-violet pl-4">
              <p className="font-mono text-sm text-text-muted italic">
                &ldquo;Good AI engineering isn&apos;t about the model —
                it&apos;s about the architecture around it.&rdquo;
              </p>
            </div>
          </motion.div>

          {/* ════ Right - Photo Card (2 cols) ════ */}
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <div className="glass-strong p-8 rounded-2xl relative overflow-hidden">
              {/* ══ YOUR PHOTO WITH GLOW EFFECT ══ */}
              <div className="relative w-36 h-36 mx-auto mb-6">
                {/* Glow ring behind photo */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-accent-cyan to-accent-violet opacity-20 blur-md animate-pulse-glow" />
                {/* Photo */}
                <div className="relative w-36 h-36 rounded-full border-2 border-accent-cyan/40 overflow-hidden">
                  <img
                    src="/images/arun-avatar.png"
                    alt="Arun Nayak"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Name & Title */}
              <h3 className="font-syne text-xl font-bold text-center mb-2">
                Arun Nayak
              </h3>
              <p className="font-mono text-xs text-accent-cyan text-center mb-6">
                AI Engineer · Hyderabad, India
              </p>

              {/* Floating tech badges */}
              <div className="flex flex-wrap justify-center gap-2">
                {BADGES.map((badge, i) => (
                  <motion.span
                    key={badge}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: 0.6 + i * 0.1 }}
                    className="px-3 py-1 text-xs font-mono rounded-full border border-accent-cyan/20 text-text-secondary bg-neural-card/50 hover:border-accent-cyan/50 hover:text-accent-cyan transition-all"
                  >
                    {badge}
                  </motion.span>
                ))}
              </div>

              {/* Background glow effects */}
              <div className="absolute -top-20 -right-20 w-40 h-40 bg-accent-cyan/5 rounded-full blur-3xl" />
              <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-accent-violet/5 rounded-full blur-3xl" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
