"use client";

import { useRef } from "react";
import Image from "next/image";

import Background from "@/components/Background";
import Bubble from "@/components/Bubble";
import Container from "@/components/Container";
import OilCard from "@/components/OilCard";
import { oils } from "@/content/oils";
import { gsap, useGSAP } from "@/lib/gsap";

const rituals = [
  {
    name: "Ointment",
    instruction: "Roll or rub 1 to 3 drops directly into the skin.",
    delay: "0s",
  },
  {
    name: "Room Diffuser",
    instruction: "Add 2 to 3 drops to a bowl of hot water.",
    delay: "1s",
  },
  {
    name: "Massage",
    instruction: "Add 5 to 7 drops to a cupped palm’s worth of base oil.",
    delay: "2s",
  },
];

export default function OilsPage() {
  const container = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      gsap.utils.toArray<HTMLElement>(".reveal-p").forEach((element) => {
        gsap.fromTo(
          element,
          { autoAlpha: 0, y: 26 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: element,
              start: "top 90%",
              toggleActions: "play none none reverse",
            },
          },
        );
      });

      gsap.utils.toArray<HTMLElement>(".oil-card").forEach((card, index) => {
        gsap.fromTo(
          card,
          {
            autoAlpha: 0,
            x: index % 2 === 0 ? -45 : 45,
            y: 35,
          },
          {
            autoAlpha: 1,
            x: 0,
            y: 0,
            duration: 1.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 86%",
              toggleActions: "play none none reverse",
            },
          },
        );
      });
    },
    { scope: container },
  );

  return (
    <Container classname="w-full items-start justify-start mt-10 overflow-hidden">
      <div ref={container} className="w-full">
        <Background rotate={330} imageClassName="opacity-100" />

        <header className="relative w-full">
          <div className="flex items-center">
            <Image
              className="mr-6 brightness-0 pb-2"
              src="/icons/oil12.svg"
              width={80}
              height={80}
              alt="Oils"
              priority
            />
            <h1>Oils</h1>
          </div>
        </header>
        <div className=" reveal-p rounded flex justify-between md:flex-row flex-col items-start mb-16">
          <div>
            {" "}
            <p className=" !text-left md:!text-[32px] !text-[22px] leading-relaxed">
              Aromatherapy oil blends thoughtfully handcrafted using pure
              botanicals.<br></br> <br></br> <br></br> Each blend is inspired by
              the healing wisdom of nature. unique vision and carefully created
              to evoke a specific feeling, support intention, and nurture the
              mind, body, and spirit.
            </p>{" "}
            <p className="handWrite2 reveal-p mx-auto !mb-20 !mt-10 w-full !text-left md:!text-[26px] leading-relaxed">
              Our senses allow us to connect to the world around us. <br></br>
            </p>
          </div>
          <Image
            src={"/img/oils/hero.png"}
            width={300}
            height={300}
            alt={"Being body oil blends"}
            className="ml-6 animate-bubble-float  border border-blue-100 rounded-full opacity-70 md:w-[600px] md:h-[600px] w-[400px] h-[400px]"
          />
        </div>
        <section className="relative  mx-auto mt-14 w-full max-w-6xl">
          <h3 className="reveal-p  !mt-26 !my-2 !text-center  !text-[36px] tracking-[0.18em]">
            : : : : Uses &amp; Rituals : : : :
          </h3>
          <p className="handWrite2 reveal-p mx-auto !mb-20 !mt-10 w-full !text-center md:!text-[24px] leading-relaxed">
            There are no rules for exploring them, <br></br>but here are some
            ideas and intentions to spark your own unique, feeling, and
            ever-evolving practice.
          </p>
          <div className="mt-12 grid grid-cols-1 items-center gap-14 md:grid-cols-3 md:gap-10">
            {rituals.map((ritual) => (
              <div key={ritual.name} className="flex flex-col items-center">
                <Bubble
                  text={ritual.name}
                  className="mt-4 w-"
                  delay={ritual.delay}
                  size={36}
                  fontSize={"26px"}
                />
                <p className="reveal-p  !mt-10 max-w-[270px] !text-center !text-[26px] leading-relaxed">
                  {ritual.instruction}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="relative mx-auto mb-24 mt-28 w-full max-w-7xl">
          <div className="reveal-p mb-12 flex items-center gap-5">
            <h3 className="!mb-0 shrink-0 !text-[38px]">Offerings</h3>
            <div className="h-px w-full bg-slate-500/25" />
          </div>

          <div className="flex flex-col gap-16 lg:gap-24">
            {oils.map((oil, index) => (
              <OilCard
                key={oil.name}
                oil={oil}
                imageOnRight={index % 2 === 1}
              />
            ))}
          </div>
          <p className="handWrite2 !mt-7 !text-left !text-[18px] leading-relaxed opacity-80">
            * In collaboration with dear friend and studio mate @ava.ink, who
            made the beautiful booklets that come with each oil.
          </p>
        </section>
      </div>
    </Container>
  );
}
