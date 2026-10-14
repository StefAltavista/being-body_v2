"use client";

import { useRef } from "react";
import Background from "@/components/Background";
import Bubble from "@/components/Bubble";
import Container from "@/components/Container";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AvailabilityCalendar from "@/components/AvailabilityCalendar";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const movementImages = [
  {
    src: "/photos/pilates/reformer.webp",
    alt: "Pilates practice on a reformer",
    caption: "strength with support",
    figureClassName: "w-[88%] lg:w-full m-0",
    frameClassName: "[border-radius:48%_48%_46%_54%/34%_38%_62%_66%]",
    imageClassName: " saturate-80 ",
  },
  {
    src: "/photos/pilates/chair.webp",
    alt: "Pilates chair practice in the studio",
    caption: "balance and control",
    figureClassName: "w-[88%] lg:w-full m-0 justify-self-end lg:mt-24",
    frameClassName: "[border-radius:52%_48%_54%_46%/63%_61%_39%_37%]",
    imageClassName: " saturate-80 ",
  },
  {
    src: "/photos/pilates/shortSpine.webp",

    alt: "Pilates movement with the legs extended",
    caption: "space to explore",
    figureClassName: "w-[88%] lg:w-full m-0 justify-self-center lg:mt-8",
    frameClassName: "[border-radius:46%_54%_43%_57%/42%_37%_63%_58%]",
    imageClassName: " saturate-80 ",
  },
];

export default function PilatesPage() {
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
        ".pilates-hero-image",
        {
          opacity: 0,
          scaleX: 5,
          filter: "blur(20px)",
          transformOrigin: "center center",
        },
        {
          opacity: 1,
          scaleX: 1,
          filter: "blur(0px)",
          duration: 3.5,
          ease: "power3.out",
        },
      );

      gsap.utils
        .toArray<HTMLElement>(".pilates-photo")
        .forEach((photo, index) => {
          gsap.fromTo(
            photo,
            {
              opacity: 0,
              y: 70,
              rotate: index === 1 ? 3 : -3,
            },
            {
              opacity: 1,
              y: 0,
              rotate: 0,
              duration: 1.15,
              ease: "power3.out",
              scrollTrigger: {
                trigger: photo,
                start: "top 88%",
                toggleActions: "play none none none",
              },
            },
          );
        });
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
              alt=""
            />

            <h1 className="zeppelin">Pilates</h1>
          </div>
          <p className=" reveal-p !m-0 !text-[24px] md:!text-[24px] ">
            Thoughtfully guided movement sessions encouraging body awareness
            through intentional movement and breath.<br></br>
            Shift the focus of ‘fitness’ into that of a movement practice, using
            it as a device to improve mobility, elevate pain, broaden
            perspective and connect with the self.
          </p>

          <div className="w-full relative py-16">
            <div className="w-full max-w-[1180px] mx-auto grid grid-cols-1 lg:grid-cols-3 items-start gap-8 lg:gap-12">
              {movementImages.map((image) => (
                <figure
                  className={`pilates-photo ${image.figureClassName}`}
                  key={image.src}
                >
                  <div
                    className={`group relative aspect-[0.72] overflow-hidden shadow-[0_22px_45px_rgba(29,66,84,0.16)] ${image.frameClassName}`}
                  >
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      sizes="(min-width: 1024px) 29vw, 82vw"
                      className={`object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.2,0.75,0.25,1)] group-hover:scale-[1.035] motion-reduce:transition-none ${image.imageClassName}`}
                    />
                  </div>

                  <figcaption className="handWrite2 !mt-4 !text-[clamp(1.15rem,2vw,1.45rem)] !text-center">
                    {image.caption}
                  </figcaption>
                </figure>
              ))}
            </div>
            <div className="w-full max-w-[900px] mx-auto my-24 flex flex-col gap-7">
              <p className="reveal-p !m-0 !text-[21px] md:!text-[25px] !text-center text-balance">
                The apparatus gives movement something to respond to —
                resistance, support and clear feedback — while mat work asks the
                body to find its own organisation. I move between both, choosing
                what helps the body listen, adapt and build trust.
              </p>
            </div>{" "}
          </div>
        </div>

        <div className="w-full flex flex-col justify-center items-center ">
          <h3 className="zeppelin mb-16 border-b !text-center">
            Different Practices
          </h3>

          <div className="w-full flex flex-col items-center lg:grid lg:grid-cols-2 lg:gap-x-16 lg:gap-y-20 lg:items-start">
            <div className="flex flex-col items-center xl:px-16">
              <Bubble
                text="Align & Flow  Reformer"
                className="mt-6"
                delay="0s"
                fontSize="28px"
                size={36}
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
                text="Dynamic Mobility Mat"
                className="mt-6"
                delay="1s"
                fontSize="28px"
                size={36}
              />

              <p className="reveal-p !my-16 lg:!my-8 handWrite2">
                Training focused on functional movement — Pilates foundations to
                align, strengthen and heighten neuromuscular control, mixed with
                dynamic stretching to improve range of motion, increase blood
                circulation and reduce muscle tension.
              </p>
            </div>
          </div>
          <h3 className="zeppelin mb-16 border-b !text-center">
            Next Availabilities
          </h3>

          <AvailabilityCalendar />
          <div className="flex w-full justify-center items-center pilates-hero-wrapper relative w-full md:w-[70%] lg:w-[42%] h-[76vh] md:h-[80vh] mt-8 overflow-hidden rounded-full">
            <Image
              className="pilates-hero-image rounded-full left-0 top-0 object-cover "
              src="/photos/pilates/katia.png"
              fill
              priority
              sizes="(min-width: 1024px) 42vw, (min-width: 768px) 70vw, 100vw"
              alt="Pilates short spine practice with the feet in straps"
            />
          </div>
        </div>

        <div className="w-full flex flex-col items-center !mt-20 !mb-24">
          <p className="reveal-p !text-[34px] md:!text-[40px] !text-center">
            If you are curious to…
          </p>

          <ul className="reveal-p handWrite2 !my-8 !text-center list-none">
            <li>book a private session</li>
            <li>explore apparatuses</li>
            <li>move on the mat</li>
          </ul>

          <Link
            href="/contacts"
            className="relative flex h-[120px] w-[120px] flex-col items-center justify-center rounded-full border border-white/50 bg-gradient-to-br from-pink-200/70 to-sky-200/70 text-center shadow-[inset_0_2px_10px_rgba(255,255,255,0.85),inset_0_-8px_16px_rgba(255,255,255,0.18),0_0_18px_rgba(255,255,255,0.22)] backdrop-blur-sm transition-transform duration-300 hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#254f66] motion-reduce:transition-none"
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
