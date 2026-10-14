import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

const API_URL = (
  process.env.CALCOM_API_URL || "https://api.cal.com/v2"
).replace(/\/$/, "");

const TIME_ZONE = "Europe/Berlin";

const SLOTS_API_VERSION = "2024-09-04";
const EVENT_TYPES_API_VERSION = "2026-06-12";

const DATE_REGEX = /^\d{4}-\d{2}-\d{2}$/;

type Slot = {
  start: string;
  end: string;
};

type SlotsByDate = Record<string, Slot[]>;

type CalLocation = {
  type?: string;
  address?: string;
  link?: string;
  public?: boolean;
};

type CalEventType = {
  id: number;
  slug: string;
  title?: string;
  description?: string | null;
  locations?: CalLocation[];
  bookingUrl?: string;
  users?: Array<{
    username?: string;
  }>;
};

type EventDetails = {
  title: string;
  description: string;
  location: string;
};

type CalResponse<T> = {
  status: "success" | "error";
  data: T;
};

// --------------------------------------------------
// Date utilities
// --------------------------------------------------

function isValidDate(value: string): boolean {
  if (!DATE_REGEX.test(value)) return false;

  const date = new Date(`${value}T12:00:00Z`);

  return (
    !Number.isNaN(date.getTime()) && date.toISOString().slice(0, 10) === value
  );
}

function addDays(value: string, days: number): string {
  const date = new Date(`${value}T12:00:00Z`);
  date.setUTCDate(date.getUTCDate() + days);

  return date.toISOString().slice(0, 10);
}

function getTodayInBerlin(): string {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: TIME_ZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(new Date());

  const get = (type: string) =>
    parts.find((part) => part.type === type)?.value ?? "";

  return `${get("year")}-${get("month")}-${get("day")}`;
}

// --------------------------------------------------
// Cal.com event URL parsing
// --------------------------------------------------

function getCalEvent(eventUrl: string) {
  try {
    const url = new URL(eventUrl);

    if (
      !["cal.com", "www.cal.com", "app.cal.com"].includes(
        url.hostname.toLowerCase(),
      )
    ) {
      return null;
    }

    const segments = url.pathname
      .split("/")
      .filter(Boolean)
      .map(decodeURIComponent);

    if (segments.length !== 2) {
      return null;
    }

    return {
      username: segments[0],
      eventSlug: segments[1],
    };
  } catch {
    return null;
  }
}

// --------------------------------------------------
// Shared Cal.com API request
// --------------------------------------------------

async function fetchCalJson<T>(
  url: URL,
  apiKey: string,
  version: string,
  revalidate: number,
): Promise<T> {
  const response = await fetch(url.toString(), {
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "cal-api-version": version,
      Accept: "application/json",
    },
    next: { revalidate },
  });

  if (!response.ok) {
    const body = await response.text();

    console.error("[Cal.com] API request failed", {
      endpoint: url.pathname,
      status: response.status,
      response: body.slice(0, 500),
    });

    throw new Error(`Cal.com ${url.pathname} returned ${response.status}`);
  }

  const result: CalResponse<T> = await response.json();

  if (result?.status !== "success") {
    console.error("[Cal.com] Unexpected API response", {
      endpoint: url.pathname,
      status: result?.status,
    });

    throw new Error(`Invalid Cal.com response: ${url.pathname}`);
  }

  return result.data;
}

// --------------------------------------------------
// Fetch availability
// --------------------------------------------------

