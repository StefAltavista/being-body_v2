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
    <div className="flex w-full my-[150px] justify-between  flex-wrap  ">
      {CardsContent.map((x) => {
        return (
          <Link href={x.link} key={x.title} className="w-1/5">
            <div
              className={` card_class  opacity-100 transition-all  duration-300  bg-[#edd4c2] flex flex-col items-center rounded  cursor-pointer`}
            >
              <h3>{x.title}</h3>
              <p>{x.description}</p>
              <Image
                alt={`${x.title} card`}
                src={x.icon}
                width={100}
                height={100}
                style={{ color: "red" }}
              />
            </div>
          </Link>
        );
      })}
    </div>
  );
}
