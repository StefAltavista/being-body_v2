"use client";

import { useRef } from "react";
import Image from "next/image";
import { gsap, useGSAP } from "@/lib/gsap";

type AnimatedBackgroundImageProps = {
  className?: string;
  imageClassName?: string;
  width?: number;
  height?: number;
  startY?: string;
  maxY?: string;
  clipped?: boolean;
};

export default function AnimatedBackgroundImage({
  className = "",
  imageClassName = "",
  width = 800,
  height = 1067,
  startY,
  maxY,
  clipped = false,
}: AnimatedBackgroundImageProps) {
  const container = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      const bgImage = container.current?.querySelector(".animated-bg-image");

      if (!bgImage) return;

      const isMobile = window.matchMedia("(max-width: 767px)").matches;

      const defaultStartY = isMobile ? "-120vh" : "-100vh";
      const defaultMaxY = isMobile ? "300vh" : "200vh";

      const bgFrom = isMobile
        ? {
            rotation: -80,
            skewX: 0,
            scale: 3.5,
            y: startY ?? defaultStartY,
            opacity: 0.25,
            filter: "hue-rotate(0deg) blur(20px) saturate(2)",
            transformOrigin: "center center",
          }
        : {
            rotation: -100,
            skewX: 0,
            scale: 2,
            y: startY ?? defaultStartY,
            opacity: 0,
            filter: "hue-rotate(0deg) blur(20px) saturate(2)",
            transformOrigin: "center center",
          };

      const bgTo = isMobile
        ? {
            rotation: 0,
            skewX: 5,
            scale: 5,
            y: maxY ?? defaultMaxY,
            opacity: 1,
            filter: "hue-rotate(180deg) blur(20px) saturate(2)",
          }
        : {
            rotation: 0,
            skewX: 10,
            scale: 3,
            y: maxY ?? defaultMaxY,
            opacity: 1,
            filter: "hue-rotate(180deg) blur(20px) saturate(2)",
          };

      gsap.set(bgImage, {
        willChange: "transform, opacity, filter",
      });

      gsap.fromTo(bgImage, bgFrom, {
        ...bgTo,
        force3D: true,
        scrollTrigger: {
          trigger: container.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 0.5,
          invalidateOnRefresh: true,
        },
      });
    },
    {
      scope: container,
      dependencies: [startY, maxY],
    },
  );

  return (
    <div
      ref={container}
      className={`pointer-events-none absolute inset-0 z-[-100] ${
        clipped ? "overflow-hidden" : "overflow-visible"
      } ${className}`}
    >
      <Image
        className={`animated-bg-image absolute top-0 left-0 blur-xl saturate-200 ${imageClassName}`}
        src="/img/bubbles.png"
        alt="BeingBodyConcept"
        width={width}
        height={height}
      />
    </div>
  );
}
