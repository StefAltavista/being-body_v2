import { bookingRequestDataType } from "@/types/forms";
import { escapeHtml, validateMessageForm } from "@/lib/validateMessageForm";

export default function buildMessage(
  subject: string,
  data: bookingRequestDataType,
) {
  const checked = validateMessageForm(data);

  if (!checked.ok) {
    throw new Error("INVALID_FORM_DATA");
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
