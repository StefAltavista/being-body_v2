"use client";

import Background from "@/components/Background";
import Container from "@/components/Container";
import { useGSAP } from "@gsap/react";
import Image from "next/image";
import { useRef } from "react";
import gsap from "gsap";

export default function page() {
  const container = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      const paragraphs = gsap.utils.toArray<HTMLElement>(".reveal-p");

      gsap.fromTo(
        ".pilates-hero-image",
        {
          opacity: 0,
          scale: 1.08,
          filter: "blur(20px)",
          transformOrigin: "center center",
        },
        {
          opacity: 0.8,
          scale: 1,
          filter: "blur(0px)",
          duration: 3.5,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".pilates-hero-wrapper",
            start: "top 55%",
            toggleActions: "play none none reverse",
          },
        },
      );
    },
    { scope: container },
  );
  return (
    <Container classname=" mt-10 overflow-hidden">
      <div ref={container} className="w-full">
        <Background rotate={80} imageClassName="opacity-100" />
        <div className="w-full relative">
          <div className="flex items-center">
            <Image
              className="mr-6 brightness-0 pb-2"
              src="/icons/workshop.svg"
              width={80}
              height={80}
              alt="Pilates"
            />

            <h1>Workshops</h1>
          </div>
          <div className="flex  flex-col w-full min-h-[80vh] mt-10">
            <h3>Coming soon...</h3>
            <p>
              If you are interested in hosting or collaborating, contact me
              ‘Here’
            </p>
          </div>
        </div>{" "}
      </div>
    </Container>
  );
}
