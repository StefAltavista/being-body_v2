"use client";
import "../css/header.css";
import { useState } from "react";
import Menu from "./Menu";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function Header({ home }: { home: boolean }) {
    const [toggleMenu, setToggleMenu] = useState("close");
    useGSAP(
        () => {
            gsap.from(".header_h1", {
                opacity: "0",
                duration: 2,
                ease: "elastic",
            });
        },
        { scope: "#header" }
    );
    return (
        <div id="header">
            <div className="header_titles">
                <h1 className="header_h1">Being Body</h1>
                <p>-</p>
                <p>Massage - Bodywork - Movement</p>
            </div>

            <div className="header_menu_area">
                {home ? (
                    <>
                        <label
                            onClick={() =>
                                setToggleMenu(
                                    toggleMenu == "close" ? "open" : "close"
                                )
                            }
                        >
                            MENU
                        </label>
                        <Menu
                            menuState={toggleMenu}
                            toggle={setToggleMenu}
                        ></Menu>
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
