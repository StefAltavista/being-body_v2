"use client";

import { useRef } from "react";
import { CardsContent } from "@/content/CardsContent";
import Card from "./Card";
import { gsap, useGSAP } from "@/lib/gsap";
import AnimatedBackgroundImage from "@/components/AnimatedBackground";

export default function Practices() {
  const container = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      const cards = gsap.utils.toArray<HTMLElement>(".practice-card");

      cards.forEach((card, i) => {
        const odd = i % 2 == 0;

        gsap.fromTo(
          card,
          {
            y: -250,
            x: odd ? -200 : 200,
            rotation: odd ? 324 : 396,
            autoAlpha: 0,
          },
          {
            y: 100,
            x: 0,
            rotation: 360,
            autoAlpha: 1,
            duration: 2,
            ease: "power3.out",
            delay: i * (odd ? 0.5 : 2),
            force3D: true,
            scrollTrigger: {
              trigger: card,
              start: "top 50%",
              end: "top -10%",
              scrub: 0.2,
              invalidateOnRefresh: true,
            },
          },
        );
      });
    },
    { scope: container },
  );

  return (
    <div
      ref={container}
      className="flex w-full mt-[100px] items-center flex-col relative"
    >
      <AnimatedBackgroundImage />

      <h3 className="!pb-4">Body & Mind Experiences</h3>

      <div className="w-[20px] border-t"></div>

      <p className="handWrite2 reveal_text3 !pt-4 !mb-8 z-100 !text-center">
        Reconnect, explore and listen to the self through guided corporal
        awareness
      </p>

      <div className="flex w-full my-[50px] justify-around flex-wrap pb-5">
        {CardsContent.map((x) => {
          return (
            <div
              key={x.id}
              className="practice-card p-8 sm:p-0 md:p-0 xl:p-8 lg:p-0 lg:w-1/3 m-1 sm:w-1/2 mb-8 will-change-transform"
            >
              <Card content={x} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
