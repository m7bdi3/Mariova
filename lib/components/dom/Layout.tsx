"use client";

import { useRef } from "react";
import dynamic from "next/dynamic";
import { LenisScroll } from "@/lib/useScroll";

const Scene = dynamic(() => import("@/lib/components/canvas/Scene"), {
  ssr: false,
});

const Layout = ({ children }: { children: React.ReactNode }) => {
  const ref = useRef<HTMLDivElement>(null!);

  return (
    <div
      ref={ref}
      style={{
        position: "relative",
        width: " 100%",
        height: "100%",
        overflow: "auto",
        touchAction: "auto",
        maxWidth: "100vw",
        overflowX: "hidden",
      }}
    >
      <LenisScroll>{children}</LenisScroll>
      <Scene
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          pointerEvents: "none",
        }}
        eventSource={ref}
        eventPrefix="client"
      />
    </div>
  );
};

export { Layout };
