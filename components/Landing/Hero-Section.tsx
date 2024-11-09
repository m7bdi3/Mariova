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
      className="min-h-screen h-dvh w-full relative overflow-hidden mx-auto"
      id="hero-section"
    >
      {[...Array(20)].map((_, i) => (
        <span
          key={i}
          className="absolute h-[3000px] w-[calc(100vw/60)] opacity-10 bg-[#B17457] bg-line "
          style={{
            right: i < 10 ? `${i * 5}%` : "auto",
            left: i >= 10 ? `${(i - 10) * 5}%` : "auto",
          }}
        />
      ))}
      <span className="absolute w-[calc(100vw/60)] h-[3000px] opacity-20 left-[50%] -translate-x-1/2 bg-[#B17457] bg-line" />
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          padding: 40,
          display: "inline-flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "flex-start",
          pointerEvents: "none",
        }}
      >
        <div
          style={{
            width: "100%",
            padding: 0,
            display: "inline-flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <p
            style={{
              fontFamily: "'Antonio', sans-serif",
              flex: "1 1 0%",
              height: 30,
              fontSize: 40,
              fontWeight: "700",
              lineHeight: "30px",
              letterSpacing: -2,
            }}
            ref={titleRef}
            className="text-[#B17457] opacity-0"
          >
            MARIOVA
          </p>
          <div style={{ flex: "1 1 0%", display: "flex", gap: "2em" }}></div>
          <p
            style={{
              flex: "1 1 0%",
              height: 30,
              fontSize: 30,
              lineHeight: "30px",
              textAlign: "right",
              color: "#B17457",
            }}
          >
            ✧
          </p>
        </div>
        <div
          style={{
            width: "100%",
            padding: 0,
            display: "inline-flex",
            flexDirection: "row",
            alignItems: "flex-start",
            justifyContent: "center",
            marginTop: "20px",
          }}
        >
          <p
            style={{
              flex: "1 1 0%",
              height: "100%",
              fontSize: 14,
              lineHeight: "1.5em",
              color: "#272829",
            }}
          >
            <b>Natural Ingredients</b>
            <br />
            Radiant Skin
            <br />
            <b>—</b>
          </p>
          <p
            style={{
              transform: "rotate3d(0, 0, 1, 90deg) translate3d(100%,10px,0)",
              transformOrigin: "right",
              fontSize: 18,
              fontWeight: "700",
              lineHeight: "100%",
              textAlign: "right",
              color: "#272829",
              whiteSpace: "nowrap",
            }}
          >
            EXPLORE PRODUCTS &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ○
          </p>
        </div>
        <div
          className="full"
          style={{
            fontFamily: "'Antonio', sans-serif",
            width: "100%",
            flex: "1 1 0%",
            padding: 0,
            display: "inline-flex",
            flexDirection: "row",
            alignItems: "flex-end",
            justifyContent: "center",
          }}
        >
          <p
            style={{
              flex: "1 1 0%",
              fontSize: 220,
              lineHeight: "200px",
              writingMode: "vertical-lr",
              color: "#B17457",
              margin: "0",
              letterSpacing: -10,
            }}
            ref={glowTextRef}
          ></p>
          <div style={{ width: 10 }} />
          <p
            style={{
              flex: "1 1 0%",
              fontSize: 120,
              lineHeight: "100%",
              textAlign: "right",
              color: "#272829",
              margin: 0,
              letterSpacing: -2,
            }}
            ref={timeTextRef}
          ></p>
        </div>
        <div style={{ height: 60 }} />
        <div
          style={{
            pointerEvents: "all",
            width: "100%",
            padding: 0,
            display: "inline-flex",
            flexDirection: "row",
            alignItems: "flex-end",
            justifyContent: "center",
          }}
        >
          <p
            className="full"
            style={{
              whiteSpace: "nowrap",
              flex: "1 1 0%",
              fontSize: 16,
              lineHeight: "1.5em",
              color: "#272829",
            }}
          >
            <b>Dermatologist Approved</b>
            <br />
            Clinically Tested
          </p>
          <p
            className="full"
            style={{
              fontFamily: "'Antonio', sans-serif",
              flex: "1 1 0%",
              fontSize: 20,
              fontWeight: "700",
              lineHeight: "1em",
              textAlign: "center",
              color: "#272829",
              letterSpacing: -0.5,
              whiteSpace: "nowrap",
            }}
          >
            Reveal Your Natural Beauty
          </p>
          <p
            className="full"
            style={{
              flex: "1 1 0%",
              fontSize: 12,
              lineHeight: "1em",
              textAlign: "right",
              color: "#272829",
            }}
          ></p>
        </div>
      </div>
      <div
        className="w-full h-full opacity-0 z-10 absolute top-0 left-0"
        id="canvasRef"
        ref={canvasRef}
      >
        <View
          className="flex h-full w-full flex-col items-center justify-center"
          orbit={false}
        >
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
