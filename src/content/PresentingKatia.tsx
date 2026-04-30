"use client";

import { useRef, useState } from "react";
import Image from "next/image";

const carouselImages = [
  "/img/homeCarousel/1.jpeg",
  "/img/homeCarousel/2.jpeg",
  "/img/homeCarousel/3.jpeg",
  "/img/homeCarousel/4.jpeg",
  "/img/homeCarousel/5.jpeg",
  "/img/homeCarousel/6.jpeg",
];

const CARD_WIDTH = 250;
const CARD_HEIGHT = 400;
const STEP = 250;
const DRAG_THRESHOLD = 70;

export default function PresentingKatia() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const startXRef = useRef(0);
  const pointerIdRef = useRef<number | null>(null);
  const dragOffsetRef = useRef(0);

  const canGoPrevious = activeIndex > 0;
  const canGoNext = activeIndex < carouselImages.length - 1;

  const goPrevious = () => {
    setActiveIndex((current) => Math.max(current - 1, 0));
    setDragOffset(0);
    dragOffsetRef.current = 0;
  };

  const goNext = () => {
    setActiveIndex((current) =>
      Math.min(current + 1, carouselImages.length - 1),
    );
    setDragOffset(0);
    dragOffsetRef.current = 0;
  };

  const resetDrag = () => {
    setDragOffset(0);
    dragOffsetRef.current = 0;
  };

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    pointerIdRef.current = event.pointerId;
    startXRef.current = event.clientX;
    dragOffsetRef.current = 0;

    setDragOffset(0);
    setIsDragging(true);

    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging || pointerIdRef.current !== event.pointerId) return;

    const rawDeltaX = event.clientX - startXRef.current;

    const isDraggingPastFirst = activeIndex === 0 && rawDeltaX > 0;
    const isDraggingPastLast =
      activeIndex === carouselImages.length - 1 && rawDeltaX < 0;

    const nextDragOffset =
      isDraggingPastFirst || isDraggingPastLast ? rawDeltaX * 0.22 : rawDeltaX;

    dragOffsetRef.current = nextDragOffset;
    setDragOffset(nextDragOffset);
  };

  const handlePointerUp = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging || pointerIdRef.current !== event.pointerId) return;

    const finalDragOffset = dragOffsetRef.current;

    if (finalDragOffset > DRAG_THRESHOLD && canGoPrevious) {
      goPrevious();
    } else if (finalDragOffset < -DRAG_THRESHOLD && canGoNext) {
      goNext();
    } else {
      resetDrag();
    }

    setIsDragging(false);
    pointerIdRef.current = null;

    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  };

  return (
    <section
      className="
        relative
        h-[540px]
        w-full
        overflow-hidden
        select-none
      "
    >
      <div
        className="
          pointer-events-none
          absolute
          inset-0
          z-10
          flex
          items-center
          justify-center
          overflow-hidden
          [perspective:1200px]
        "
      >
        {carouselImages.map((src, index) => {
          const distanceFromActive = index - activeIndex + dragOffset / STEP;
          const absoluteDistance = Math.min(Math.abs(distanceFromActive), 2);

          const x = distanceFromActive * STEP;
          const isLeft = distanceFromActive < 0;

          const scale = 1 - absoluteDistance * 0.28;
          const opacity = 1 - absoluteDistance * 0.28;
          const rotateY = isLeft
            ? absoluteDistance * -24
            : absoluteDistance * 24;
          const skewY = isLeft ? absoluteDistance * 7 : absoluteDistance * -7;
          const translateY = absoluteDistance * 32;

          return (
            <div
              key={src}
              className="
                absolute
                left-1/2
                top-1/2
                shrink-0
                will-change-transform
              "
              style={{
                width: `${CARD_WIDTH}px`,
                height: `${CARD_HEIGHT}px`,
                zIndex: 30 - Math.round(absoluteDistance * 10),
                opacity,
                transform: `
                  translate3d(
                    calc(-50% + ${x}px),
                    calc(-50% + ${translateY}px),
                    0
                  )
                  scale(${scale})
                  rotateY(${rotateY}deg)
                  skewY(${skewY}deg)
                `,
                transition: isDragging
                  ? "none"
                  : "transform 500ms ease, opacity 500ms ease",
              }}
            >
              <Image
                src={src}
                width={CARD_WIDTH}
                height={CARD_HEIGHT}
                alt={`Carousel image ${index + 1}`}
                draggable={false}
                className="
                  h-full
                  w-full
                  rounded-[2rem]
                  object-cover
                  shadow-2xl
                "
              />
            </div>
          );
        })}
      </div>

      <div
        className={`
          absolute
          inset-0
          z-30
          touch-none
          ${isDragging ? "cursor-grabbing" : "cursor-grab"}
        `}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
      />

      {canGoPrevious && (
        <button
          type="button"
          aria-label="Previous image"
          onClick={goPrevious}
          className="
            absolute
            left-4
            top-1/2
            z-50
            flex
            h-12
            w-12
            -translate-y-1/2
            items-center
            justify-center
            rounded-full
            bg-white/80
            text-3xl
            font-light
            text-black
            shadow-xl
            backdrop-blur-md
            transition
            hover:scale-105
            active:scale-95
          "
        >
          &lt;
        </button>
      )}

      {canGoNext && (
        <button
          type="button"
          aria-label="Next image"
          onClick={goNext}
          className="
            absolute
            right-4
            top-1/2
            z-50
            flex
            h-12
            w-12
            -translate-y-1/2
            items-center
            justify-center
            rounded-full
            bg-white/80
            text-3xl
            font-light
            text-black
            shadow-xl
            backdrop-blur-md
            transition
            hover:scale-105
            active:scale-95
          "
        >
          &gt;
        </button>
      )}
    </section>
  );
}
