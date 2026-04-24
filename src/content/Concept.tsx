"use client";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";

export default function Concept() {
  gsap.registerPlugin(ScrollTrigger);

  const concept = useRef<HTMLDivElement | null>(null);
  const textRevealArray = [".reveal_text1", ".reveal_text2", ".reveal_text3"];

  useGSAP(
    () => {
      textRevealArray.map((x, i) =>
        gsap.from(x, {
          x: i == 0 ? "-100" : "0",
          y: 40,
          opacity: 0,
          duration: 0.8,
          scrollTrigger: {
            trigger: x,
            start: "top 80%",
            end: "top -120%",
          },
        }),
      );

      gsap.fromTo(
        ".concept_img",
        {
          transform: "rotate(70deg) skew(10deg,20deg) scale(2)",
          opacity: 0,
        },
        {
          transform: "rotate(0deg) skew(-20deg, -10deg) scale(1) ",
          opacity: 1,
          duration: 2,
          ease: "power3.out",
          delay: 2,
          scrollTrigger: {
            trigger: ".concept_img",
            start: "top 50%",
            end: "top -120%",
            scrub: 0.2,
          },
        },
      );
      gsap.fromTo(
        ".concept_img2",
        {
          transform: "rotate(-70deg) skew(0deg,20deg) scale(0.5)",
          bottom: 100,
          opacity: 0,
        },
        {
          transform: "rotate(0deg) skew(-10deg, -50deg) scale(3) ",
          bottom: -100,
          opacity: 0.8,
          duration: 2,
          ease: "power3.out",
          delay: 2,
          scrollTrigger: {
            trigger: ".concept_img",
            start: "top 50%",
            end: "top -120%",
            scrub: 0.2,
          },
        },
      );
    },

    { scope: concept },
  );
  return (
    <div id="concept" className=" mt-[30px]" ref={concept}>
      <div className=" md:flex-row mb-48">
        <h3 className="my-24 text-left reveal_text1">
          Body as a vessel to express <br></br>and a tool to connect.{" "}
        </h3>
        <div className="flex justify-center relative z-[2]">
          <Image
            className="absolute concept_img blur-[1px] hue-rotate-[100deg]    "
            src={`/img/bubbles.png`}
            alt="BeingBodyConcept"
            width={500}
            height={500}
          />
          <Image
            className=" concept_img2 blur-[10px] hue-rotate-[30deg]    "
            src={`/img/bubbles.png`}
            alt="BeingBodyConcept"
            width={500}
            height={500}
          />
        </div>
        <h3 className="my-24 text-right reveal_text2">
          Creating pathways for healing, <br></br>well being and growth.
        </h3>
      </div>
    </div>
  );
}
