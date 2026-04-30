import { useGSAP } from "@gsap/react";
import gsap from "gsap";

import Image from "next/image";

export default function BodyWelcome() {
  // useGSAP(() => {
  //   gsap.fromTo(
  //     ".hands_background",
  //     {
  //       opacity: 0,
  //       transform: "scaleX(5)",
  //       filter: "blur(10px)",
  //     },
  //     {
  //       opacity: 1,
  //       transform: "scaleX(1.5)",
  //       filter: "blur(0px)",
  //       duration: 2 * 1,
  //       ease: "none",

  //       scrollTrigger: {
  //         trigger: ".hands_background",
  //         start: "top 60%",
  //         end: "bottom -50%",
  //         scrub: 0.2,
  //       },
  //     },
  //   );
  // }, [{ scope: ".hands_background" }]);

  return (
    <div className="w-full flex flex-col items-center justify-center ">
      <Image
        src={`/img/background1.png`}
        className="hands_background absolute  filter  saturate-[0.8] "
        alt="beingBodyLogo"
        fill
      />{" "}
      <h3 className="my-8 text-center z-1">
        When you truly listen, the body will speak.
      </h3>
      <p className="handWrite2  z-1">
        All bodies welcome, valid and celebrated.{" "}
      </p>
    </div>
  );
}
