"use client";

import { useRef, useState } from "react";
import Background from "@/components/Background";
import BookButton from "@/components/BookButton";
import Bubble from "@/components/Bubble";
import Container from "@/components/Container";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Modal from "@/components/Modal";
import { CalBookingEmbed } from "@/components/CalBookingEmbed";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function Page() {
  const container = useRef<HTMLDivElement | null>(null);
  const [openCalendar, setOpenCalendar] = useState(false);

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
            start: "top 65%",
            toggleActions: "play none none reverse",
          },
        },
      );
    },
    { scope: container },
  );

  return (
    <Container classname="w-full justify-start items-start mt-10 overflow-hidden">
      <div ref={container} className="w-full relative">
        <Background rotate={50} imageClassName="opacity-100" />
        <Image
          alt="aroma logo"
          src={"/img/flower.webp"}
          width={800}
          height={1800}
          className="absolute opacity-20 right-0 top-30 md:top-0 !z-[-20]"
        />
        <div className="w-full relative">
          <div className="flex flex items-center  border-b border-slate-400">
            <Image
              className="mr-6 pb-2 rotate-[90deg]"
              src={"/icons/hands1.svg"}
              width={80}
              height={80}
              alt="icon"
            />

            <div>
              <h1 className="zeppelin">Massage Therapy</h1>
            </div>
          </div>
          <div className="mb-6 w-full">
            <p className="reveal-p md:!text-[32px] !text-[24px] !mt-2 !text-left">
              Bodywork sessions that relieve tension, ease pain and restore
              balance to body and mind. <br></br>
              Working with attention and love to discover roots of pain and
              dissolve them.<br></br>
            </p>
          </div>
          <div className=" ">
            <h3 className="zeppelin  reveal-p  !text-right !mt-24  ">
              Various techniques
            </h3>
          </div>
          <p className="handWrite2  w-full !text-right !mb-16 md:!text-[22px]">
            Guided by what the body tells me. <br />
            Your input and intention is key to each session, I am but the
            conduit of your connection.
            <br />
            My goal is to use elements of different therapeutic practices in
            harmony, <br />
            to generate a holistic experience in alignment with each individuals
            healing path.
          </p>{" "}
          <BookButton />
          <div className="w-full flex justify-center">
            <h3 className="zeppelin reveal-p border-b w-[100%] md:!w-[50%] !mt-8  border-t text-center border-slate-400">
              Presence in touch
            </h3>
          </div>
          <div className="w-full flex flex-col items-center mb-8">
            <div className="bg-white massage-hero-wrapper relative sm:w-full md:w-[70%] lg:w-[40%] h-[80vh] my-8 flex items-center overflow-hidden rounded-full">
              <Image
                className="massage-hero-image z-0  !opacity-90 rounded-full left-0 top-0 object-cover"
                src={"/photos/massage2.webp"}
                fill
                sizes="(min-width: 1024px) 50vw, (min-width: 768px) 80vw, 100vw"
                alt="icon"
              />

              <div className="px-15 flex flex-col items-center z-20">
                <p className="  !text-white !text-center !text-[26px] md:!text-[30px]  ">
                  With knowledge of body mechanics and alignment I map the body
                  using fluid, rhythmic motion to restore energy and aide
                  circulation. <br />
                  <br />
                  Through gentle pressure and focus on trigger points I relax
                  and release tension with the help of mindful breath.
                </p>
              </div>
            </div>
          </div>
          <div className="w-full flex justify-center ">
            <h3 className="!mt-20 zeppelin border-y max-w-[100%] md:!max-w-[50%] border-slate-400 reveal-p  !text-center">
              Rhythmical symbiosis of movement and breath; a dance between giver
              and receiver
            </h3>
          </div>
        </div>
        <div className=" w-full flex flex-col justify-center items-center md:px-18 !my-26">
          <div className="w-full flex flex-col items-center lg:grid lg:grid-cols-1 lg:gap-x-16 lg:gap-y-20 lg:items-start">
            <div className="flex flex-col items-center xl:px-16 ">
              <Bubble
                text={"Aroma Therapy"}
                className="mt-6 "
                delay={3 + "s"}
                size={28}
                fontSize="24px"
              />
              <p className="reveal-p !my-16 lg:!my-8 handWrite2 max-w-[100%] md:max-w-[60%] !text-center !text-[24px] ">
                Aromatherapy goes deeply into the psyche on all levels of human
                experience, influencing feeling and enhancing mind, mood and
                emotion. I blend oils for each session, a mix for each
                individual based on their intentions.
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
              <p className="reveal-p !my-16 lg:!my-8 handWrite2 max-w-[100%] md:max-w-[60%] !text-center !text-[24px] ">
                Knowledge of body mechanics and meridian lines allows me to map
                the bodies various pathways, using Metta, loving kindness, in
                forms of deep and rhythmic pressure.{" "}
              </p>
            </div>

            <div className="flex flex-col items-center xl:px-16 ">
              <Bubble
                text={"Circulatory"}
                className="mt-6"
                delay={1 + "s"}
                size={20}
                fontSize="24px"
              />
              <p className="reveal-p !my-16 lg:!my-8 handWrite2 max-w-[100%] md:max-w-[60%] !text-center !text-[24px] ">
                Working in long flowing motions to incorporate multiple parts of
                the body instead of isolating them. This instigates peace and
                stability that is found when a specific focus cannot be made but
                instead, a full feeling.
              </p>
            </div>

            <div className="flex flex-col items-center xl:px-16 ">
              <Bubble
                text={"Pressure Points"}
                className="mt-6"
                delay={2 + "s"}
                size={28}
                fontSize="24px"
              />

              <p className="reveal-p !my-16 lg:!my-8 handWrite2 max-w-[100%] md:max-w-[60%] !text-center !text-[24px] ">
                Finding points along the energy pathways that, when triggered,
                can stimulate the nervous system to provide relief from pain and
                stress.
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
          <div className="w-full flex flex-col items-center mb-8">
            <div className="massage-hero-wrapper relative sm:w-full md:w-[70%] lg:w-[40%] h-[80vh] my-8 flex items-center overflow-hidden rounded-full">
              <Image
                className="massage-hero-image z-[-1] opacity-80 rounded-full left-0 top-0 object-cover"
                src={"/photos/massage3.jpg"}
                fill
                sizes="(min-width: 1024px) 50vw, (min-width: 768px) 80vw, 100vw"
                alt="icon"
              />
              <h1
                onClick={() => setOpenCalendar(true)}
                className="zeppelin !text-[32px] p-8 !text-white !underline"
              >
                View Calendar
              </h1>
            </div>
          </div>
          {openCalendar && (
            <Modal close={() => setOpenCalendar(false)} color="bg-[#f8f5f0]">
              {(requestClose) => (
                <div className="mx-auto flex w-full max-w-5xl flex-col pb-4">
                  <div className="mb-6 flex items-start justify-between gap-5">
                    <div>
                      <h3 className="!mb-1 !text-[28px] sm:!text-[32px]">
                        Book your Massage
                      </h3>
                      <p className="handWrite2 !mt-0 !text-left !text-[18px] sm:!text-[20px]">
                        Choose a date and time that feels right for you.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={requestClose}
                      aria-label="Close calendar"
                      className="shrink-0 rounded-full border border-slate-500/35 bg-white/60 px-4 py-2 !text-[20px] transition hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-500"
                    >
                      Close
                    </button>
                  </div>
                  <CalBookingEmbed
                    eventUrl={process.env.NEXT_PUBLIC_CALCOM_MASSAGE_URL!}
                  />
                </div>
              )}
            </Modal>
          )}
        </div>
      </div>
    </Container>
  );
}
