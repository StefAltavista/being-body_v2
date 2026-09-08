import Image from "next/image";

const artwork = {
  sharp: {
    filterClass: "blur-[1px] hue-rotate-[100deg]",
    src: "/img/rendered/concept-sharp-1x.webp",
    src2x: "/img/rendered/concept-sharp-2x.webp",
  },
  soft: {
    filterClass: "blur-[10px] hue-rotate-[30deg]",
    src: "/img/rendered/concept-soft-1x.webp",
    src2x: "/img/rendered/concept-soft-2x.webp",
  },
};

/** Preserve the original img as GSAP's target and as the flex layout item. */
export default function ConceptArtwork({
  variant,
  className,
  absolute = false,
}: {
  variant: keyof typeof artwork;
  className: string;
  absolute?: boolean;
}) {
  const asset = artwork[variant];

  return (
    <picture style={{ display: "contents" }}>
      {/* At >=640px this artwork is exactly 500 CSS px wide. Below that,
          retain the original filters: a scaled bitmap would change the blur's
          fixed CSS-pixel radius. No extra boxes or filter layers are created. */}
      <source
        media="(min-width: 640px)"
        srcSet={`${asset.src} 1x, ${asset.src2x} 2x`}
      />
      <Image
        src="/img/bubbles.webp"
        alt="BeingBodyConcept"
        width={500}
        height={667}
        className={`${absolute ? "absolute" : ""} ${className} ${asset.filterClass} sm:filter-none`}
      />
    </picture>
  );
}
