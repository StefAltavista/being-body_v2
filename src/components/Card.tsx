"use client";

import Image from "next/image";
import Link from "next/link";

type CardContent = {
  id: string;
  link: string;
  title: string;
  quote: string;
  hooverColor: string;
  image: string;
  icon: string;
  description: string;
  bg: string;
};

export default function Card({ content }: { content: CardContent }) {
  return (
    <Link href={content.link} key={content.id} className="   cursor-pointer">
      <div
        style={{ "--hover-color": content.hooverColor } as React.CSSProperties}
        className={`${content.bg} w-full overflow-hidden relative h-full card_class  p-8 py-20 hover:translate-y-[-3%] hover:mb-1 transition-all  duration-500   hover:bg-[var(--hover-color)] flex flex-col items-center  rounded-3xl   min-h-100 `}
      >
        <Image
          alt={`${content.title} card`}
          src={content.image}
          fill
          // Allow for the existing 1.9x background scale, not just the card box.
          sizes="(min-width: 1280px) calc((100vw - 7rem) / 1.5 - 8rem), (min-width: 1024px) calc((100vw - 7rem) / 1.5), (min-width: 640px) calc(100vw - 6rem), calc(200vw - 17rem)"
          style={{ color: "red" }}
          className="absolute opacity-30  scale-[1.9] hue-rotate-330 brightness-120 saturate-110 "
        />

        <div className=" relative mb-4 rounded-full border border-white p-4">
          <div className=" z-0 absolute top-0  left-0 bg-gradient-to-r from-white to-pink-250 brightness-120 w-full h-full opacity-50 rounded-full"></div>
          <Image
            alt={`${content.title} icon`}
            src={content.icon}
            width={100}
            height={100}
            style={{ color: "red" }}
            className="relative"
          />
        </div>
        <p className="!text-[26px]  tracking-wide !text-center relative">
          {content.quote}
        </p>
        <div className=" relative border-white border-y  my-8 ">
          <h3 className="relative !text-[35px] border-white tracking-wider z-2 zeppelin w-full text-center !font-bold      decoration-1 underline-offset-8 decoration-color-[rgb(31, 100, 93)]  ">
            {content.title}
          </h3>
        </div>
        <p className="!text-[22px]  tracking-wide !text-center relative">
          {content.description}
        </p>
      </div>
    </Link>
  );
}
