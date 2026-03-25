"use client";
import { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { useMousePosition } from "@/lib/hooks/useMousePosition";
import { useGPUTier } from "@/lib/hooks/useGPUTier";

function Nodes({ count, konamiActive }: { count: number; konamiActive: boolean }) {
  const ref = useRef<THREE.Points>(null);
  const mouse = useMousePosition();
  const { viewport } = useThree();

  const [positions, velocities, originals] = useMemo(() => {
    const p = new Float32Array(count * 3);
    const v = new Float32Array(count * 3);
    const o = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * 20, y = (Math.random() - 0.5) * 14, z = (Math.random() - 0.5) * 10;
      p[i*3]=x; p[i*3+1]=y; p[i*3+2]=z;
      o[i*3]=x; o[i*3+1]=y; o[i*3+2]=z;
      v[i*3]=(Math.random()-0.5)*0.002; v[i*3+1]=(Math.random()-0.5)*0.002; v[i*3+2]=(Math.random()-0.5)*0.001;
    }
    return [p, v, o];
  }, [count]);

  const colors = useMemo(() => {
    const c = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const t = Math.random();
      c[i*3] = t * 0.486; c[i*3+1] = 0.961 + t * (-0.733); c[i*3+2] = 1 + t * (-0.071);
    }
    return c;
  }, [count]);

  useFrame((state) => {
    if (!ref.current) return;
    const attr = ref.current.geometry.attributes.position as THREE.BufferAttribute;
    const arr = attr.array as Float32Array;
    const mx = (mouse.normalizedX * viewport.width) / 2;
    const my = (mouse.normalizedY * viewport.height) / 2;

    for (let i = 0; i < count; i++) {
      const idx = i * 3;
      if (konamiActive) {
        const dx = arr[idx] || 0.01, dy = arr[idx+1] || 0.01, dz = arr[idx+2] || 0.01;
        const d = Math.sqrt(dx*dx+dy*dy+dz*dz) || 1;
        arr[idx]+=(dx/d)*0.3; arr[idx+1]+=(dy/d)*0.3; arr[idx+2]+=(dz/d)*0.15;
      } else {
        arr[idx]+=velocities[idx]; arr[idx+1]+=velocities[idx+1]; arr[idx+2]+=velocities[idx+2];
        const dx=arr[idx]-mx, dy=arr[idx+1]-my;
        const dist=Math.sqrt(dx*dx+dy*dy);
        if(dist<2&&dist>0){const f=(2-dist)*0.01;arr[idx]+=(dx/dist)*f;arr[idx+1]+=(dy/dist)*f;}
        arr[idx]+=(originals[idx]-arr[idx])*0.0005;
        arr[idx+1]+=(originals[idx+1]-arr[idx+1])*0.0005;
        arr[idx+2]+=(originals[idx+2]-arr[idx+2])*0.0005;
      }
    }
    attr.needsUpdate = true;
    ref.current.rotation.y = state.clock.elapsedTime * 0.02;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} count={count} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} count={count} />
      </bufferGeometry>
      <pointsMaterial size={0.04} vertexColors transparent opacity={0.6} sizeAttenuation depthWrite={false} blending={THREE.AdditiveBlending} />
    </points>
  );
}

export default function NeuralBackground({ konamiActive }: { konamiActive: boolean }) {
  const gpu = useGPUTier();
  const count = gpu === "high" ? 400 : gpu === "medium" ? 200 : 0;
  if (gpu === "low") return <div className="w-full h-full bg-gradient-to-br from-neural-base to-neural-obsidian" />;

  return (
    <Canvas camera={{ position: [0, 0, 8], fov: 60 }} dpr={[1, 1.5]}
      gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }} style={{ background: "transparent" }}>
      <Nodes count={count} konamiActive={konamiActive} />
    </Canvas>
  );
}