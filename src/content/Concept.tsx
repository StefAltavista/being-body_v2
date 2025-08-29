"use client";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function Concept({ format }: { format: string }) {
  gsap.registerPlugin(ScrollTrigger);
  // useGSAP(() => {
  //   gsap.from(".concept_img", {
  //     scrollTrigger: {
  //       trigger: ".sectionBody",
  //       start: "top bottom",
  //       end: "bottom bottom",
  //       toggleActions: "restart reverse ",
  //       markers: true,
  //       scrub: 1,
  //     },
  //     opacity: 0,
  //     x: 700,
  //     y: -300,
  //     duration: 4,
  //   });
  // }, [{ scope: "#concept" }]);
  return (
    <div id="concept" className=" mt-[30px]">
      <div className="sectionBody   ">
        <div className="flex flex-col justify-start items-start ">
          <h3 className="my-8">
            Body is a vessel to express and a tool to connect.{" "}
          </h3>
          <p className="handWrite2">
            Creating pathways for healing, well being and spiritual growth. My
            goal is to generate a healing experience through the harmonisation
            of body, mind and spirit. To create a safe space to connect with,
            explore and listen to the self through guided corporal awareness.
          </p>
        </div>
        <Image
          className="concept_img blur-[1px] hue-rotate-[100deg]    "
          src={`/img/bubbles.png`}
          alt="BeingBodyConcept"
          width={500}
          height={500}
        />
      </div>
    </div>
  );
}
