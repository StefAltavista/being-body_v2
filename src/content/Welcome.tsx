import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";

export default function Welcome() {
  gsap.registerPlugin(useGSAP);
  const welcomRef = useRef<HTMLDivElement | null>(null);

  useGSAP(() => {
    gsap.from(".welcome_img", {
      transform: "scaleX(1.5)",
      filter: "blur(10px)",
      opacity: 0,
      duration: 2,
    });
    gsap.from(".welcome_text", {
      filter: "blur(5px)",
      opacity: 0,
      duration: 1,
      delay: 3,
    });
  }, [{ scope: welcomRef }]);

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
          height={400}
          width={500}
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
