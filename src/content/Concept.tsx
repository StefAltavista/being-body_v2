"use client";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";

export default function Concept({ format }: { format: string }) {
  gsap.registerPlugin(ScrollTrigger);

  const container = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      gsap.fromTo(
        ".concept_img",
        {
          transform: "rotate(50deg) ",
          opacity: 0,
        },
        {
          transform: "rotate(0deg)",
          opacity: 1,
          duration: 2,
          ease: "power3.out",
          delay: 2,
          scrollTrigger: {
            trigger: ".concept_img",
            start: "top 70%",
            end: "top -100%",
            scrub: 0.2,
          },
        },
      );
    },
    { scope: container },
  );
  return (
    <div id="concept" className=" mt-[30px]">
      <div className="sectionBody  md:flex-row ">
        <div className="flex flex-col items-end  ">
          <h3 className="my-8 text-right">
            Body is a vessel to express <br></br>and a tool to connect.{" "}
          </h3>
          <h3 className="my-8 text-right">
            Creating pathways for healing, <br></br>well being and spiritual
            growth.
          </h3>
        </div>
        <div className="flex justify-center" ref={container}>
          <Image
            className="concept_img blur-[1px] hue-rotate-[100deg]    "
            src={`/img/bubbles.png`}
            alt="BeingBodyConcept"
            width={500}
            height={500}
          />
        </div>
        <p className="handWrite2">
          My goal is to generate a healing experience through the harmonisation
          of body, mind and spirit. To create a safe space to connect with,
          explore and listen to the self through guided corporal awareness.
        </p>
      </div>
    </div>
  );
}
