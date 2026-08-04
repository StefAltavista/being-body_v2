import type { bookingRequestDataType } from "@/types/forms";
import { escapeHtml, validateMessageForm } from "@/lib/validateMessageForm";

type Answer = {
  label: string;
  value: string;
};

function answerRow({ label, value }: Answer) {
  const content = value
    ? escapeHtml(value).replace(/\n/g, "<br />")
    : '<span style="color:#7d8c87;font-style:italic;">Not provided</span>';

  return `
    <tr>
      <td style="padding:14px 0;border-bottom:1px solid #e8eee9;vertical-align:top;">
        <div style="margin-bottom:5px;color:#66756f;font-family:Arial,sans-serif;font-size:12px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;">
          ${escapeHtml(label)}
        </div>
        <div style="color:#254f66;font-family:Arial,sans-serif;font-size:16px;line-height:1.55;word-break:break-word;">
          ${content}
        </div>
      </td>
    </tr>`;
}
function section(title: string, answers: Answer[]) {
  return `
    <tr>
      <td style="padding:24px 34px 8px;">
        <div style="color:#855f52;font-family:Arial,sans-serif;font-size:18px;font-weight:700;">
          ${escapeHtml(title)}
        </div>
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
          ${answers.map(answerRow).join("")}
        </table>
      </td>
    </tr>`;
}

export default function buildMessage(
  subject: string,
  data: bookingRequestDataType,
) {
  const checked = validateMessageForm(data);

  if (!checked.ok) {
    throw new Error("INVALID_FORM_DATA");
  }

  const safe = checked.sanitized;
  const submittedAt = new Intl.DateTimeFormat("en-GB", {
    dateStyle: "long",
    timeStyle: "short",
    timeZone: "Europe/Rome",
  }).format(new Date());

  const sections = [
    section("Contact details", [
      { label: "Name", value: safe.name },
      { label: "Pronouns", value: safe.pronouns },
      { label: "Email", value: safe.email },
      { label: "Phone", value: safe.tel },
    ]),
    section("Message", [{ label: "Message", value: safe.message }]),
  ].join("");

  return `<!doctype html>
<html lang="en">
  <body style="margin:0;padding:0;background:#f5f1ec;">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background:#f5f1ec;">
      <tr>
        <td align="center" style="padding:28px 12px;">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="max-width:680px;overflow:hidden;background:#ffffff;border:1px solid #e3ded7;border-radius:20px;box-shadow:0 8px 30px rgba(37,79,102,.08);">
            <tr>
              <td style="padding:34px;background:#dcebdc;border-bottom:1px solid #cbdcca;">
                <div style="margin-bottom:8px;color:#855f52;font-family:Arial,sans-serif;font-size:12px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;">Being Body</div>
                <div style="color:#254f66;font-family:Georgia,serif;font-size:30px;line-height:1.2;">New contact message</div>
                <div style="margin-top:10px;color:#66756f;font-family:Arial,sans-serif;font-size:13px;">Submitted ${escapeHtml(submittedAt)} (Europe/Rome)</div>
              </td>
            </tr>
            ${sections}
            <tr>
              <td style="padding:24px 34px 30px;">
                <div style="padding:16px 18px;background:#f5f1ec;border-radius:12px;color:#66756f;font-family:Arial,sans-serif;font-size:12px;line-height:1.55;">
                  Sent from the contact form on Beingbody.net · ${escapeHtml(subject)}
                </div>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}
