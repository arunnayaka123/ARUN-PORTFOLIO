"use client";
import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";
import { useMousePosition } from "@/lib/hooks/useMousePosition";
import { useGPUTier } from "@/lib/hooks/useGPUTier";

function Icosahedron() {
  const ref = useRef<THREE.Mesh>(null);
  const mouse = useMousePosition();

  useFrame(() => {
    if (!ref.current) return;
    ref.current.rotation.y += 0.003;
    ref.current.rotation.x += 0.001;
    ref.current.rotation.x += (mouse.normalizedY * 0.26 - ref.current.rotation.x) * 0.02;
    ref.current.rotation.z += (mouse.normalizedX * 0.26 - ref.current.rotation.z) * 0.02;
  });

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
      <mesh ref={ref}>
        <icosahedronGeometry args={[2, 1]} />
        <meshBasicMaterial color="#00f5ff" wireframe transparent opacity={0.25} />
      </mesh>
      <mesh>
        <sphereGeometry args={[1.5, 16, 16]} />
        <meshBasicMaterial color="#7c3aed" transparent opacity={0.04} side={THREE.BackSide} />
      </mesh>
    </Float>
  );
}

export default function HeroIcosahedron() {
  const gpu = useGPUTier();
  if (gpu === "low") return <div className="w-full h-full flex items-center justify-center"><div className="w-48 h-48 border border-accent-cyan/20 rounded-full animate-spin-slow" /></div>;

  return (
    <Canvas camera={{ position: [0, 0, 6], fov: 50 }} dpr={[1, 1.5]} gl={{ antialias: true, alpha: true }} style={{ background: "transparent" }}>
      <ambientLight intensity={0.3} />
      <Icosahedron />
    </Canvas>
  );
}