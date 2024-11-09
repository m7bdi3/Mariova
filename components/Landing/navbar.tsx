import React, { useRef, useMemo, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface BubbleProps {
  position: [number, number, number];
  scale: number;
  index: number;
}

const Bubble: React.FC<BubbleProps> = ({ position, scale, index }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const { mouse } = useThree();
  const initialPosition = useMemo(
    () => new THREE.Vector3(...position),
    [position]
  );
  const noise = useMemo(
    () => new THREE.Vector3(Math.random(), Math.random(), Math.random()),
    []
  );

  useFrame((state, delta) => {
    if (!meshRef.current) return;

    // Mouse interaction
    const mouseInfluence = 2;
    const target = initialPosition
      .clone()
      .add(
        new THREE.Vector3(
          (mouse.x * mouseInfluence) / (index + 1),
          (mouse.y * mouseInfluence) / (index + 1),
          0
        )
      );

    // Subtle floating motion
    const time = state.clock.getElapsedTime();
    target.add(
      new THREE.Vector3(
        Math.sin(time * 0.5 + noise.x * 10) * 0.02,
        Math.cos(time * 0.5 + noise.y * 10) * 0.02,
        Math.sin(time * 0.5 + noise.z * 10) * 0.02
      )
    );

    meshRef.current.position.lerp(target, delta * 2);

    // Subtle scale pulsing
    const pulseFactor = 1 + Math.sin(time * 2 + index) * 0.03;
    meshRef.current.scale.setScalar(scale * pulseFactor);
  });

  return (
    <mesh ref={meshRef} position={position} scale={scale}>
      <sphereGeometry args={[1, 32, 32]} />
      <meshPhysicalMaterial
        color="#B17440"
        transparent
        transmission={0.2}
        opacity={0.3}
        roughness={0.1}
        metalness={0.1}
        clearcoat={1}
        clearcoatRoughness={0.1}
        ior={1.5}
        thickness={0.5}
        envMapIntensity={1}
      />
    </mesh>
  );
};

const BubbleField: React.FC = () => {
  const groupRef = useRef<THREE.Group>(null);

  const bubbles = useMemo(() => {
    return Array.from({ length: 40 }, (_, i) => ({
      position: [
        THREE.MathUtils.randFloatSpread(10),
        THREE.MathUtils.randFloatSpread(15),
        THREE.MathUtils.randFloatSpread(-25),
      ] as [number, number, number],
      scale: THREE.MathUtils.randFloat(0.4, 0.6),
      index: i,
    }));
  }, []);

  useEffect(() => {
    if (!groupRef.current) return;

    gsap.fromTo(
      groupRef.current.scale,
      { x: 0, y: 0, z: 0 },
      {
        x: 1,
        y: 1,
        z: 1,
        ease: "elastic.out(1, 0.5)",
        duration: 2.5,
        delay: 0.5,
      }
    );
  }, []);

  return (
    <group ref={groupRef} scale={0}>
      {bubbles.map((props, i) => (
        <Bubble key={i} {...props} />
      ))}
    </group>
  );
};

export const Bubbles: React.FC = () => {
  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <Float rotationIntensity={0.2} floatIntensity={0.5} speed={1.5}>
        <BubbleField />
      </Float>
    </>
  );
};
