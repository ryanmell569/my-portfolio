// src/components/Experience.jsx
import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

export default function Experience() {
  const meshRef = useRef();

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.4;
      meshRef.current.rotation.y += delta * 0.6;
    }
  });

  return (
    <group>
      <mesh ref={meshRef}>
        <torusKnotGeometry args={[1, 0.3, 128, 32]} />
        <meshStandardMaterial color="#10b981" roughness={0.3} metalness={0.8} wireframe={false} />
      </mesh>
    </group>
  );
}