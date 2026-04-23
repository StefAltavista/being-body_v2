"use client";

import Image from "next/image";
import Link from "next/link";

type CardContent = {
  id: string;
  link: string;
  title: string;
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
        className={`${content.bg} w-full overflow-hidden relative h-full card_class  p-4  hover:translate-y-[-3%] hover:mb-1 transition-all  duration-500   hover:bg-[var(--hover-color)] flex flex-col items-center  rounded-3xl   min-h-100 `}
      >
        <Image
          alt={`${content.title} card`}
          src={content.image}
          fill
          style={{ color: "red" }}
          className="absolute opacity-30  scale-[1.9] hue-rotate-330 brightness-120 saturate-110 "
        />
        <h3 className="tracking-wider z-2 zeppelin  !font-bold pb-4 underline  decoration-1 underline-offset-8 decoration-color-[rgb(31, 100, 93)]  ">
          {content.title}
        </h3>

        <Image
          alt={`${content.title} icon`}
          src={content.icon}
          width={100}
          height={100}
          style={{ color: "red" }}
          className="hue-rotate-100 saturate-100"
        />

        <p className="!pt-4 !text-[26px] tracking-wide">
          {content.description}
        </p>
      </div>
    </Link>
  );
}
