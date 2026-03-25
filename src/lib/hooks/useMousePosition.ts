"use client";
import { useState, useEffect } from "react";

export function useMousePosition() {
  const [pos, setPos] = useState({ x: 0, y: 0, normalizedX: 0, normalizedY: 0 });

  useEffect(() => {
    let mx = 0, my = 0;
    const onMove = (e: MouseEvent) => { mx = e.clientX; my = e.clientY; };
    const update = () => {
      setPos({
        x: mx, y: my,
        normalizedX: typeof window !== "undefined" ? (mx / window.innerWidth) * 2 - 1 : 0,
        normalizedY: typeof window !== "undefined" ? -(my / window.innerHeight) * 2 + 1 : 0,
      });
      requestAnimationFrame(update);
    };
    window.addEventListener("mousemove", onMove);
    const id = requestAnimationFrame(update);
    return () => { window.removeEventListener("mousemove", onMove); cancelAnimationFrame(id); };
  }, []);

  return pos;
}