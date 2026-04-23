"use client";
import { useRef, useState } from "react";
import Menu from "./Menu";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Image from "next/image";
import { usePathname } from "next/navigation";

gsap.registerPlugin(useGSAP);

export default function MenuButton() {
  const [toggleMenu, setToggleMenu] = useState("close");
  const home = usePathname() === "/";
  const menuIconRef = useRef<HTMLDivElement | null>(null);
  useGSAP(
    () => {
      if (home) {
        gsap.from(".menu_icon", {
          top: -100,
          duration: 0.5,
          delay: 4,
        });
      }
    },
    { scope: menuIconRef },
  );

  return (
    <div className=" " ref={menuIconRef}>
      <div
        onClick={() => setToggleMenu(toggleMenu === "close" ? "open" : "close")}
        className="z-999 menu_icon fixed left-[-20] top-[-23px] transition duration-400 hover:scale-120 cursor-pointer "
      >
        <Image
          src="/icons/plant5.svg"
          width={100}
          height={100}
          alt="Menu Icon"
          className="hue-rotate-295 saturate-80 brightness-80"
        />
      </div>
      <Menu menuState={toggleMenu} toggle={setToggleMenu} home={home} />
    </div>
  );
}
