'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

function FloatingSphere({ position, scale, speed, distort, color }: {
  position: [number, number, number];
  scale: number;
  speed: number;
  distort: number;
  color: string;
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x = state.clock.elapsedTime * speed * 0.3;
    meshRef.current.rotation.y = state.clock.elapsedTime * speed * 0.2;
  });

  return (
    <Float speed={speed} rotationIntensity={0.4} floatIntensity={0.6}>
      <mesh ref={meshRef} position={position} scale={scale}>
        <icosahedronGeometry args={[1, 4]} />
        <MeshDistortMaterial
          color={color}
          transparent
          opacity={0.12}
          distort={distort}
          speed={speed * 0.5}
          roughness={0.8}
          metalness={0.2}
        />
      </mesh>
    </Float>
  );
}

function ParticleField() {
  const count = 120;
  const meshRef = useRef<THREE.Points>(null);

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 16;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 16;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 8;
    }
    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    return geo;
  }, []);

  useFrame((state) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.y = state.clock.elapsedTime * 0.02;
    meshRef.current.rotation.x = state.clock.elapsedTime * 0.01;
  });

  return (
    <points ref={meshRef} geometry={geometry}>
      <pointsMaterial
        color="#00b4d8"
        size={0.04}
        transparent
        opacity={0.4}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

function WireframeGlobe() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.y = state.clock.elapsedTime * 0.05;
    meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.03) * 0.1;
  });

  return (
    <mesh ref={meshRef} position={[4, 0, -3]} scale={2.2}>
      <icosahedronGeometry args={[1, 2]} />
      <meshBasicMaterial
        color="#00b4d8"
        wireframe
        transparent
        opacity={0.06}
      />
    </mesh>
  );
}

export default function Scene3D() {
  return (
    <div className="absolute inset-0 z-0" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 60 }}
        dpr={[1, 1.5]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.3} />
        <directionalLight position={[5, 5, 5]} intensity={0.2} />

        {/* Main floating spheres */}
        <FloatingSphere
          position={[-3.5, 1.5, -2]}
          scale={1.8}
          speed={1.2}
          distort={0.4}
          color="#00b4d8"
        />
        <FloatingSphere
          position={[4, -1.5, -3]}
          scale={1.2}
          speed={0.8}
          distort={0.3}
          color="#0096b7"
        />
        <FloatingSphere
          position={[-1, -2.5, -1]}
          scale={0.7}
          speed={1.5}
          distort={0.5}
          color="#00b4d8"
        />
        <FloatingSphere
          position={[2, 2.5, -2]}
          scale={0.5}
          speed={2}
          distort={0.6}
          color="#33c5e1"
        />

        {/* Wireframe globe */}
        <WireframeGlobe />

        {/* Particle field */}
        <ParticleField />
      </Canvas>
    </div>
  );
}
