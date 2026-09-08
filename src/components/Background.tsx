"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

type BackgroundProps = {
  rotate?: number;
  className?: string;
  imageClassName?: string;
};

export default function Background({
  rotate = 200,
  className = "",
  imageClassName = "",
}: BackgroundProps) {
  const [windowHeight, setWindowHeight] = useState<number>(0);

  useEffect(() => {
    const updateHeight = () => {
      setWindowHeight(window.innerHeight);
    };

    updateHeight();

    window.addEventListener("resize", updateHeight);
    window.addEventListener("orientationchange", updateHeight);

    return () => {
      window.removeEventListener("resize", updateHeight);
      window.removeEventListener("orientationchange", updateHeight);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none fixed inset-x-0 top-0 z-[-100] overflow-hidden ${className}`}
      style={{
        height: windowHeight ? `${windowHeight}px` : "100vh",
      }}
    >
      <Image
        className={`absolute top-0 left-0 opacity-70 scale-[4] ${imageClassName}`}
        style={{
          filter: `hue-rotate(${rotate}deg) blur(20px) saturate(2)`,
        }}
        src="/img/bubbles.webp"
        alt=""
        width={400}
        height={500}
        priority
      />
    </div>
  );
}
