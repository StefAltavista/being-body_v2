import Image from "next/image";

type OilImageProps = {
  src: string;
  alt: string;
  shape?: "feature" | "circle";
  corners?: "large" | "xs";
  fit?: "cover" | "contain";
  priority?: boolean;
};

export default function OilImage({
  src,
  alt,
  shape = "feature",
  corners = "large",
  fit = "cover",
  priority = false,
}: OilImageProps) {
  const isCircle = shape === "circle";
  const cornerClass =
    corners === "xs" ? "rounded-[0.35rem]" : "rounded-[2.5rem]";

  return (
    <div
      className={`relative aspect-square w-full shrink-0 overflow-hidden border border-white/65 bg-white/30 shadow-[inset_0_2px_14px_rgba(255,255,255,0.86),0_18px_55px_rgba(62,91,112,0.12)] ${
        isCircle
          ? "max-w-[290px] rounded-full sm:max-w-[330px]"
          : `max-w-[520px] ${cornerClass}`
      }`}
    >
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes={
          isCircle
            ? "(min-width: 640px) 330px, 78vw"
            : "(min-width: 1024px) 35vw, 86vw"
        }
        className={fit === "contain" ? "object-contain" : "object-cover"}
      />
      <span className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-sky-100/10 via-transparent to-white/25" />
    </div>
  );
}
