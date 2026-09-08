"use client";
import ConceptArtwork from "@/components/ConceptArtwork";
import { gsap, useGSAP } from "@/lib/gsap";
import { useRef } from "react";

export default function Concept() {
  const concept = useRef<HTMLDivElement | null>(null);
  const textRevealArray = [".reveal_text1", ".reveal_text2"];

  useGSAP(
    () => {
      textRevealArray.forEach((x, i) =>
        gsap.from(x, {
          x: i == 0 ? "-100" : "0",
          y: 40,
          autoAlpha: 0,
          duration: 0.8,
          force3D: true,
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
          rotation: 70,
          skewX: 10,
          skewY: 20,
          scale: 2,
          autoAlpha: 0,
        },
        {
          rotation: 0,
          skewX: -20,
          skewY: -10,
          scale: 1,
          autoAlpha: 1,
          duration: 2,
          ease: "power3.out",
          delay: 2,
          force3D: true,
          scrollTrigger: {
            trigger: ".concept_img",
            start: "top 50%",
            end: "top -120%",
            scrub: 0.2,
            invalidateOnRefresh: true,
          },
        },
      );
      gsap.fromTo(
        ".concept_img2",
        {
          rotation: -70,
          skewX: 0,
          skewY: 20,
          scale: 0.5,
          y: 100,
          autoAlpha: 0,
        },
        {
          rotation: 0,
          skewX: -10,
          skewY: -50,
          scale: 3,
          y: -100,
          autoAlpha: 0.8,
          duration: 2,
          ease: "power3.out",
          delay: 2,
          force3D: true,
          scrollTrigger: {
            trigger: ".concept_img",
            start: "top 50%",
            end: "top -120%",
            scrub: 0.2,
            invalidateOnRefresh: true,
          },
        },
      );
    },

    { scope: concept },
  );
  return (
    <div id="concept" className=" w-full" ref={concept}>
      <div className=" md:flex-row w-full ">
        <h3 className="my-24 text-left reveal_text1">
          A vessel to express <br></br>and a tool to connect.{" "}
        </h3>
        <div className="flex justify-center relative z-[2]">
          <ConceptArtwork
            className="concept_img"
            variant="sharp"
            absolute
          />
          <ConceptArtwork
            className="concept_img2"
            variant="soft"
          />
        </div>
        <h3 className="my-24 text-right reveal_text2">
          Creating pathways for healing, <br></br>well being and growth.
        </h3>
      </div>
    </div>
  );
}
