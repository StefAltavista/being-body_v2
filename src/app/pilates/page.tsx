"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import Background from "@/components/Background";
import Bubble from "@/components/Bubble";
import Container from "@/components/Container";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function PilatesPage() {
  const container = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      const paragraphs = gsap.utils.toArray<HTMLElement>(".reveal-p");

      paragraphs.forEach((paragraph) => {
        gsap.fromTo(
          paragraph,
          { opacity: 0, y: 28 },
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
        ".pilates-hero-image",
        {
          opacity: 0,
          scale: 1.08,
          filter: "blur(20px)",
          transformOrigin: "center center",
        },
        {
          opacity: 0.8,
          scale: 1,
          filter: "blur(0px)",
          duration: 3.5,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".pilates-hero-wrapper",
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
        <Background rotate={200} imageClassName="opacity-100" />

        <div className="w-full relative">
          <div className="flex items-center">
            <Image
              className="mr-6 brightness-0 pb-2"
              src="/icons/stretching.svg"
              width={80}
              height={80}
              alt="Pilates"
            />

            <h1>Pilates</h1>
          </div>

          <div className="mb-6">
            <p className="reveal-p !text-[26px] !mt-8 !text-left">
              Thoughtfully guided Pilates and movement sessions encouraging Body
              awareness through intentional movement and breath.
            </p>
          </div>

          <div className="w-full grid grid-cols-1 lg:grid-cols-[minmax(280px,420px)_minmax(0,1fr)] gap-10 lg:gap-10 items-center mb-20">
            <div className="pilates-hero-wrapper relative w-full max-w-[420px] aspect-square justify-self-center lg:justify-self-end overflow-hidden rounded-[2rem]">
              <Image
                className="pilates-hero-image object-cover"
                // src="/photos/pilates1.png"
                src="/photos/pilates2.webp"
                fill
                sizes="(min-width: 1024px) 420px, 90vw"
                alt=""
              />
            </div>
            <div className="max-w-2xl">
              <h3 className="reveal-p !text-left mb-8">A movement practice</h3>

              <p className="reveal-p handWrite2">
                I want to shift the focus of ‘fitness’ into that of a movement
                practice, using it as a device to improve mobility, elevate
                pain, broaden perspective and connect with the self.
                <br />
                <br />
                apparatuses work as well as Mat work
              </p>
            </div>
          </div>
        </div>

        <div className="w-full flex flex-col justify-center items-center !mt-26">
          <h3 className="reveal-p !text-center">My current Weekly Schedule</h3>

          <div className="w-full flex flex-col items-center lg:grid lg:grid-cols-2 lg:gap-x-16 lg:gap-y-20 lg:items-start">
            <div className="flex flex-col items-center xl:px-16">
              <Bubble
                text="Align & Flow : Reformer"
                className="mt-6"
                delay="0s"
              />
              <p className="reveal-p !my-16 lg:!my-8 handWrite2">
                Resistance-based training that challenges deep stabilising
                muscles, focusing on building strength, finding connection and
                aligning the body. Mindful movement that improves balance,
                coordination and functional strength using breath as a guide to
                drop into the body and find a state of flow.
              </p>
            </div>

            <div className="flex flex-col items-center xl:px-16">
              <Bubble
                text="Dynamic Mobility : Mat"
                className="mt-6"
                delay="1s"
              />
              <p className="reveal-p !my-16 lg:!my-8 handWrite2">
                Training focused on functional movement - Pilates foundations to
                align, strengthen, and heighten neuromuscular control mixed with
                dynamic stretching to improve range of motion, increase blood
                circulation, and reduce muscle tension.
              </p>
            </div>
          </div>
        </div>

        <div className="w-full flex flex-col items-center !mt-16 !mb-20">
          <p className="reveal-p !text-[36px] !text-center">
            If you are curious to
          </p>

          <ul className="reveal-p handWrite2 !my-8 !text-center list-none">
            <li>book a private session</li>
            <li>Explore apparatuses</li>
            <li>Move on the mat</li>
          </ul>

          <Link
            href="/contacts"
            className="relative flex h-[120px] w-[120px] flex-col items-center justify-center rounded-full border border-white/50 bg-gradient-to-br from-pink-200/70 to-sky-200/70 text-center shadow-[inset_0_2px_10px_rgba(255,255,255,0.85),inset_0_-8px_16px_rgba(255,255,255,0.18),0_0_18px_rgba(255,255,255,0.22)] backdrop-blur-sm transition-transform duration-300 hover:scale-105"
          >
            <span className="pointer-events-none absolute left-[18%] top-[18%] h-8 w-8 rounded-full bg-white/45 blur-md" />
            <span className="handWrite2 relative z-10 text-[23px] leading-none">
              Contact me
            </span>
            <span className="handWrite2 relative z-10 mt-1 text-[19px] leading-none">
              Here
            </span>
          </Link>
        </div>
      </div>
    </Container>
  );
}
