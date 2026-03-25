"use client";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Bot, User, Sparkles } from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

const INITIAL_MESSAGE: Message = {
  role: "assistant",
  content:
    "👋 Hey! I'm Arun's AI assistant. I can tell you about his skills, experience, projects, or services. What would you like to know?",
  timestamp: new Date(),
};

// Pre-built responses based on keywords
const KNOWLEDGE_BASE: Record<string, string> = {
  skills:
    "🧠 Arun specializes in:\n\n• **Agentic AI**: LangChain, LangGraph, CrewAI\n• **LLMs**: Claude API, GPT-4o, LLaMA, HuggingFace\n• **ML/DL**: PyTorch, TensorFlow, Transformers\n• **CV**: YOLO, OpenCV\n• **Cloud**: AWS Bedrock, Docker\n• **Languages**: Python (Expert), SQL, JavaScript\n\nHe's particularly strong in RAG systems, prompt engineering, and multi-agent orchestration.",

  experience:
    "💼 Arun's professional journey:\n\n• **Project Officer & SME** — Edunet Foundation (Feb 2026 – Present)\n  Training AI/ML curriculum & mentoring\n\n• **AI Engineer Intern** — Rubixe AI Solutions (Oct 2025 – Present)\n  28% inference boost, YOLO CV systems, REST APIs\n\n• **Data Scientist Intern** — Rubixe (Aug–Oct 2025)\n  22% model accuracy improvement\n\n• **LLM & Data Analyst** — Springer Capital (May–Aug 2025)\n  31% LLM consistency gain via fine-tuning",

  projects:
    "🚀 Key Projects:\n\n1️⃣ **Agentic LLM Summarization Pipeline**\n   Multi-lingual summarization with LangChain + RAG\n   → +22% coherence improvement\n\n2️⃣ **CCTV Crowd Management System**\n   YOLO real-time detection at 40+ FPS\n   → Docker-ready, edge-deployable\n\nBoth showcase production-grade AI engineering!",

  services:
    "🛠️ Services Arun offers:\n\n1. **Agentic AI Workflows** — Multi-agent orchestration\n2. **RAG & Document Intelligence** — Knowledge base systems\n3. **LLM Fine-Tuning** — Custom model training\n4. **AI Chatbots** — Conversational agents\n5. **ML Pipelines** — Production infrastructure\n6. **Computer Vision** — Real-time detection\n\nScroll down to the Services section for details!",

  contact:
    "📬 You can reach Arun at:\n\n• **Email**: aa5954225@gmail.com\n• **LinkedIn**: linkedin.com/in/arun-nayak\n• **X**: x.com/Arunnayaka123\n• **Instagram**: instagram.com/arun_nayak_a123\n• **Location**: Hyderabad, India 🇮🇳\n\n🟢 Currently open to opportunities!\n\nOr scroll to the Contact section to send a message directly.",

  hire:
    "✅ Yes! Arun is **open to opportunities**!\n\nHe's looking for roles in:\n• AI Engineer\n• LLM Systems Architect\n• ML Engineer\n• Agentic AI Developer\n\nBest way to reach out:\n📧 aa5954225@gmail.com\n🔗 linkedin.com/in/arun-nayak\n\nOr use the contact form below! 👇",

  hello:
    "Hey there! 👋 Great to see you here! I'm Arun's AI assistant. Ask me anything about:\n\n• 🧠 **Skills** — What technologies does Arun know?\n• 💼 **Experience** — Where has he worked?\n• 🚀 **Projects** — What has he built?\n• 🛠️ **Services** — What can he do for you?\n• 📬 **Contact** — How to reach him?\n• 💼 **Hire** — Is he available?\n\nJust type a keyword or ask a question!",

  about:
    "🧑‍💻 **About Arun Nayak**\n\nArun is an AI Engineer based in Hyderabad, India. He specializes in building the reasoning layer between humans and machines.\n\nWith expertise in LLM systems, agentic workflows, and multimodal pipelines, he bridges the gap between foundation model research and production-grade deployment.\n\nFrom fine-tuning Claude and LLaMA to orchestrating multi-agent systems with LangGraph — he builds AI that reasons, retrieves, and acts.",

  langchain:
    "⛓️ Arun is highly proficient in **LangChain & LangGraph**!\n\nHe uses them for:\n• Building multi-agent systems\n• RAG pipeline orchestration\n• Tool-use and function calling\n• Context management chains\n• Custom agent architectures\n\nHis Agentic LLM Summarization Pipeline project is a great example of this in action!",

  rag: "📚 **RAG (Retrieval-Augmented Generation)** is one of Arun's core specialties!\n\nHe builds:\n• Custom knowledge bases with vector stores\n• Hybrid search (semantic + keyword)\n• Multi-modal document parsing\n• Citation & source tracking systems\n\nUsed in production at Springer Capital for 31% LLM consistency improvement!",
};

