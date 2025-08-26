"use client";
import "../css/header.css";
import { useState } from "react";
import Menu from "./Menu";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Image from "next/image";

export default function Header({ home }: { home: boolean }) {
  const [toggleMenu, setToggleMenu] = useState("close");
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
      className="fixed flex justify-center items-center h-[80px] w-[100%] backdrop-blur-sm bg-white/70"
    >
      <div className="header_titles flex flex-row justify-center ">
        <h1 className="header_h1">Being</h1>
        {/* <Image
          className="title_logo ml-2 mr-4"
          src={`/img/logo.png`}
          alt="beingBodyLogo"
          width={20}
          height={60}
        /> */}
        <h1 className="header_h1 ">Body</h1>

        {/* <p>-</p>
        <p>Massage - Bodywork - Movement</p> */}
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
