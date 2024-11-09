"use client";

import React, { useRef, Suspense } from "react";
import { useFrame } from "@react-three/fiber";
import { Gltf, PerspectiveCamera, useGLTF } from "@react-three/drei";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Group } from "three";
import dynamic from "next/dynamic";

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

const BOTTLE_MODELS = [
  "/bottle.glb",
  "/bottle-1.glb",
  "/bottle-2.glb",
  "/bottle-3.glb",
];

useGLTF.preload("/bottle.glb");
useGLTF.preload("/bottle-1.glb");
useGLTF.preload("/bottle-2.glb");
useGLTF.preload("/bottle-3.glb");

interface MainRotatingModelProps {
  panelIndex: number;
}

function MainRotatingModel({ panelIndex }: MainRotatingModelProps) {
  const modelRef = useRef<Group>(null);

  useGSAP(
    () => {
      if (!modelRef.current) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: `#panel-${panelIndex + 1}`,
          start: "left center",
          end: "right center",
          scrub: 1,
          horizontal: true,
        },
      });

      tl.to(modelRef.current.rotation, {
        y: Math.PI * 2,
        duration: 1,
        ease: "none",
      });
    },
    {
      dependencies: [panelIndex],
      scope: "#panels",
    }
  );

  useFrame((_, delta) => {
    if (modelRef.current) {
      modelRef.current.rotation.y += delta * 0.5;
    }
  });

  return (
    <group dispose={null}>
      <Gltf
        src={BOTTLE_MODELS[panelIndex]}
        ref={modelRef}
        scale={15}
        castShadow
      />
    </group>
  );
}

interface PanelProps {
  id: string;
  title: string;
  description: string;
  panelIndex: number;
}
const Panel: React.FC<PanelProps> = ({
  id,
  title,
  description,
  panelIndex,
}) => {
  return (
    <article
      id={id}
      className="panel flex h-full w-full items-center justify-center p-4 md:p-8"
    >
      <div className="grid h-full w-full gap-4 md:gap-6 grid-cols-1 md:grid-cols-2 grid-rows-[auto_1fr] md:grid-rows-2 rounded-2xl bg-gradient-to-br from-neutral-900 to-neutral-800 relative overflow-hidden">
        <div className="col-span-1 row-span-1 md:row-span-2 rounded-t-xl md:rounded-l-xl shadow-inner p-4 md:p-8 bg-[#B17457] h-[300px] md:h-full w-full z-20">
          <div className="relative h-full w-full flex flex-col justify-around pl-2 md:pl-4 gap-2 md:gap-4">
            <h2
              className="leading-[0.8] font-bold text-[#FAF7F0] whitespace-pre-wrap break-words text-start"
              style={{
                fontSize: "clamp(2rem, 4vw, 5.5rem)",
                display: "block",
              }}
            >
              {title.split(" ").map((word, index) => (
                <span key={index} className="block">
                  {word}
                </span>
              ))}
            </h2>
            <p
              className="w-full text-[#D8D2C2] lg:max-w-[90%] leading-[1.1] tracking-tighter font-serif italic"
              style={{
                fontSize: "clamp(0.9rem, 1vw,2rem)",
              }}
            >
              {description}
            </p>
            <span className="hidden md:flex w-24 h-24 md:w-40 md:h-40 lg:w-52 lg:h-52 rounded-full border-4 md:border-8 border-white text-4xl md:text-6xl lg:text-8xl font-bold items-center justify-center opacity-50">
              {panelIndex + 1}
            </span>
          </div>
          <span className="absolute md:hidden bottom-0 left-0 w-24 h-24 rounded-full border-4 m-4 border-white text-4xl font-bold flex items-center justify-center opacity-50">
            {panelIndex + 1}
          </span>
          {["top", "bottom", "left", "right"].map((position) => (
            <span
              key={position}
              className={`absolute ${position}-0 ${
                position === "left" || position === "right"
                  ? "h-full"
                  : "w-full"
              } text-[#FAF7F0] text-[0.5vw] md:text-[1vw] font-bold whitespace-nowrap opacity-10`}
              style={
                position === "left" || position === "right"
                  ? { writingMode: "vertical-lr" }
                  : {}
              }
            >
              BIO PEEL - BIO PEEL - BIO PEEL - BIO PEEL - BIO PEEL - BIO PEEL -
              BIO PEEL - BIO PEEL - BIO PEEL - BIO PEEL - BIO PEEL - BIO PEEL -
              BIO PEEL - BIO PEEL - BIO PEEL - BIO PEEL - BIO PEEL - BIO PEEL -
              BIO PEEL
            </span>
          ))}
        </div>
        <div className="col-span-1 row-span-1 md:row-span-2 rounded-b-xl md:rounded-r-xl shadow-inner flex items-center justify-center relative w-full h-full overflow-hidden">
          <span className="w-8 absolute left-[35%] -translate-x-1/2 h-[2000px] bg-[#B17457] rotate-[26deg] z-0" />
          <span className="w-8 absolute left-[40%] -translate-x-1/2 h-[2000px] bg-[#D8D2C2] rotate-[26deg] z-0" />
          <span className="w-8 absolute left-[45%] -translate-x-1/2 h-[2000px] bg-[#B17457] rotate-[26deg] z-0" />
          <View className="h-full w-full flex items-center justify-center">
            <Suspense fallback={null}>
              <PerspectiveCamera position={[0, 0, -50]} />
              <MainRotatingModel panelIndex={panelIndex} />
              <Common color="" />
            </Suspense>
          </View>
        </div>
      </div>
    </article>
  );
};

