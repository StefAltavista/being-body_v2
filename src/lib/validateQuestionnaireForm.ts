import type { QuestionnaireData } from "@/types/questionnaire";

export type QuestionnaireValidationResult =
  | { ok: true; sanitized: QuestionnaireData }
  | {
      ok: false;
      sanitized: QuestionnaireData;
      errors: Partial<Record<keyof QuestionnaireData, string>>;
    };

const MAX_LENGTH: Record<keyof QuestionnaireData, number> = {
  name: 80,
  pronouns: 40,
  email: 254,
  phone: 30,
  allergies: 1500,
  injuries: 2000,
  activities: 2000,
  discomfortAreas: 2000,
  musicPreferences: 1000,
  disturbingAromas: 1000,
  extraInfo: 4000,
};

const ONE_LINE_FIELDS: (keyof QuestionnaireData)[] = [
  "name",
  "pronouns",
  "email",
  "phone",
];

function toString(value: unknown) {
  return typeof value === "string" ? value : "";
}

function normalizeOneLine(value: unknown) {
  return toString(value)
    .replace(/[\u0000-\u001F\u007F]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function normalizeMultiline(value: unknown) {
  return toString(value)
    .replace(/\r\n/g, "\n")
    .replace(/\r/g, "\n")
    .replace(/[\u0000-\u0009\u000B-\u001F\u007F]/g, "")
    .trim();
}

export function validateQuestionnaireForm(
  input: unknown,
): QuestionnaireValidationResult {
  const source =
    input && typeof input === "object"
      ? (input as Partial<Record<keyof QuestionnaireData, unknown>>)
      : {};

  const sanitized = {} as QuestionnaireData;
  const errors: Partial<Record<keyof QuestionnaireData, string>> = {};

  (Object.keys(MAX_LENGTH) as (keyof QuestionnaireData)[]).forEach((key) => {
    const normalized = ONE_LINE_FIELDS.includes(key)
      ? normalizeOneLine(source[key])
      : normalizeMultiline(source[key]);

    if (normalized.length > MAX_LENGTH[key]) {
      errors[key] = `Please keep this answer under ${MAX_LENGTH[key]} characters.`;
    }

    sanitized[key] = normalized.slice(0, MAX_LENGTH[key]);
  });

  sanitized.email = sanitized.email.toLowerCase();

  if (
    sanitized.name &&
    !/^[\p{L}\p{M} .'-]{2,80}$/u.test(sanitized.name)
  ) {
    errors.name = "Please enter a valid name.";
  }

  if (
    sanitized.pronouns &&
    !/^[\p{L}\p{M} /-]{1,40}$/u.test(sanitized.pronouns)
  ) {
    errors.pronouns = "Please enter valid pronouns.";
  }

  if (
    sanitized.email &&
    !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i.test(sanitized.email)
  ) {
    errors.email = "Please enter a valid email address.";
  }

  if (
    sanitized.phone &&
    !/^[0-9+()\-\s/.]{6,30}$/.test(sanitized.phone)
  ) {
    errors.phone = "Please enter a valid phone number.";
  }

  if (Object.keys(errors).length > 0) {
    return { ok: false, sanitized, errors };
  }

  return { ok: true, sanitized };
}

