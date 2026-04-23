"use client";

import { ReactNode, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

export default function Modal({
  children,
  close,
  color,
}: {
  children: ReactNode | ((requestClose: () => void) => ReactNode);
  close: () => void;
  color: string;
}) {
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const [isClosing, setIsClosing] = useState(false);

  useGSAP(() => {
    if (!overlayRef.current || !panelRef.current) return;

    gsap.set(overlayRef.current, { opacity: 0 });
    gsap.set(panelRef.current, {
      opacity: 0,
      filter: "blur(200px)",
    });

    gsap
      .timeline()
      .to(overlayRef.current, {
        opacity: 1,
        duration: 0.5,
        ease: "power2.out",
      })
      .to(
        panelRef.current,
        {
          opacity: 1,
          filter: "blur(0px)",
          y: 0,
          duration: 0.7,
          ease: "power2.out",
        },
        0,
      );
  });

  const requestClose = () => {
    if (isClosing || !overlayRef.current || !panelRef.current) return;

    setIsClosing(true);

    gsap
      .timeline({
        onComplete: close,
      })
      .to(panelRef.current, {
        opacity: 0,
        filter: "blur(260px)",
        y: 8,
        duration: 1,
        ease: "power2.in",
      })
      .to(
        overlayRef.current,
        {
          opacity: 0,
          duration: 1,
          ease: "power2.in",
        },
        0,
      );
  };

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[1000] h-screen w-screen bg-[rgba(255,255,255,0.8)]"
      onClick={(e) => {
        if (e.target === e.currentTarget) requestClose();
      }}
    >
      <div
        ref={panelRef}
        onClick={(e) => e.stopPropagation()}
        className={`${color} fixed left-[5vw] top-[4vh] z-[1001] h-[90dvh] w-[90vw] rounded p-4 overflow-hidden flex flex-col`}
      >
        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain">
          {typeof children === "function" ? children(requestClose) : children}
        </div>{" "}
      </div>
    </div>
  );
}
