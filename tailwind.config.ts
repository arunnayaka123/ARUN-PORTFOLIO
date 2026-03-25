import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        neural: {
          base: "#020408",
          obsidian: "#0a0e17",
          surface: "#0f1420",
          card: "#141925",
        },
        accent: {
          cyan: "#00f5ff",
          cyanDim: "#00a3aa",
          violet: "#7c3aed",
          violetLight: "#a855f7",
          amber: "#f59e0b",
        },
        text: {
          primary: "#e2e8f0",
          secondary: "#94a3b8",
          muted: "#64748b",
        },
      },
      fontFamily: {
        syne: ["var(--font-syne)", "sans-serif"],
        mono: ["var(--font-dm-mono)", "monospace"],
        bebas: ["var(--font-bebas)", "sans-serif"],
      },
      boxShadow: {
        "glow-sm": "0 0 15px rgba(0,245,255,0.15)",
        glow: "0 0 30px rgba(0,245,255,0.2)",
        "glow-lg": "0 0 60px rgba(0,245,255,0.25)",
        "glow-violet": "0 0 30px rgba(124,58,237,0.2)",
      },
      animation: {
        "pulse-glow": "pulseGlow 2s ease-in-out infinite",
        float: "float 6s ease-in-out infinite",
        "spin-slow": "spin 20s linear infinite",
        "bounce-gentle": "bounceGentle 2s ease-in-out infinite",
        shimmer: "shimmer 2s linear infinite",
        "cursor-blink": "cursorBlink 1s step-end infinite",
      },
      keyframes: {
        pulseGlow: {
          "0%, 100%": { boxShadow: "0 0 15px rgba(0,245,255,0.2)" },
          "50%": { boxShadow: "0 0 40px rgba(0,245,255,0.4)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        bounceGentle: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        cursorBlink: {
          "0%, 100%": { borderColor: "transparent" },
          "50%": { borderColor: "#00f5ff" },
        },
      },
    },
  },
  plugins: [],
};

export default config;