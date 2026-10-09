import Image from "next/image";

export type AppointmentOption = {
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  url: string;
};

type AppointmentCardProps = {
  appointment: AppointmentOption;
  imageOnRight?: boolean;
  onCalendar: () => void;
};

export default function AppointmentCard({
  appointment,
  imageOnRight = false,
  onCalendar,
}: AppointmentCardProps) {
  const imageOrder = imageOnRight ? "lg:order-2" : "lg:order-1";
  const detailsOrder = imageOnRight ? "lg:order-1" : "lg:order-2";

  return (
    <article className="relative grid w-full grid-cols-1 items-stretch gap-7 overflow-hidden  p-4  sm:p-8 lg:grid-cols-[minmax(280px,0.82fr)_minmax(0,1.18fr)] lg:gap-12 lg:p-10">
      <div
        className={`relative min-h-[300px] overflow-hidden rounded-[2rem] ${imageOrder}`}
      >
        <Image
          src={appointment.image}
          alt={appointment.imageAlt}
          fill
          sizes="(min-width: 1024px) 38vw, 100vw"
          className="object-cover"
        />
        <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-900/20 via-transparent to-white/10" />
      </div>

      <div
        className={`flex flex-col justify-center px-1 py-3 sm:px-3 ${detailsOrder}`}
      >
        <h3 className="zeppelin border-b !mb-5 !text-left !text-[26px] tracking-[0.06em] sm:!text-[32px]">
          {appointment.title}
        </h3>
        <p className="!text-left !text-[23px] leading-relaxed sm:!text-[26px]">
          {appointment.description}
        </p>
        <button
          type="button"
          onClick={onCalendar}
          className="mt-8 w-fit  border border-slate-500/35 bg-white/55 px-3 py-1 !text-[22px] shadow-[inset_0_1px_0_rgba(255,255,255,0.95),0_10px_24px_rgba(73,105,126,0.12)] transition hover:-translate-y-0.5 hover:bg-white/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-slate-500"
        >
          View Calendar
        </button>
      </div>
    </article>
  );
}
