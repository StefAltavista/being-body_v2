"use client";

import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import Link from "next/link";
import { useRef } from "react";

const BUBBLE_SIZE = 120;
const START_SCALE = 2;
const END_SCALE = 0.8;
const FIXED_OFFSET = 24;

function BubbleContent() {
  return (
    <div className="relative flex h-[120px] w-[120px] items-center justify-center rounded-full border border-white/50 bg-gradient-to-br from-pink-200/70 to-sky-200/70 shadow-[inset_0_2px_10px_rgba(255,255,255,0.85),inset_0_-8px_16px_rgba(255,255,255,0.18),0_0_18px_rgba(255,255,255,0.22)] backdrop-blur-sm">
      <div className="pointer-events-none absolute left-[18%] top-[18%] h-8 w-8 rounded-full bg-white/45 blur-md" />

      <Link
        href="/book-apointment"
        className="relative z-10 flex h-full w-full flex-col items-center justify-center rounded-full text-center"
      >
        <span className="handWrite2 text-[24px] leading-none text-slate-700">
          Book
        </span>

        <span className="handWrite2 mt-1 text-[17px] leading-none text-slate-700">
          Appointment
        </span>
      </Link>
    </div>
  );
}

export default function BookButton({ className }: { className?: string }) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const triggerRef = useRef<HTMLDivElement | null>(null);

  const originalShellRef = useRef<HTMLDivElement | null>(null);
  const originalBubbleRef = useRef<HTMLDivElement | null>(null);

  const fixedShellRef = useRef<HTMLDivElement | null>(null);
  const fixedBubbleRef = useRef<HTMLDivElement | null>(null);

  const hasMovedToCornerRef = useRef(false);

  useGSAP(
    () => {
      const sectionEl = sectionRef.current;
      const trigger = triggerRef.current;
      const originalShell = originalShellRef.current;
      const originalBubble = originalBubbleRef.current;
      const fixedShell = fixedShellRef.current;
      const fixedBubble = fixedBubbleRef.current;

      if (
        !sectionEl ||
        !trigger ||
        !originalShell ||
        !originalBubble ||
        !fixedShell ||
        !fixedBubble
      ) {
        return;
      }

      const getCornerCenterCoords = () => {
        return {
          x: window.innerWidth - FIXED_OFFSET - BUBBLE_SIZE / 2,
          y: window.innerHeight - FIXED_OFFSET - BUBBLE_SIZE / 2,
        };
      };

      const getOriginalCenterCoords = () => {
        const rect = originalShell.getBoundingClientRect();

        return {
          x: rect.left + rect.width / 2,
          y: rect.top + rect.height / 2,
        };
      };

      const setFixedShellByCenter = (
        center: { x: number; y: number },
        scale: number,
      ) => {
        gsap.set(fixedShell, {
          position: "fixed",
          left: center.x - BUBBLE_SIZE / 2,
          top: center.y - BUBBLE_SIZE / 2,
          x: 0,
          y: 0,
          scale,
          transformOrigin: "center center",
        });
      };

      const collapseSection = () => {
        gsap.killTweensOf(sectionEl);

        gsap.to(sectionEl, {
          height: 0,
          paddingTop: 0,
          paddingBottom: 0,
          duration: 0.8,
          ease: "power3.inOut",
          overflow: "hidden",
        });
      };

      const showFixedInCorner = () => {
        const cornerCenter = getCornerCenterCoords();

        setFixedShellByCenter(cornerCenter, END_SCALE);

        gsap.set(originalShell, {
          autoAlpha: 0,
        });

        gsap.set(sectionEl, {
          height: 0,
          paddingTop: 0,
          paddingBottom: 0,
          overflow: "hidden",
        });

        gsap.set(fixedShell, {
          autoAlpha: 1,
          visibility: "visible",
          pointerEvents: "auto",
          zIndex: 50,
        });

        hasMovedToCornerRef.current = true;
      };

      const moveFixedCopyToCorner = () => {
        if (hasMovedToCornerRef.current) return;

        const startCenter = getOriginalCenterCoords();
        const cornerCenter = getCornerCenterCoords();

        const curveCenter = {
          x: startCenter.x + (cornerCenter.x - startCenter.x) * 0.45,
          y: Math.min(startCenter.y, cornerCenter.y) - 140,
        };

        gsap.killTweensOf(fixedShell);

        gsap.set(originalShell, {
          autoAlpha: 0,
        });

        setFixedShellByCenter(startCenter, START_SCALE);

        gsap.set(fixedShell, {
          autoAlpha: 1,
          visibility: "visible",
          pointerEvents: "auto",
          zIndex: 50,
        });

        collapseSection();

        const tl = gsap.timeline({
          onComplete: () => {
            hasMovedToCornerRef.current = true;
          },
        });

        tl.to(fixedShell, {
          left: curveCenter.x - BUBBLE_SIZE / 2,
          top: curveCenter.y - BUBBLE_SIZE / 2,
          scale: 2.35,
          duration: 0.65,
          ease: "sine.inOut",
        }).to(fixedShell, {
          left: cornerCenter.x - BUBBLE_SIZE / 2,
          top: cornerCenter.y - BUBBLE_SIZE / 2,
          scale: END_SCALE,
          duration: 0.9,
          ease: "power3.inOut",
        });
      };

      gsap.set(sectionEl, {
        height: 400,
        overflow: "hidden",
      });

      gsap.set(originalShell, {
        scale: START_SCALE,
        autoAlpha: 1,
        transformOrigin: "center center",
      });

      gsap.set(fixedShell, {
        autoAlpha: 0,
        visibility: "hidden",
        pointerEvents: "none",
        transformOrigin: "center center",
      });

      const floatBubble = (bubble: HTMLElement) => {
        const loop = () => {
          gsap.to(bubble, {
            x: gsap.utils.random(-18, 18),
            y: gsap.utils.random(-22, 22),
            rotation: gsap.utils.random(-3, 3),
            duration: gsap.utils.random(1.6, 3.2),
            ease: "sine.inOut",
            onComplete: loop,
          });
        };

        loop();
      };

      floatBubble(originalBubble);
      floatBubble(fixedBubble);

      const scrollTrigger = ScrollTrigger.create({
        trigger,
        start: "center 40%",
        once: true,

        onEnter: () => {
          moveFixedCopyToCorner();
        },

        onRefresh: (self) => {
          if (hasMovedToCornerRef.current || self.progress === 1) {
            showFixedInCorner();
          }
        },
      });

      const resizeRefresh = gsap.delayedCall(0.15, () => {
        ScrollTrigger.refresh();
      });

      resizeRefresh.pause();

      const handleResize = () => {
        if (hasMovedToCornerRef.current) {
          showFixedInCorner();
        }

        resizeRefresh.restart(true);
      };

      window.addEventListener("resize", handleResize);

      return () => {
        window.removeEventListener("resize", handleResize);

        scrollTrigger.kill();
        resizeRefresh.kill();

        gsap.killTweensOf(sectionEl);
        gsap.killTweensOf(originalShell);
        gsap.killTweensOf(originalBubble);
        gsap.killTweensOf(fixedShell);
        gsap.killTweensOf(fixedBubble);
      };
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      className="Book_appointment_button w-full flex h-[400px] justify-center overflow-hidden"
    >
      <div
        ref={triggerRef}
        className={`relative z-50 flex w-[120px] items-center ${className ?? ""}`}
      >
        <div ref={originalShellRef} className="relative h-[120px] w-[120px]">
          <div ref={originalBubbleRef}>
            <BubbleContent />
          </div>
        </div>
      </div>

      <div
        ref={fixedShellRef}
        className="invisible pointer-events-none fixed left-0 top-0 z-50 w-[120px] opacity-0"
      >
        <div ref={fixedBubbleRef}>
          <BubbleContent />
        </div>
      </div>
    </section>
  );
}
