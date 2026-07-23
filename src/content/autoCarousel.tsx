"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

const slideNumber = 23;
const baseLink = "/img/homeCarousel/";
const format = ".jpg";
const carouselImages = Array.from(
  { length: slideNumber - 1 },
  (_, i) => baseLink + (i + 1) + format,
);
const CARD_WIDTH = 250;
const CARD_HEIGHT = 400;
const STEP = 250;
const AUTO_SPEED = 0.3;

function wrapPosition(position: number) {
  return (
    ((position % carouselImages.length) + carouselImages.length) %
    carouselImages.length
  );
}

function getCircularDistance(index: number, position: number) {
  const half = carouselImages.length / 2;
  let distance = index - position;

  if (distance > half) distance -= carouselImages.length;
  if (distance < -half) distance += carouselImages.length;

  return distance;
}

function isPointOverCarouselCard(element: HTMLElement, x: number, y: number) {
  const target = element.ownerDocument.elementFromPoint(x, y);

  return Boolean(target?.closest("[data-auto-carousel-card]"));
}

export default function AutoCarousel() {
  const [hasMounted, setHasMounted] = useState(false);
  const [position, setPosition] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const positionRef = useRef(0);
  const startXRef = useRef(0);
  const startPositionRef = useRef(0);
  const dragOffsetRef = useRef(0);
  const pointerIdRef = useRef<number | null>(null);
  const pausedRef = useRef(false);
  const isDraggingRef = useRef(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  const commitDragPosition = () => {
    const next = wrapPosition(
      startPositionRef.current - dragOffsetRef.current / STEP,
    );

    positionRef.current = next;
    startPositionRef.current = next;
    dragOffsetRef.current = 0;

    setPosition(next);
    setDragOffset(0);
  };

  useEffect(() => {
    pausedRef.current = isPaused || isDragging;
  }, [isDragging, isPaused]);

  useEffect(() => {
    let frameId = 0;
    let lastTime = 0;

    const tick = (time: number) => {
      if (!lastTime) lastTime = time;

      const delta = (time - lastTime) / 1000;
      lastTime = time;

      if (!pausedRef.current) {
        setPosition((current) => {
          const next = wrapPosition(current - AUTO_SPEED * delta);
          positionRef.current = next;

          return next;
        });
      }

      frameId = requestAnimationFrame(tick);
    };

    frameId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frameId);
    };
  }, []);

  const goPrevious = () => {
    setPosition((current) => {
      const next = wrapPosition(current - 1);
      positionRef.current = next;

      return next;
    });
    setDragOffset(0);
  };

  const goNext = () => {
    setPosition((current) => {
      const next = wrapPosition(current + 1);
      positionRef.current = next;

      return next;
    });
    setDragOffset(0);
  };

  const handlePointerDown = (event: React.PointerEvent<HTMLElement>) => {
    event.preventDefault();
    event.stopPropagation();

    pointerIdRef.current = event.pointerId;
    startXRef.current = event.clientX;
    startPositionRef.current = positionRef.current;
    dragOffsetRef.current = 0;

    setDragOffset(0);
    setIsPaused(true);
    setIsDragging(true);
    isDraggingRef.current = true;

    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLElement>) => {
    if (!isDraggingRef.current || pointerIdRef.current !== event.pointerId)
      return;

    event.preventDefault();
    event.stopPropagation();

    const nextDragOffset = event.clientX - startXRef.current;

    dragOffsetRef.current = nextDragOffset;
    setDragOffset(nextDragOffset);
  };

  const handlePointerUp = (event: React.PointerEvent<HTMLElement>) => {
    if (!isDraggingRef.current || pointerIdRef.current !== event.pointerId)
      return;

    event.preventDefault();
    event.stopPropagation();

    commitDragPosition();
    setIsDragging(false);
    isDraggingRef.current = false;
    pointerIdRef.current = null;
    setIsPaused(
      event.pointerType === "mouse" &&
        isPointOverCarouselCard(event.currentTarget, event.clientX, event.clientY),
    );

    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  };

  const handleSectionPointerDown = (
    event: React.PointerEvent<HTMLElement>,
  ) => {
    if (event.pointerType === "mouse") {
      handlePointerDown(event);
    }
  };

  const handleImagePointerEnter = (
    event: React.PointerEvent<HTMLDivElement>,
  ) => {
    if (event.pointerType === "mouse") {
      setIsPaused(true);
    }
  };

  const handleImagePointerLeave = (
    event: React.PointerEvent<HTMLDivElement>,
  ) => {
    if (!isDragging && event.pointerType === "mouse") {
      setIsPaused(false);
    }
  };

  const visiblePosition = wrapPosition(position - dragOffset / STEP);

  if (!hasMounted) {
    return (
      <section
        aria-hidden="true"
        data-auto-carousel-root
        className="
          relative
          z-20
          h-[540px]
          w-full
          overflow-hidden
          select-none
        "
      />
    );
  }

  return (
    <section
      data-auto-carousel-root
      className="
        relative
        z-20
        h-[540px]
        w-full
        overflow-hidden
        select-none
      "
      onPointerDown={handleSectionPointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
    >
      <div
        className="
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
          const distanceFromActive = getCircularDistance(
            index,
            visiblePosition,
          );
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
              key={index}
              className="
                absolute
                left-1/2
                top-1/2
                cursor-grab
                active:cursor-grabbing
                pointer-events-auto
                shrink-0
                will-change-transform
                z-2000
              "
              data-auto-carousel-card
              onPointerEnter={handleImagePointerEnter}
              onPointerLeave={handleImagePointerLeave}
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              onPointerCancel={handlePointerUp}
              style={{
                width: `${CARD_WIDTH}px`,
                height: `${CARD_HEIGHT}px`,
                touchAction: "none",
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
                transition: isDragging ? "none" : "opacity 300ms ease",
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

      {/* <button
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
      </button> */}
    </section>
  );
}
