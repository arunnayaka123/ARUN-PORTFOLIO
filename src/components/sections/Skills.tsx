"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";
import { useInView } from "@/lib/hooks/useInView";
import { SKILL_CATEGORIES } from "@/lib/constants";

const SkillSphere = dynamic(() => import("@/components/three/SkillSphere"), { ssr: false });

function ProficiencyDots({ level }: { level: number }) {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((i) => (
        <span key={i} className={`w-1.5 h-1.5 rounded-full ${i <= level ? "bg-accent-cyan shadow-glow-sm" : "bg-text-muted/30"}`} />
      ))}
    </div>
  );
}

export default function Skills() {
  const { ref, isInView } = useInView({ threshold: 0.1 });
  const [activeCategory, setActiveCategory] = useState(0);

  return (
    <section id="skills" className="relative">
      <div ref={ref} className="section-container">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}>
          <p className="section-label">// Tech Stack</p>
          <h2 className="section-title">Skills &<br /><span className="text-accent-cyan">Expertise</span></h2>
          <div className="gradient-line mb-12" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left - 3D Sphere */}
          <motion.div className="h-[400px] hidden lg:block"
            initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}} transition={{ delay: 0.3 }}>
            <SkillSphere />
          </motion.div>

          {/* Right - Category Cards */}
          <div className="space-y-4">
            {/* Category Tabs */}
            <div className="flex flex-wrap gap-2 mb-6">
              {SKILL_CATEGORIES.map((cat, i) => (
                <button key={i} onClick={() => setActiveCategory(i)}
                  className={`px-4 py-2 rounded-lg font-mono text-xs transition-all ${activeCategory === i ? "bg-accent-cyan/10 border border-accent-cyan/30 text-accent-cyan" : "border border-neural-card text-text-muted hover:text-text-secondary"}`}>
                  {cat.icon} {cat.title}
                </button>
              ))}
            </div>

            {/* Skills Grid */}
            <AnimatePresence mode="wait">
              <motion.div key={activeCategory}
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="glass p-6 rounded-2xl">
                <h3 className="font-syne text-lg font-bold mb-4 flex items-center gap-2">
                  <span className="text-2xl">{SKILL_CATEGORIES[activeCategory].icon}</span>
                  {SKILL_CATEGORIES[activeCategory].title}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {SKILL_CATEGORIES[activeCategory].skills.map((skill, i) => (
                    <motion.div key={skill.name}
                      initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                      className="flex items-center justify-between px-3 py-2 rounded-lg bg-neural-base/50 border border-neural-card hover:border-accent-cyan/20 transition-all group">
                      <span className="font-mono text-sm text-text-secondary group-hover:text-text-primary transition-colors">{skill.name}</span>
                      <ProficiencyDots level={skill.proficiency} />
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}