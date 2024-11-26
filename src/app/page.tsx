"use client";
import { browserName } from "react-device-detect";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

import "./home.css";
import Header from "@/components/Header";
import Concept from "@/content/Concept";
import Massage from "@/content/Massage";
import Aroma from "@/content/Aroma";
import Prices from "@/components/Prices";
import About from "@/content/About";
import Contacts from "@/content/Contacts";
import Image from "next/image";

export default function Home() {
    const extension = browserName == "Safari" ? "png" : "webp";

    useGSAP(() => {
        gsap.from(".welcome_img", {
            transform: "rotate(170deg)",
            filter: "blur(10px)",
            opacity: 0,
            duration: 4,
            delay: 1,
        });

        gsap.fromTo(
            ".welcome_p",
            {
                opacity: 0,
            },
            { opacity: 1, duration: 2, delay: 3 }
        );
    }, [{ scope: "#welcome" }]);

    return (
        <div id="home">
            <Header home={true}></Header>

            <div id="welcome">
                <Image
                    className="welcome_img"
                    src={`/img/logoLight.${extension}`}
                    alt="beingBodyLogo"
                    width={200}
                    height={200}
                />
                <div className="welcome_p">
                    <p>
                        Occurring material of the abstract. Existing, present.
                        Body
                    </p>
                </div>
            </div>

            <Concept extension={extension} />
            <Massage extension={extension} />
            <Aroma extension={extension} />
            <Prices extension={extension} />
            <About extension={extension} />
            <Contacts extension={extension} />
        </div>
    );
}
