import { NextResponse } from "next/server";
import buildBookingMessage from "@/lib/buildBookingMessage";
import { validateBookingRequestForm } from "@/lib/validateBookingRequestForm";
import type { bookingRequestDataType } from "@/types/forms";
import { reserveSpot } from "@/lib/reserveSpot";
import type { GoogleEvent } from "@/lib/getCalendar";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const { event, data } = (await req.json()) as {
      event?: GoogleEvent;
      data?: bookingRequestDataType;
    };

    if (!event || !event.id || !event.start) {
      return NextResponse.json(
        { result: "Invalid booking event." },
        { status: 400 },
      );
    }

    if (!data) {
      return NextResponse.json(
        { result: "Missing booking form data." },
        { status: 400 },
      );
    }

    const checked = validateBookingRequestForm(data);

    if (!checked.ok) {
      return NextResponse.json(
        {
          result: "Invalid booking form data.",
          errors: checked.errors,
        },
        { status: 400 },
      );
    }

    const subject = "New Booking Request from Beingbody.net";
    const message = buildBookingMessage(subject, checked.sanitized);

    const result = await reserveSpot(event, message);

    if (!result || result.status !== 200) {
      return NextResponse.json(
        { result: "Could not reserve the selected slot." },
        { status: 500 },
      );
    }

    return NextResponse.json(
      {
        result: "Request successfully sent.",
        booking: result,
      },
      { status: 200 },
    );
  } catch (e) {
    console.log(e);
    return NextResponse.json(
      {
        result:
          "Sorry, there was a problem with the server. Please try again later.",
      },
      { status: 500 },
    );
  }
}
