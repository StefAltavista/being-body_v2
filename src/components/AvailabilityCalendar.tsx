"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

type Slot = {
  start: string;
  end: string;
};

type SlotsByDate = Record<string, Slot[]>;

type EventDetails = {
  title: string;
  description: string;
  location: string;
};

type AvailabilityResponse = {
  slots: SlotsByDate;
  event?: EventDetails | null;
  timeZone: string;
};

const TIME_ZONE = "Europe/Berlin";
const LOCALE = "en-GB";
const MAX_MONTHS_AHEAD = 11;

const AVAILABLE_GRADIENT =
  "linear-gradient(130deg, #FAD0E3 0%, #EEE3F6 48%, #CEF0FA 100%)";

const WEEKDAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

// --------------------------------------------------
// Date helpers
// --------------------------------------------------

function getDateInTimeZone(date: Date): string {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: TIME_ZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(date);

  const get = (type: string) =>
    parts.find((part) => part.type === type)?.value ?? "";

  return `${get("year")}-${get("month")}-${get("day")}`;
}

function dateFromKey(key: string): Date {
  return new Date(`${key}T12:00:00Z`);
}

function addDays(key: string, days: number): string {
  const date = dateFromKey(key);
  date.setUTCDate(date.getUTCDate() + days);
  return date.toISOString().slice(0, 10);
}

function addMonths(key: string, months: number): string {
  const date = dateFromKey(key);
  date.setUTCDate(1);
  date.setUTCMonth(date.getUTCMonth() + months);
  return date.toISOString().slice(0, 7) + "-01";
}

function startOfWeek(key: string): string {
  const day = (dateFromKey(key).getUTCDay() + 6) % 7;
  return addDays(key, -day);
}

function formatDate(key: string, options: Intl.DateTimeFormatOptions): string {
  return new Intl.DateTimeFormat(LOCALE, {
    timeZone: "UTC",
    ...options,
  }).format(dateFromKey(key));
}

