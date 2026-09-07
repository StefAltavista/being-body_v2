import type { OilBlend } from "@/content/oils";

type OilStoryProps = {
  oil: OilBlend;
  variant?: "card" | "detail";
};

export default function OilStory({ oil, variant = "card" }: OilStoryProps) {
  if (variant === "detail") {
    return (
      <blockquote className="relative overflow-hidden rounded-[2.25rem]  px-7 py-10  sm:px-12 sm:py-14">
        <p className="handWrite2 relative z-10 !text-center !text-[32px] leading-[1.8] ">
          {oil.poem.map((line, index) => (
            <span key={line} className="handWrite2">
              {line}
              {index < oil.poem.length - 1 && <br />}
            </span>
          ))}
        </p>
      </blockquote>
    );
  }

  return (
    <>
      <blockquote className="relative mb-9 py-3 pl-7 pr-2 sm:pl-9">
        <p className="handWrite2 !text-center  leading-[3]">
          {oil.poem.map((line, index) => (
            <span key={line} className="handWrite2 md:!text-[24px]">
              {line}
              {index < oil.poem.length - 1 && <br />}
            </span>
          ))}
        </p>
      </blockquote>
    </>
  );
}
