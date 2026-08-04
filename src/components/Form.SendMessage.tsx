"use client";

import { ChangeEvent, FormEvent, useState } from "react";
import { validateMessageForm } from "@/lib/validateMessageForm";
import type { bookingRequestDataType } from "@/types/forms";
import styles from "./Form.SendMessage.module.css";

type MessageFieldName = "name" | "pronouns" | "email" | "tel" | "message";

const initialData: bookingRequestDataType = {
  name: "",
  pronouns: "",
  email: "",
  tel: "",
  message: "",
};

const fieldLimits: Record<MessageFieldName, number> = {
  name: 80,
  pronouns: 40,
  email: 254,
  tel: 30,
  message: 2000,
};

type Result = {
  kind: "success" | "error";
  message: string;
} | null;

type FieldProps = {
  field: MessageFieldName;
  label: string;
  value: string;
  error?: string;
  type?: "text" | "email" | "tel" | "textarea";
  autoComplete?: string;
  required?: boolean;
  onChange: (field: MessageFieldName, value: string) => void;
};

function MessageField({
  field,
  label,
  value,
  error,
  type = "text",
  autoComplete,
  required = false,
  onChange,
}: FieldProps) {
  const inputId = `contact-${field}`;
  const errorId = `${inputId}-error`;
  const commonProps = {
    id: inputId,
    name: field,
    value,
    required,
    maxLength: fieldLimits[field],
    autoComplete,
    "aria-invalid": Boolean(error),
    "aria-describedby": error ? errorId : undefined,
    onChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      onChange(field, event.target.value),
  };

  return (
    <div
      className={`${styles.field} ${
        field === "message" ? styles.fullField : ""
      }`}
    >
      <label htmlFor={inputId}>
        {label}
        {required && <span aria-hidden="true">*</span>}
      </label>
      {type === "textarea" ? (
        <textarea {...commonProps} rows={5} />
      ) : (
        <input {...commonProps} type={type} />
      )}
      {error && (
        <p id={errorId} className={styles.fieldError} role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
export default function SendMessageForm({ close }: { close: () => void }) {
  const [data, setData] = useState<bookingRequestDataType>(initialData);
  const [errors, setErrors] = useState<
    Partial<Record<keyof bookingRequestDataType, string>>
  >({});
  const [result, setResult] = useState<Result>(null);
  const [sending, setSending] = useState(false);

  function updateField(field: MessageFieldName, value: string) {
    setData((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
    if (result?.kind === "error") setResult(null);
  }

  async function send(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const checked = validateMessageForm(data);

    if (!checked.ok) {
      setErrors(checked.errors);
      setResult({
        kind: "error",
        message: "Please review the highlighted fields and try again.",
      });
      return;
    }

    setErrors({});
    setResult(null);
    setSending(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          subject: "New Message from Beingbody.net",
          data: checked.sanitized,
        }),
      });
      const body = (await response.json()) as {
        result?: string;
        errors?: Partial<Record<keyof bookingRequestDataType, string>>;
      };

      if (!response.ok) {
        if (body.errors) setErrors(body.errors);
        setResult({
          kind: "error",
          message:
            body.result || "Your message could not be sent. Please try again.",
        });
        return;
      }

      setResult({
        kind: "success",
        message:
          body.result ||
          "Your message has been sent. I will get back to you as soon as possible.",
      });
    } catch {
      setResult({
        kind: "error",
        message: "Your message could not be sent. Please try again.",
      });
    } finally {
      setSending(false);
    }
  }

  if (result?.kind === "success") {
    return (
      <div className={styles.shell}>
        <div className={styles.thankYou} role="status" aria-live="polite">
          <span className={styles.thankYouIcon} aria-hidden="true">
            ✓
          </span>
          <h2>Thank you</h2>
          <p>{result.message}</p>
          <button type="button" className={styles.primaryButton} onClick={close}>
            Done
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.shell}>
      <header className={styles.header}>
        <div>
          <p className={styles.eyebrow}>Let&apos;s connect</p>
          <h2>Send a message</h2>
          <p className={styles.intro}>
            Ask a question, check availability, or simply say hello.
          </p>
        </div>
        <button
          type="button"
          className={styles.closeButton}
          onClick={close}
          aria-label="Close message form"
        >
          ×
        </button>
      </header>

      <form className={styles.form} onSubmit={send} noValidate>
        <section className={styles.section} aria-labelledby="contact-details">
          <div className={styles.sectionIntro}>
            <h3 id="contact-details">Contact details</h3>
            <p>How I can address you and reply.</p>
          </div>
          <div className={styles.grid}>
            <MessageField
              field="name"
              label="Name"
              value={data.name}
              error={errors.name}
              autoComplete="name"
              required
              onChange={updateField}
            />
            <MessageField
              field="pronouns"
              label="Pronouns"
              value={data.pronouns}
              error={errors.pronouns}
              onChange={updateField}
            />
            <MessageField
              field="email"
              label="Email"
              value={data.email}
              error={errors.email}
              type="email"
              autoComplete="email"
              required
              onChange={updateField}
            />
            <MessageField
              field="tel"
              label="Phone"
              value={data.tel}
              error={errors.tel}
              type="tel"
              autoComplete="tel"
              onChange={updateField}
            />
          </div>
        </section>

        <section className={styles.section} aria-labelledby="contact-message">
          <div className={styles.sectionIntro}>
            <h3 id="contact-message">Your message</h3>
            <p>What would you like to talk about?</p>
          </div>
          <MessageField
            field="message"
            label="Message"
            value={data.message}
            error={errors.message}
            type="textarea"
            required
            onChange={updateField}
          />
        </section>

        <div className={styles.actions}>
          <div className={styles.buttonGroup}>
            <button
              type="button"
              className={styles.secondaryButton}
              onClick={close}
              disabled={sending}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={styles.primaryButton}
              disabled={sending}
              aria-busy={sending}
            >
              {sending ? "Sending…" : "Send message"}
            </button>
          </div>
        </div>

        <div
          className={`${styles.status} ${
            result?.kind === "error" ? styles.statusError : styles.statusHidden
          }`}
          role="status"
          aria-live="polite"
        >
          {result?.message}
        </div>
      </form>
    </div>
  );
}
