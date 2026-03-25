"use client";
import { useState, FormEvent } from "react";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { useInView } from "@/lib/hooks/useInView";
import { SOCIAL_LINKS, CONTACT_INFO } from "@/lib/constants";
import { soundManager } from "@/lib/sounds";
import { Send, Copy, CheckCheck, MapPin, Mail, Github, Linkedin, Instagram } from "lucide-react";

const ContactGlobe = dynamic(() => import("@/components/three/ContactGlobe"), { ssr: false });

function SocialIcon({ icon }: { icon: string }) {
  switch (icon) {
    case "github": return <Github size={18} />;
    case "linkedin": return <Linkedin size={18} />;
    case "instagram": return <Instagram size={18} />;
    case "x": return <span className="font-bold text-sm">𝕏</span>;
    case "huggingface": return <span className="text-lg">🤗</span>;
    default: return null;
  }
}

export default function Contact({ soundEnabled }: { soundEnabled: boolean }) {
  const { ref, isInView } = useInView({ threshold: 0.1 });
  const [formData, setFormData] = useState({ name: "", email: "", role: "Hiring", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.name.trim()) errs.name = "Name is required";
    if (!formData.email.trim()) errs.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) errs.email = "Invalid email";
    if (!formData.message.trim()) errs.message = "Message is required";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    try {
      const emailjs = await import("@emailjs/browser");
      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "demo",
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "demo",
        { from_name: formData.name, from_email: formData.email, role: formData.role, message: formData.message },
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || "demo"
      );
      setIsSubmitted(true);
      if (soundEnabled) soundManager.play("chime");
      setFormData({ name: "", email: "", role: "Hiring", message: "" });
    } catch {
      window.location.href = `mailto:${CONTACT_INFO.email}?subject=Portfolio Contact from ${formData.name}&body=${formData.message}`;
      setIsSubmitted(true);
    }
    setIsSubmitting(false);
  };

  const copyEmail = () => {
    navigator.clipboard.writeText(CONTACT_INFO.email);
    setCopied(true);
    if (soundEnabled) soundManager.play("click");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="contact" className="relative">
      <div ref={ref} className="section-container">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}>
          <p className="section-label">// Get in Touch</p>
          <h2 className="section-title">Let&apos;s<br /><span className="text-accent-cyan">Connect</span></h2>
          <div className="gradient-line mb-12" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left - Form */}
          <motion.div initial={{ opacity: 0, x: -30 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ delay: 0.2 }}>
            {isSubmitted ? (
              <div className="glass-strong p-12 rounded-2xl text-center">
                <div className="text-5xl mb-4">🎉</div>
                <h3 className="font-syne text-2xl font-bold text-accent-cyan mb-2">Message Sent!</h3>
                <p className="font-mono text-sm text-text-secondary">Thank you for reaching out. I&apos;ll get back to you soon.</p>
                <button onClick={() => setIsSubmitted(false)} className="btn-ghost mt-6 text-sm">Send Another</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="glass-strong p-8 rounded-2xl space-y-6">
                <div>
                  <label className="block font-mono text-xs text-text-muted mb-2">Name *</label>
                  <input type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-neural-base border border-neural-card text-text-primary font-mono text-sm focus:border-accent-cyan focus:outline-none transition-colors"
                    placeholder="Your name" />
                  {errors.name && <p className="text-red-400 text-xs font-mono mt-1">{errors.name}</p>}
                </div>

                <div>
                  <label className="block font-mono text-xs text-text-muted mb-2">Email *</label>
                  <input type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-neural-base border border-neural-card text-text-primary font-mono text-sm focus:border-accent-cyan focus:outline-none transition-colors"
                    placeholder="your@email.com" />
                  {errors.email && <p className="text-red-400 text-xs font-mono mt-1">{errors.email}</p>}
                </div>

                <div>
                  <label className="block font-mono text-xs text-text-muted mb-2">Purpose</label>
                  <select value={formData.role} onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-neural-base border border-neural-card text-text-primary font-mono text-sm focus:border-accent-cyan focus:outline-none transition-colors">
                    <option value="Hiring">Hiring</option>
                    <option value="Collaboration">Collaboration</option>
                    <option value="Mentorship">Mentorship</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block font-mono text-xs text-text-muted mb-2">Message *</label>
                  <textarea value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    rows={4}
                    className="w-full px-4 py-3 rounded-xl bg-neural-base border border-neural-card text-text-primary font-mono text-sm focus:border-accent-cyan focus:outline-none transition-colors resize-none"
                    placeholder="Tell me about your project..." />
                  {errors.message && <p className="text-red-400 text-xs font-mono mt-1">{errors.message}</p>}
                </div>

                <button type="submit" disabled={isSubmitting} className="btn-primary w-full justify-center">
                  {isSubmitting ? (
                    <span className="animate-spin">⟳</span>
                  ) : (
                    <><Send size={16} /> Send Message</>
                  )}
                </button>
              </form>
            )}
          </motion.div>

          {/* Right - Globe + Info */}
          <motion.div initial={{ opacity: 0, x: 30 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ delay: 0.4 }}
            className="space-y-6">
            <div className="h-[300px] rounded-2xl overflow-hidden">
              <ContactGlobe />
            </div>

            <div className="space-y-3">
              <div className="glass p-4 rounded-xl flex items-center gap-3">
                <MapPin size={18} className="text-accent-cyan flex-shrink-0" />
                <span className="font-mono text-sm text-text-secondary">{CONTACT_INFO.location}</span>
              </div>

              <button onClick={copyEmail} className="glass p-4 rounded-xl flex items-center gap-3 w-full text-left hover:border-accent-cyan/30 transition-all">
                <Mail size={18} className="text-accent-cyan flex-shrink-0" />
                <span className="font-mono text-sm text-text-secondary flex-1">{CONTACT_INFO.email}</span>
                {copied ? <CheckCheck size={16} className="text-green-400" /> : <Copy size={16} className="text-text-muted" />}
              </button>

              <div className="glass p-4 rounded-xl flex items-center gap-3">
                <span className="w-2.5 h-2.5 rounded-full bg-green-400 animate-pulse flex-shrink-0" />
                <span className="font-mono text-sm text-text-secondary">{CONTACT_INFO.status}</span>
              </div>
            </div>

            <div className="flex gap-3">
              {SOCIAL_LINKS.map((link) => (
                <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer"
                  className="w-11 h-11 rounded-xl glass flex items-center justify-center text-text-muted hover:text-accent-cyan hover:border-accent-cyan/30 transition-all"
                  aria-label={link.label}>
                  <SocialIcon icon={link.icon} />
                </a>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}