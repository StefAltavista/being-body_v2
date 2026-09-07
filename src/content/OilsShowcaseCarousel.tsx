"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { oils } from "@/content/oils";

const CARD_WIDTH = 250;
const CARD_HEIGHT = 370;
const STEP = 300;
const AUTO_SPEED = 0.24;
const CLICK_DRAG_THRESHOLD = 8;
const CENTER_PAUSE_MS = 500;
const CENTER_EPSILON = 0.01;

function wrapPosition(position: number) {
  return ((position % oils.length) + oils.length) % oils.length;
}

function getCircularDistance(index: number, position: number) {
  const half = oils.length / 2;
  let distance = index - position;

  if (distance > half) distance -= oils.length;
  if (distance < -half) distance += oils.length;

  return distance;
}

function isPointOverCarouselCard(element: HTMLElement, x: number, y: number) {
  const target = element.ownerDocument.elementFromPoint(x, y);
  return Boolean(target?.closest("[data-oils-showcase-card]"));
}

type OilsShowcaseCarouselProps = {
  title?: string;
};

export default function OilsShowcaseCarousel({
  title,
}: OilsShowcaseCarouselProps) {
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
  const didDragRef = useRef(false);
  const nextCenterRef = useRef(oils.length - 1);
  const centerPauseUntilRef = useRef(0);
  const hasAutoStartedRef = useRef(false);

  useEffect(() => {
    pausedRef.current = isPaused || isDragging;
  }, [isDragging, isPaused]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frameId = 0;
    let lastTime = 0;

    const tick = (time: number) => {
      if (!lastTime) lastTime = time;

      const delta = (time - lastTime) / 1000;
      lastTime = time;

      if (!hasAutoStartedRef.current) {
        hasAutoStartedRef.current = true;
        centerPauseUntilRef.current = time + CENTER_PAUSE_MS;
      }

      if (
        !pausedRef.current &&
        !isDraggingRef.current &&
        time >= centerPauseUntilRef.current
      ) {
        const current = positionRef.current;
        const targetCenter = nextCenterRef.current;
        const distanceToCenter = wrapPosition(current - targetCenter);
        const movement = AUTO_SPEED * delta;

        if (
          distanceToCenter <= CENTER_EPSILON ||
          movement >= distanceToCenter
        ) {
          positionRef.current = targetCenter;
          nextCenterRef.current = wrapPosition(targetCenter - 1);
          centerPauseUntilRef.current = time + CENTER_PAUSE_MS;
          setPosition(targetCenter);
        } else {
          const next = wrapPosition(current - movement);
          positionRef.current = next;
          setPosition(next);
        }
      }

      frameId = requestAnimationFrame(tick);
    };

    frameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameId);
  }, []);

  const handlePointerDown = (event: React.PointerEvent<HTMLElement>) => {
    if (event.pointerType === "mouse" && event.button !== 0) return;

    pointerIdRef.current = event.pointerId;
    startXRef.current = event.clientX;
    startPositionRef.current = positionRef.current;
    dragOffsetRef.current = 0;
    didDragRef.current = false;
    setDragOffset(0);
    setIsDragging(true);
    isDraggingRef.current = true;
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLElement>) => {
    if (!isDraggingRef.current || pointerIdRef.current !== event.pointerId)
      return;

    const nextOffset = event.clientX - startXRef.current;
    dragOffsetRef.current = nextOffset;
    didDragRef.current =
      didDragRef.current || Math.abs(nextOffset) > CLICK_DRAG_THRESHOLD;
    setDragOffset(nextOffset);

    if (
      didDragRef.current &&
      !event.currentTarget.hasPointerCapture(event.pointerId)
    ) {
      event.currentTarget.setPointerCapture(event.pointerId);
    }
  };

  const finishPointerGesture = (event: React.PointerEvent<HTMLElement>) => {
    if (!isDraggingRef.current || pointerIdRef.current !== event.pointerId)
      return;

    const next = wrapPosition(
      startPositionRef.current - dragOffsetRef.current / STEP,
    );
    const nearestCenter = wrapPosition(Math.round(next));
    const distanceFromCenter = Math.min(
      wrapPosition(next - nearestCenter),
      wrapPosition(nearestCenter - next),
    );
    const finishedAtCenter = distanceFromCenter <= CENTER_EPSILON;
    const finalPosition = finishedAtCenter ? nearestCenter : next;

    positionRef.current = finalPosition;
    nextCenterRef.current = finishedAtCenter
      ? wrapPosition(finalPosition - 1)
      : wrapPosition(Math.floor(finalPosition));
    centerPauseUntilRef.current = finishedAtCenter
      ? performance.now() + CENTER_PAUSE_MS
      : 0;
    dragOffsetRef.current = 0;
    pointerIdRef.current = null;
    setPosition(finalPosition);
    setDragOffset(0);
    setIsDragging(false);
    isDraggingRef.current = false;
    setIsPaused(
      event.pointerType === "mouse" &&
        isPointOverCarouselCard(
          event.currentTarget,
          event.clientX,
          event.clientY,
        ),
    );

    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  };

  const preventClickAfterDrag = (event: React.MouseEvent<HTMLElement>) => {
    if (!didDragRef.current) return;

    event.preventDefault();
    event.stopPropagation();
    didDragRef.current = false;
  };

  const visiblePosition = wrapPosition(position - dragOffset / STEP);

  return (
    <section
      aria-label="Explore the oil collection"
      className=" relative z-20 -mx-8 h-[500px] w-[calc(100%+4rem)] select-none overflow-hidden sm:-mx-12 sm:w-[calc(100%+6rem)] lg:-mx-14 lg:w-[calc(100%+7rem)]"
      data-oils-showcase
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={finishPointerGesture}
      onPointerCancel={finishPointerGesture}
      onClickCapture={preventClickAfterDrag}
      style={{ touchAction: "pan-y" }}
    >
      {title && (
        <h2 className="pointer-events-none absolute inset-x-0 top-0 z-40 !text-center !text-[30px] font-normal sm:!text-[36px]">
          {title}
        </h2>
      )}

      <div className="absolute inset-0 flex items-center justify-center overflow-hidden  [perspective:1200px]">
        {oils.map((oil, index) => {
          const distance = getCircularDistance(index, visiblePosition);
          const absoluteDistance = Math.min(Math.abs(distance), 2);
          const isLeft = distance < 0;
          const translateX = distance * STEP;
          const scale = 1 - absoluteDistance * 0.5;
          const opacity = 1 - absoluteDistance * 0.25;
          const rotateY = absoluteDistance * (isLeft ? -20 : 20);
          const translateY = absoluteDistance * 80;

          return (
            <div
              key={oil.slug}
              className="absolute left-1/2 top-1/2 shrink-0 will-change-transform"
              data-oils-showcase-card
              onPointerEnter={(event) => {
                if (event.pointerType === "mouse") setIsPaused(true);
              }}
              onPointerLeave={(event) => {
                if (event.pointerType === "mouse" && !isDraggingRef.current) {
                  setIsPaused(false);
                }
              }}
              style={{
                width: CARD_WIDTH,
                height: CARD_HEIGHT,
                zIndex: 30 - Math.round(absoluteDistance * 10),
                opacity,
                transform: `translate3d(calc(-50% + ${translateX}px), calc(-50% + ${translateY}px), 0) scale(${scale}) rotateY(${rotateY}deg)`,
                transition: isDragging ? "none" : "opacity 300ms ",
                transitionTimingFunction: "ease-in-out",
              }}
            >
              <Link
                href={`/oils/${oil.slug}`}
                aria-label={`Discover ${oil.name}`}
                className="group block h-full w-full  focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
                onFocus={() => setIsPaused(true)}
                onBlur={() => setIsPaused(false)}
                draggable={false}
              >
                <div className="relative flex h-full w-full flex-col items-center justify-between overflow-hidden rounded-[0.8rem] border border-white/60 bg-white/40 px-5 py-6 shadow-[inset_0_2px_12px_rgba(255,255,255,0.82),0_22px_50px_rgba(53,83,104,0.16)] backdrop-blur-md transition-transform duration-500 ease-out group-hover:scale-[1.08] group-focus-visible:scale-[1.08]">
                  <span className="pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full bg-white/50 blur-2xl" />
                  <span className="pointer-events-none absolute -bottom-10 -left-8 h-32 w-32 rounded-full bg-sky-100/35 blur-3xl" />

                  <h3 className="relative z-10 !mb-0 !text-center !text-[36px] font-normal leading-tight">
                    {oil.name}
                  </h3>

                  <div className="relative z-10 h-[190px] w-[190px] overflow-hidden rounded-full border border-white/75 bg-white/35 shadow-[inset_0_2px_12px_rgba(255,255,255,0.82),0_12px_30px_rgba(53,83,104,0.14)]">
                    <Image
                      src={oil.images[1]}
                      alt={oil.name}
                      fill
                      sizes="190px"
                      draggable={false}
                      className="pointer-events-none object-cover"
                    />
                  </div>

                  <p className="handWrite2 relative z-10 !mb-0 !mt-0 !text-center !text-[20px] tracking-[0.14em]">
                    {oil.intention}
                  </p>
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    </section>
  );
}
