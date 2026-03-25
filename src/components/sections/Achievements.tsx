"use client";
import { motion } from "framer-motion";
import { useInView } from "@/lib/hooks/useInView";
import { ACHIEVEMENTS } from "@/lib/constants";
import { Award } from "lucide-react";

export default function Achievements() {
  const { ref, isInView } = useInView({ threshold: 0.1 });

  return (
    <section id="achievements" className="relative">
      <div ref={ref} className="section-container">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}>
          <p className="section-label">// Recognition</p>
          <h2 className="section-title">Achievements &<br /><span className="text-accent-cyan">Certifications</span></h2>
          <div className="gradient-line mb-12" />
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {ACHIEVEMENTS.map((achievement, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, rotateY: 90 }}
              animate={isInView ? { opacity: 1, rotateY: 0 } : {}}
              transition={{ delay: 0.2 + i * 0.15, duration: 0.6, ease: "easeOut" }}
              className="glass p-6 rounded-2xl hover:border-accent-cyan/30 transition-all group relative overflow-hidden"
              style={{ transformStyle: "preserve-3d" }}
            >
              {/* Icon */}
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent-cyan/20 to-accent-violet/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Award size={24} className="text-accent-cyan" />
              </div>

              {/* Content */}
              <h3 className="font-syne text-base font-bold mb-1 group-hover:text-accent-cyan transition-colors">
                {achievement.title}
              </h3>
              <p className="font-mono text-xs text-accent-violet mb-2">{achievement.issuer}</p>
              <p className="font-mono text-xs text-text-muted mb-2">{achievement.date}</p>
              <p className="font-mono text-xs text-text-secondary leading-relaxed">{achievement.description}</p>

              {/* Decorative corner */}
              <div className="absolute top-0 right-0 w-16 h-16 bg-accent-cyan/5 rounded-bl-3xl" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}