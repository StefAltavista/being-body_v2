"use client";

import { useRef, useState } from "react";
import Image from "next/image";

type OilCarouselProps = {
  images: string[];
  alt: string;
};

const SWIPE_THRESHOLD = 36;

function wrapIndex(index: number, length: number) {
  return ((index % length) + length) % length;
}

export default function OilCarousel({ images, alt }: OilCarouselProps) {
  const hasMultipleImages = images.length > 1;
  const [trackIndex, setTrackIndex] = useState(hasMultipleImages ? 1 : 0);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [transitionEnabled, setTransitionEnabled] = useState(true);

  const pointerIdRef = useRef<number | null>(null);
  const startXRef = useRef(0);
  const dragOffsetRef = useRef(0);

  if (images.length === 0) return null;

  const slides = hasMultipleImages
    ? [
        {
          src: images[images.length - 1],
          imageIndex: images.length - 1,
          clone: true,
        },
        ...images.map((src, imageIndex) => ({
          src,
          imageIndex,
          clone: false,
        })),
        { src: images[0], imageIndex: 0, clone: true },
      ]
    : [{ src: images[0], imageIndex: 0, clone: false }];

  const activeIndex = hasMultipleImages
    ? wrapIndex(trackIndex - 1, images.length)
    : 0;

  const move = (direction: -1 | 1) => {
    if (!hasMultipleImages || isAnimating || isDragging) return;

    setTransitionEnabled(true);
    setIsAnimating(true);
    setTrackIndex((current) => current + direction);
  };

  const goToImage = (imageIndex: number) => {
    if (imageIndex === activeIndex || isAnimating || isDragging) return;

    setTransitionEnabled(true);
    setIsAnimating(true);
    setTrackIndex(imageIndex + 1);
  };

  const handleTransitionEnd = (
    event: React.TransitionEvent<HTMLDivElement>,
  ) => {
    if (event.target !== event.currentTarget) return;

    if (trackIndex === 0) {
      setTransitionEnabled(false);
      setTrackIndex(images.length);
    } else if (trackIndex === images.length + 1) {
      setTransitionEnabled(false);
      setTrackIndex(1);
    }

    setIsAnimating(false);
  };

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!hasMultipleImages || isAnimating) return;

    pointerIdRef.current = event.pointerId;
    startXRef.current = event.clientX;
    dragOffsetRef.current = 0;
    setDragOffset(0);
    setTransitionEnabled(false);
    setIsDragging(true);
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging || pointerIdRef.current !== event.pointerId) return;

    const nextOffset = event.clientX - startXRef.current;
    dragOffsetRef.current = nextOffset;
    setDragOffset(nextOffset);
  };

  const finishPointerGesture = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging || pointerIdRef.current !== event.pointerId) return;

    const finalOffset = dragOffsetRef.current;
    pointerIdRef.current = null;
    dragOffsetRef.current = 0;
    setIsDragging(false);
    setDragOffset(0);
    setTransitionEnabled(true);

    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }

    if (Math.abs(finalOffset) < SWIPE_THRESHOLD) return;

    setIsAnimating(true);
    setTrackIndex((current) => current + (finalOffset < 0 ? 1 : -1));
  };

  return (
    <div
      className="relative z-10 my-7 w-[220px] select-none sm:w-[250px]"
      role="region"
      aria-label={`${alt} image carousel`}
      aria-roledescription="carousel"
      data-oil-carousel
    >
      <div className="relative aspect-square">
        <div
          className={`h-full w-full overflow-hidden rounded-full border border-white/70 bg-white/30 shadow-[inset_0_5px_18px_rgba(255,255,255,0.9),0_12px_32px_rgba(72,104,126,0.12)] ${hasMultipleImages ? "cursor-grab active:cursor-grabbing" : ""}`}
          style={{ touchAction: "pan-y" }}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={finishPointerGesture}
          onPointerCancel={finishPointerGesture}
        >
          <div
            className="flex h-full will-change-transform"
            onTransitionEnd={handleTransitionEnd}
            style={{
              transform: `translate3d(calc(-${trackIndex * 100}% + ${dragOffset}px), 0, 0)`,
              transition:
                transitionEnabled && !isDragging
                  ? "transform 820ms cubic-bezier(0.22, 1, 0.36, 1)"
                  : "none",
            }}
          >
            {slides.map((slide, slideIndex) => (
              <div
                key={`${slide.src}-${slideIndex}`}
                className="flex h-full w-full shrink-0 items-center justify-center"
                aria-hidden={slide.clone}
              >
                <Image
                  className="h-[100%] w-[100%] object-cover "
                  src={slide.src}
                  width={250}
                  height={250}
                  alt={
                    slide.clone
                      ? ""
                      : `${alt}, image ${slide.imageIndex + 1} of ${images.length}`
                  }
                  draggable={false}
                />
              </div>
            ))}
          </div>
        </div>

        {hasMultipleImages && (
          <>
            <button
              type="button"
              aria-label={`Previous ${alt} image`}
              onClick={() => move(-1)}
              onPointerDown={(event) => event.stopPropagation()}
              className="absolute -left-6 top-1/2 z-20 flex h-5 w-5 -translate-y-1/2 items-center justify-center rounded-full border border-white/75 bg-white/55 pb-px !text-[16px] leading-none shadow-sm backdrop-blur-sm transition duration-200 hover:scale-110 hover:bg-white/80 active:scale-95 disabled:opacity-40"
              disabled={isAnimating}
            >
              ‹
            </button>
            <button
              type="button"
              aria-label={`Next ${alt} image`}
              onClick={() => move(1)}
              onPointerDown={(event) => event.stopPropagation()}
              className="absolute -right-6 top-1/2 z-20 flex h-5 w-5 -translate-y-1/2 items-center justify-center rounded-full border border-white/75 bg-white/55 pb-px !text-[16px] leading-none shadow-sm backdrop-blur-sm transition duration-200 hover:scale-110 hover:bg-white/80 active:scale-95 disabled:opacity-40"
              disabled={isAnimating}
            >
              ›
            </button>
          </>
        )}
      </div>

      {hasMultipleImages && (
        <div
          className="mt-3 flex items-center justify-center gap-2"
          aria-label="Choose image"
        >
          {images.map((_, imageIndex) => (
            <button
              key={imageIndex}
              type="button"
              aria-label={`Show ${alt} image ${imageIndex + 1}`}
              aria-current={imageIndex === activeIndex ? "true" : undefined}
              onClick={() => goToImage(imageIndex)}
              className={`h-2.5 w-2.5 rounded-full  p-0 transition-all duration-300 ${
                imageIndex === activeIndex
                  ? "scale-110 bg-blue-600/20"
                  : "bg-white hover:bg-blue-600/10 border border-blue-600/10"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
