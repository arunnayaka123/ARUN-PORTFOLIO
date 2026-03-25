"use client";
import { useState, useEffect } from "react";

export function useGPUTier(): "high" | "medium" | "low" {
  const [tier, setTier] = useState<"high" | "medium" | "low">("medium");

  useEffect(() => {
    const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
    const cores = navigator.hardwareConcurrency || 4;
    const mem = (navigator as any).deviceMemory || 8;
    const canvas = document.createElement("canvas");
    const gl = canvas.getContext("webgl");
    if (!gl) { setTier("low"); return; }
    const debug = gl.getExtension("WEBGL_debug_renderer_info");
    const renderer = debug ? gl.getParameter(debug.UNMASKED_RENDERER_WEBGL) : "";
    if (isMobile && (cores <= 4 || mem <= 4)) setTier("low");
    else if (/Intel|Mesa|SwiftShader/i.test(renderer) || isMobile) setTier("medium");
    else setTier("high");
  }, []);

  return tier;
}