"use client";

import { useRef } from "react";
import Background from "@/components/Background";
// import Bubble from "@/components/Bubble";
import Container from "@/components/Container";
import OilCard from "@/components/OilCard";
import OilsShowcaseCarousel from "@/content/OilsShowcaseCarousel";
import { oils } from "@/content/oils";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import Image from "next/image";

const rituals = [
  {
    name: "Ointment",
    instruction: "Roll or rub 1 to 3 drops directly into the skin",
    delay: "0s",
  },
  {
    name: "Room Diffuser",
    instruction: "Add 2 to 3 drops to a bowl of hot water",
    delay: "1s",
  },
  {
    name: "Massage",
    instruction: "Add 5 to 7 drops to a cupped palm’s worth of base oil",
    delay: "2s",
  },
];

export default function OilsPage() {
  const container = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      const page = container.current;
      if (!page) return;

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

      const oilCards = gsap.utils.toArray<HTMLElement>(".oil-card");
      const cardMedia = gsap.matchMedia();

      cardMedia.add("(max-width: 767px)", () => {
        gsap.set(oilCards, { autoAlpha: 0, x: 0, y: 24 });

        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (!entry.isIntersecting) return;

              const card = entry.target as HTMLElement;
              observer.unobserve(card);
              gsap.to(card, {
                autoAlpha: 1,
                y: 0,
                duration: 0.9,
                ease: "power3.out",
              });
            });
          },
          { rootMargin: "0px 0px -24px", threshold: 0.08 },
        );

        oilCards.forEach((card) => observer.observe(card));
        return () => observer.disconnect();
      });

      cardMedia.add("(min-width: 768px)", () => {
        oilCards.forEach((card, index) => {
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
                once: true,
                invalidateOnRefresh: true,
              },
            },
          );
        });
      });

      // Production image/font loading can change this long page after
      // ScrollTrigger first measures it. Refresh the remaining scroll-driven
      // animations once the final layout is available.
      const refresh = gsap
        .delayedCall(0.1, () => ScrollTrigger.refresh())
        .pause();
      const scheduleRefresh = () => refresh.restart(true);
      const pendingImages = Array.from(page.querySelectorAll("img")).filter(
        (image) => !image.complete,
      );

      pendingImages.forEach((image) => {
        image.addEventListener("load", scheduleRefresh, { once: true });
        image.addEventListener("error", scheduleRefresh, { once: true });
      });

      if (document.readyState === "complete") {
        scheduleRefresh();
      } else {
        window.addEventListener("load", scheduleRefresh, { once: true });
      }

      void document.fonts?.ready.then(scheduleRefresh);

      return () => {
        cardMedia.revert();
        refresh.kill();
        window.removeEventListener("load", scheduleRefresh);
        pendingImages.forEach((image) => {
          image.removeEventListener("load", scheduleRefresh);
          image.removeEventListener("error", scheduleRefresh);
        });
      };
    },
    { scope: container },
  );

  return (
    <Container classname="w-full items-start justify-start mt-10 overflow-hidden">
      <div ref={container} className="w-full relative">
        <Image
          alt="aroma logo"
          src={"/img/aroma.webp"}
          width={800}
          height={1800}
          className="absolute opacity-20 right-0"
        />
        <Background rotate={330} imageClassName="opacity-100" />
        <header className="relative w-full">
          <div className="flex items-center border-b border-slate-400 ">
            <Image
              className="mr-6 pb-2"
              src="/icons/oil12.svg"
              width={80}
              height={80}
              alt="Oils"
              priority
            />
            <h1 className="zeppelin">Oils</h1>
          </div>
        </header>{" "}
        <p className="reveal-p relative z-10 max-w-5xl !text-left !text-[20px] leading-relaxed md:!text-[26px]">
          Aromatherapy oil blends thoughtfully handcrafted using pure botanical
          essential oils. Each blend is inspired by the healing wisdom of
          nature.
          <br /> a unique vision carefully created to evoke a specific feeling,
          support intention, and nurture the mind, body, and spirit.
        </p>{" "}
        <div className="border-y w-[100%] md:!w-[50%] border-slate-400 mx-auto mt-16 flex flex-col w-full w-full flex items-center justify-center  ">
          <h2 className="zeppelin !text-[30px]  font-normal sm:!text-[34px]">
            : : Offerings : :
          </h2>
        </div>
        <OilsShowcaseCarousel />
        <section className="relative  mx-auto mt-2 w-full max-w-6xl">
          <h3 className=" border-t border-slate-400 zeppelin reveal-p    !text-center  !text-[36px] tracking-[0.18em]">
            : : Uses and Rituals : :
          </h3>
          <p className="handWrite2 reveal-p mx-auto !mb-20 !mt-10 w-full !text-center md:!text-[24px] leading-relaxed">
            There are no rules for exploring them, <br></br>but here are some
            ideas and intentions to spark your own unique, feeling, and
            ever-evolving practice.
          </p>
          <div className="lg:w-[70%] mx-auto mt-12 grid grid-cols-1 items-center  md:grid-cols-3 ">
            {rituals.map((ritual, i) => (
              <div key={ritual.name} className="flex flex-col items-center ">
                <h1 className="zeppelin border-t border-slate-400">
                  {ritual.name}
                </h1>

                <Image
                  src={`/img/oil_use_${i}.png`}
                  height={800}
                  width={300}
                  alt={ritual.name}
                  className={`rounded-full m-4 p-2 shadow  `}
                />
                {/* <Bubble
                  text={ritual.name}
                  className="mt-4 w-"
                  delay={ritual.delay}
                  size={20}
                  fontSize={"20px"}
                /> */}
                <p className="reveal-p sm:mb-0 mb-6 !mt-10 max-w-[270px] !text-center !text-[24px] leading-relaxed">
                  {ritual.instruction}
                </p>
              </div>
            ))}
          </div>
        </section>
        <section className="relative mx-auto mb-24 mt-28 w-full max-w-7xl">
          <div className="reveal-p mb-12 flex items-center gap-5">
            <h3 className="!mb-0 shrink-0 !text-[38px]">
              {" "}
              Explore my oil blends
            </h3>
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
