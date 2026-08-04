import { escapeHtml } from "@/lib/validateMessageForm";
import { validateQuestionnaireForm } from "@/lib/validateQuestionnaireForm";
import type { QuestionnaireData } from "@/types/questionnaire";

type Answer = {
  label: string;
  key: keyof QuestionnaireData;
};

type Section = {
  title: string;
  answers: Answer[];
};

const sections: Section[] = [
  {
    title: "Personal details",
    answers: [
      { label: "Name", key: "name" },
      { label: "Pronouns", key: "pronouns" },
      { label: "Email", key: "email" },
      { label: "Phone", key: "phone" },
    ],
  },
  {
    title: "Body & movement",
    answers: [
      { label: "Allergies", key: "allergies" },
      { label: "Prior or chronic injuries", key: "injuries" },
      { label: "Physical activities", key: "activities" },
      { label: "Areas of discomfort or pain", key: "discomfortAreas" },
    ],
  },
  {
    title: "Session atmosphere",
    answers: [
      { label: "Music preferences", key: "musicPreferences" },
      { label: "Disturbing aromas", key: "disturbingAromas" },
    ],
  },
  {
    title: "Anything else",
    answers: [
      {
        label: "Extra information, struggles, distresses or strains",
        key: "extraInfo",
      },
    ],
  },
];

function answerRow(label: string, value: string) {
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

export default function buildQuestionnaireMessage(data: QuestionnaireData) {
  const checked = validateQuestionnaireForm(data);

  if (!checked.ok) {
    throw new Error("INVALID_QUESTIONNAIRE_DATA");
  }

  const safe = checked.sanitized;
  const submittedAt = new Intl.DateTimeFormat("en-GB", {
    dateStyle: "long",
    timeStyle: "short",
    timeZone: "Europe/Rome",
  }).format(new Date());

  const sectionMarkup = sections
    .map(
      (section) => `
        <tr>
          <td style="padding:24px 34px 8px;">
            <div style="color:#855f52;font-family:Arial,sans-serif;font-size:18px;font-weight:700;">
              ${escapeHtml(section.title)}
            </div>
            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
              ${section.answers
                .map(({ label, key }) => answerRow(label, safe[key]))
                .join("")}
            </table>
          </td>
        </tr>`,
    )
    .join("");

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
                <div style="color:#254f66;font-family:Georgia,serif;font-size:30px;line-height:1.2;">New Wellness Questionnaire</div>
                <div style="margin-top:10px;color:#66756f;font-family:Arial,sans-serif;font-size:13px;">Submitted ${escapeHtml(submittedAt)} (Europe/Rome)</div>
              </td>
            </tr>
            ${sectionMarkup}
            <tr>
              <td style="padding:24px 34px 30px;">
                <div style="padding:16px 18px;background:#f5f1ec;border-radius:12px;color:#66756f;font-family:Arial,sans-serif;font-size:12px;line-height:1.55;">
                  Confidential client information — please handle and store this questionnaire with care.
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

