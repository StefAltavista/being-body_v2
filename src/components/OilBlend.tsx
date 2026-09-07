import type { ReactNode } from "react";

import type { OilBlend as OilBlendData } from "@/content/oils";

type OilBlendProps = {
  oil: OilBlendData;
};

function BlendDetail({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <div className=" py-5 first:border-t-0 first:pt-0">
      <p className="handWrite2 !mb-2 !text-left !text-[18px] tracking-[0.14em] opacity-70">
        {label}
      </p>
      <p className="!text-left !text-[24px] leading-relaxed sm:!text-[26px]">
        {children}
      </p>
    </div>
  );
}

export default function OilBlend({ oil }: OilBlendProps) {
  return (
    <section className="flex h-full flex-col rounded-[2.5rem] sm:p-10">
      <p className="!mb-8 !text-left !text-[23px] leading-[1.8] sm:!text-[26px]">
        {oil.description}
      </p>

      <div className="mt-auto border-t border-b border-slate-500/15 pt-7 ">
        <BlendDetail label="Botanical blend">{oil.ingredients}</BlendDetail>
        <BlendDetail label="Intention">{oil.benefit}</BlendDetail>
      </div>
    </section>
  );
}
