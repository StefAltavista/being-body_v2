"use client";

import { useRef } from "react";
import Background from "@/components/Background";
import BookButton from "@/components/BookButton";
import Bubble from "@/components/Bubble";
import Container from "@/components/Container";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function Page() {
  const container = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      const paragraphs = gsap.utils.toArray<HTMLParagraphElement>(".reveal-p");

      paragraphs.forEach((paragraph) => {
        gsap.fromTo(
          paragraph,
          {
            opacity: 0,
            y: 28,
          },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: paragraph,
              start: "top bottom",
              end: "bottom 50%",
              scrub: 0,
            },
          },
        );
      });

      gsap.fromTo(
        ".massage-hero-image",
        {
          opacity: 0,
          scaleX: 5,
          filter: "blur(20px)",
          transformOrigin: "center center",
        },
        {
          opacity: 0.8,
          scaleX: 1,
          filter: "blur(0px)",
          duration: 3.5,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".massage-hero-wrapper",
            start: "top 55%",
            toggleActions: "play none none reverse",
          },
        },
      );
    },
    { scope: container },
  );

  return (
    <Container classname="w-full justify-start items-start mt-10 overflow-hidden">
      <div ref={container} className="w-full">
        <Background rotate={50} imageClassName="opacity-100" />

        <div className="w-full relative">
          <div className="flex flex items-center ">
            <Image
              className="mr-6 brightness-0 pb-2 rotate-[90deg]"
              src={"/icons/hands1.svg"}
              width={80}
              height={80}
              alt="icon"
            />

            <div>
              <h1>Massage Therapy</h1>
            </div>
          </div>

          <div className="mb-6 w-full">
            <p className="reveal-p md:!text-[32px] !text-[22px] !mt-8 !text-left">
              Guided bodywork sessions that relieve tension, ease pain and
              restore balance to body and mind. <br></br>
              Working with attention and love to discover roots of pain and
              dissolve them.<br></br>
            </p>
            <p className="handWrite2 !text-center w-full !mt-16 md:!text-[26px]">
              "I use a mix of techniques, <br></br>guided by what the body tells
              me.""
            </p>
          </div>
          <BookButton />

          <div className="w-full flex flex-col items-center mb-8">
            <div className="massage-hero-wrapper relative sm:w-full md:w-[80%] lg:w-[50%] h-[80vh] my-8 flex items-center overflow-hidden rounded-full">
              <Image
                className="massage-hero-image z-[-1] opacity-80 rounded-full left-0 top-0 object-cover"
                src={"/photos/massage2.jpg"}
                fill
                alt="icon"
              />

              <div className="px-15 flex flex-col items-center">
                <h3 className="reveal-p !text-white mb-8">Presence in touch</h3>

                <p className="reveal-p  !text-white  !text-[28px] ">
                  With knowledge of body mechanics and alignment, I map the body
                  using fluid, rhythmic motion to restore energy circulation,
                  relax and release with gentle pressure applied through natural
                  gravity, and focus on trigger and pressure points to release
                  tension and pain with the help of mindful breath. <br />
                  <br />I see this rhythmical symbiosis of movement and breath
                  to be a dance between giver and receiver.
                </p>
              </div>
            </div>
          </div>

          <p className="handWrite2 reveal-p !text-[26px] !text-center">
            Your input and intention is key to each session, I am but the
            conduit of your connection.
            <br />
            My goal is to use elements of different therapeutic practices in
            harmony, to generate a holistic experience in alignment with each
            individuals healing path.
          </p>
        </div>
        <div className=" w-full flex flex-col justify-center items-center md:px-18 !my-26">
          <div className="w-full flex flex-col items-center lg:grid lg:grid-cols-1 lg:gap-x-16 lg:gap-y-20 lg:items-start">
            <div className="flex flex-col items-center xl:px-16 ">
              <Bubble
                text={"Aroma Therapy"}
                className="mt-6 "
                delay={3 + "s"}
                size={36}
                fontSize="28px"
              />
              <p className="reveal-p !my-16 lg:!my-8 handWrite2 !text-center md:!text-[26px]">
                Emotions are part of the human experience. These complex
                internal reactions are somewhat mysterious, and though they
                differ from person to person, they have a serious impact on our
                happiness and wellbeing. Aromatherapy goes very deeply into the
                psyche on all levels of human experience, influencing feeling
                and enhancing mind, mood and emotion. I blend oils for each
                session, a mix for each individual based on their pain and their
                intentions.
                <br />
              </p>
            </div>

            <div className="flex flex-col items-center xl:px-16 ">
              <Bubble
                text={"Energy Lines"}
                className="mt-6"
                delay={0 + "s"}
                size={20}
                fontSize="22px"
              />
              <p className="reveal-p !my-16 lg:!my-8 handWrite2 !text-center md:!text-[26px]">
                Using my knowledge of body mechanics and taught me to map the
                body through lines of energy using Metta, loving kindness, in
                forms of deep static and rhythmic pressure.
              </p>
            </div>

            <div className="flex flex-col items-center xl:px-16 ">
              <Bubble
                text={"Circulatory"}
                className="mt-6"
                delay={1 + "s"}
                size={36}
                fontSize="28px"
              />
              <p className="reveal-p !my-16 lg:!my-8 handWrite2 !text-center md:!text-[26px]">
                I work with the body in long flowing motions, incorporating
                multiple parts of the body instead of isolating them,
                instigating a peace and stability that can only be found in the
                mind when a specific focus cannot be made, but instead a full
                feeling.
              </p>
            </div>

            <div className="flex flex-col items-center xl:px-16 ">
              <Bubble
                text={"Pressure Points"}
                className="mt-6"
                delay={2 + "s"}
                size={28}
                fontSize="28px"
              />
              <p className="reveal-p !my-16 lg:!my-8 handWrite2 !text-center md:!text-[26px]">
                <strong>Trigger points </strong> gave me the ability to find
                painful and tense areas in the muscles and fascia and release
                them, assisting in achieving long term results.
                <br />
              </p>
            </div>
          </div>

          {/* <Image
    className="rounded-full !px-8 my-6"
    src={"/photos/circle.jpg"}
    width={400}
    height={400}
    alt="icon"
  /> */}
        </div>
      </div>
    </Container>
  );
}
