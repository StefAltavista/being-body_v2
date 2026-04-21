// "use client";

// import { CardsContent } from "@/content/CardsContent";
// import Card from "./Card";

// // import { useGSAP } from "@gsap/react";
// // import gsap from "gsap";
// // import { useRef } from "react";
// // import { ScrollTrigger } from "gsap/ScrollTrigger";

// export default function Practices() {
//   return (
//     <div className="flex w-full mt-[100px] items-center flex-col">
//       <h3 className=""> Body & Mind Experiences</h3>
//       <div className="flex w-full my-[50px] justify-around  flex-wrap  ">
//         {CardsContent.map((x) => {
//           return (
//             <div key={x.id} className="md:w-1/3 m-1 sm:w-1/2  mb-8 ">
//               <Card content={x} />
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// }

"use client";

import { useRef } from "react";
import { CardsContent } from "@/content/CardsContent";
import Card from "./Card";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function Practices() {
  const container = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      const cards = gsap.utils.toArray<HTMLElement>(".practice-card");

      cards.forEach((card, i) => {
        const odd = i % 2 == 0;
        gsap.fromTo(
          card,
          {
            y: -250,
            x: odd ? -200 : 200,
            transform: odd ? "rotate(0.9turn)" : "rotate(1.1turn)",

            opacity: 0,
          },
          {
            y: 100,
            x: 0,
            transform: "rotate(1turn)",
            opacity: 1,
            duration: 2 * 1,
            ease: "power3.out",
            delay: i * (odd ? 0.5 : 2),
            scrollTrigger: {
              trigger: card,
              start: "top 70%",
              end: "top -20%",
              scrub: 0.2,
            },
          },
        );
      });
    },
    { scope: container },
  );

  return (
    <div
      ref={container}
      className="flex w-full mt-[100px] items-center flex-col"
    >
      <h3>Body & Mind Experiences</h3>

      <div className="flex w-full my-[50px] justify-around flex-wrap pb-5">
        {CardsContent.map((x) => {
          return (
            <div
              key={x.id}
              className="practice-card md:w-1/3 m-1 sm:w-1/2 mb-8 will-change-transform"
            >
              <Card content={x} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
