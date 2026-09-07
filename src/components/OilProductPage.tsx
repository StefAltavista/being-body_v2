import Image from "next/image";
import Link from "next/link";

import Background from "@/components/Background";
import Container from "@/components/Container";
import OilBlend from "@/components/OilBlend";
import OilImage from "@/components/OilImage";
import OilStory from "@/components/OilStory";
import OilsShowcaseCarousel from "@/content/OilsShowcaseCarousel";
import type { OilBlend as OilBlendData } from "@/content/oils";

type OilProductPageProps = { oil: OilBlendData };

export default function OilProductPage({ oil }: OilProductPageProps) {
  const featureImage = oil.images[0] ?? oil.images[1];
  const portraitImage = oil.images[1] ?? featureImage;
  const blendImage = oil.images[2] ?? featureImage;

  return (
    <Container classname="relative min-h-screen w-full items-start justify-start overflow-hidden !px-0">
      <Background rotate={oil.backgroundHue} imageClassName="opacity-100" />

      <main className="mx-auto w-full max-w-7xl px-6 pb-24 pt-10 sm:px-10 lg:px-14 lg:pt-14">
        <Link
          href="/oils"
          className="group mb-8 inline-flex min-h-11 items-center gap-4  transition duration-300 hover:-translate-x-1 "
        >
          <span
            aria-hidden="true"
            className="transition-transform group-hover:-translate-x-1"
          >
            ←
          </span>
          All oils
        </Link>

        <section className="relative grid overflow-visible py-5 sm:py-8 lg:grid-cols-[minmax(0,1.02fr)_minmax(370px,0.98fr)] lg:items-start lg:gap-8 lg:py-12">
          <span className="pointer-events-none absolute -left-12 top-16 h-44 w-44 rounded-full bg-white/40 blur-3xl" />
          <span className="pointer-events-none absolute -right-8 bottom-8 h-52 w-52 rounded-full bg-pink-100/30 blur-3xl" />

          <div className="relative order-2 flex items-start justify-center lg:order-1 lg:justify-start">
            <OilImage src={featureImage} alt={`${oil.name} blend`} priority />
          </div>

          <div className="relative z-10 order-1 pb-10 lg:order-2 lg:pb-0">
            <div className="mb-5 flex items-center gap-4">
              <Image
                src="/icons/oil12.svg"
                width={48}
                height={48}
                alt=""
                className="h-12 w-12 brightness-0 opacity-75"
              />
              <span className="handWrite2 !text-[17px]  ">{oil.intention}</span>
            </div>

            <h1 className="!mb-3 !text-[48px] leading-none sm:!text-[60px] lg:!text-[68px]">
              {oil.name}
            </h1>

            <div className="mb-7 h-px w-full bg-slate-500/20" />
            <p className="handWrite2 !mb-7 !text-left !text-[22px] leading-relaxed ">
              {oil.character}
            </p>
          </div>
        </section>

        <section className="!my-20 border-t border-b border-slate-300 grid items-stretch lg:grid-cols-[minmax(0,560px)_330px] lg:justify-center lg:gap-0 lg:mt-14">
          <OilStory oil={oil} variant="detail" />

          <div className="flex min-h-[300px] w-full items-center justify-center rounded-[2.5rem] p-3 sm:min-h-[430px] sm:p-8 lg:p-0">
            <OilImage
              src={portraitImage}
              alt={`${oil.name} bottle and booklet`}
              shape="circle"
            />
          </div>
        </section>

        <div className="grid lg:grid-cols-[minmax(0,1.02fr)_minmax(370px,0.98fr)] lg:gap-8">
          <div className="mx-auto w-full max-w-[520px] lg:mx-0">
            <h2 className="!text-[38px] font-normal sm:!text-[44px]">
              The blend
            </h2>
          </div>
        </div>

        <section className="mt-10 grid items-start gap-8 lg:grid-cols-[minmax(0,1.02fr)_minmax(370px,0.98fr)]">
          <div className="order-2 flex items-start justify-center lg:order-1 lg:justify-start">
            <OilImage
              src={blendImage}
              alt={`${oil.name} artwork`}
              corners="xs"
              fit="contain"
            />
          </div>

          <div className="order-1 lg:order-2">
            <OilBlend oil={oil} />
          </div>
        </section>

        <div className="mt-20 sm:mt-28">
          <OilsShowcaseCarousel title="Explore my blends" />
        </div>

        <p className=" handWrite2 !mt-5 !pt-3 !text-left !text-[20px] leading-relaxed opacity-75">
          *Created in collaboration with dear friend and studio mate @ava.ink,
          who made the beautiful booklet accompanying each oil.
        </p>
      </main>
    </Container>
  );
}