function formatTime(iso: string): string {
  return new Intl.DateTimeFormat(LOCALE, {
    timeZone: TIME_ZONE,
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).format(new Date(iso));
}

function getMonthDays(month: string): (string | null)[] {
  const firstDay = dateFromKey(month);
  const year = firstDay.getUTCFullYear();
  const monthIndex = firstDay.getUTCMonth();

  const numberOfDays = new Date(Date.UTC(year, monthIndex + 1, 0)).getUTCDate();

  const leadingDays = (firstDay.getUTCDay() + 6) % 7;

  const cells: (string | null)[] = [
    ...Array(leadingDays).fill(null),
    ...Array.from({ length: numberOfDays }, (_, index) =>
      addDays(month, index),
    ),
  ];

  while (cells.length % 7 !== 0) {
    cells.push(null);
  }

  return cells;
}

function getWeeksForMonth(month: string, today: string): string[] {
  const todayWeek = startOfWeek(today);
  const firstWeek = startOfWeek(month);
  const nextMonth = addMonths(month, 1);

  const weeks: string[] = [];

  for (let week = firstWeek; week < nextMonth; week = addDays(week, 7)) {
    if (week >= todayWeek) {
      weeks.push(week);
    }
  }

  return weeks;
}

function isValidSlot(value: unknown): value is Slot {
  if (!value || typeof value !== "object") return false;

  const slot = value as Partial<Slot>;

  return (
    typeof slot.start === "string" &&
    typeof slot.end === "string" &&
    Number.isFinite(Date.parse(slot.start)) &&
    Number.isFinite(Date.parse(slot.end))
  );
}

// --------------------------------------------------
// Component
// --------------------------------------------------

export default function AvailabilityCalendar() {
  const [today, setToday] = useState(() => getDateInTimeZone(new Date()));

  const [currentMonth, setCurrentMonth] = useState(
    () => getDateInTimeZone(new Date()).slice(0, 7) + "-01",
  );

  const [slots, setSlots] = useState<SlotsByDate>({});

  const [eventDetails, setEventDetails] = useState<EventDetails | null>(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const modalRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  const todayMonth = today.slice(0, 7) + "-01";
  const maximumMonth = addMonths(todayMonth, MAX_MONTHS_AHEAD);

  const days = getMonthDays(currentMonth);

  const monthLabel = formatDate(currentMonth, {
    month: "long",
    year: "numeric",
  });

  const selectedSlots = selectedDate
    ? (slots[selectedDate] ?? []).filter(
        (slot) => Date.parse(slot.start) > Date.now(),
      )
    : [];

  const canGoPrevious = currentMonth > todayMonth;
  const canGoNext = currentMonth < maximumMonth;

  // --------------------------------------------------
  // Keep today's date updated
  // --------------------------------------------------

  useEffect(() => {
    const interval = window.setInterval(() => {
      setToday(getDateInTimeZone(new Date()));
    }, 60_000);

    return () => window.clearInterval(interval);
  }, []);

  // --------------------------------------------------
  // Fetch availability + event metadata
  // --------------------------------------------------

  useEffect(() => {
    const controller = new AbortController();

    async function fetchAvailability() {
      setLoading(true);
      setError(null);
      setSlots({});
      setEventDetails(null);

      const weeks = getWeeksForMonth(
        currentMonth,
        getDateInTimeZone(new Date()),
      );

      try {
        const results = await Promise.all(
          weeks.map(async (week) => {
            const response = await fetch(`/api/availability?week=${week}`, {
              signal: controller.signal,
            });

            if (!response.ok) {
              throw new Error(
                `Availability request failed: ${response.status}`,
              );
            }

            const data: AvailabilityResponse = await response.json();

            if (!data.slots || typeof data.slots !== "object") {
              throw new Error("Invalid availability response");
            }

            return data;
          }),
        );

        if (controller.signal.aborted) return;

        const merged: SlotsByDate = {};

        for (const result of results) {
          for (const [date, daySlots] of Object.entries(result.slots)) {
            if (
              !Array.isArray(daySlots) ||
              date.slice(0, 7) !== currentMonth.slice(0, 7)
            ) {
              continue;
            }

            const byStart = new Map<string, Slot>();

            for (const slot of [...(merged[date] ?? []), ...daySlots]) {
              if (isValidSlot(slot)) {
                byStart.set(`${slot.start}-${slot.end}`, slot);
              }
            }

            merged[date] = Array.from(byStart.values()).sort(
              (a, b) => Date.parse(a.start) - Date.parse(b.start),
            );
          }
        }

        setSlots(merged);

        // Event metadata is shared across all weeks.
        const metadata = results.find((result) => result.event)?.event;

        setEventDetails(metadata ?? null);
      } catch (err) {
        if (controller.signal.aborted) return;

        console.error("Availability error:", err);

        setError("Availability could not be loaded. Please try again.");
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    void fetchAvailability();

    return () => controller.abort();
  }, [currentMonth]);

  // --------------------------------------------------
  // Modal keyboard and focus management
  // --------------------------------------------------

  useEffect(() => {
    if (!selectedDate) return;

    previousFocusRef.current =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;

    const originalOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    closeButtonRef.current?.focus();

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setSelectedDate(null);
        return;
      }

      if (event.key !== "Tab" || !modalRef.current) {
        return;
      }

      const focusable = modalRef.current.querySelectorAll<HTMLElement>(
        'button:not([disabled]), a[href], input:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );

      if (!focusable.length) {
        event.preventDefault();
        return;
      }

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;

      document.removeEventListener("keydown", handleKeyDown);

      previousFocusRef.current?.focus();
    };
  }, [selectedDate]);

  function changeMonth(offset: number) {
    setSelectedDate(null);

    setCurrentMonth((month) => addMonths(month, offset));
  }

  // --------------------------------------------------
  // Render
  // --------------------------------------------------

  return (
    <>
      <section
        aria-label="Monthly availability"
        className="mb-12 w-full max-w-sm rounded-2xl bg-white/45 p-2 shadow-[0_12px_32px_rgba(29,66,84,0.10)] sm:p-3"
      >
        {/* Header */}
        <div className="mb-3 flex items-center justify-between gap-2 px-1 pt-1">
          <div>
            <p className="mt-0.5 text-xs text-slate-500" aria-live="polite">
              {monthLabel}
            </p>
          </div>

          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => setCurrentMonth(todayMonth)}
              disabled={currentMonth === todayMonth}
              className="rounded-lg border border-slate-200 bg-white/70 px-2 py-1.5 text-[11px] text-slate-700 transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-35"
            >
              Today
            </button>

            <button
              type="button"
              onClick={() => changeMonth(-1)}
              disabled={!canGoPrevious}
              aria-label="Previous month"
              className="rounded-lg border border-slate-200 bg-white/70 px-2.5 py-1.5 text-xs text-slate-700 transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-30"
            >
              ←
            </button>

            <button
              type="button"
              onClick={() => changeMonth(1)}
              disabled={!canGoNext}
              aria-label="Next month"
              className="rounded-lg border border-slate-200 bg-white/70 px-2.5 py-1.5 text-xs text-slate-700 transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-30"
            >
              →
            </button>
          </div>
        </div>

        {/* Weekdays */}
        <div className="grid grid-cols-7 gap-0.5">
          {WEEKDAYS.map((day) => (
            <div
              key={day}
              className="pb-1.5 text-center text-[10px] font-medium uppercase tracking-wide text-slate-500"
            >
              {day}
            </div>
          ))}
        </div>

        {/* Calendar */}
        <div className="grid grid-cols-7 gap-0.5 sm:gap-1" aria-busy={loading}>
          {days.map((date, index) => {
            if (!date) {
              return (
                <div
                  key={`empty-${index}`}
                  aria-hidden="true"
                  className="aspect-square"
                />
              );
            }

            const isToday = date === today;
            const isPast = date < today;

            const daySlots = (slots[date] ?? []).filter(
              (slot) => Date.parse(slot.start) > Date.now(),
            );

            const hasAvailability =
              !isPast && !loading && !error && daySlots.length > 0;

            return (
              <button
                key={date}
                type="button"
                disabled={!hasAvailability}
                onClick={() => setSelectedDate(date)}
                aria-label={`${formatDate(date, {
                  weekday: "long",
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}, ${
                  loading
                    ? "Loading availability"
                    : hasAvailability
                      ? `${daySlots.length} available time slots`
                      : "No availability"
                }`}
                className={[
                  "relative flex aspect-square min-w-0 flex-col items-center justify-center overflow-hidden rounded-lg border p-0.5 transition-all duration-200",

                  hasAvailability
                    ? "cursor-pointer border-white/95 text-slate-700 shadow-[inset_0_1px_2px_rgba(255,255,255,1),0_2px_6px_rgba(164,132,188,0.12)] hover:brightness-[1.03] hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-300"
                    : "cursor-default border-white/60 bg-white/50 text-slate-500",

                  isPast ? "opacity-35" : "",

                  isToday && !hasAvailability
                    ? "border-pink-200 ring-1 ring-pink-200"
                    : "",

                  loading ? "animate-pulse" : "",
                ].join(" ")}
                style={
                  hasAvailability
                    ? {
                        backgroundImage: AVAILABLE_GRADIENT,
                      }
                    : undefined
                }
              >
                {/* Glossy highlight */}
                {hasAvailability && (
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/40 to-transparent"
                  />
                )}

                <span
                  className={`relative z-10 text-[11px] leading-none sm:text-xs ${
                    hasAvailability ? "font-semibold" : "font-normal"
                  }`}
                >
                  {formatDate(date, {
                    day: "numeric",
                  })}
                </span>

                {isToday && (
                  <span
                    className={`absolute bottom-0.5 h-1 w-1 rounded-full ${
                      hasAvailability ? "bg-white" : "bg-pink-300"
                    }`}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Legend */}
        <div
          className="mt-3 flex flex-wrap items-center justify-between gap-2 px-1 text-[10px] text-slate-500"
          role="status"
          aria-live="polite"
        >
          <div className="flex items-center gap-1.5">
            <span
              className="h-2.5 w-2.5 rounded-sm border border-white"
              style={{
                backgroundImage: AVAILABLE_GRADIENT,
              }}
            />

            <span>Available dates</span>
          </div>

          <span>{loading ? "Loading..." : error ? error : null}</span>
        </div>
      </section>

      {/* Modal */}
      {selectedDate && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/55 p-3 backdrop-blur-sm sm:p-6"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setSelectedDate(null);
            }
          }}
        >
          <div
            ref={modalRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="availability-modal-title"
            aria-describedby="availability-modal-description"
            className="flex w-full max-w-xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl"
            style={{
              maxHeight: "min(85dvh, 800px)",
            }}
          >
            {/* Modal header */}
            <div className="flex items-start justify-between gap-4 border-b border-slate-100 px-5 py-5 sm:px-6">
              <div>
                <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-pink-400">
                  {eventDetails?.title || "Available times"}
                </p>

                <h3
                  id="availability-modal-title"
                  className="text-xl font-medium text-slate-800 sm:text-2xl"
                >
                  {formatDate(selectedDate, {
                    weekday: "long",
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </h3>

                <p
                  id="availability-modal-description"
                  className="mt-2 text-sm text-slate-500"
                >
                  {selectedSlots.length} available{" "}
                  {selectedSlots.length === 1 ? "time slot" : "time slots"}
                  {" · "}Berlin time
                </p>
              </div>

              <button
                ref={closeButtonRef}
                type="button"
                onClick={() => setSelectedDate(null)}
                aria-label="Close availability details"
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-100 text-lg text-slate-600 transition hover:bg-slate-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-pink-300"
              >
                ×
              </button>
            </div>

            {/* Slot list */}
            <div className="overflow-y-auto px-4 py-4 sm:px-6">
              <div className="flex flex-col gap-3">
                {selectedSlots.length === 0 && (
                  <p className="py-4 text-center text-sm text-slate-500">
                    No upcoming slots remain for this date.
                  </p>
                )}

                {selectedSlots.map((slot) => (
                  <div
                    key={`${slot.start}-${slot.end}`}
                    className="flex flex-col gap-3 rounded-xl border border-slate-100 bg-slate-50/70 p-4 sm:flex-row sm:items-start sm:gap-5"
                  >
                    {/* Time */}
                    <div className="shrink-0 sm:w-32">
                      <div
                        className="inline-flex rounded-lg border border-white/95 px-2.5 py-2 text-xs font-semibold text-slate-700 shadow-[inset_0_1px_2px_rgba(255,255,255,1)]"
                        style={{
                          backgroundImage: AVAILABLE_GRADIENT,
                        }}
                      >
                        {formatTime(slot.start)}
                        {" – "}
                        {formatTime(slot.end)}
                      </div>
                    </div>

                    {/* Event details */}
                    <div className="min-w-0 flex-1 space-y-3">
                      {eventDetails?.description && (
                        <div className="flex items-start gap-2">
                          <p className="mt-0.5 whitespace-pre-line break-words text-sm leading-relaxed text-slate-700">
                            {eventDetails.description
                              .split(/(https?:\/\/[^\s]+)/g)
                              .map((part, index) => {
                                if (/^https?:\/\//.test(part)) {
                                  const url = part.match(/^(.*?)([.,!?;:)]*)$/);
                                  const href = url?.[1] ?? part;
                                  const trailing = url?.[2] ?? "";

                                  return (
                                    <span key={index}>
                                      <Link
                                        href={href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="amatic !underline text-sky-600 underline  transition-colors hover:text-pink-500"
                                      >
                                        {href.replace(
                                          /^https?:\/\/(www\.)?/,
                                          "",
                                        )}
                                      </Link>
                                      {trailing}
                                    </span>
                                  );
                                }

                                return <span key={index}>{part}</span>;
                              })}
                          </p>
                        </div>
                      )}
                      {eventDetails?.location && (
                        <div className="flex items-start gap-2">
                          <svg
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.8"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="mt-0.5 shrink-0 text-pink-400"
                          >
                            <path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" />
                            <circle cx="12" cy="10" r="2.5" />
                          </svg>

                          <div>
                            <p className="mt-0.5 break-words text-sm text-slate-700">
                              {eventDetails.location}
                            </p>
                          </div>
                        </div>
                      )}

                      {!eventDetails?.location &&
                        !eventDetails?.description && (
                          <p className="text-xs text-slate-400">
                            No additional details available.
                          </p>
                        )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Modal footer */}
            <div className="border-t border-slate-100 bg-white px-5 py-3 text-center text-xs text-slate-400">
              Availability is for information only. Online booking is not
              available here.
            </div>
          </div>
        </div>
      )}
    </>
  );
}
