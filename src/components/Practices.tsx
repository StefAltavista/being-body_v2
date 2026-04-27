"use client";

import { useRef } from "react";
import { CardsContent } from "@/content/CardsContent";
import Card from "./Card";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function Practices() {
  const container = useRef<HTMLDivElement | null>(null);
  gsap.registerPlugin(ScrollTrigger);

  useGSAP(
    () => {
      const cards = gsap.utils.toArray<HTMLElement>(".practice-card");
      gsap.fromTo(
        ".practice_bg",
        {
          rotation: -100,
          skewX: 0,
          scale: 2,
          y: "0vh",
          opacity: 0,
          filter: "hue-rotate(0deg) blur(2px) saturate(0) ",
          transformOrigin: "center center",
        },
        {
          rotation: 0,
          skewX: 10,
          scale: 3,
          y: "200vh",
          opacity: 8,
          filter: "hue-rotate(180deg) blur(30px) saturate(2) ",
          scrollTrigger: {
            trigger: container.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.5,
          },
        },
      );
      cards.forEach((card, i) => {
        const odd = i % 2 == 0;
        gsap.fromTo(
          card,
          {
            y: -250,
            x: odd ? -200 : 200,
            transform: odd ? "rotate(0.9turn)" : "rotate(1.1turn)",
            opacity: 0,
          },
          {
            y: 100,
            x: 0,
            transform: "rotate(1turn)",
            opacity: 1,
            duration: 2 * 1,
            ease: "power3.out",
            delay: i * (odd ? 0.5 : 2),
            scrollTrigger: {
              trigger: card,
              start: "top 50%",
              end: "top -10%",
              scrub: 0.2,
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
      <Image
        className="z-[-100] absolute top-0 left-0 practice_bg   "
        src={`/img/bubbles.png`}
        alt="BeingBodyConcept"
        width={1000}
        height={1000}
      />
      <h3>Body & Mind Experiences</h3>
      <p className="handWrite2 reveal_text3 !my-8">
        ``My goal is to generate a healing experience through the harmonisation
        of body, mind and spirit. To create a space to connect with, explore and
        listen to the self through guided corporal awareness``
      </p>

      <div className="flex w-full my-[50px] justify-around flex-wrap pb-5">
        {CardsContent.map((x) => {
          return (
            <div
              key={x.id}
              className="practice-card md:w-1/3 m-1 sm:w-1/2 mb-8 will-change-transform"
            >
              <Card content={x} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
