"use client";

import React, { useRef, Suspense, useState } from "react";
import * as THREE from "three";
import { useFrame, useThree } from "@react-three/fiber";
import { Gltf, PerspectiveCamera, useGLTF } from "@react-three/drei";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import dynamic from "next/dynamic";

useGLTF.preload("/bottle-3.glb");

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

function Model() {
  const modelRef = useRef<THREE.Group>(null!);
  const { viewport, size } = useThree();

  const calculateScale = () =>
    Math.min((25 * viewport.width) / viewport.height, 30);

  const calculatePosition = () => {
    if (size.width >= 1500) return viewport.width / 2 - 6;
    if (size.width >= 900) return viewport.width / 2 - 4;
    return viewport.width / 2 - 3;
  };

  useGSAP(
    () => {
      if (!modelRef.current) return;

      gsap.set(modelRef.current.scale, { x: 0, y: 0, z: 0 });
      gsap.set(modelRef.current.position, {
        x: calculatePosition(),
        y: -10,
        z: 0,
      });

      gsap.to(modelRef.current.scale, {
        x: calculateScale(),
        y: calculateScale(),
        z: calculateScale(),
      });

      gsap.to(modelRef.current.position, {
        x: 1.2,
        y: -1,
        z: 0,
        duration: 2,
        ease: "power3.in",
      });
    },
    { scope: "#ingredientRef" }
  );

  useFrame(() => {
    if (!modelRef.current) return;
    modelRef.current.rotation.y = -1.5;
  });

  return (
    <group rotation={[0, 0, -Math.PI / 5]}>
      <Gltf
        src={"/bottle-3.glb"}
        ref={modelRef}
        position={[0, 0, 0]}
        scale={0}
        receiveShadow
      />
    </group>
  );
}

const ingredients = [
  {
    name: "Glycolic Acid",
    image: "/Glycolic-Acid.jpg",
    description: "Powerful exfoliant for smoother skin",
  },
  {
    name: "Hyaluronic Acid",
    image: "/Niacin.jpg",
    description: "Intense hydration for plump skin",
  },
  {
    name: "Vitamin C",
    image: "/vitamin-c.jpeg",
    description: "Brightens and protects skin",
  },
  {
    name: "Niacinamide",
    image: "/Niacin.jpg",
    description: "Refines pores and balances skin",
  },
];

export function IngredientsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeIngredient, setActiveIngredient] = useState(0);

  useGSAP(
    () => {
      if (!sectionRef.current) return;
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=1000",
          pin: true,
          scrub: 1,
        },
      });

      timeline
        .fromTo(
          ".vertical-text",
          { height: 0 },
          { height: "100%", duration: 0.5 }
        )
        .fromTo("#wave", { opacity: 0 }, { opacity: 1, duration: 1 })
        .fromTo(
          "#blob",
          { opacity: 0, scale: 0 },
          { opacity: 1, scale: 1, duration: 1 }
        )
        .fromTo(
          "#model-container",
          { opacity: 0 },
          { opacity: 1, duration: 1 },
          "-0.5"
        )
        .fromTo(
          "#title",
          { opacity: 0, y: -50 },
          { opacity: 1, y: 0, duration: 1 }
        )
        .fromTo(
          "#description",
          { opacity: 0 },
          { opacity: 1, duration: 1 },
          "-=0.5"
        )
        .fromTo(
          "#ingredient-list li",
          { opacity: 0, x: -30 },
          { opacity: 1, x: 0, stagger: 0.2, duration: 0.5 },
          "-=0.5"
        );
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="ingredientRef"
      className="min-h-screen relative flex items-center justify-center bg-gradient-to-b from-[#272829] to-[#1a1b1c] text-[#FAF7F0] overflow-hidden rounded-t-[12rem] mt-12"
    >
      <VerticalText />
      <WaveAndBlob />
      <div className="container mx-auto px-4 md:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 py-6 relative overflow-hidden w-full h-full">
        <div className="space-y-8 text-center lg:text-start w-full col-span-2 flex flex-col items-start justify-center">
          <h2
            id="title"
            className="text-5xl font-bold tracking-tighter sm:text-7xl xl:text-8xl mb-6"
          >
            Ingredients that{" "}
            <span className="font-serif italic font-light text-[#D8D2C2]">
              Transform
            </span>
          </h2>
          <p id="description" className="max-w-xl text-lg text-gray-300">
            Our carefully selected ingredients work in harmony to deliver
            exceptional results. Each component is chosen for its purity and
            effectiveness.
          </p>
          <ul id="ingredient-list" className="space-y-4 w-full">
            {ingredients.map((ingredient, index) => (
              <IngredientItem
                key={ingredient.name}
                ingredient={ingredient}
                index={index}
                activeIngredient={activeIngredient}
                setActiveIngredient={setActiveIngredient}
              />
            ))}
          </ul>
        </div>

        <div
          id="model-container"
          className="w-full h-full absolute -z-10 opacity-0"
        >
          <View className="h-full w-full flex items-center justify-center">
            <Suspense fallback={null}>
              <PerspectiveCamera
                position={[0, 0, 4]}
                fov={75}
                rotation={[0, 0, Math.PI / 4]}
              />
              <Model />
              <Common color="" />
            </Suspense>
          </View>
        </div>
      </div>
    </section>
  );
}

