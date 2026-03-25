"use client";
import { NAV_LINKS, SOCIAL_LINKS } from "@/lib/constants";
import { Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-neural-card">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo + Credit */}
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-gradient-to-br from-accent-cyan to-accent-violet flex items-center justify-center">
              <span className="font-syne font-bold text-neural-base text-xs">A</span>
            </div>
            <span className="font-mono text-sm text-text-muted">
              Designed & Built by Arun Nayak{" "}
              <Heart size={12} className="inline text-red-400 mx-1" fill="currentColor" />
              2025
            </span>
          </div>

          {/* Quick Nav */}
          <div className="flex flex-wrap justify-center gap-4">
            {NAV_LINKS.map((link) => (
              <a key={link.href} href={link.href}
                className="font-mono text-xs text-text-muted hover:text-accent-cyan transition-colors">
                {link.label}
              </a>
            ))}
          </div>

          {/* Social */}
          <div className="flex gap-3">
            {SOCIAL_LINKS.slice(0, 4).map((link) => (
              <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer"
                className="font-mono text-xs text-text-muted hover:text-accent-cyan transition-colors">
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}