async function getAvailableSlots(
  apiKey: string,
  username: string,
  eventSlug: string,
  startDate: string,
  endDate: string,
): Promise<SlotsByDate> {
  const url = new URL(`${API_URL}/slots`);

  url.searchParams.set("username", username);
  url.searchParams.set("eventTypeSlug", eventSlug);
  url.searchParams.set("start", startDate);
  url.searchParams.set("end", endDate);
  url.searchParams.set("timeZone", TIME_ZONE);
  url.searchParams.set("format", "range");

  const data = await fetchCalJson<Record<string, unknown>>(
    url,
    apiKey,
    SLOTS_API_VERSION,
    60,
  );

  if (!data || typeof data !== "object" || Array.isArray(data)) {
    throw new Error("Invalid Cal.com slots data");
  }

  const slots: SlotsByDate = {};

  for (const [date, entries] of Object.entries(data)) {
    if (!isValidDate(date) || !Array.isArray(entries)) {
      continue;
    }

    slots[date] = entries
      .filter((entry): entry is Slot => {
        if (!entry || typeof entry !== "object") {
          return false;
        }

        if (typeof entry.start !== "string" || typeof entry.end !== "string") {
          return false;
        }

        const start = Date.parse(entry.start);
        const end = Date.parse(entry.end);

        return Number.isFinite(start) && Number.isFinite(end) && end > start;
      })
      .map(({ start, end }) => ({
        start,
        end,
      }))
      .sort((a, b) => Date.parse(a.start) - Date.parse(b.start));
  }

  return slots;
}

// --------------------------------------------------
// Event identity validation
// --------------------------------------------------

function normalizePath(value: string): string | null {
  try {
    return decodeURIComponent(new URL(value).pathname)
      .replace(/\/$/, "")
      .toLowerCase();
  } catch {
    return null;
  }
}

function matchesEvent(
  event: CalEventType,
  username: string,
  eventSlug: string,
): boolean {
  if (event.slug?.toLowerCase() !== eventSlug.toLowerCase()) {
    return false;
  }

  const expectedPath = `/${username}/${eventSlug}`.toLowerCase();

  if (event.bookingUrl) {
    const path = normalizePath(event.bookingUrl);

    if (path === expectedPath) {
      return true;
    }
  }

  // Fallback when bookingUrl is missing or differs.
  if (Array.isArray(event.users)) {
    return event.users.some(
      (user) => user.username?.toLowerCase() === username.toLowerCase(),
    );
  }

  return false;
}

// --------------------------------------------------
// Normalize public location
// --------------------------------------------------

function normalizeLocation(locations?: CalLocation[]): string {
  if (!Array.isArray(locations)) {
    return "";
  }

  const values = locations
    .filter((location) => location.public === true)
    .map((location) => {
      if (typeof location.address === "string" && location.address.trim()) {
        return location.address.trim();
      }

      if (typeof location.link === "string" && location.link.trim()) {
        return location.link.trim();
      }

      // Never expose private meeting information.
      return "";
    })
    .filter(Boolean);

  return [...new Set(values)].join(" · ");
}

// --------------------------------------------------
// Fetch event metadata
// --------------------------------------------------

