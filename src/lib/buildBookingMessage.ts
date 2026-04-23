import type { bookingRequestDataType } from "@/types/forms";
import { escapeHtml } from "@/lib/validateMessageForm";
import { validateBookingRequestForm } from "@/lib/validateBookingRequestForm";

export default function buildBookingMessage(
  subject: string,
  data: bookingRequestDataType,
) {
  const checked = validateBookingRequestForm(data);

  if (!checked.ok) {
    throw new Error("INVALID_BOOKING_DATA");
  }

  const safe = checked.sanitized;

  const info = Object.keys(safe)
    .map((key) => {
      const typedKey = key as keyof bookingRequestDataType;
      const value = escapeHtml(safe[typedKey]!).replace(/\n/g, "<br />");
      return `${escapeHtml(key.toUpperCase())}: ${value}`;
    })
    .join("<br />");

  return `<div><p>Hello Katia! <br />You received a ${escapeHtml(
    subject,
  )}</p><br /><p>${info}</p></div>`;
}
