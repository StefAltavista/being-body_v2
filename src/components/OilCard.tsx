"use client";

import { useId, useState } from "react";

import OilCarousel from "@/components/OilCarousel";
import OilStory from "@/components/OilStory";
import type { OilBlend } from "@/content/oils";
import Link from "next/link";

type OilCardProps = {
  oil: OilBlend;
  imageOnRight?: boolean;
};

export default function OilCard({ oil, imageOnRight = false }: OilCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const mobileDetailsId = useId();
  const productOrder = imageOnRight ? "lg:order-2" : "lg:order-1";
  const detailsOrder = imageOnRight ? "lg:order-1" : "lg:order-2";

  return (
    <article className="oil-card relative grid w-full grid-cols-1 items-center gap-2 overflow-hidden rounded-[2.5rem] p-4 sm:p-8 lg:grid-cols-[minmax(280px,0.82fr)_minmax(0,1.18fr)] lg:gap-12 lg:p-10">
      <div
        className={`relative flex min-h-[510px] flex-col items-center overflow-hidden rounded-[2rem] border border-white/65 bg-gradient-to-br from-white/65 via-pink-50/35 to-sky-100/35 px-6 py-8 text-center shadow-[inset_0_2px_14px_rgba(255,255,255,0.95),inset_0_-12px_30px_rgba(177,205,224,0.16),0_16px_45px_rgba(73,105,126,0.1)] ${productOrder}`}
      >
        <span className="pointer-events-none absolute left-[12%] top-[8%] h-28 w-28 rounded-full bg-white/70 blur-2xl" />
        <span className="pointer-events-none absolute bottom-[8%] right-[5%] h-36 w-36 rounded-full bg-pink-100/45 blur-3xl" />

        <Link href={`oils/${oil.slug}`} className="!cursor-pointer">
          <div className="relative z-10 ">
            <h3 className="!cursor-pointer !mb-0 !text-center !text-[30px] tracking-[0.06em] sm:!text-[34px]">
              {oil.name}
            </h3>
            <p className="handWrite2 !mt-1 !text-center !text-[17px] tracking-[0.18em]">
              {oil.intention}
            </p>
          </div>
        </Link>
        <OilCarousel
          slug={oil.slug}
          images={oil.images}
          alt={`${oil.name} oil`}
        />

        <div className="relative z-10 mt-auto w-full">
          <p className="!text-center !text-[21px] leading-snug md:!text-[26px]">
            {oil.character}
          </p>
          <div className="mx-auto my-3 w-8 " />
        </div>
      </div>

      <div
        className={`hidden flex-col items-stretch justify-center px-1 sm:px-3 lg:flex ${detailsOrder}`}
      >
        <OilStory oil={oil} />
      </div>
    </article>
  );
}