function getResponse(input: string): string {
  const lower = input.toLowerCase();

  // Check each keyword
  for (const [key, response] of Object.entries(KNOWLEDGE_BASE)) {
    if (lower.includes(key)) return response;
  }

  // Greeting patterns
  if (
    lower.match(
      /^(hi|hey|hello|sup|yo|greetings|howdy|what's up|whats up)/
    )
  ) {
    return KNOWLEDGE_BASE.hello;
  }

  // Question patterns
  if (lower.includes("who") && lower.includes("arun"))
    return KNOWLEDGE_BASE.about;
  if (lower.includes("what") && lower.includes("do"))
    return KNOWLEDGE_BASE.services;
  if (lower.includes("where") && lower.includes("work"))
    return KNOWLEDGE_BASE.experience;
  if (lower.includes("tech") || lower.includes("stack"))
    return KNOWLEDGE_BASE.skills;
  if (lower.includes("avail") || lower.includes("open"))
    return KNOWLEDGE_BASE.hire;
  if (lower.includes("reach") || lower.includes("email") || lower.includes("phone"))
    return KNOWLEDGE_BASE.contact;
  if (lower.includes("python") || lower.includes("pytorch") || lower.includes("aws"))
    return KNOWLEDGE_BASE.skills;
  if (lower.includes("resume") || lower.includes("cv"))
    return '📄 You can download Arun\'s resume by clicking the **"Download Resume"** button in the hero section at the top of this page!\n\nOr click this: [Resume](/resume/Arun_Nayak_Resume.pdf)';

  // Default
  return "🤔 I'm not sure about that specific topic, but I can help with:\n\n• **Skills** — Technical expertise\n• **Experience** — Work history\n• **Projects** — Portfolio highlights\n• **Services** — What Arun offers\n• **Contact** — How to reach him\n• **Hire** — Availability\n\nTry asking about one of these!";
}

export default function AiChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen) inputRef.current?.focus();
  }, [isOpen]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      role: "user",
      content: input.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    // Simulate AI "thinking" delay
    setTimeout(() => {
      const response = getResponse(userMessage.content);
      const assistantMessage: Message = {
        role: "assistant",
        content: response,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 800 + Math.random() * 1200);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // Quick suggestion chips
  const suggestions = ["Skills", "Experience", "Projects", "Services", "Hire", "Contact"];

  return (
    <>
      {/* Floating Chat Button */}
      <motion.button
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 5, type: "spring" }}
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-20 right-6 z-50 w-14 h-14 rounded-full flex items-center justify-center shadow-glow transition-all ${
          isOpen
            ? "bg-neural-card border border-neural-card"
            : "bg-gradient-to-br from-accent-cyan to-accent-violet"
        }`}
        aria-label="Toggle AI Chat"
      >
        {isOpen ? (
          <X size={22} className="text-text-primary" />
        ) : (
          <MessageCircle size={22} className="text-neural-base" />
        )}

        {/* Notification dot */}
        {!isOpen && (
          <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-accent-amber flex items-center justify-center">
            <span className="w-2 h-2 rounded-full bg-accent-amber animate-ping absolute" />
            <span className="w-2 h-2 rounded-full bg-accent-amber relative" />
          </span>
        )}
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed bottom-36 right-6 z-50 w-[360px] max-w-[calc(100vw-48px)] h-[500px] max-h-[70vh] flex flex-col rounded-2xl overflow-hidden"
            style={{
              background: "rgba(10, 14, 23, 0.95)",
              backdropFilter: "blur(20px)",
              border: "1px solid rgba(0, 245, 255, 0.2)",
            }}
          >
            {/* Header */}
            <div className="px-4 py-3 border-b border-neural-card flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-accent-cyan to-accent-violet flex items-center justify-center">
                <Sparkles size={18} className="text-neural-base" />
              </div>
              <div className="flex-1">
                <h3 className="font-syne text-sm font-bold text-text-primary">
                  Arun&apos;s AI Assistant
                </h3>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                  <span className="font-mono text-[10px] text-text-muted">
                    Online · Ask me anything
                  </span>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 rounded-lg hover:bg-neural-card transition-colors"
              >
                <X size={16} className="text-text-muted" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`flex gap-2.5 ${
                    msg.role === "user" ? "flex-row-reverse" : ""
                  }`}
                >
                  {/* Avatar */}
                  <div
                    className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 ${
                      msg.role === "assistant"
                        ? "bg-gradient-to-br from-accent-cyan/20 to-accent-violet/20"
                        : "bg-accent-cyan/10"
                    }`}
                  >
                    {msg.role === "assistant" ? (
                      <Bot size={14} className="text-accent-cyan" />
                    ) : (
                      <User size={14} className="text-accent-cyan" />
                    )}
                  </div>

                  {/* Bubble */}
                  <div
                    className={`max-w-[80%] px-3.5 py-2.5 rounded-2xl font-mono text-xs leading-relaxed ${
                      msg.role === "assistant"
                        ? "bg-neural-card text-text-secondary rounded-tl-sm"
                        : "bg-accent-cyan/10 text-text-primary border border-accent-cyan/20 rounded-tr-sm"
                    }`}
                  >
                    {msg.content.split("\n").map((line, j) => (
                      <span key={j}>
                        {line
                          .replace(/\*\*(.*?)\*\*/g, "⟨b⟩\$1⟨/b⟩")
                          .split(/⟨\/?b⟩/)
                          .map((part, k) =>
                            k % 2 === 1 ? (
                              <strong key={k} className="text-accent-cyan font-bold">
                                {part}
                              </strong>
                            ) : (
                              <span key={k}>{part}</span>
                            )
                          )}
                        {j < msg.content.split("\n").length - 1 && <br />}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}

              {/* Typing indicator */}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex gap-2.5"
                >
                  <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-accent-cyan/20 to-accent-violet/20 flex items-center justify-center flex-shrink-0">
                    <Bot size={14} className="text-accent-cyan" />
                  </div>
                  <div className="px-4 py-3 rounded-2xl rounded-tl-sm bg-neural-card">
                    <div className="flex gap-1.5">
                      <span
                        className="w-2 h-2 rounded-full bg-accent-cyan/50 animate-bounce"
                        style={{ animationDelay: "0ms" }}
                      />
                      <span
                        className="w-2 h-2 rounded-full bg-accent-cyan/50 animate-bounce"
                        style={{ animationDelay: "150ms" }}
                      />
                      <span
                        className="w-2 h-2 rounded-full bg-accent-cyan/50 animate-bounce"
                        style={{ animationDelay: "300ms" }}
                      />
                    </div>
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick Suggestions */}
            {messages.length <= 2 && (
              <div className="px-4 pb-2">
                <div className="flex flex-wrap gap-1.5">
                  {suggestions.map((s) => (
                    <button
                      key={s}
                      onClick={() => {
                        setInput(s);
                        setTimeout(() => {
                          const userMsg: Message = {
                            role: "user",
                            content: s,
                            timestamp: new Date(),
                          };
                          setMessages((prev) => [...prev, userMsg]);
                          setInput("");
                          setIsTyping(true);
                          setTimeout(() => {
                            setMessages((prev) => [
                              ...prev,
                              {
                                role: "assistant",
                                content: getResponse(s),
                                timestamp: new Date(),
                              },
                            ]);
                            setIsTyping(false);
                          }, 800 + Math.random() * 800);
                        }, 100);
                      }}
                      className="px-2.5 py-1 rounded-full text-[10px] font-mono border border-accent-cyan/20 text-accent-cyan/70 hover:bg-accent-cyan/10 hover:text-accent-cyan transition-all"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input */}
            <div className="px-4 py-3 border-t border-neural-card">
              <div className="flex items-center gap-2 bg-neural-base rounded-xl px-3 py-2 border border-neural-card focus-within:border-accent-cyan/30 transition-colors">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask about skills, projects..."
                  className="flex-1 bg-transparent text-text-primary font-mono text-xs outline-none placeholder:text-text-muted"
                />
                <button
                  onClick={handleSend}
                  disabled={!input.trim() || isTyping}
                  className="w-8 h-8 rounded-lg bg-accent-cyan/10 flex items-center justify-center text-accent-cyan hover:bg-accent-cyan/20 transition-colors disabled:opacity-30"
                >
                  <Send size={14} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}