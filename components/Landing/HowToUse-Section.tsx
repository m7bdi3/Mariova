"use client";

import React, { useRef, Suspense } from "react";
import Image from "next/image";
import { useFrame } from "@react-three/fiber";
import { Gltf, PerspectiveCamera, useGLTF } from "@react-three/drei";
import { Group } from "three";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

import { ScrollTrigger } from "gsap/ScrollTrigger";
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
gsap.registerPlugin(ScrollTrigger, useGSAP);

function MainRotatingModel() {
  const modelRef = useRef<Group>(null);

  useGSAP(
    () => {
      if (!modelRef.current) return;

      gsap.timeline({
        scrollTrigger: {
          trigger: `#howSection`,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });
    },
    {
      scope: "#howSection",
    }
  );

  useFrame(() => {
    if (modelRef.current) {
      modelRef.current.rotation.y += 0.005;
    }
  });

  return (
    <group dispose={null}>
      <Gltf src={"/bottle-1.glb"} ref={modelRef} scale={15} castShadow />
    </group>
  );
}

interface Step {
  number: number;
  title: string;
  description: string;
  icon: string;
}

const steps: Step[] = [
  {
    number: 1,
    title: "Cleanse",
    description:
      "Start with a clean canvas. Gently cleanse your face and pat dry to prepare for BIO PEEL.",
    icon: "/wash.svg",
  },
  {
    number: 2,
    title: "Apply",
    description:
      "Apply a thin layer of BIO PEEL over your face, avoiding the eye area. Use upward motions to encourage absorption.",
    icon: "/apply.svg",
  },
  {
    number: 3,
    title: "Wait",
    description:
      "Allow BIO PEEL to fully absorb into your skin. Leave it on for up to 15 minutes for optimal results.",
    icon: "/timer.svg",
  },
  {
    number: 4,
    title: "Rinse",
    description:
      "Rinse with lukewarm water and pat dry. Your skin should feel refreshed, smooth, and rejuvenated.",
    icon: "/rinse.svg",
  },
];

const StepCard: React.FC<{ step: Step }> = ({ step }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (cardRef.current) {
        gsap.fromTo(
          cardRef.current,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            scrollTrigger: {
              trigger: cardRef.current,
              start: "top bottom-=100px",
              end: "bottom center",
            },
          }
        );
      }
    },
    { scope: cardRef }
  );

  return (
    <div
      ref={cardRef}
      className="rounded-lg shadow-lg relative transform transition-all hover:scale-105 overflow-hidden"
    >
      <div className="bg-[#B17457] p-4 flex  items-center justify-center relative h-48 ">
        <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 relative z-10">
          <Image
            src={step.icon}
            alt={step.title}
            fill
            className="object-contain hover:scale-125"
          />
        </div>
        <div className="absolute left-1/2 bottom-1/2 w-32 h-16 bg-[#B17457] transform -translate-x-1/2 translate-y-1/2">
          <div className="absolute inset-0 bg-neutral-800 rounded-t-full transform scale-[1.15]" />
        </div>
        <span className="absolute top-0 left-0 w-full text-center text-[#FAF7F0] text-[0.7vw] sm:text-[1vw] md:text-[0.8vw] lg:text-[0.7vw] font-bold whitespace-nowrap opacity-10 overflow-hidden">
          {"BIO PEEL - ".repeat(20)}
        </span>
        <span className="absolute bottom-0 left-0 w-full text-center text-[#FAF7F0] text-[0.7vw] sm:text-[1vw] md:text-[0.8vw] lg:text-[0.7vw] font-bold whitespace-nowrap opacity-10 overflow-hidden">
          {"BIO PEEL - ".repeat(20)}
        </span>
        <span
          className="absolute top-0 right-0 h-full text-[#FAF7F0] text-[0.7vw] sm:text-[1vw] md:text-[0.8vw] lg:text-[0.7vw] font-bold whitespace-nowrap opacity-10 overflow-hidden"
          style={{ writingMode: "vertical-lr" }}
        >
          {"BIO PEEL - ".repeat(20)}
        </span>
        <span
          className="absolute top-0 left-0 h-full text-[#FAF7F0] text-[0.7vw] sm:text-[1vw] md:text-[0.8vw] lg:text-[0.7vw] font-bold whitespace-nowrap opacity-10 overflow-hidden"
          style={{ writingMode: "vertical-lr" }}
        >
          {"BIO PEEL - ".repeat(20)}
        </span>
      </div>
      <div className="p-4 rounded-b-lg bg-neutral-800 h-[50%]">
        <h3 className="text-lg sm:text-xl font-bold text-[#FAF7F0]">
          {step.title}
        </h3>
        <p className="text-xs sm:text-sm text-[#D8D2C2]">{step.description}</p>
      </div>
    </div>
  );
};

