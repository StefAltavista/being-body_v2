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
      const handsFloat = section.querySelector(".hands_float");
      const techBubbles = gsap.utils.toArray<HTMLElement>(
        ".tech_bubble",
        section,
      );

      if (!handsImg || !handsFloat) return;

      // Big bubble scroll animation: enters from bottom, stays visible, fades out at top
      const bubbleTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top bottom",
          end: "bottom top",
          scrub: 0.8,
          // markers: true,
        },
      });

      bubbleTl.fromTo(
        handsImg,
        {
          scale: 3,
          x: -200,
          y: -500,
          autoAlpha: 0,
        },
        {
          scale: 0.2,
          x: 200,
          y: 500,
          autoAlpha: 1,
          ease: "none",
          duration: 1,
        },
        0,
      );

      bubbleTl
        .to(
          handsImg,
          {
            autoAlpha: 1,
            ease: "none",
            duration: 0.55,
          },
          0.2,
        )
        .to(
          handsImg,
          {
            autoAlpha: 0,
            ease: "none",
            duration: 0.25,
          },
          0.75,
        );

      // Big bubble random floating motion
      const floatBubble = () => {
        gsap.to(handsFloat, {
          x: gsap.utils.random(-18, 18),
          y: gsap.utils.random(-22, 22),
          rotation: gsap.utils.random(-3, 3),
          duration: gsap.utils.random(1.6, 3.2),
          ease: "sine.inOut",
          onComplete: floatBubble,
        });
      };

      floatBubble();

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
      className="handsSection relative w-full flex flex-col justify-end my-4 py-16 min-h-[700px]"
    >
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

      <div className="relative z-10 flex items-end">
        <div className="hands_img m-6">
          <div
            className="
              hands_float
              relative
              p-3
              rounded-full
              bg-white/12
              border border-white/45
              backdrop-blur-md
              shadow-[inset_0_3px_16px_rgba(255,255,255,0.95),inset_0_-12px_22px_rgba(255,255,255,0.18),0_0_24px_rgba(255,255,255,0.28),0_16px_40px_rgba(255,255,255,0.18)]
            "
          >
            <div className="absolute top-[10%] left-[16%] w-[40%] h-[40%] rounded-full bg-white/35 blur-xl pointer-events-none" />
            <Image
              src="/img/hands_tr2.png"
              alt="beingBodyLogo"
              height={1200}
              width={1200}
              className="rounded-full brightness-[0.9] hue-rotate-[-80deg]"
            />
          </div>
        </div>

        <div>
          <h1 className="text-right relative z-10">My Techniques</h1>
          <div className="flex flex-col justify-around">
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
