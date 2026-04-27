"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const techniques = [
  { label: "Deep Tissue", left: "22%" },
  { label: "Aromatherapy", left: "38%" },
  { label: "Lomi Lomi", left: "56%" },
  { label: "Trigger Point", left: "72%" },
  { label: "Relaxation", left: "86%" },
];

const bulletPoints = [
  "Combined from Traditional Thai Massage, LOMILOMI, and trigger point therapy",
  "Stone Massage adds warmth and grounding for deeper muscle relaxation and circulation",
  "Focus on mindful breathing and body feedback to guide pressure and movement",
];

export default function Techniques() {
  const sectionRef = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;

      const handsImg = section.querySelector(".hands_img");
      const techBubbles = gsap.utils.toArray<HTMLElement>(
        ".tech_bubble",
        section,
      );

      if (!handsImg) return;

      // Big bubble scroll animation: enters from bottom, stays visible, fades out at top
      const bubbleTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top bottom",
          end: "bottom top",
          scrub: 0.4,
          // markers: true,
        },
      });

      bubbleTl.fromTo(
        handsImg,
        {
          opacity: 0,
          scale: 1,
          x: 200,
          y: -200,
        },
        {
          scale: 0.2,
          x: -200,
          y: 500,
          opacity: 1,
        },
        0,
      );

      // Floating technique bubbles
      techBubbles.forEach((bubble, i) => {
        const animateBubble = () => {
          const startX = gsap.utils.random(-30, 30);
          const drift1 = gsap.utils.random(-25, 25);
          const drift2 = gsap.utils.random(-25, 25);
          const drift3 = gsap.utils.random(-25, 25);
          const duration = gsap.utils.random(4.5, 7);
          const scale = gsap.utils.random(0.85, 1.15);

          gsap.set(bubble, {
            y: 140,
            x: startX,
            opacity: 0,
            scale,
          });

          const tl = gsap.timeline({
            delay: gsap.utils.random(0, 2.2) + i * 0.18,
            onComplete: animateBubble,
          });

          tl.to(
            bubble,
            {
              opacity: 1,
              duration: 0.6,
              ease: "none",
            },
            0,
          )
            .to(
              bubble,
              {
                y: -760,
                duration,
                ease: "none",
              },
              0,
            )
            .to(
              bubble,
              {
                x: startX + drift1,
                duration: duration * 0.33,
                ease: "none",
              },
              0,
            )
            .to(
              bubble,
              {
                x: startX + drift2,
                duration: duration * 0.33,
                ease: "none",
              },
              duration * 0.33,
            )
            .to(
              bubble,
              {
                x: startX + drift3,
                duration: duration * 0.34,
                ease: "none",
              },
              duration * 0.66,
            )
            .to(
              bubble,
              {
                opacity: 0,
                duration: 0.6,
                ease: "none",
              },
              duration - 0.6,
            );
        };

        animateBubble();
      });
    },
    { scope: sectionRef },
  );

  return (
    <div
      ref={sectionRef}
      className="handsSection relative w-full flex flex-col justify-end  min-h-[300px]"
    >
      {" "}
      <h1 className="text-right z-10">My Techniques</h1>
      <div className="absolute inset-0 pointer-events-none">
        {techniques.map((tech) => (
          <div
            key={tech.label}
            className="tech_bubble absolute bottom-[-120px] w-20 h-20 flex justify-center items-center rounded-full border border-white/50 bg-gradient-to-br from-pink-200/70 to-sky-200/70 backdrop-blur-sm shadow-[inset_0_2px_10px_rgba(255,255,255,0.85),inset_0_-8px_16px_rgba(255,255,255,0.18),0_0_18px_rgba(255,255,255,0.22)]"
            style={{ left: tech.left }}
          >
            <p className="text-[12px] text-slate-700 text-center leading-tight px-1">
              {tech.label}
            </p>
          </div>
        ))}
      </div>
      {/* FLOATING HAND SECTION */}
      <div className="absolute w-[130vw] relative z-10 flex items-end">
        <div className="absolute  hands_img m-6">
          <div className=" hands_float realative aspect-square h-full rounded-full  bg-gradient-to-br from-pink-200/70 to-sky-200/70 backdrop-blur-sm shadow-[inset_0px_10px_rgba(255,255,255,1),inset_0_-8px_16px_rgba(255,255,255,1),0_0_18px_rgba(255,255,255,1)]">
            <div className=" absolute top-[40%] left-[16%] rounded-full bg-white/35 blur-xl pointer-events-none" />
            <Image
              src="/img/hands_tr2.png"
              alt="beingBodyLogo"
              height={1000}
              width={1000}
              className=" !brightness-100 saturate-60 p-4 rounded-full brightness-[0.9] hue-rotate-[-80deg]"
            />
          </div>
        </div>

        <div className=" w-[90vw] ">
          <div className="flex flex-col ">
            {bulletPoints.map((x, i) => (
              <h3 key={i} className="handWrite2 mb-6 !text-[23px] text-right">
                {x}
              </h3>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