function VerticalText() {
  return (
    <>
      <span
        className="vertical-text absolute top-0 left-0 h-full text-[#FAF7F0] sm:text-[1vw] lg:text-[2vw] font-bold whitespace-nowrap opacity-10 overflow-hidden"
        style={{ writingMode: "vertical-lr" }}
      >
        {"BIO PEEL - ".repeat(40)}
      </span>
      <span
        className="vertical-text absolute top-0 right-0 h-full text-[#FAF7F0] sm:text-[1vw] lg:text-[2vw] font-bold whitespace-nowrap opacity-10 overflow-hidden"
        style={{ writingMode: "vertical-lr" }}
      >
        {"BIO PEEL - ".repeat(40)}
      </span>
    </>
  );
}

function WaveAndBlob() {
  return (
    <>
      <span id="wave" className="absolute bottom-0 w-full">
        <Image
          src="/wave.svg"
          alt="wave"
          width={1920}
          height={100}
          className="w-full h-auto"
        />
      </span>
      <span id="blob" className="absolute w-full h-full top-0 -z-20">
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <path
            fill="#B17457"
            d="M31.9,-42.9C38.4,-39.1,39,-26,43.6,-13.7C48.3,-1.4,57,10,55.8,19.5C54.6,29,43.3,36.5,32.3,44.2C21.4,51.8,10.7,59.5,-3.5,64.3C-17.6,69.1,-35.3,70.9,-40.9,61.6C-46.6,52.2,-40.4,31.7,-40.2,16.7C-40,1.8,-46,-7.5,-49.8,-22.5C-53.7,-37.5,-55.5,-58.2,-46.9,-61.4C-38.2,-64.5,-19.1,-50.2,-3.2,-45.7C12.6,-41.3,25.3,-46.8,31.9,-42.9Z"
            transform="translate(100 100)"
          />
        </svg>
      </span>
    </>
  );
}

function IngredientItem({
  ingredient,
  index,
  activeIngredient,
  setActiveIngredient,
}: // eslint-disable-next-line @typescript-eslint/no-explicit-any
any) {
  return (
    <li
      className={`flex items-center space-x-4 p-2 rounded-lg transition-colors duration-300 cursor-pointer lg:max-w-[50%] ${
        activeIngredient === index
          ? "bg-[#D8D2C2] bg-opacity-20"
          : "hover:bg-[#FAF7F0] hover:bg-opacity-10"
      }`}
      onMouseEnter={() => setActiveIngredient(index)}
    >
      <Image
        src={ingredient.image}
        alt={ingredient.name}
        width={64}
        height={64}
        className="rounded-full object-cover size-16 border-2 border-[#FAF7F0]"
      />
      <div>
        <h3 className="text-xl font-semibold">{ingredient.name}</h3>
        <p className="text-sm text-gray-400">{ingredient.description}</p>
      </div>
    </li>
  );
}
