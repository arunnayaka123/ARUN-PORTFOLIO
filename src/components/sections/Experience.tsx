"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "@/lib/hooks/useInView";
import { EXPERIENCE } from "@/lib/constants";
import { Briefcase, MapPin, ChevronDown, ChevronUp } from "lucide-react";

export default function Experience() {
  const { ref, isInView } = useInView({ threshold: 0.05 });
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);

  return (
    <section id="experience" className="relative">
      <div ref={ref} className="section-container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <p className="section-label">// Career Path</p>
          <h2 className="section-title">
            Work<br />
            <span className="text-accent-cyan">Experience</span>
          </h2>
          <div className="gradient-line mb-12" />
        </motion.div>

        {/* Experience Cards */}
        <div className="space-y-6 max-w-3xl mx-auto">
          {EXPERIENCE.map((exp, i) => {
            const isExpanded = expandedIndex === i;

            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.1 + i * 0.1, duration: 0.5 }}
              >
                <button
                  onClick={() => setExpandedIndex(isExpanded ? null : i)}
                  className="w-full text-left glass p-6 rounded-2xl hover:border-accent-cyan/30 transition-all"
                >
                  {/* Top Row */}
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      {/* Role */}
                      <h3 className="font-syne text-lg font-bold text-text-primary">
                        {exp.role}
                      </h3>

                      {/* Company */}
                      <div className="flex items-center gap-2 mt-2">
                        <Briefcase size={14} className="text-accent-violet" />
                        <span className="font-mono text-sm text-accent-violet">{exp.company}</span>
                      </div>

                      {/* Period & Type */}
                      <div className="flex items-center gap-2 mt-1">
                        <MapPin size={12} className="text-text-muted" />
                        <span className="font-mono text-xs text-text-muted">
                          {exp.period} · {exp.type}
                        </span>
                      </div>
                    </div>

                    {/* Expand icon */}
                    <div className="flex-shrink-0 mt-1">
                      {isExpanded ? (
                        <ChevronUp size={18} className="text-accent-cyan" />
                      ) : (
                        <ChevronDown size={18} className="text-text-muted" />
                      )}
                    </div>
                  </div>

                  {/* Expanded Content */}
                  {isExpanded && (
                    <div className="mt-4 pt-4 border-t border-neural-card">
                      {/* Description */}
                      <ul className="space-y-2 mb-4">
                        {exp.description.map((desc, j) => (
                          <li key={j} className="flex items-start gap-2">
                            <span className="text-accent-cyan mt-0.5 flex-shrink-0">▹</span>
                            <span className="font-mono text-xs text-text-secondary">{desc}</span>
                          </li>
                        ))}
                      </ul>

                      {/* Metrics */}
                      {exp.metrics.length > 0 && (
                        <div className="flex flex-wrap gap-3 mt-4">
                          {exp.metrics.map((metric, j) => (
                            <div key={j} className="px-4 py-2 rounded-xl bg-accent-cyan/10 border border-accent-cyan/20">
                              <div className="font-bebas text-2xl text-accent-cyan">{metric.value}%</div>
                              <div className="font-mono text-[10px] text-text-muted">{metric.label}</div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </button>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}