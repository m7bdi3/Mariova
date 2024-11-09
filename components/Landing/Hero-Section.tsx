"use client";

import React, { useRef, Suspense } from "react";
import dynamic from "next/dynamic";
import { useFrame, useThree } from "@react-three/fiber";
import { Gltf, PerspectiveCamera, useGLTF } from "@react-three/drei";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Bubbles } from "./navbar";
import TextPlugin from "gsap/TextPlugin";
import * as THREE from "three";

useGLTF.preload("/bottle.glb");

const View = dynamic(
  () => import("@/lib/components/canvas/View").then((mod) => mod.View),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-96 w-full flex-col items-center justify-center">
        <svg
          className="-ml-1 mr-3 h-5 w-5 animate-spin text-#272829"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 0 1 8-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 0 1 4 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      </div>
    ),
  }
);
const Common = dynamic(
  () => import("@/lib/components/canvas/View").then((mod) => mod.Common),
  { ssr: false }
);

gsap.registerPlugin(ScrollTrigger, TextPlugin, useGSAP);

function Model() {
  const modelRef = useRef<THREE.Group>(null!);
  const { viewport } = useThree();

  const calculateScale = () =>
    Math.min((35 * viewport.width) / viewport.height, 20);

  useGSAP(
    () => {
      if (!modelRef.current) return;

      gsap.fromTo(
        modelRef.current.scale,
        { x: 0, y: 0, z: 0 },
        {
          x: calculateScale(),
          y: calculateScale(),
          z: calculateScale(),
          ease: "power3.out",
          duration: 2,
          delay: 1.5,
        }
      );
      gsap.fromTo(
        modelRef.current.position,
        { x: 0, y: 5, z: 0 },
        {
          x: 0,
          y: -0,
          z: 0,
          ease: "power3.out",
          duration: 2,
          delay: 1,
        }
      );
    },
    { scope: "#hero-section" }
  );

  useFrame(() => {
    if (!modelRef.current) return;
    modelRef.current.rotation.y -= 0.005;
  });

  return (
    <group rotation={[0, 0, 0]}>
      <fog attach="fog" args={["#fff", 5, 0]} />
      <Gltf src={"/bottle-1.glb"} ref={modelRef} receiveShadow />
    </group>
  );
}

