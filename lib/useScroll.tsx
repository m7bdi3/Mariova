/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { LenisRef, ReactLenis } from "lenis/react";
import { ReactNode, useEffect, useRef } from "react";
import gsap from "gsap";

export function LenisScroll({ children }: { children: ReactNode }) {
  const lenisRef = useRef<LenisRef>(null!);

  useEffect(() => {
    function update(time: any) {
      lenisRef.current?.lenis?.raf(time * 1000);
    }
    gsap.ticker.add(update);

    return () => gsap.ticker.remove(update);
  }, []);

  return (
    <ReactLenis
      ref={lenisRef}
      root
      options={{
        duration: 2.5,
        smoothWheel: true,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      }}
    >
      {children}
    </ReactLenis>
  );
}
