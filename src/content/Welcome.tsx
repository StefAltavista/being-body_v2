import Image from "next/image";
import { gsap, useGSAP } from "@/lib/gsap";
import { useRef } from "react";

export default function Welcome() {
  const welcomRef = useRef<HTMLDivElement | null>(null);

  useGSAP(() => {
    gsap.set([".welcome_img", ".welcome_text"], {
      willChange: "transform, opacity, filter",
    });

    gsap
      .timeline({
        defaults: {
          ease: "power3.out",
          force3D: true,
        },
      })
      .from(".welcome_img", {
        scale: 1.12,
        filter: "blur(10px)",
        autoAlpha: 0,
        duration: 2,
        clearProps: "willChange",
      })
      .from(
        ".welcome_text",
        {
          filter: "blur(5px)",
          autoAlpha: 0,
          duration: 1,
          clearProps: "willChange",
        },
        "+=1",
      );
  }, { scope: welcomRef });

  return (
    <div
      id="welcome"
      ref={welcomRef}
      className="min-h-[100vh] flex flex-col justify-center pb-20"
    >
      <div className="welcome_img  ">
        <Image
          src={`/img/welcome_new.png`}
          alt="beingBodyLogo"
          height={1610}
          width={1206}
          priority
          sizes="(max-width: 900px) 70vw, 500px"
          style={{ width: "min(70vw, 500px)", height: "auto" }}
        />
      </div>
      <div className="welcome_text  mt-12 ">
        <h3 className=" text-center !text-[24px] !tracking-widest">
          Occurring material of the abstract <br />
          Existing present Body
        </h3>
      </div>
    </div>
  );
}
