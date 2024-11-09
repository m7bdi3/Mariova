"use client";

import { Canvas } from "@react-three/fiber";
import { Preload } from "@react-three/drei";
import { r3f } from "@/lib/helpers/global";
import * as THREE from "three";
export default function Scene({ ...props }) {
  return (
    <Canvas
      {...props}
      onCreated={(state) => {
        state.gl.toneMapping = THREE.AgXToneMapping;
        state.gl.outputColorSpace = THREE.SRGBColorSpace;
      }}
      gl={{
        powerPreference: "high-performance",
      }}
      shadows
      dpr={[1, 2]}
    >
      <r3f.Out />
      <Preload all />
    </Canvas>
  );
}
