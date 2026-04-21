"use client";

import Image from "next/image";
import Link from "next/link";

type CardContent = {
  id: string;
  link: string;
  title: string;
  color: string;
  image: string;
  icon: string;
  description: string;
};

export default function Card({ content }: { content: CardContent }) {
  return (
    <Link href={content.link} key={content.id}>
      <div
        style={{ "--hover-color": content.color } as React.CSSProperties}
        className={` overflow-hidden relative h-full card_class  p-4  hover:translate-y-[-3%] hover:mb-1 transition-all  duration-500  bg-[#edd4c2] hover:bg-[var(--hover-color)] flex flex-col items-center  rounded-3xl  cursor-pointer min-h-100 `}
      >
        <Image
          alt={`${content.title} card`}
          src={content.image}
          fill
          style={{ color: "red" }}
          className="absolute opacity-30  scale-[1.9]"
        />
        <h3 className=" z-2 !font-bold pb-4 underline  decoration-1 underline-offset-4 decoration-color-[rgb(65, 37, 102)]  ">
          {content.title}
        </h3>

        <Image
          alt={`${content.title} card`}
          src={content.icon}
          width={100}
          height={100}
          style={{ color: "red" }}
        />

        <p className="!pt-4 handWrite1">{content.description}</p>
      </div>
    </Link>
  );
}
