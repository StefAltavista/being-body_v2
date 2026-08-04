import OilCarousel from "@/components/OilCarousel";

export type OilBlend = {
  name: string;
  intention: string;
  ingredients: string;
  character: string;
  benefit: string;
  images: string[];
  poem: string[];
  description: string;
};

type OilCardProps = {
  oil: OilBlend;
  reverse?: boolean;
};

export default function OilCard({ oil, reverse = false }: OilCardProps) {
  const productOrder = reverse ? "lg:order-2" : "lg:order-1";
  const detailsOrder = reverse ? "lg:order-1" : "lg:order-2";

  return (
    <article
      className="oil-card relative grid w-full grid-cols-1 items-center gap-8 overflow-hidden rounded-[2.5rem] 
     sm:p-8 lg:grid-cols-[minmax(280px,0.82fr)_minmax(0,1.18fr)] lg:gap-12 lg:p-10 p-4"
    >
      {/* bg-white/30 p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.9),0_24px_70px_rgba(62,91,112,0.13)] backdrop-blur-xl */}

      <div
        className={`relative flex min-h-[510px] flex-col items-center overflow-hidden rounded-[2rem] border border-white/65 bg-gradient-to-br from-white/65 via-pink-50/35 to-sky-100/35 px-6 py-8 text-center shadow-[inset_0_2px_14px_rgba(255,255,255,0.95),inset_0_-12px_30px_rgba(177,205,224,0.16),0_16px_45px_rgba(73,105,126,0.1)] ${productOrder}`}
      >
        <span className="pointer-events-none absolute left-[12%] top-[8%] h-28 w-28 rounded-full bg-white/70 blur-2xl" />
        <span className="pointer-events-none absolute bottom-[8%] right-[5%] h-36 w-36 rounded-full bg-pink-100/45 blur-3xl" />

        <div className="relative z-10">
          <h3 className="!mb-0 !text-center !text-[30px] tracking-[0.06em] sm:!text-[34px]">
            {oil.name}
          </h3>
          <p className="!mt-1  handWrite2 !text-center !text-[17px] tracking-[0.18em]">
            {oil.intention}
          </p>
          <p className=" !mt-1 !text-center !text-[21px] md:!text-[26px]  leading-relaxed">
            {oil.ingredients}
          </p>
        </div>

        <OilCarousel images={oil.images} alt={`${oil.name} oil`} />

        <div className="relative z-10 mt-auto w-full">
          <p className="!text-center !text-[21px] md:!text-[26px] leading-snug">
            {oil.character}
          </p>
          <div className="mx-auto my-3 w-8 border-t border-slate-500/45" />
          <p className="!text-center !text-[20px] md:!text-[24px] leading-snug">
            {oil.benefit}
          </p>
        </div>
      </div>

      <div
        className={`flex flex-col items-between justify-center px-1 sm:px-3 ${detailsOrder}`}
      >
        <blockquote className="relative mb-9  py-3 pl-7 pr-2 sm:pl-9">
          <p className="!handWrite2 !text-center text-[22px] !text-[32px] leading-[1.75] ">
            {oil.poem.map((line, index) => (
              <span key={line} className="handWrite2 md:!text-[28px]">
                {line}
                {index < oil.poem.length - 1 && <br />}
              </span>
            ))}
          </p>
        </blockquote>

        <p className="!text-left md:!text-[25px] leading-relaxed ">
          {oil.description}
        </p>
      </div>
    </article>
  );
}