export function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLParagraphElement>(null);

  const canvasRef = useRef<HTMLDivElement>(null);
  const glowTextRef = useRef<HTMLParagraphElement>(null);
  const timeTextRef = useRef<HTMLParagraphElement>(null);
  const glowTexts = ["SHINE", "GLEAM"];
  const timeTexts = ["ALWAYS", "FOREVER"];

  useGSAP(
    () => {
      if (
        heroRef.current &&
        canvasRef.current &&
        glowTextRef.current &&
        timeTextRef.current
      ) {
        gsap.set(glowTextRef.current, {
          text: "GLOW",
          ease: "power3.inOut",
          duration: 2,
        });
        gsap.set(timeTextRef.current, {
          text: "24/7",
          ease: "power3.inOut",
          duration: 2,
        });

        gsap.fromTo(
          titleRef.current,
          { opacity: 0, y: -150 },
          { opacity: 1, y: 0, duration: 2, ease: "sin" }
        );

        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top top",
            end: "+=200%",
            pin: true,
            scrub: 1,
          },
        });

        timeline.fromTo(
          canvasRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 1, ease: "power2.out" }
        );

        const glowTimeline = gsap.timeline();
        const timeTimeline = gsap.timeline();

        glowTexts.forEach((text) => {
          glowTimeline.to(glowTextRef.current, {
            duration: 1,
            text: { value: text, delimiter: "" },
            ease: "power2.inOut",
          });
        });

        timeTexts.forEach((text) => {
          timeTimeline.to(timeTextRef.current, {
            duration: 1,
            text: { value: text, delimiter: "" },
            ease: "power2.inOut",
          });
        });

        timeline.add(glowTimeline, 0);
        timeline.add(timeTimeline, 0);

        gsap.utils.toArray<HTMLElement>(".bg-line").forEach((line, i) => {
          const speed = 1 + i * 0.1;
          gsap.to(line, {
            yPercent: 50 * speed,
            ease: "none",
            scrollTrigger: {
              trigger: heroRef.current,
              start: "top top",
              end: "bottom top",
              scrub: true,
            },
          });
        });
      }
    },
    { scope: heroRef }
  );

  return (
    <div
      ref={heroRef}
      className="min-h-dvh h-dvh w-full relative overflow-hidden mx-auto"
      id="hero-section"
    >
      {[...Array(20)].map((_, i) => (
        <span
          key={i}
          className="absolute h-[3000px] w-[calc(100vw/60)] opacity-10 bg-[#B17457] bg-line"
          style={{
            right: i < 10 ? `${i * 5}%` : "auto",
            left: i >= 10 ? `${(i - 10) * 5}%` : "auto",
          }}
        />
      ))}
      <span className="absolute w-[calc(100vw/60)] h-[3000px] opacity-20 left-[50%] -translate-x-1/2 bg-[#B17457] bg-line" />
      <div className="absolute top-0 left-0 w-full h-full p-4 flex flex-col items-start justify-start pointer-events-none">
        <div className="w-full p-0 m-0 flex items-center justify-between">
          <p
            ref={titleRef}
            className="font-['Antonio',sans-serif] text-4xl font-bold tracking-tighter text-[#B17457] opacity-0 flex-grow"
          >
            MARIOVA
          </p>
          <p className="text-3xl text-[#B17457]">✧</p>
        </div>
        <div className="w-full p-0 flex items-start justify-between mt-5 ">
          <p className="text-sm leading-relaxed text-[#272829]">
            <b>Natural Ingredients</b>
            <br />
            Radiant Skin
            <br />
            <b>—</b>
          </p>
          <p
            className="text-lg font-bold text-[#272829] whitespace-nowrap"
            style={{
              writingMode: "vertical-lr",
            }}
          >
            EXPLORE PRODUCTS &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ○
          </p>
        </div>
        <div className="w-full h-full absolute top-0 left-0 font-['Antonio',_sans-serif]">
          <p
            ref={glowTextRef}
            className="absolute top-[20%]  md:top-[15%] left-[-10%] md:left-[1%] text-[10rem] md:text-[12rem] xl:text-[14rem] text-[#B17457] tracking-tighter"
            style={{
              writingMode: "vertical-lr",
            }}
          />
          <p
            ref={timeTextRef}
            className="absolute bottom-[10%] right-0 md:right-[3%] text-[2rem] md:text-[8rem] xl:text-[10rem] text-[#272829] pr-4 md:pr-0"
          />
        </div>
        <div className="absolute w-full h-fit bottom-0 left-0 font-['Antonio',_sans-serif]  ">
          <p className="absolute bottom-0 left-0 p-4 text-sm whitespace-nowrap">
            <b>Dermatologist Approved</b>
            <br />
            Clinically Tested
          </p>
          <p className="absolute bottom-0 md:left-1/2 md:-translate-x-1/2 m-0 right-0 pb-4 pr-4 md:pr-0 text-sm md:text-2xl font-bold w-fit font-['Antonio',sans-serif] self-center">
            Reveal Your Natural Beauty
          </p>
        </div>
      </div>
      <div
        ref={canvasRef}
        className="md:w-full md:h-full h-[400px] w-[200px] opacity-0 -z-50 absolute top-1/2 -translate-y-1/2 md:bottom-0 md:left-0 right-0   "
      >
        <View className="flex h-full w-full flex-col items-center justify-center">
          <Suspense fallback={null}>
            <PerspectiveCamera
              position={[0, 0, 20]}
              fov={32.5}
              near={1}
              far={100}
            />
            <Model />
            <Bubbles />
            <Common color="" />
          </Suspense>
        </View>
      </div>
    </div>
  );
}
