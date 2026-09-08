import Image from "next/image";
import Link from "next/link";

export default function HomeAboutKatia() {
  return (
    <section className="mx-auto grid w-full max-w-6xl items-center gap-8 overflow-hidden rounded-[2.5rem] border border-white/55 bg-white/30 p-4 shadow-[inset_0_2px_14px_rgba(255,255,255,0.72),0_18px_55px_rgba(73,105,126,0.1)] backdrop-blur-sm sm:p-7 md:grid-cols-[minmax(260px,0.9fr)_minmax(0,1.1fr)] md:gap-12 lg:p-10">
      <div className="relative min-h-[390px] overflow-hidden rounded-[2rem] sm:min-h-[480px]">
        <Image
          src="/img/homeCarousel/1.webp"
          alt="A quiet space for reconnecting with the body"
          fill
          sizes="(min-width: 768px) 42vw, 90vw"
          className="object-cover"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-900/15 via-transparent to-white/15" />
      </div>

      <div className="px-2 pb-5 text-center md:px-0 md:pb-0 md:text-left lg:w-[70%] ">
        <p className="!text-[22px] leading-relaxed sm:!text-[26px]">
          My intention is to create a space where people can hear themselves,
          reconnect with their bodies, and meet what is already moving within.
        </p>
        <Link
          href="/about"
          className="group my-8 inline-flex min-h-11 items-center gap-2 rounded-full border border-white/55 bg-white/25 px-5 py-2.5 shadow-sm backdrop-blur-sm transition duration-300 hover:-translate-x-1 hover:bg-white/45"
        >
          About Katia Serena
        </Link>
      </div>
    </section>
  );
}
