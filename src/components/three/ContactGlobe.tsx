"use client";
import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Sphere, Float } from "@react-three/drei";
import * as THREE from "three";
import { useGPUTier } from "@/lib/hooks/useGPUTier";

function GlobeWithPin() {
  const globeRef = useRef<THREE.Group>(null);
  const pinRef = useRef<THREE.Mesh>(null);

  const lat = 17.38 * (Math.PI / 180);
  const lon = 78.49 * (Math.PI / 180);
  const r = 2.05;
  const pinPos: [number, number, number] = [r*Math.cos(lat)*Math.sin(lon), r*Math.sin(lat), r*Math.cos(lat)*Math.cos(lon)];

  useFrame((state) => {
    if (globeRef.current) globeRef.current.rotation.y += 0.002;
    if (pinRef.current) pinRef.current.scale.setScalar(1 + Math.sin(state.clock.elapsedTime * 3) * 0.3);
  });

  return (
    <Float speed={1} rotationIntensity={0.1} floatIntensity={0.3}>
      <group ref={globeRef}>
        <Sphere args={[2, 24, 24]}><meshBasicMaterial color="#00f5ff" wireframe transparent opacity={0.1} /></Sphere>
        <Sphere args={[1.98, 32, 32]}><meshBasicMaterial color="#0a0e17" transparent opacity={0.8} /></Sphere>
        <mesh ref={pinRef} position={pinPos}><sphereGeometry args={[0.06, 8, 8]} /><meshBasicMaterial color="#f59e0b" /></mesh>
        <mesh position={pinPos}><sphereGeometry args={[0.15, 8, 8]} /><meshBasicMaterial color="#f59e0b" transparent opacity={0.2} /></mesh>
      </group>
    </Float>
  );
}

export default function ContactGlobe() {
  const gpu = useGPUTier();
  if (gpu === "low") return <div className="w-full h-64 flex items-center justify-center"><div className="w-32 h-32 rounded-full border border-accent-cyan/20 flex items-center justify-center"><span className="text-2xl">🌏</span></div></div>;

  return (
    <Canvas camera={{ position: [0, 0, 5.5], fov: 45 }} dpr={[1, 1.5]} gl={{ antialias: true, alpha: true }} style={{ background: "transparent" }}>
      <ambientLight intensity={0.5} />
      <GlobeWithPin />
    </Canvas>
  );
}