"use client";
import "../css/header.css";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { CardsContent } from "@/content/CardsContent";
import { usePathname } from "next/navigation";

gsap.registerPlugin(useGSAP);

export default function Header() {
  const location = usePathname();
  const [color, setColor] = useState("white");
  const home = usePathname() === "/";
  const headerRef = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      if (home) {
        gsap.from(".header_title", {
          marginTop: 100,
          opacity: 0,
          duration: 2,
          delay: 2,
        });
      }
    },
    { scope: headerRef },
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
        <Link href="/" className="header_title ">
          <h1 className="header_h1 cursor-pointer">Being Body</h1>
        </Link>
      </div>
    </div>
  );
}
