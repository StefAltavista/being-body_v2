"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function HandsSection() {
  const sectionRef = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      gsap.fromTo(
        ".hands_img",
        {
          scale: 0.22,
          opacity: 0,
          y: 400,
          x: -200,
        },
        {
          scale: 1.2,
          opacity: 1,
          y: -200,
          x: 0,
          ease: "none",
          scrollTrigger: {
            trigger: ".handsSection",
            start: "top 0%",
            end: "bottom 50%",
            scrub: 0.8,
            // markers: true,
          },
        },
      );
    },
    { scope: sectionRef },
  );

  return (
    <div
      ref={sectionRef}
      className="handsSection w-full flex flex-col justify-end my-4 py-8"
    >
      <div className="flex items-end">
        <div
          className="
                        hands_img
            m-6
            p-2
            rounded-full
            bg-white/10
            backdrop-blur-sm
            shadow-[inset_0_2px_14px_rgba(255,255,255,0.85),inset_0_-10px_20px_rgba(255,255,255,0.18),0_10px_30px_rgba(255,255,255,0.22)]
          "
        >
          <Image
            src="/img/hands_tr2.png"
            alt="beingBodyLogo"
            height={400}
            width={400}
            className="
              rounded-full
              brightness-[0.9]
              hue-rotate-[-80deg]
            "
          />
        </div>
        <h1 className="text-right"> My Techniques</h1>
      </div>
    </div>
  );
}
