"use client";
import { useRef, useState } from "react";
import Menu from "./Menu";
import { gsap, useGSAP } from "@/lib/gsap";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function MenuButton() {
  const [toggleMenu, setToggleMenu] = useState("close");
  const home = usePathname() === "/";
  const menuIconRef = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      if (home) {
        gsap.from(".menu_icon", {
          y: -90,
          duration: 1,
          delay: 4,
          ease: "back.out(1.8)",
          force3D: true,
        });
      }
    },
    { scope: menuIconRef },
  );

  return (
    <div ref={menuIconRef}>
      <div
        onClick={() => setToggleMenu(toggleMenu === "close" ? "open" : "close")}
        className="menu_icon fixed left-[-10px] top-[-30px] z-[999] rotate-180 cursor-pointer"
      >
        <div className="relative w-[100px] h-[100px]">
          <div
            className={`absolute inset-0 transition-opacity duration-600 ${
              toggleMenu === "close" ? "opacity-100" : "opacity-0"
            }`}
          >
            <Image
              src="/icons/Menu_closed.png"
              alt="Menu closed icon"
              fill
              sizes="100px"
              className="object-contain hue-rotate-70 brightness-150"
            />
          </div>

          <div
            className={`absolute inset-0 transition-opacity duration-300 ${
              toggleMenu === "open" ? "opacity-100" : "opacity-0"
            }`}
          >
            <Image
              src="/icons/Menu_open.png"
              alt="Menu open icon"
              fill
              sizes="100px"
              className="object-contain hue-rotate-70 brightness-150"
            />
          </div>
        </div>
      </div>

      <Menu menuState={toggleMenu} toggle={setToggleMenu} home={home} />
    </div>
  );
}
