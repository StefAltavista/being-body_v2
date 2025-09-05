"use client";
import { browserName } from "react-device-detect";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

import "./home.css";

import Concept from "@/content/Concept";
import Massage from "@/content/Massage";
import Aroma from "@/content/Aroma";
import Prices from "@/content/MassagePrices";
import About from "@/content/About";
import Contacts from "@/content/Contacts";
import Image from "next/image";
import Cards from "@/components/Cards";
import Container from "@/components/Container";
import BookButton from "@/components/BookButton";
import Techniques from "@/content/Techniques";

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
              <h3 className=" text-center">
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
      <Container classname="bg-[#7d6e59] py-10 mt-20 relative !overflow-visible">
        <div className="w-full flex flex-col items-center my-4 py-8">
          <Image
            src={`/img/background1.png`}
            className="absolute  filter  saturate-[0.8] scale-[1.2]"
            alt="beingBodyLogo"
            fill
          />{" "}
          <Image
            src={`/img/hands_tr2.png`}
            alt="beingBodyLogo"
            className="absolute rotate-[-90deg] left-[50] bottom-[75]  brightness-[0.8] scale-x-[-1.5] scale-y-[1.5]  hue-rotate-[-80deg]"
            height={200}
            width={300}
          />{" "}
          <h3 className="my-8  z-1">
            When you truly listen, the body will speak.
          </h3>
          <p className="handWrite2  z-1">
            All bodies welcome, valid and celebrated.{" "}
          </p>
        </div>
      </Container>
      <Container>
        <Cards />
      </Container>

      <Container>
        <BookButton className="my-20" />
      </Container>

      <Container classname="bg-[#7d6e59] py-10 ">
        <Techniques format={format} />
      </Container>
      <Container>
        <About />
      </Container>
    </div>
  );
}
