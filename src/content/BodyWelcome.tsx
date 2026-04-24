import { useGSAP } from "@gsap/react";
import gsap from "gsap";

import Image from "next/image";

export default function BodyWelcome() {
  useGSAP(() => {
    gsap.fromTo(
      ".hands_background",
      {
        opacity: 0,
        transform: "scaleX(1.5)",
        filter: "blur(10px)",
      },
      {
        opacity: 1,
        transform: "scaleX(1)",
        filter: "blur(0px)",
        duration: 2 * 1,
        ease: "power3.out",
        delay: 1,

        scrollTrigger: {
          trigger: ".hands_background",
          start: "top 70%",
          end: "top -20%",
          scrub: 0.2,
        },
      },
    );
  }, [{ scope: ".hands_background" }]);

  return (
    <div className="w-full flex flex-col items-center justify-center my-4 py-8">
      <Image
        src={`/img/background1.png`}
        className="hands_background absolute  filter  saturate-[0.8] scale-[1]"
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
      <h3 className="my-8  z-1">When you truly listen, the body will speak.</h3>
      <p className="handWrite2  z-1">
        All bodies welcome, valid and celebrated.{" "}
      </p>
    </div>
  );
}
