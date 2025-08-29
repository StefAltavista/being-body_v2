"use client";
import "../css/header.css";
import { useEffect, useState } from "react";
import Menu from "./Menu";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Image from "next/image";
import { CardsContent } from "@/content/CardsContent";
import { usePathname } from "next/navigation";

export default function Header({ home }: { home: boolean }) {
  const [toggleMenu, setToggleMenu] = useState("close");
  const location = usePathname();
  const [color, setColor] = useState("white");

  useEffect(() => {
    const matched = CardsContent.filter((x) => x.link == location)[0];
    if (!matched) {
      setColor("#ffffff");
    } else setColor(matched?.color);
  }, [location]);

  // useGSAP(
  //   () => {
  //     gsap.from(".header_h1", {
  //       opacity: 0,
  //       duration: 2,
  //       ease: "elastic",
  //     });
  //   },
  //   { scope: "#header" }
  // );
  return (
    <div
      id="header"
      className="fixed flex justify-center items-center h-[100px] w-[100%]  bg-white/70"
      style={{
        background: `linear-gradient(to bottom, ${color} 40%, ${color} 1%, rgba(255,255,255,0) 40%)`,
      }}
    >
      <div
        className="absolute inset-0 backdrop-blur-3xl"
        style={{
          WebkitMaskImage:
            "linear-gradient(to bottom, white 30%, rgba(255,255,255,1) 40%,rgba(255,255,255,0.7) 70%, transparent 100%)",
          WebkitMaskRepeat: "no-repeat",
          WebkitMaskSize: "100% 100%",
        }}
      ></div>
      <div className="header_titles flex flex-row justify-center z-10 pb-[20px] ">
        <Link href="/">
          <h1 className="header_h1">Being Body</h1>
        </Link>
      </div>

      <div className="header_menu_area">
        {home ? (
          <>
            <label
              onClick={() =>
                setToggleMenu(toggleMenu == "close" ? "open" : "close")
              }
            >
              MENU
            </label>
            <Menu menuState={toggleMenu} toggle={setToggleMenu}></Menu>
          </>
        ) : (
          <Link href="/">
            <p>Home</p>
          </Link>
        )}
      </div>
    </div>
  );
}
