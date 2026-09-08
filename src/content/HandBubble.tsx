"use client";

import { useRef } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import Image from "next/image";

export default function HandBubble() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const finalLogoRef = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;

      const handsImg = section.querySelector<HTMLElement>(".hands_img");
      const handsFloat = section.querySelector<HTMLElement>(".hands_float");
      const message = section.querySelector<HTMLElement>(".hands_message");
      const finalMessage = section.querySelector<HTMLElement>(
        ".hands_final_message",
      );
      const finalLogo = finalLogoRef.current;

      if (!handsImg || !handsFloat || !message || !finalMessage || !finalLogo)
        return;

      const bubbleHold = { progress: 0 };
      const messageHold = { progress: 0 };
      const finalHold = { progress: 0 };
      const logoHold = { progress: 0 };
      const precedingSection = document.querySelector<HTMLElement>(
        ".Book_appointment_button",
      );
      const refreshLayout = gsap
        .delayedCall(0.15, () => ScrollTrigger.refresh())
        .pause();
      const layoutObserver = new ResizeObserver(() => {
        refreshLayout.restart(true);
      });

      if (precedingSection) layoutObserver.observe(precedingSection);

      gsap.set(handsImg, {
        xPercent: -50,
        yPercent: -50,
        x: "50vw",
        y: () => -(window.innerHeight * 1.35 + window.innerWidth * 0.5),
        scale: 0.55,
        scaleX: 1,
        scaleY: 1,
        autoAlpha: 0,
        filter: "blur(4px)",
        transformOrigin: "center center",
        willChange: "transform, opacity, filter",
      });

      gsap.set(handsFloat, {
        x: 0,
        transformOrigin: "center center",
        willChange: "transform, opacity, filter",
      });

      gsap.set(message, {
        xPercent: -50,
        yPercent: -50,
        autoAlpha: 0,
        filter: "blur(10px)",
        transformOrigin: "center center",
        willChange: "transform, opacity, filter",
      });

      gsap.set(finalLogo, {
        xPercent: -50,
        yPercent: -50,

        autoAlpha: 0,
        opacity: 0,
        transformOrigin: "center center",
        willChange: "transform, opacity, filter",
      });

      gsap.set(finalMessage, {
        x: 0,
        autoAlpha: 0,
        filter: "blur(10px)",
        transformOrigin: "center center",
        willChange: "transform, opacity, filter",
      });

      gsap.to(handsImg, {
        x: 0,
        y: 0,
        scale: 1,
        scaleX: 1,
        scaleY: 1,
        autoAlpha: 1,
        filter: "blur(0px)",
        ease: "none",
        force3D: true,
        scrollTrigger: {
          trigger: section,
          start: () => `center bottom+=${window.innerWidth * 0.5}`,
          end: "center center",
          scrub: 1.2,
          invalidateOnRefresh: true,
        },
      });

      gsap
        .timeline({
          scrollTrigger: {
            trigger: section,
            start: "center center",
            end: "+=200%",
            scrub: 0.7,
            pin: true,
            pinSpacing: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        })
        .to(bubbleHold, {
          progress: 1,
          duration: 0.01,
          ease: "none",
        })
        .addLabel("bubbleSwap")
        .to(
          handsFloat,
          {
            x: 0,
            scaleX: 2.8,
            scaleY: 2.2,
            autoAlpha: 0,
            filter: "blur(30px)",
            duration: 0.26,
            ease: "power1.out",
            force3D: true,
          },
          "bubbleSwap",
        )
        .to(
          message,
          {
            x: 0,
            scaleX: 1,
            scaleY: 1,
            autoAlpha: 1,
            filter: "blur(0px)",
            duration: 0.12,
            ease: "power2.out",
            force3D: true,
          },
          "bubbleSwap",
        )
        .to(
          messageHold,
          {
            progress: 1,
            duration: 0.16,
            ease: "none",
          },
          "bubbleSwap+=0.12",
        )
        .addLabel("messageSwap", "bubbleSwap+=0.28")
        .to(
          message,
          {
            x: 0,
            opacity: 0,
            autoAlpha: 0,
            duration: 0.12,
            ease: "power2.in",
            force3D: true,
          },
          "messageSwap",
        )
        .to(
          finalMessage,
          {
            autoAlpha: 1,
            filter: "blur(0px)",
            duration: 0.12,
            ease: "power2.out",
            force3D: true,
          },
          "messageSwap+=0.02",
        )
        .to(
          finalHold,
          {
            progress: 1,
            duration: 0.18,
            ease: "none",
          },
          "messageSwap+=0.14",
        )
        .addLabel("finalSwap", "messageSwap+=0.32")
        .to(
          finalMessage,
          {
            x: 0,
            scaleX: 1.35,
            scaleY: 0.96,
            autoAlpha: 0,
            filter: "blur(10px)",
            duration: 0.12,
            ease: "power2.in",
            force3D: true,
          },
          "finalSwap",
        )
        .to(
          finalLogo,
          {
            scale: 1,
            autoAlpha: 1,
            duration: 0.2,
            ease: "power2.out",
            force3D: true,
          },
          "finalSwap+=0.02",
        )
        .to(logoHold, {
          progress: 0.1,
          duration: 0.04,
          ease: "none",
        });

      return () => {
        layoutObserver.disconnect();
        refreshLayout.kill();
      };
    },
    { scope: sectionRef },
  );

  return (
    <>
      <div
        ref={sectionRef}
        className="handsSection relative flex min-h-[100vh] w-full flex-col items-center justify-center overflow-visible"
      >
        <div className="relative flex h-screen w-full items-center justify-center overflow-visible">
          <h3 className="hands_message pointer-events-none absolute left-1/2 top-1/2 z-[1]  w-[min(88vw,900px)] text-center opacity-0">
            When you truly listen, the body will speak.
          </h3>
          <div className="pointer-events-none absolute inset-0 z-[1] flex items-center justify-center">
            <p className="hands_final_message mx-auto w-[min(88vw,900px)] !text-center opacity-0">
              All bodies welcome, valid and celebrated.
            </p>
          </div>
          <div className="hands_img absolute left-1/2 top-1/2 z-10 h-[min(72vw,520px)] w-[min(72vw,520px)]">
            <div className="hands_float realative aspect-square h-full rounded-full bg-gradient-to-br from-pink-200/70 to-sky-200/70 backdrop-blur-sm shadow-[inset_0px_10px_rgba(255,255,255,1),inset_0_-8px_16px_rgba(255,255,255,1),0_0_18px_rgba(255,255,255,1)]">
              <div className="pointer-events-none absolute left-[16%] top-[40%] rounded-full bg-white/35 blur-xl" />
              <Image
                src="/img/hands_tr2.webp"
                alt="beingBodyLogo"
                height={1000}
                width={1000}
                className=" !brightness-100 saturate-60 p-4 rounded-full brightness-[0.9] hue-rotate-[-80deg] "
              />
            </div>
          </div>
        </div>
      </div>

      <div
        ref={finalLogoRef}
        className="hands_final_logo pointer-events-none fixed left-1/2 top-1/2 z-[1] opacity-0"
      >
        <Image
          src="/img/logo.webp"
          alt="being body logo"
          height={300}
          width={300}
          className="h-[300px] w-[300px] object-contain"
        />
      </div>
    </>
  );
}
