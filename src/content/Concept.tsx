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
    <div id="concept" className="">
      <div className="sectionBody   ">
        <div className="flex flex-col justify-start items-start ">
          <h3 className="my-8">
            Body is a vessel to express and a tool to connect.{" "}
          </h3>
          <p>
            Creating pathways for healing, well being and spiritual growth. My
            goal is to generate a healing experience through the harmonisation
            of body, mind and spirit. To create a safe space to connect with,
            explore and listen to the self through guided corporal awareness:
          </p>

          <h3 className="my-8">When you truly listen, the body will speak.</h3>
          <p> All bodies welcome, valid and celebrated. </p>
        </div>
        <Image
          className="concept_img"
          src={`/img/concept.png`}
          alt="BeingBodyConcept"
          width={300}
          height={300}
        />
      </div>
    </div>
  );
}
