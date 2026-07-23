"use client";
import "../css/header.css";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { gsap, useGSAP } from "@/lib/gsap";
import { CardsContent } from "@/content/CardsContent";
import { usePathname } from "next/navigation";

export default function Header() {
  const location = usePathname();
  const [color, setColor] = useState("white");
  const home = usePathname() === "/";
  const headerRef = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      gsap.set(".header_title", {
        autoAlpha: 1,
        transformOrigin: "center center",
      });

      if (!home) {
        gsap.set(".header_title", {
          scale: 0.7,
          y: -40,
          force3D: true,
        });

        return;
      }

      gsap.set(".header_title", {
        scale: 1,
        y: 0,
        force3D: true,
      });

      gsap.fromTo(
        ".header_title",
        {
          autoAlpha: 0,
        },
        {
          autoAlpha: 1,
          duration: 1.2,
          delay: 1.4,
          ease: "power3.out",
        },
      );

      gsap.to(".header_title", {
        scale: 0.7,
        y: -40,
        transformOrigin: "center center",
        ease: "none",
        force3D: true,
        scrollTrigger: {
          trigger: document.documentElement,
          start: "top top+=10",
          end: "top top-=90",
          scrub: 0.8,
          // markers: true,
        },
      });
    },
    { scope: headerRef, dependencies: [home], revertOnUpdate: true },
  );

  useEffect(() => {
    const matched = CardsContent.find((x) => x.link === location);
    setColor(matched ? matched.hooverColor : "#ffffff");
  }, [location]);

  return (
    <div
      id="header"
      ref={headerRef}
      className="fixed flex justify-center items-center h-[150px] w-[100%] bg-white/70"
      style={{
        background: `linear-gradient(to bottom, ${color} 40%, ${color} 40%, rgba(255,255,255,0) 30%)`,
      }}
    >
      <div
        className="absolute inset-0 backdrop-blur-3xl"
        style={{
          WebkitMaskImage:
            "linear-gradient(to bottom, white 30%, rgba(255,255,255,1) 40%,rgba(255,255,255,0.7) 80%, transparent 100%)",
          WebkitMaskRepeat: "no-repeat",
          WebkitMaskSize: "100% 100%",
        }}
      />

      <div className="header_titles flex flex-col justify-center items-center pb-[20px] z-10">
        <Link href="/" className="header_title">
          <h1 className="zeppelin scale-y-150 header_h1 cursor-pointer">
            Being Body
          </h1>
        </Link>
      </div>
    </div>
  );
}
