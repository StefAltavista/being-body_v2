"use server";
import { GoogleEvent } from "./getCalendar";
import { getCalendarClient } from "./google";

const CALENDAR_ID = process.env.STUDIO_CALENDAR_ID!;

export async function reserveSpot(event: GoogleEvent, message: string) {
  try {
    const calendar = await getCalendarClient();

    const response = await calendar.events.patch({
      calendarId: CALENDAR_ID,
      eventId: event.id!,
      requestBody: {
        summary: "PENDING CONFIRMATION",
        description: message,
        colorId: "5",
      },
      sendUpdates: "all",
    });

    return {
      id: response.data.id,
      status: response.status,
      updated: response.data.updated,
    };
  } catch (err) {
    console.error(err);
    return {
      id: null,
      status: 500,
      updated: null,
    };
  }
}
