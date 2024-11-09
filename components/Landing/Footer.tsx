"use client";

import React, { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export const Footer = () => {
  const footerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (footerRef.current) {
        gsap.timeline({
          scrollTrigger: {
            trigger: footerRef.current,
            pin: true,
            start: "bottom bottom",
            end: "+=50%",
          },
        });
      }
    },
    { scope: footerRef }
  );

  return (
    <div
      className=" footer relative max-w-[100vw] w-full h-[50vh] -z-50 mt-[-50vh]"
      ref={footerRef}
    >
      <svg className="hidden">
        <filter id="grain-filter">
          <feTurbulence
            type="fractalNoise"
            baseFrequency=".9"
            numOctaves="10"
          />
          <feBlend mode="darken" in2="SourceGraphic" result="blendOut" />
        </filter>
      </svg>
      <span className="absolute -top-1/2 left-0 w-full h-full -z-50 bg-[#B17457]" />

      <div className="w-full h-full bg-[#B17457] flex items-center justify-center text-white">
        <div className="text-center">
          <p className="text-2xl font-bold mb-4">MARIOVA</p>
          <p>&copy; 2024 MARIOVA. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};
