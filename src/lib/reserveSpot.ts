"use server";
import { getCalendarClient } from "./google";

const CALENDAR_ID = process.env.STUDIO_CALENDAR_ID!;

export async function reserveSpot(event, message) {
  try {
    console.log("here", event);
    const calendar = await getCalendarClient();

    const response = await calendar.events.patch({
      calendarId: CALENDAR_ID,
      eventId: event.id!, // the ID of the existing slot
      requestBody: {
        summary: "PENDING CONFIRMATION", // or "Booked by Alice"
        description: message,
        colorId: "5", // optional: change color
      },
      sendUpdates: "all", // notify attendees if any
    });

    console.log({
      id: response.data.id,
      status: response.status,
      updated: response.data.updated,
    });
    return {
      id: response.data.id,
      status: response.status,
      updated: response.data.updated,
    };
  } catch (err: any) {
    console.error(err);
  }
}
