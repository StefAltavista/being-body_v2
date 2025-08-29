"use client";

import { CardsContent } from "@/content/CardsContent";
import Image from "next/image";
import Link from "next/link";

// import { useGSAP } from "@gsap/react";
// import gsap from "gsap";
// import { useRef } from "react";
// import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function Cards() {
  return (
    <div className="flex w-full mt-[100px] items-center flex-col">
      <h3 className=""> Body & Mind Experiences</h3>
      <div className="flex w-full my-[50px] justify-around  flex-wrap  ">
        {CardsContent.map((x) => {
          return (
            <Link href={x.link} key={x.title} className="w-1/3 m-1 mb-8 ">
              <div
                style={{ "--hover-color": x.color } as React.CSSProperties}
                className={`overflow-hidden relative h-full card_class  p-4  hover:translate-y-[-3%] hover:mb-1 transition-all  duration-500  bg-[#edd4c2] hover:bg-[var(--hover-color)] flex flex-col items-center  rounded-3xl  cursor-pointer`}
              >
                <Image
                  alt={`${x.title} card`}
                  src={x.image}
                  fill
                  style={{ color: "red" }}
                  className="absolute opacity-30  scale-[1.9]"
                />
                <h3 className=" z-2 !font-bold pb-4 underline  decoration-1 underline-offset-4 decoration-color-[rgb(65, 37, 102)]  ">
                  {x.title}
                </h3>

                <Image
                  alt={`${x.title} card`}
                  src={x.icon}
                  width={100}
                  height={100}
                  style={{ color: "red" }}
                />

                <p className="!pt-4 handWrite1">{x.description}</p>
              </div>
            </Link>
          );
        })}
      </div>{" "}
    </div>
  );
}
