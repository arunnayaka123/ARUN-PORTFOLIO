import type { Metadata, Viewport } from "next";
import { Syne, DM_Mono, Bebas_Neue } from "next/font/google";
import "./globals.css";

const syne = Syne({ subsets: ["latin"], variable: "--font-syne", display: "swap" });
const dmMono = DM_Mono({ subsets: ["latin"], weight: ["300", "400", "500"], variable: "--font-dm-mono", display: "swap" });
const bebas = Bebas_Neue({ subsets: ["latin"], weight: "400", variable: "--font-bebas", display: "swap" });

export const viewport: Viewport = { themeColor: "#020408", width: "device-width", initialScale: 1 };

export const metadata: Metadata = {
  title: "Arun Nayak — AI Engineer | LLM Systems Architect",
  description: "Portfolio of Arun Nayak — AI Engineer specializing in LLMs, agentic AI systems, multimodal pipelines.",
  keywords: ["AI Engineer", "LLM", "Agentic AI", "Machine Learning", "LangChain", "Portfolio", "Arun Nayak"],
  authors: [{ name: "Arun Nayak" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://arunnayak.dev",
    title: "Arun Nayak — AI Engineer | Neural Architect",
    description: "Building the reasoning layer between humans and machines.",
    siteName: "Arun Nayak Portfolio",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Arun Nayak Portfolio" }],
  },
  icons: { icon: "/favicon.svg" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${syne.variable} ${dmMono.variable} ${bebas.variable}`}>
      <body className="bg-neural-base text-text-primary antialiased overflow-x-hidden">
        <a href="#main-content" className="skip-to-content">Skip to main content</a>
        {children}
      </body>
    </html>
  );
}