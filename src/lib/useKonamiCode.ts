"use client";
import { useState, useEffect, useCallback } from "react";

const KONAMI = ["ArrowUp","ArrowUp","ArrowDown","ArrowDown","ArrowLeft","ArrowRight","ArrowLeft","ArrowRight","KeyB","KeyA"];

export function useKonamiCode(): boolean {
  const [active, setActive] = useState(false);
  const [index, setIndex] = useState(0);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (active) return;
    if (e.code === KONAMI[index]) {
      const next = index + 1;
      if (next === KONAMI.length) {
        setActive(true);
        setIndex(0);
        setTimeout(() => setActive(false), 5000);
      } else {
        setIndex(next);
      }
    } else {
      setIndex(0);
    }
  }, [index, active]);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  return active;
}