const panelData = [
  {
    title: "Skin Peeling and Whitening Complex",
    description:
      "A powerful blend of high-quality depigmenting ingredients, formulated to brighten and clarify the skin. This complex gently exfoliates to remove dead skin cells, revealing a smoother, more radiant, and even-toned complexion. Designed to address melasma, acne scars, and pigmentation concerns, it leaves skin refreshed and revitalized.",
  },
  {
    title: "White Booster",
    description:
      "A specially formulated for the face and sensitive areas, offering a potent blend of high-quality depigmenting and brightening ingredients. This cream gently exfoliates, revealing a brighter, more even complexion while being gentle enough for delicate skin areas.",
  },
  {
    title: "Firming Lotion",
    description:
      "A Firming Lotion is a unique blend of high-quality ingredients, expertly formulated to improve skin firmness, brighten the complexion, and promote clarity. This lotion gently exfoliates to reveal a smoother, firmer, and more even-toned appearance.",
  },
  {
    title: "Skin Peeling and Whitening Complex",
    description:
      "A carefully crafted complex featuring high-quality depigmenting and exfoliating ingredients. Formulated specifically for the face and sensitive areas, it clears away dead skin cells, unveiling a brighter, more even-toned complexion. This gentle peeling cream is ideal for reducing dark spots, improving radiance, and creating a smoother texture for sensitive skin areas.",
  },
];

export const HorizontalPanels: React.FC = () => {
  const panelsContainerRef = useRef<HTMLDivElement>(null);
  const panelsRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!panelsContainerRef.current || !panelsRef.current) return;

      const panels = gsap.utils.toArray<HTMLElement>(
        "#panels-container .panel"
      );
      gsap.to(panels, {
        xPercent: -100 * (panels.length - 1),
        ease: "none",
        scrollTrigger: {
          trigger: "#panels-container",
          pin: true,
          start: "top top",
          end: () => `+=${panelsRef.current!.offsetWidth - window.innerWidth}`,
          scrub: 1,
          snap: {
            snapTo: 1 / (panels.length - 1),
            delay: 0.1,
            ease: "power1.inOut",
          },
        },
      });
    },
    { scope: panelsContainerRef }
  );

  return (
    <section
      id="panels"
      ref={panelsContainerRef}
      className="text-[#FAF7F0] overflow-hidden"
    >
      <div
        id="panels-container"
        className="flex flex-nowrap w-[400%] h-screen"
        ref={panelsRef}
      >
        {panelData.map((panel, index) => (
          <Panel
            key={index}
            id={`panel-${index + 1}`}
            title={panel.title}
            description={panel.description}
            panelIndex={index}
          />
        ))}
      </div>
    </section>
  );
};
