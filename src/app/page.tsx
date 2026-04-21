"use client";
import { browserName } from "react-device-detect";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

import Concept from "@/content/Concept";
import Aroma from "@/content/Aroma";
import Prices from "@/content/MassagePrices";
import About from "@/content/About";
import Contacts from "@/content/Contacts";
import Image from "next/image";
import Practices from "@/components/Practices";
import Container from "@/components/Container";
import BookButton from "@/components/BookButton";
import Techniques from "@/content/Techniques";
import BodyWelcome from "@/content/BodyWelcome";

export default function Home() {
  const format = browserName == "Safari" ? "png" : "webp";

  useGSAP(() => {
    gsap.from(".welcome_img", {
      transform: "scaleX(1.5)",
      filter: "blur(10px)",
      opacity: 0,
      duration: 1,
      delay: 1,
    });
  }, [{ scope: "#welcome" }]);

  return (
    <div id="home">
      <Container>
        <div className="min-h-[90vh]">
          <div className="welcome_img flex flex-col justify-center items-center overflow-hidden relative ">
            <Image
              src={`/img/background1.png`}
              alt="beingBodyLogo"
              height={400}
              width={500}
            />
            <div className="absolute flex flex-col items-center justify-center">
              <Image
                className=" mb-20 filter invert  saturate-[400%] hue-rotate-[256deg] brightness-[74%] contrast-[103%]"
                src={`/img/logo.png`}
                alt="beingBodyLogo"
                width={100}
                height={300}
              />
            </div>
            <h3 className=" text-center">
              Occurring material of the abstract <br />
              Existing present Body
            </h3>
          </div>
        </div>
      </Container>

      <Container>
        <Concept format={format} />
      </Container>
      <Container classname=" py-10 mt-20 relative !overflow-visible">
        <BodyWelcome />
      </Container>
      <Container>
        <Practices />
      </Container>

      <Container>
        <BookButton className="my-20" />
      </Container>

      <Container classname="py-10">
        <Techniques format={format} />
      </Container>
      <Container>
        <About format={format} />
      </Container>
    </div>
  );
}
