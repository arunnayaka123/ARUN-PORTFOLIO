"use client";
import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useMousePosition } from "@/lib/hooks/useMousePosition";
import { useGPUTier } from "@/lib/hooks/useGPUTier";

const SKILLS = ["LangChain","LangGraph","RAG","PyTorch","TensorFlow","YOLO","Claude API","GPT-4o","LLaMA","CrewAI","Docker","AWS","Python","NLP","OpenCV","Transformers","HuggingFace","Prompt Eng","Vector DB","REST API"];

function SkillCloud() {
  const groupRef = useRef<THREE.Group>(null);
  const mouse = useMousePosition();

  const points = useMemo(() => {
    return SKILLS.map((_, i) => {
      const phi = Math.acos(-1 + (2 * i) / SKILLS.length);
      const theta = Math.sqrt(SKILLS.length * Math.PI) * phi;
      const r = 3;
      return new THREE.Vector3(
        r * Math.cos(theta) * Math.sin(phi),
        r * Math.sin(theta) * Math.sin(phi),
        r * Math.cos(phi)
      );
    });
  }, []);

  useFrame(() => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y += 0.003;
    groupRef.current.rotation.x += (mouse.normalizedY * 0.3 - groupRef.current.rotation.x) * 0.02;
  });

  return (
    <group ref={groupRef}>
      {points.map((pos, i) => (
        <mesh key={i} position={pos}>
          <sphereGeometry args={[0.06, 8, 8]} />
          <meshBasicMaterial color={i % 3 === 0 ? "#00f5ff" : i % 3 === 1 ? "#a855f7" : "#e2e8f0"} transparent opacity={0.8} />
        </mesh>
      ))}
      {points.map((pos, i) => (
        <mesh key={`glow-${i}`} position={pos}>
          <sphereGeometry args={[0.15, 8, 8]} />
          <meshBasicMaterial color={i % 3 === 0 ? "#00f5ff" : "#a855f7"} transparent opacity={0.1} />
        </mesh>
      ))}
    </group>
  );
}

export default function SkillSphere() {
  const gpu = useGPUTier();
  if (gpu === "low") return null;

  return (
    <Canvas camera={{ position: [0, 0, 8], fov: 50 }} dpr={[1, 1.5]} gl={{ antialias: true, alpha: true }} style={{ background: "transparent" }}>
      <ambientLight intensity={0.5} />
      <SkillCloud />
    </Canvas>
  );
}