"use server";
import { getCalendarClient } from "./google";

const CALENDAR_ID = process.env.STUDIO_CALENDAR_ID!;
export interface GoogleEvent {
  id?: string | null;
  summary?: string | null;
  description?: string | null;
  location?: string | null;
  start?: string | null;
  end?: string | null;
}
export default async function getCalendar() {
  try {
    const calendar = await getCalendarClient();
    const now = new Date();
    const oneMonthLater = new Date();
    oneMonthLater.setMonth(now.getMonth() + 1);
    const { data } = await calendar.events.list({
      calendarId: CALENDAR_ID,
      singleEvents: true,
      orderBy: "startTime",
      showDeleted: false,
      timeMin: now.toISOString(), // only events starting from now
      timeMax: oneMonthLater.toISOString(),
    });
    if (data.items)
      return data.items
        .map((e) => ({
          id: e.id,
          summary: e.summary,
          description: e.description,
          start: e.start?.dateTime || e.start?.date,
          end: e.end?.dateTime || e.end?.date,
        }))
        .filter((event) => event.summary == "AVAILABLE");
  } catch (err: any) {
    console.error("Error getting calendar", err);
  }
}