export function HowToUseSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const introRef = useRef<HTMLParagraphElement>(null);
  const tipsRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=1000",
          pin: true,
          scrub: 1,
        },
      });
      tl.fromTo(
        titleRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5 }
      )
        .fromTo(
          subtitleRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.5 },
          "-=0.3"
        )
        .fromTo(
          introRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.5 },
          "-=0.3"
        )
        .fromTo(
          tipsRef.current,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
          }
        );
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="howSection"
      className="flex items-center justify-center min-h-dvh my-12 px-4 sm:px-6 lg:px-8 relative"
    >
      <div className="w-full h-full mx-auto space-y-4 grid py-2">
        <div className="bg-neutral-800 rounded-lg shadow-md flex items-center justify-center p-6 text-center relative overflow-hidden">
          <h2
            ref={titleRef}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black tracking-tighter leading-[0.9] opacity-0 z-10 text-[#FAF7F0]"
          >
            Effortless Application, Remarkable Results
          </h2>
          <span className="h-[500px] w-8 bg-[#B17457] absolute rotate-[30deg] -top-10 left-[53%] -translate-x-10  hidden sm:block"></span>
          <span className="h-[500px] w-8 bg-[#D8D2C2] absolute rotate-[30deg] -top-10 left-[50%] -translate-x-8 hidden sm:block"></span>
          <span className="h-[500px] w-8 bg-[#B17457] absolute rotate-[30deg] -top-10 left-[47%] -translate-x-6 hidden sm:block"></span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 ">
          <div className="md:col-span-1  bg-[#D8D2C2] rounded-lg shadow-md flex flex-col items-center justify-center p-6 relative">
            <div className="bg-[#B17457] mb-4  w-full h-full flex items-center justify-center rounded-lg relative">
              <p
                ref={subtitleRef}
                className=" font-extrabold text-neutral-800  opacity-0 text-center  text-2xl md:text-2xl lg:text-4xl max-w-[90%]"
              >
                Your Guide to Glowing Skin
              </p>
              <RepeatingText />
            </div>
            <p
              ref={introRef}
              className="text-[#B17457] opacity-0 text-base sm:text-lg md:text-xl lg:text-2xl leading-tight tracking-tighter font-semibold"
            >
              Integrating BIO PEEL into your skincare routine is simple and
              effective.
              <br /> Follow these easy steps to unlock your skin&apos;s radiant
              potential, suitable for all skin types.
            </p>
          </div>

          <div className="md:col-span-2 lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {steps.map((step, index) => (
              <StepCard key={index} step={step} />
            ))}
          </div>

          <div className="md:col-span-3 lg:col-span-1 bg-[#B17457] rounded-lg shadow-md items-center justify-center relative overflow-hidden hidden md:flex">
            <RepeatingText />
            <div className="absolute inset-0 before:content-[''] before:absolute before:w-[2rem] before:h-[200%] before:bg-white before:-top-1/2 before:left-0 before:transform before:-rotate-45 " />
            <div className="absolute inset-0 before:content-[''] before:absolute before:w-[2rem] before:h-[200%] before:bg-neutral-800 before:-top-[60%] before:left-0 before:transform before:-rotate-45 " />

            <View
              className="h-full w-full flex items-center justify-center"
              orbit={false}
            >
              <Suspense fallback={null}>
                <PerspectiveCamera position={[0, 0, 0]} />
                <MainRotatingModel />
                <Common color="" />
              </Suspense>
            </View>
          </div>
        </div>

        <div className="bg-neutral-800 rounded-lg shadow-md flex items-center justify-center p-6 relative ">
          <div ref={tipsRef} className="text-start space-y-4 opacity-0">
            <p className="text-xl sm:text-2xl font-semibold text-[#D8D2C2]">
              For best results, use 2-3 times per week as part of your evening
              skincare routine.
            </p>
            <p className="text-sm sm:text-base text-gray-200">
              If you have sensitive skin, we recommend doing a patch test before
              full application.
            </p>
          </div>
          <span className="absolute top-0 left-0 text-[7vw] opacity-10 text-[#FAF7F0] font-black">
            BIO PEEL
          </span>
        </div>
      </div>
    </section>
  );
}

function RepeatingText() {
  return (
    <>
      <span className="absolute top-0 left-0 w-full text-center text-[#FAF7F0] text-[0.7vw] sm:text-[1vw] md:text-[0.8vw] lg:text-[0.7vw] font-bold whitespace-nowrap opacity-10 overflow-hidden">
        {"BIO PEEL - ".repeat(40)}
      </span>
      <span className="absolute bottom-0 left-0 w-full text-center text-[#FAF7F0] text-[0.7vw] sm:text-[1vw] md:text-[0.8vw] lg:text-[0.7vw] font-bold whitespace-nowrap opacity-10 overflow-hidden">
        {"BIO PEEL - ".repeat(40)}
      </span>
      <span
        className="absolute top-0 left-0 h-full text-[#FAF7F0] text-[0.7vw] sm:text-[1vw] md:text-[0.8vw] lg:text-[0.7vw] font-bold whitespace-nowrap opacity-10 overflow-hidden"
        style={{ writingMode: "vertical-lr" }}
      >
        {"BIO PEEL - ".repeat(40)}
      </span>
      <span
        className="absolute top-0 right-0 h-full text-[#FAF7F0] text-[0.7vw] sm:text-[1vw] md:text-[0.8vw] lg:text-[0.7vw] font-bold whitespace-nowrap opacity-10 overflow-hidden"
        style={{ writingMode: "vertical-lr" }}
      >
        {"BIO PEEL - ".repeat(40)}
      </span>
    </>
  );
}
