"use client";
import { browserName } from "react-device-detect";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

import "./home.css";
import Header from "@/components/Header";
import Concept from "@/content/Concept";
import Massage from "@/content/Massage";
import Aroma from "@/content/Aroma";
import Prices from "@/content/Prices";
import About from "@/content/About";
import Contacts from "@/content/Contacts";
import Image from "next/image";

export default function Home() {
  const format = browserName == "Safari" ? "png" : "webp";

  // useGSAP(() => {
  //   gsap.from(".welcome_img", {
  //     transform: "scaleX(4)",
  //     filter: "blur(10px)",
  //     opacity: 0,
  //     duration: 4,
  //     delay: 1,
  //   });

  //   gsap.fromTo(
  //     ".welcome_p",
  //     {
  //       opacity: 0,
  //     },
  //     { opacity: 1, duration: 2, delay: 3 }
  //   );
  // }, [{ scope: "#welcome" }]);

  return (
    <div id="home">
      <Header home={true}></Header>
      <div id="welcome">
        <Image
          className="title_logo wave_animation "
          src={`/img/background1.png`}
          alt="beingBodyLogo"
          fill
        />

        <Image
          className="welcome_img  translate-y-[-50px] filter invert  saturate-[400%] hue-rotate-[256deg] brightness-[74%] contrast-[103%]"
          src={`/img/logo.png`}
          alt="beingBodyLogo"
          width={100}
          height={300}
        />
        <div className="welcome_p z-100">
          <p>Massage . Bodywork . Movement . Oils</p>
        </div>
      </div>

      <Concept format={format} />
      <Massage format={format} />
      <Aroma format={format} />
      <Prices format={format} />
      <About format={format} />
      <Contacts format={format} />
    </div>
  );
}
