import { bookingRequestDataType } from "@/types/forms";

export type ValidationResult =
  | { ok: true; sanitized: bookingRequestDataType }
  | {
      ok: false;
      sanitized: bookingRequestDataType;
      errors: Partial<Record<keyof bookingRequestDataType, string>>;
    };

const MAX = {
  name: 80,
  pronouns: 40,
  email: 254,
  tel: 30,
  message: 2000,
} as const;

function stripControlChars(value: string) {
  return value.replace(/[\u0000-\u001F\u007F]/g, "");
}

function normalizeOneLine(value: string) {
  return stripControlChars(value).replace(/\s+/g, " ").trim();
}

function normalizeMultiline(value: string) {
  return stripControlChars(value)
    .replace(/\r\n/g, "\n")
    .replace(/\r/g, "\n")
    .trim();
}

export function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function looksDangerous(value: string) {
  return /<script|<\/script>|javascript:|vbscript:|on\w+\s*=|<iframe|<object|<embed/i.test(
    value,
  );
}

export function validateMessageForm(
  input: bookingRequestDataType,
): ValidationResult {
  const sanitized: bookingRequestDataType = {
    name: normalizeOneLine(input.name).slice(0, MAX.name),
    pronouns: normalizeOneLine(input.pronouns).slice(0, MAX.pronouns),
    email: normalizeOneLine(input.email).toLowerCase().slice(0, MAX.email),
    tel: normalizeOneLine(input.tel).slice(0, MAX.tel),
    message: normalizeMultiline(input.message).slice(0, MAX.message),
  };

  const errors: Partial<Record<keyof bookingRequestDataType, string>> = {};

  if (!sanitized.name) {
    errors.name = "Name is required.";
  } else if (!/^[\p{L}\p{M} .'-]{2,80}$/u.test(sanitized.name)) {
    errors.name = "Invalid name.";
  }

  if (
    sanitized.pronouns &&
    !/^[\p{L}\p{M} /-]{1,40}$/u.test(sanitized.pronouns)
  ) {
    errors.pronouns = "Invalid pronouns.";
  }

  if (!sanitized.email) {
    errors.email = "Email is required.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i.test(sanitized.email)) {
    errors.email = "Invalid email.";
  }

  if (sanitized.tel && !/^[0-9+()\-\s/.]{6,30}$/.test(sanitized.tel)) {
    errors.tel = "Invalid phone number.";
  }

  if (!sanitized.message) {
    errors.message = "Message is required.";
  } else if (sanitized.message.length < 10) {
    errors.message = "Message is too short.";
  }

  for (const [key, value] of Object.entries(sanitized) as [
    keyof bookingRequestDataType,
    string,
  ][]) {
    if (looksDangerous(value)) {
      errors[key] = "Unsupported content.";
    }
  }

  if (Object.keys(errors).length > 0) {
    return { ok: false, sanitized, errors };
  }

  return { ok: true, sanitized };
}
