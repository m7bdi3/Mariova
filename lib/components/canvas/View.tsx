"use client";

import { forwardRef, Suspense, useImperativeHandle, useRef } from "react";
import { PerspectiveCamera, View as ViewImpl } from "@react-three/drei";
import { Three } from "@/lib/helpers/components/Three";

export const Common = ({ color }: { color: string }) => (
  <Suspense fallback={null}>
    {color.length > 1 && <color attach="background" args={[color]} />}
    <ambientLight />
    <pointLight position={[20, 30, 10]} intensity={3} decay={0.2} />
    <pointLight position={[-10, -10, -10]} color="blue" decay={0.2} />
    <PerspectiveCamera makeDefault fov={40} position={[0, 0, 6]} />
  </Suspense>
);

const View = forwardRef(
  (
    {
      children,
      orbit,
      className,
      ...props
    }: { children: React.ReactNode; orbit: boolean; className: string },
    ref
  ) => {
    const localRef = useRef<HTMLDivElement>(null!);
    useImperativeHandle(ref, () => localRef.current);

    return (
      <>
        <div ref={localRef} {...props} className={className} />
        <Three>
          <ViewImpl track={localRef}>{children}</ViewImpl>
        </Three>
      </>
    );
  }
);
View.displayName = "View";

export { View };
