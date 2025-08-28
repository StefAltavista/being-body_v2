"use client";
import { browserName } from "react-device-detect";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

import "./home.css";

import Concept from "@/content/Concept";
import Massage from "@/content/Massage";
import Aroma from "@/content/Aroma";
import Prices from "@/content/Prices";
import About from "@/content/About";
import Contacts from "@/content/Contacts";
import Image from "next/image";
import Cards from "@/components/Cards";
import Container from "@/components/Container";

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
      <Container>
        <div className="min-h-[90vh]">
          <div className="flex flex-col justify-center items-center overflow-hidden relative ">
            <Image
              src={`/img/background1.png`}
              alt="beingBodyLogo"
              height={400}
              width={500}
            />
            <div className="absolute flex flex-col items-center justify-center">
              <Image
                className=" filter invert  saturate-[400%] hue-rotate-[256deg] brightness-[74%] contrast-[103%]"
                src={`/img/logo.png`}
                alt="beingBodyLogo"
                width={100}
                height={300}
              />
              <h3 className="text-center">
                Occurring material of the abstract <br />
                Existing present Body
              </h3>
            </div>
          </div>
        </div>
      </Container>

      <Container>
        <Concept format={format} />
      </Container>

      <Container>
        <Cards />
      </Container>

      <Container>
        <About format={format} />
      </Container>
    </div>
  );
}
