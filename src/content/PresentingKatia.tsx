"use client";

import { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function PresentingKatia() {
  const sectionRef = useRef<HTMLDivElement | null>(null);

  // useGSAP(
  //   () => {
  //     const section = sectionRef.current;
  //     if (!section) return;

  //     const track = section.querySelector(
  //       ".scrolling_carousel",
  //     ) as HTMLDivElement | null;
  //     const viewport = section.querySelector(
  //       ".carousel_viewport",
  //     ) as HTMLDivElement | null;

  //     if (!track || !viewport) return;

  //     const getShift = () => {
  //       const overflow = track.scrollWidth - viewport.offsetWidth;
  //       return Math.max(0, overflow);
  //     };

  //     gsap.set(track, { x: 0 });

  //     gsap.fromTo(
  //       track,
  //       { x: 120 },
  //       {
  //         x: () => -getShift() - 500,
  //         ease: "none",
  //         scrollTrigger: {
  //           trigger: section,
  //           start: "top 75%",
  //           end: () => `bottom top`,
  //           scrub: 0.2,
  //           invalidateOnRefresh: true,
  //           // markers: true,
  //         },
  //       },
  //     );
  //   },
  //   { scope: sectionRef },
  // );

  return (
    <section
      ref={sectionRef}
      className="w-full flex  flex-row justify-between py-6"
    >
      <p className="handWrite2 reveal_text3 mb-8">
        "My goal is to generate a healing experience through the harmonisation
        of body, mind and spirit. To create a space to connect with, explore and
        listen to the self through guided corporal awareness."
      </p>
      <div className="carousel_item shrink-0 mx-10">
        <Image
          src="/img/homecarousel/1.jpeg"
          width={200}
          height={400}
          alt="img"
          className="rounded-3xl"
        />
      </div>
    </section>
  );
}