async function getEventDetails(
  apiKey: string,
  username: string,
  eventSlug: string,
): Promise<EventDetails> {
  const configuredId = process.env.CALCOM_EVENT_TYPE_ID;

  let eventTypeId: number;

  if (configuredId) {
    // Preferred: direct ID-based lookup.
    eventTypeId = Number(configuredId);

    if (!Number.isSafeInteger(eventTypeId) || eventTypeId <= 0) {
      throw new Error("CALCOM_EVENT_TYPE_ID must be a positive integer");
    }
  } else {
    // Automatic lookup using Cal.com's native filters.
    const url = new URL(`${API_URL}/event-types`);

    url.searchParams.set("username", username);
    url.searchParams.set("eventSlug", eventSlug);

    const eventTypes = await fetchCalJson<CalEventType[]>(
      url,
      apiKey,
      EVENT_TYPES_API_VERSION,
      300,
    );

    if (!Array.isArray(eventTypes)) {
      throw new Error("Cal.com event-types response is not an array");
    }

    console.info("[Cal.com] Event type lookup", {
      username,
      eventSlug,
      count: eventTypes.length,
      matches: eventTypes.map((item) => ({
        id: item.id,
        slug: item.slug,
        bookingUrl: item.bookingUrl,
        users: item.users?.map((user) => user.username),
      })),
    });

    const event = eventTypes.find((item) =>
      matchesEvent(item, username, eventSlug),
    );

    if (!event) {
      throw new Error(
        `Event type ${username}/${eventSlug} not found ` +
          "or ownership could not be verified. " +
          "Check the API key or configure CALCOM_EVENT_TYPE_ID.",
      );
    }

    eventTypeId = event.id;
  }

  // Retrieve the full event-type details.
  const detailUrl = new URL(`${API_URL}/event-types/${eventTypeId}`);

  const event = await fetchCalJson<CalEventType>(
    detailUrl,
    apiKey,
    EVENT_TYPES_API_VERSION,
    300,
  );

  if (
    !event ||
    typeof event !== "object" ||
    event.slug?.toLowerCase() !== eventSlug.toLowerCase()
  ) {
    throw new Error(
      "Event-type detail response does not match the configured event",
    );
  }

  if (!matchesEvent(event, username, eventSlug)) {
    throw new Error("Event-type owner could not be verified");
  }

  const details: EventDetails = {
    title: typeof event.title === "string" ? event.title : eventSlug,

    description: typeof event.description === "string" ? event.description : "",

    location: normalizeLocation(event.locations),
  };

  console.info("[Cal.com] Metadata loaded", {
    id: eventTypeId,
    title: details.title,
    hasDescription: Boolean(details.description),
    hasLocation: Boolean(details.location),
  });

  return details;
}

// --------------------------------------------------
// GET /api/availability?week=YYYY-MM-DD
// --------------------------------------------------

export async function GET(request: NextRequest) {
  const week = request.nextUrl.searchParams.get("week");

  if (!week || !isValidDate(week)) {
    return NextResponse.json({ error: "Invalid week date" }, { status: 400 });
  }

  const today = getTodayInBerlin();

  // Restrict public queries to a reasonable range.
  const earliestDate = addDays(today, -14);
  const latestDate = addDays(today, 372);

  if (week < earliestDate || week > latestDate) {
    return NextResponse.json(
      { error: "Date outside allowed range" },
      { status: 400 },
    );
  }

  const apiKey = process.env.CALCOM_API_KEY;

  const eventUrl = process.env.NEXT_PUBLIC_CALCOM_PILATES_URL || "";

  const calEvent = getCalEvent(eventUrl);

  if (!apiKey || !calEvent) {
    console.error("[Cal.com] Missing configuration", {
      hasApiKey: Boolean(apiKey),
      validEventUrl: Boolean(calEvent),
    });

    return NextResponse.json(
      { error: "Availability is not configured" },
      { status: 503 },
    );
  }

  const { username, eventSlug } = calEvent;

  const startDate = week;
  const endDate = addDays(week, 6);

  // Availability and metadata are independent.
  const [slotsResult, metadataResult] = await Promise.allSettled([
    getAvailableSlots(apiKey, username, eventSlug, startDate, endDate),
    getEventDetails(apiKey, username, eventSlug),
  ]);

  // Slots are required.
  if (slotsResult.status === "rejected") {
    console.error("[Cal.com] Availability fetch failed:", slotsResult.reason);

    return NextResponse.json(
      { error: "Unable to retrieve availability" },
      { status: 502 },
    );
  }

  // Metadata is optional.
  let event: EventDetails | null = null;

  if (metadataResult.status === "fulfilled") {
    event = metadataResult.value;
  } else {
    console.error(
      "[Cal.com] Event metadata fetch failed:",
      metadataResult.reason,
    );
  }

  return NextResponse.json(
    {
      slots: slotsResult.value,
      event,
      timeZone: TIME_ZONE,
    },
    {
      headers: {
        "Cache-Control":
          "public, max-age=0, s-maxage=60, stale-while-revalidate=30",
      },
    },
  );
}
