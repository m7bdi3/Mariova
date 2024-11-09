"use client";

import React, { useRef, Suspense } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { Gltf, useGLTF } from "@react-three/drei";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TextPlugin } from "gsap/TextPlugin";
import { ArrowRight } from "lucide-react";
import dynamic from "next/dynamic";

useGLTF.preload("/bottle-1.glb");

const View = dynamic(
  () => import("@/lib/components/canvas/View").then((mod) => mod.View),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-96 w-full flex-col items-center justify-center">
        <svg
          className="-ml-1 mr-3 h-5 w-5 animate-spin text-black"
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

  useGSAP(
    () => {
      if (!modelRef.current) return;

      gsap.fromTo(
        modelRef.current.scale,
        { x: 0, y: 0, z: 0 },
        {
          x: 35,
          y: 35,
          z: 35,
          ease: "power3.out",
          duration: 2,
          delay: 2,
        }
      );
    },
    { scope: "#about-section" }
  );

  useFrame(() => {
    if (!modelRef.current) return;
    modelRef.current.rotation.y += 0.005;
  });

  return (
    <Gltf
      src={"/bottle-1.glb"}
      ref={modelRef}
      position={[0, 0.1, -5]}
      scale={0}
    />
  );
}

export function AboutSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLSpanElement>(null);
  const lineRef = useRef<HTMLSpanElement>(null);
  const lineRef2 = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      if (
        sectionRef.current &&
        titleRef.current &&
        textRef.current &&
        listRef.current &&
        lineRef.current &&
        lineRef2.current
      ) {
        gsap.fromTo(
          bgRef.current,
          { height: 0 },
          {
            height: "100%",
            duration: 1,
            scrollTrigger: {
              trigger: sectionRef.current,
              scrub: 1,
            },
          }
        );
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "+=2000",
            pin: true,
            scrub: 1,
          },
        });

        tl.fromTo(
          titleRef.current,
          { opacity: 0, y: -30 },
          { opacity: 1, y: 0, duration: 1 }
        );

        tl.fromTo(
          [lineRef.current, lineRef2.current],
          { width: 0 },
          { width: "100%", duration: 1 }
        );

        const textLines = textRef.current.querySelectorAll("p");
        tl.fromTo(
          textLines[0],
          { opacity: 0 },
          {
            opacity: 1,
            duration: 2,
            text: "BIO PEEL's revolutionary formula harnesses cutting-edge biotechnology to deliver unparalleled skin rejuvenation. Our proprietary blend of active ingredients works at the cellular level, stimulating natural regeneration processes.",
          }
        );

        tl.fromTo(
          textLines[1],
          { opacity: 0 },
          {
            opacity: 1,
            duration: 2,
            text: "Through years of research and development, we've perfected a gentle yet powerful exfoliation method that removes dead skin cells while promoting the growth of healthy new ones. The result is a radiant, youthful complexion that speaks volumes about the science behind our product.",
          },
          "+=0.5"
        );
        tl.fromTo(
          canvasRef.current,
          { opacity: 0, scale: 0.6 },
          {
            opacity: 1,
            scale: 1,
            duration: 3,
          },
          "+=3"
        );
        const listItems = Array.from(listRef.current.querySelectorAll("span"));
        listItems.forEach((span, index) => {
          const arrow = span.querySelector(".arrow");
          const listItem = span.querySelector("li");

          tl.fromTo(
            arrow,
            { opacity: 0 },
            { opacity: 1, duration: 0.4 },
            `+=${index * 0.5}`
          ).fromTo(
            listItem,
            { opacity: 0 },
            { opacity: 1, duration: 1 },
            `+=0.3`
          );
        });
      }
    },
    { scope: sectionRef }
  );

  return (
    <div
      ref={sectionRef}
      id="about-section"
      className="relative min-h-screen flex items-center justify-center w-full pb-16"
    >
      <div className="h-full">
        <div className="w-screen py-16 relative">
          <span
            className="absolute left-0 top-0 bg-[#B17457] w-full h-full"
            ref={bgRef}
          />
          <h2
            ref={titleRef}
            className="text-5xl font-bold uppercase tracking-tighter text-center sm:text-6xl xl:text-9xl opacity-0 text-[#FAF7F0]"
          >
            The Science Behind <br />
            <span className="flex items-center justify-center w-full gap-8">
              <span
                className="w-full h-1 bg-[#D8D2C2] rounded-md"
                ref={lineRef}
              />
              <span className="italic w-full text-nowrap">BIO PEEL</span>
              <span
                className="w-full h-1 bg-[#D8D2C2] rounded-md"
                ref={lineRef2}
              />
            </span>
          </h2>
        </div>

        <div className="container mx-auto items-center justify-start h-full w-full flex flex-col">
          <div
            ref={textRef}
            className="text-xl my-12 items-center justify-center w-full flex flex-col lg:max-w-[75%] px-8 mx-auto font-semibold font-mono space-y-2 text-justify "
          >
            <p></p>
            <p></p>
          </div>
          <div className="w-full h-[350px]">
            <div
              ref={listRef}
              className="flex items-center justify-center w-full h-full list-none"
            >
              <div
                className="h-full w-[300px] relative flex items-center justify-center opacity-0"
                id="bgRef"
                ref={canvasRef}
              >
                <View className="h-full w-full" orbit={false}>
                  <Suspense fallback={null}>
                    <Model />
                    <Common color="" />
                  </Suspense>
                </View>
              </div>
              <div className="flex flex-col relative h-full justify-center items-start gap-6">
                <span className="flex items-center gap-2 justify-start">
                  <ArrowRight className="size-6 arrow" />
                  <li className="text-xl font-semibold text-nowrap font-mono">
                    Cell rejuvenation technology
                  </li>
                </span>
                <span className="flex items-center gap-2 justify-start font-mono">
                  <ArrowRight className="size-6 arrow" />
                  <li className="text-xl font-semibold text-nowrap">
                    Enhanced collagen production
                  </li>
                </span>
                <span className="flex items-center gap-2 justify-start font-mono">
                  <ArrowRight className="size-6 arrow" />
                  <li className="text-xl font-semibold text-nowrap">
                    Scientifically optimized ingredients
                  </li>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
