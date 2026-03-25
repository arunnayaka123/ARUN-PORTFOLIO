"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { AnimatePresence } from "framer-motion";

import Loader from "@/components/ui/Loader";
import Navbar from "@/components/ui/Navbar";
import BackToTop from "@/components/ui/BackToTop";
import SmoothScroll from "@/components/ui/SmoothScroll";

import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Skills from "@/components/sections/Skills";
import Services from "@/components/sections/Services";
import Experience from "@/components/sections/Experience";
import Projects from "@/components/sections/Projects";
import Achievements from "@/components/sections/Achievements";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/sections/Footer";
import AiChat from "@/components/sections/AiChat";

const NeuralBackground = dynamic(
  () => import("@/components/three/NeuralBackground"),
  { ssr: false }
);

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [konamiActive, setKonamiActive] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 3500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const KONAMI = [
      "ArrowUp","ArrowUp","ArrowDown","ArrowDown",
      "ArrowLeft","ArrowRight","ArrowLeft","ArrowRight",
      "KeyB","KeyA",
    ];
    let index = 0;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (konamiActive) return;
      if (e.code === KONAMI[index]) {
        index++;
        if (index === KONAMI.length) {
          setKonamiActive(true);
          index = 0;
          setTimeout(() => setKonamiActive(false), 5000);
        }
      } else { index = 0; }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [konamiActive]);

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && <Loader key="loader" />}
      </AnimatePresence>

      {!isLoading && (
        <SmoothScroll>
          <div className="fixed inset-0 z-0 pointer-events-none">
            <NeuralBackground konamiActive={konamiActive} />
          </div>

          <Navbar soundEnabled={soundEnabled} />

          {/* Sound Toggle */}
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className="fixed bottom-6 left-6 z-50 w-10 h-10 rounded-full flex items-center justify-center text-text-secondary hover:text-accent-cyan transition-all"
            style={{
              background: "rgba(255,255,255,0.03)",
              backdropFilter: "blur(12px)",
              border: "1px solid rgba(0,245,255,0.15)",
              borderRadius: "9999px",
            }}
            aria-label={soundEnabled ? "Mute" : "Unmute"}
          >
            {soundEnabled ? "🔊" : "🔇"}
          </button>

          <BackToTop />

          {/* AI Chat Widget */}
          <AiChat />

          <main id="main-content" className="relative z-10">
            <Hero soundEnabled={soundEnabled} />
            <About />
            <Skills />
            <Services />
            <Experience soundEnabled={soundEnabled} />
            <Projects />
            <Achievements />
            <Contact soundEnabled={soundEnabled} />
          </main>

          <Footer />
        </SmoothScroll>
      )}
    </>
  );
}