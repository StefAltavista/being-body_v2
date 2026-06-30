"use client";

import { useMemo, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

type FloatingBubblesProps = {
  bubbles: string[];
  className?: string;
  bubbleClassName?: string;
  zIndexClassName?: string;
};

export default function FloatingBubbles({
  bubbles,
  className = "",
  bubbleClassName = "",
  zIndexClassName = "z-[-1]",
}: FloatingBubblesProps) {
  const triggerRef = useRef<HTMLDivElement | null>(null);
  const layerRef = useRef<HTMLDivElement | null>(null);
  const timelinesRef = useRef<gsap.core.Timeline[]>([]);
  const activeRef = useRef(false);

  const positionedBubbles = useMemo(() => {
    const spacing = 96;
    const centerIndex = (bubbles.length - 1) / 2;

    return bubbles.map((label, i) => {
      const offset = (i - centerIndex) * spacing;

      return {
        label,
        left: `calc(50% + ${offset}px)`,
      };
    });
  }, [bubbles]);

  useGSAP(
    () => {
      const trigger = triggerRef.current;
      const layer = layerRef.current;

      if (!trigger || !layer) return;

      const bubbleElements = gsap.utils.toArray<HTMLElement>(
        ".floating-bubble",
        layer,
      );

      gsap.set(bubbleElements, {
        y: 140,
        opacity: 0,
      });

      const createFloatingAnimation = (
        bubble: HTMLElement,
        index: number,
      ): gsap.core.Timeline => {
        const startX = gsap.utils.random(-30, 30);
        const drift1 = gsap.utils.random(-35, 35);
        const drift2 = gsap.utils.random(-45, 45);
        const drift3 = gsap.utils.random(-35, 35);
        const duration = gsap.utils.random(6, 10);
        const scale = gsap.utils.random(0.85, 1.2);
        const viewportTravel = -window.innerHeight - 220;

        gsap.set(bubble, {
          x: startX,
          y: 140,
          opacity: 0,
          scale,
        });

        const tl = gsap.timeline({
          paused: true,
          delay: gsap.utils.random(0, 2.2) + index * 0.22,
          repeat: -1,
          repeatDelay: gsap.utils.random(0.3, 1.2),
          onRepeat: () => {
            gsap.set(bubble, {
              x: gsap.utils.random(-30, 30),
              y: 140,
              opacity: 0,
              scale: gsap.utils.random(0.85, 1.2),
            });
          },
        });

        tl.to(
          bubble,
          {
            opacity: 1,
            duration: 0.8,
            ease: "none",
          },
          0,
        )
          .to(
            bubble,
            {
              y: viewportTravel,
              duration,
              ease: "none",
            },
            0,
          )
          .to(
            bubble,
            {
              x: startX + drift1,
              duration: duration * 0.33,
              ease: "sine.inOut",
            },
            0,
          )
          .to(
            bubble,
            {
              x: startX + drift2,
              duration: duration * 0.33,
              ease: "sine.inOut",
            },
            duration * 0.33,
          )
          .to(
            bubble,
            {
              x: startX + drift3,
              duration: duration * 0.34,
              ease: "sine.inOut",
            },
            duration * 0.66,
          )
          .to(
            bubble,
            {
              opacity: 0,
              duration: 0.8,
              ease: "none",
            },
            duration - 0.8,
          );

        return tl;
      };

      timelinesRef.current = bubbleElements.map((bubble, index) =>
        createFloatingAnimation(bubble, index),
      );

      ScrollTrigger.create({
        trigger,
        start: "top 80%",
        end: "bottom top",
        onEnter: () => {
          activeRef.current = true;
          timelinesRef.current.forEach((tl) => tl.play());
        },
        onEnterBack: () => {
          activeRef.current = true;
          timelinesRef.current.forEach((tl) => tl.play());
        },
        onLeaveBack: () => {
          activeRef.current = false;
          timelinesRef.current.forEach((tl) => tl.pause(0));
          gsap.set(bubbleElements, {
            y: 140,
            opacity: 0,
          });
        },
      });

      const handleResize = () => {
        if (!activeRef.current) return;

        timelinesRef.current.forEach((tl) => {
          tl.invalidate();
        });
      };

      window.addEventListener("resize", handleResize);

      return () => {
        window.removeEventListener("resize", handleResize);
        timelinesRef.current.forEach((tl) => tl.kill());
        timelinesRef.current = [];
      };
    },
    {
      scope: triggerRef,
      dependencies: [bubbles],
    },
  );

  return (
    <>
      <div
        ref={triggerRef}
        aria-hidden="true"
        className="pointer-events-none absolute left-0 top-0 h-px w-px"
      />

      <div
        ref={layerRef}
        aria-hidden="true"
        className={`pointer-events-none fixed inset-0 ${zIndexClassName} overflow-hidden ${className}`}
      >
        {positionedBubbles.map((bubble, i) => (
          <div
            key={`${bubble.label}-${i}`}
            className={`floating-bubble absolute bottom-[-120px] flex h-20 w-20 items-center justify-center rounded-full border border-white/50 bg-gradient-to-br from-pink-200/70 to-sky-200/70 backdrop-blur-sm shadow-[inset_0_2px_10px_rgba(255,255,255,0.85),inset_0_-8px_16px_rgba(255,255,255,0.18),0_0_18px_rgba(255,255,255,0.22)] ${bubbleClassName}`}
            style={{
              left: bubble.left,
              transform: "translateX(-50%)",
            }}
          >
            {bubble.label && (
              <p className="px-1 text-center text-[12px] leading-tight text-slate-700">
                {bubble.label}
              </p>
            )}
          </div>
        ))}
      </div>
    </>
  );
}
