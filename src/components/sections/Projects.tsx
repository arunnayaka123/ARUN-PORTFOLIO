"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "@/lib/hooks/useInView";
import { PROJECTS } from "@/lib/constants";
import { ExternalLink, Github, X } from "lucide-react";

const FILTERS = ["All", "Agentic AI", "Computer Vision", "NLP/LLM"];

export default function Projects() {
  const { ref, isInView } = useInView({ threshold: 0.1 });
  const [activeFilter, setActiveFilter] = useState("All");
  const [selectedProject, setSelectedProject] = useState<number | null>(null);

  const filtered = activeFilter === "All" ? PROJECTS : PROJECTS.filter((p) => p.category === activeFilter);

  return (
    <section id="projects" className="relative">
      <div ref={ref} className="section-container">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}>
          <p className="section-label">// Portfolio</p>
          <h2 className="section-title">Key<br /><span className="text-accent-cyan">Projects</span></h2>
          <div className="gradient-line mb-8" />
        </motion.div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2 mb-8">
          {FILTERS.map((filter) => (
            <button key={filter} onClick={() => setActiveFilter(filter)}
              className={`px-4 py-2 rounded-full font-mono text-xs transition-all ${activeFilter === filter ? "bg-accent-cyan text-neural-base font-bold" : "border border-neural-card text-text-muted hover:text-text-secondary hover:border-accent-cyan/20"}`}>
              {filter}
            </button>
          ))}
        </div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <AnimatePresence mode="popLayout">
            {filtered.map((project, i) => (
              <motion.div key={project.title}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="glass p-6 rounded-2xl hover:border-accent-cyan/30 transition-all group cursor-pointer"
                onClick={() => setSelectedProject(i)}
                data-cursor="VIEW"
              >
                {/* Category badge */}
                <div className="flex items-center justify-between mb-4">
                  <span className="px-3 py-1 rounded-full text-xs font-mono bg-accent-cyan/10 text-accent-cyan border border-accent-cyan/20">
                    {project.category}
                  </span>
                  <span className="font-mono text-xs text-text-muted">{project.date}</span>
                </div>

                {/* Title */}
                <h3 className="font-syne text-xl font-bold mb-3 group-hover:text-accent-cyan transition-colors">
                  {project.title}
                </h3>

                {/* Description */}
                <p className="font-mono text-sm text-text-secondary mb-4 leading-relaxed">
                  {project.description}
                </p>

                {/* Stack */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.stack.map((tech) => (
                    <span key={tech} className="px-2 py-1 text-xs font-mono rounded bg-neural-base text-text-muted border border-neural-card">
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Links */}
                <div className="flex gap-3">
                  {project.github && (
                    <a href={project.github} target="_blank" rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="flex items-center gap-1 text-xs font-mono text-text-muted hover:text-accent-cyan transition-colors">
                      <Github size={14} /> GitHub
                    </a>
                  )}
                  {project.live && (
                    <a href={project.live} target="_blank" rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="flex items-center gap-1 text-xs font-mono text-text-muted hover:text-accent-cyan transition-colors">
                      <ExternalLink size={14} /> Live
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Project Detail Modal */}
        <AnimatePresence>
          {selectedProject !== null && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neural-base/80 backdrop-blur-xl"
              onClick={() => setSelectedProject(null)}
            >
              <motion.div
                initial={{ scale: 0.9, y: 30 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 30 }}
                transition={{ type: "spring", damping: 25 }}
                className="glass-strong max-w-2xl w-full p-8 rounded-2xl max-h-[80vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <span className="px-3 py-1 rounded-full text-xs font-mono bg-accent-cyan/10 text-accent-cyan border border-accent-cyan/20">
                      {PROJECTS[selectedProject].category}
                    </span>
                    <h3 className="font-syne text-2xl font-bold mt-3">{PROJECTS[selectedProject].title}</h3>
                    <p className="font-mono text-xs text-text-muted mt-1">{PROJECTS[selectedProject].date}</p>
                  </div>
                  <button onClick={() => setSelectedProject(null)} className="p-2 rounded-lg hover:bg-neural-card transition-colors">
                    <X size={20} className="text-text-muted" />
                  </button>
                </div>

                <div className="space-y-6">
                  <div>
                    <h4 className="font-syne font-bold text-accent-cyan mb-2">Problem</h4>
                    <p className="font-mono text-sm text-text-secondary">{PROJECTS[selectedProject].problem}</p>
                  </div>
                  <div>
                    <h4 className="font-syne font-bold text-accent-violet mb-2">Approach</h4>
                    <p className="font-mono text-sm text-text-secondary">{PROJECTS[selectedProject].approach}</p>
                  </div>
                  <div>
                    <h4 className="font-syne font-bold text-accent-amber mb-2">Results</h4>
                    <p className="font-mono text-sm text-text-secondary">{PROJECTS[selectedProject].results}</p>
                  </div>

                  <div>
                    <h4 className="font-syne font-bold text-text-primary mb-2">Tech Stack</h4>
                    <div className="flex flex-wrap gap-2">
                      {PROJECTS[selectedProject].stack.map((tech) => (
                        <span key={tech} className="px-3 py-1 text-xs font-mono rounded-full bg-accent-cyan/10 text-accent-cyan border border-accent-cyan/20">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}