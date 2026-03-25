"use client";
import { motion } from "framer-motion";
import { useInView } from "@/lib/hooks/useInView";
import {
  Bot,
  BrainCircuit,
  FileSearch,
  Workflow,
  Server,
  Code2,
} from "lucide-react";

const SERVICES = [
  {
    icon: <Workflow size={28} />,
    title: "Agentic AI Workflows",
    badge: "PRODUCTION READY",
    description:
      "End-to-end multi-agent orchestration using LangGraph and CrewAI. Build AI systems that plan, reason, and execute complex tasks autonomously.",
    features: [
      "Multi-agent task decomposition",
      "Tool-use & function calling",
      "Human-in-the-loop workflows",
      "Real-time monitoring & logging",
    ],
  },
  {
    icon: <FileSearch size={28} />,
    title: "RAG & Document Intelligence",
    badge: "ENTERPRISE READY",
    description:
      "Transform unstructured data into actionable intelligence using advanced retrieval-augmented generation with vector stores and semantic search.",
    features: [
      "Custom knowledge base creation",
      "Hybrid search (semantic + keyword)",
      "Multi-modal document parsing",
      "Citation & source tracking",
    ],
  },
  {
    icon: <BrainCircuit size={28} />,
    title: "LLM Fine-Tuning & Deployment",
    badge: "CUSTOM MODELS",
    description:
      "Bespoke model training and optimization tailored to your domain. From LoRA fine-tuning to production deployment on AWS Bedrock.",
    features: [
      "Domain-specific fine-tuning",
      "LoRA / QLoRA optimization",
      "Model evaluation & benchmarking",
      "Scalable API deployment",
    ],
  },
  {
    icon: <Bot size={28} />,
    title: "AI Chatbots & Assistants",
    badge: "CONVERSATIONAL AI",
    description:
      "Intelligent conversational agents with memory, context management, and reasoning capabilities powered by Claude, GPT-4o, and LLaMA.",
    features: [
      "Long-term memory management",
      "Multi-turn reasoning chains",
      "Custom personality & guardrails",
      "Integration with existing tools",
    ],
  },
  {
    icon: <Server size={28} />,
    title: "ML Pipeline & Infrastructure",
    badge: "SCALABLE",
    description:
      "Production-grade machine learning pipelines with automated training, evaluation, and deployment. Docker-ready, cloud-native architecture.",
    features: [
      "Automated training pipelines",
      "Model versioning & registry",
      "A/B testing infrastructure",
      "Real-time inference APIs",
    ],
  },
  {
    icon: <Code2 size={28} />,
    title: "Computer Vision Solutions",
    badge: "REAL-TIME",
    description:
      "YOLO-based object detection and real-time video analytics for security, retail, and industrial applications. Edge-deployable with Docker.",
    features: [
      "Real-time object detection (40+ FPS)",
      "Anomaly detection systems",
      "Edge device optimization",
      "Automated alert pipelines",
    ],
  },
];

export default function Services() {
  const { ref, isInView } = useInView({ threshold: 0.05 });

  return (
    <section id="services" className="relative">
      <div ref={ref} className="section-container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="section-label">// What I Offer</p>
          <h2 className="font-syne text-4xl md:text-5xl lg:text-6xl font-bold text-text-primary mb-4">
            AI-Powered
            <br />
            <span className="text-accent-cyan">Services</span>
          </h2>
          <p className="font-mono text-sm text-text-secondary max-w-2xl mx-auto leading-relaxed">
            I deploy intelligent agents and scalable AI infrastructure to
            streamline your operations, minimize error, and unlock the full
            potential of foundation models.
          </p>
          <div className="gradient-line mx-auto mt-6" />
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((service, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 + i * 0.1, duration: 0.5 }}
              className="glass p-6 rounded-2xl hover:border-accent-cyan/30 transition-all group relative overflow-hidden flex flex-col"
            >
              {/* Top row: icon + badge */}
              <div className="flex items-start justify-between mb-5">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent-cyan/20 to-accent-violet/20 flex items-center justify-center text-accent-cyan group-hover:scale-110 transition-transform">
                  {service.icon}
                </div>
                <span className="px-3 py-1 rounded-full text-[10px] font-mono tracking-wider bg-accent-cyan/10 text-accent-cyan border border-accent-cyan/20">
                  {service.badge}
                </span>
              </div>

              {/* Title */}
              <h3 className="font-syne text-xl font-bold mb-3 group-hover:text-accent-cyan transition-colors">
                {service.title}
              </h3>

              {/* Description */}
              <p className="font-mono text-sm text-text-secondary leading-relaxed mb-5 flex-1">
                {service.description}
              </p>

              {/* Divider */}
              <div className="h-[1px] w-full bg-neural-card mb-5" />

              {/* Features */}
              <ul className="space-y-2.5">
                {service.features.map((feature, j) => (
                  <li
                    key={j}
                    className="flex items-center gap-2.5 font-mono text-xs text-text-muted"
                  >
                    <span className="w-4 h-4 rounded-full bg-accent-cyan/10 flex items-center justify-center flex-shrink-0">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent-cyan" />
                    </span>
                    {feature}
                  </li>
                ))}
              </ul>

              {/* Hover glow */}
              <div className="absolute -top-20 -right-20 w-40 h-40 bg-accent-cyan/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8 }}
          className="text-center mt-12"
        >
          <button
            onClick={() =>
              document
                .querySelector("#contact")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="btn-primary"
          >
            Discuss Your Project →
          </button>
        </motion.div>
      </div>
    </section>
  );
}