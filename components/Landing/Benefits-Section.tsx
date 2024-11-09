"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Sun,
  Sparkles,
  Droplet,
  Minimize2,
  Layers,
  Shield,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

interface Benefit {
  icon: React.ElementType;
  title: string;
  description: string;
}

const benefits: Benefit[] = [
  {
    icon: Sun,
    title: "Brightens Skin Tone",
    description:
      "BIO PEEL's powerful ingredients work to reduce dark spots and even out skin tone, leaving you with a radiant and youthful glow.",
  },
  {
    icon: Sparkles,
    title: "Reduces Fine Lines & Wrinkles",
    description:
      "With active ingredients that support collagen production, BIO PEEL softens the appearance of fine lines and wrinkles for a visibly smoother complexion.",
  },
  {
    icon: Droplet,
    title: "Deep Hydration",
    description:
      "The formula delivers deep hydration, locking in moisture to keep your skin supple and plump throughout the day.",
  },
  {
    icon: Minimize2,
    title: "Minimizes Pores",
    description:
      "Enjoy smoother, more refined skin as BIO PEEL reduces the appearance of enlarged pores, giving you a flawless finish.",
  },
  {
    icon: Layers,
    title: "Balances Skin Texture",
    description:
      "BIO PEEL's unique blend gently exfoliates and balances your skin's texture for a velvety, smooth feel.",
  },
  {
    icon: Shield,
    title: "Antioxidant Protection",
    description:
      "With antioxidant-rich ingredients, BIO PEEL protects against environmental damage, preserving your skin's youthful appearance.",
  },
];

const BenefitCard: React.FC<{ benefit: Benefit }> = ({ benefit }) => {
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
            duration: 0.6,
            ease: "power2.out",
            scrollTrigger: {
              trigger: cardRef.current,
              start: "top 90%",
            },
          }
        );
      }
    },
    { scope: cardRef }
  );

  const Icon = benefit.icon;

  return (
    <div
      ref={cardRef}
      className="bg-[#FAF7F0] rounded-xl shadow-lg p-8 flex flex-col items-center text-center transition-all duration-300 hover:scale-105 hover:shadow-xl min-h-full"
    >
      <Icon className="w-12 h-12 text-[#B17457] mb-6" />
      <h3 className="text-2xl font-bold mb-4 text-gray-800">{benefit.title}</h3>
      <p className="text-gray-600 leading-relaxed">{benefit.description}</p>
    </div>
  );
};

export function BenefitsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const elementsRef = {
    title: useRef<HTMLHeadingElement>(null),
    subtitle: useRef<HTMLParagraphElement>(null),
    intro: useRef<HTMLParagraphElement>(null),
  };

  useGSAP(
    () => {
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
          elementsRef.title.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6 }
        )
        .fromTo(
          elementsRef.subtitle.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6 },
          "-=0.4"
        )
        .fromTo(
          elementsRef.intro.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6 },
          "-=0.4"
        );
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="min-h-screen relative w-full flex items-center justify-center bg-gradient-to-b from-[#272829] to-[#1a1b1c] text-[#FAF7F0] overflow-hidden mb-24"
    >
      <Image
        src="/wave.svg"
        alt="Top wave"
        width={1920}
        height={100}
        className="absolute -top-1 w-full rotate-180 z-10"
      />
      <svg
        viewBox="0 0 120 120"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute w-full h-full top-0 rotate-180"
      >
        <path
          fill="#B17457"
          d="M31.9,-42.9C38.4,-39.1,39,-26,43.6,-13.7C48.3,-1.4,57,10,55.8,19.5C54.6,29,43.3,36.5,32.3,44.2C21.4,51.8,10.7,59.5,-3.5,64.3C-17.6,69.1,-35.3,70.9,-40.9,61.6C-46.6,52.2,-40.4,31.7,-40.2,16.7C-40,1.8,-46,-7.5,-49.8,-22.5C-53.7,-37.5,-55.5,-58.2,-46.9,-61.4C-38.2,-64.5,-19.1,-50.2,-3.2,-45.7C12.6,-41.3,25.3,-46.8,31.9,-42.9Z"
          transform="translate(45 100)"
        />
      </svg>
      <RepeatingText />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 lg:py-32 z-20">
        <div className="text-center mb-16">
          <h2
            ref={elementsRef.title}
            className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tighter mb-4"
          >
            Why Choose BIO PEEL?
          </h2>
          <p
            ref={elementsRef.subtitle}
            className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl text-[#D8D2C2] mb-6 opacity-0 leading-tight tracking-tighter font-serif italic"
          >
            Clinically Proven, Dermatologist Tested
          </p>
          <p
            ref={elementsRef.intro}
            className="max-w-2xl mx-auto text-gray-100 opacity-0 text-base sm:text-lg lg:text-xl leading-relaxed"
          >
            Experience the transformative power of BIO PEEL&apos;s
            scientifically formulated blend, designed to revitalize and
            rejuvenate your skin for a healthier, more youthful appearance.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
          {benefits.map((benefit, index) => (
            <BenefitCard key={index} benefit={benefit} />
          ))}
        </div>
      </div>
    </section>
  );
}

function RepeatingText() {
  return (
    <>
      <span
        className="absolute top-0 left-0 h-full text-[#FAF7F0] text-[0.7vw] sm:text-[1vw] lg:text-[1.5vw] font-bold whitespace-nowrap opacity-10 overflow-hidden"
        style={{ writingMode: "vertical-lr" }}
      >
        {"BIO PEEL - ".repeat(40)}
      </span>
      <span
        className="absolute top-0 right-0 h-full text-[#FAF7F0] text-[0.7vw] sm:text-[1vw] lg:text-[1.5vw] font-bold whitespace-nowrap opacity-10 overflow-hidden"
        style={{ writingMode: "vertical-lr" }}
      >
        {"BIO PEEL - ".repeat(40)}
      </span>
    </>
  );
}
