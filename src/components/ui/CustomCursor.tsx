"use client";
import { useEffect, useRef, useState } from "react";
import { lerp } from "@/lib/utils";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [hovering, setHovering] = useState(false);
  const [isTouch, setIsTouch] = useState(true);

  useEffect(() => {
    if ("ontouchstart" in window || navigator.maxTouchPoints > 0) return;
    setIsTouch(false);

    const dot = dotRef.current!;
    const ring = ringRef.current!;
    if (!dot || !ring) return;

    let mx = 0, my = 0, rx = 0, ry = 0;

    const onMove = (e: MouseEvent) => {
      mx = e.clientX; my = e.clientY;
      dot.style.transform = `translate(${mx - 4}px, ${my - 4}px)`;
    };

    const animate = () => {
      rx = lerp(rx, mx, 0.15);
      ry = lerp(ry, my, 0.15);
      ring.style.transform = `translate(${rx - 20}px, ${ry - 20}px)`;
      requestAnimationFrame(animate);
    };

    const onEnter = () => setHovering(true);
    const onLeave = () => setHovering(false);

    const addListeners = () => {
      document.querySelectorAll("a, button, [role='button'], input, textarea, select").forEach((el) => {
        el.addEventListener("mouseenter", onEnter);
        el.addEventListener("mouseleave", onLeave);
      });
    };

    window.addEventListener("mousemove", onMove);
    requestAnimationFrame(animate);
    addListeners();

    const observer = new MutationObserver(addListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => { window.removeEventListener("mousemove", onMove); observer.disconnect(); };
  }, []);

  if (isTouch) return null;

  return (
    <>
      <div ref={dotRef} className="fixed top-0 left-0 pointer-events-none z-[99999] rounded-full mix-blend-difference transition-[width,height] duration-200"
        style={{ width: hovering ? 16 : 8, height: hovering ? 16 : 8, background: "#00f5ff", marginLeft: hovering ? -4 : 0, marginTop: hovering ? -4 : 0 }} />
      <div ref={ringRef} className="fixed top-0 left-0 pointer-events-none z-[99998] rounded-full transition-[width,height,border-color] duration-300"
        style={{ width: hovering ? 60 : 40, height: hovering ? 60 : 40, border: `1.5px solid ${hovering ? "rgba(0,245,255,0.8)" : "rgba(0,245,255,0.4)"}`, marginLeft: hovering ? -10 : 0, marginTop: hovering ? -10 : 0 }} />
    </>
  );
}