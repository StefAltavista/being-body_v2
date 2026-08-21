"use client";

import { FormEvent, useRef, useState } from "react";
import { validateQuestionnaireForm } from "@/lib/validateQuestionnaireForm";
import type { QuestionnaireData } from "@/types/questionnaire";
import styles from "@/app/questionnaire/questionnaire.module.css";

const initialData: QuestionnaireData = {
  name: "",
  pronouns: "",
  email: "",
  phone: "",
  allergies: "",
  injuries: "",
  activities: "",
  discomfortAreas: "",
  musicPreferences: "",
  disturbingAromas: "",
  extraInfo: "",
};

const fieldLimits: Record<keyof QuestionnaireData, number> = {
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

type Result = {
  kind: "success" | "error";
  message: string;
} | null;

type FieldProps = {
  field: keyof QuestionnaireData;
  label: string;
  value: string;
  error?: string;
  type?: "text" | "email" | "tel" | "textarea";
  rows?: number;
  autoComplete?: string;
  onChange: (field: keyof QuestionnaireData, value: string) => void;
};

function QuestionnaireField({
  field,
  label,
  value,
  error,
  type = "text",
  rows = 4,
  autoComplete,
  onChange,
}: FieldProps) {
  const inputId = `questionnaire-${field}`;
  const errorId = `${inputId}-error`;
  const commonProps = {
    id: inputId,
    name: field,
    value,
    maxLength: fieldLimits[field],
    autoComplete,
    "aria-invalid": Boolean(error),
    "aria-describedby": error ? errorId : undefined,
    onChange: (
      event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => onChange(field, event.target.value),
  };

  return (
    <div className={styles.field}>
      <label htmlFor={inputId}>{label}</label>
      {type === "textarea" ? (
        <textarea {...commonProps} rows={rows} />
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

export default function QuestionnaireForm() {
  const [data, setData] = useState<QuestionnaireData>(initialData);
  const [errors, setErrors] = useState<
    Partial<Record<keyof QuestionnaireData, string>>
  >({});
  const [result, setResult] = useState<Result>(null);
  const [sending, setSending] = useState(false);
  const statusRef = useRef<HTMLDivElement>(null);

  function updateField(field: keyof QuestionnaireData, value: string) {
    setData((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
    if (result) setResult(null);
  }

  async function send(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const checked = validateQuestionnaireForm(data);

    if (!checked.ok) {
      setErrors(checked.errors);
      setResult({
        kind: "error",
        message: "Please review the highlighted fields and try again.",
      });
      requestAnimationFrame(() =>
        statusRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        }),
      );
      return;
    }

    setErrors({});
    setResult(null);
    setSending(true);

    try {
      const response = await fetch("/api/questionnaire", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data: checked.sanitized }),
      });
      const body = (await response.json()) as {
        result?: string;
        errors?: Partial<Record<keyof QuestionnaireData, string>>;
      };

      if (!response.ok) {
        if (body.errors) setErrors(body.errors);
        setResult({
          kind: "error",
          message:
            body.result ||
            "Sorry, your questionnaire could not be sent. Please try again.",
        });
        return;
      }

      setResult({
        kind: "success",
        message: body.result || "Your questionnaire has been sent. Thank you.",
      });
    } catch {
      setResult({
        kind: "error",
        message:
          "Sorry, your questionnaire could not be sent. Please try again.",
      });
    } finally {
      setSending(false);
      requestAnimationFrame(() =>
        statusRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        }),
      );
    }
  }

  if (result?.kind === "success") {
    return (
      <div
        ref={statusRef}
        className={styles.thankYou}
        role="status"
        aria-live="polite"
      >
        <span className={styles.thankYouIcon} aria-hidden="true">
          ✓
        </span>
        <h2>Thank you</h2>
        <p>{result.message}</p>
      </div>
    );
  }

  return (
    <form className={styles.form} onSubmit={send} noValidate>
      <section className={styles.section} aria-labelledby="personal-details">
        <div className={styles.sectionIntro}>
          <div>
            <h2 id="personal-details">Personal details</h2>
            <p>How I can address and contact you.</p>
          </div>
        </div>
        <div className={styles.twoColumnGrid}>
          <QuestionnaireField
            field="name"
            label="Name"
            value={data.name}
            error={errors.name}
            autoComplete="name"
            onChange={updateField}
          />
          <QuestionnaireField
            field="pronouns"
            label="Pronouns"
            value={data.pronouns}
            error={errors.pronouns}
            onChange={updateField}
          />
          <QuestionnaireField
            field="email"
            label="Email"
            value={data.email}
            error={errors.email}
            type="email"
            autoComplete="email"
            onChange={updateField}
          />
          <QuestionnaireField
            field="phone"
            label="Phone"
            value={data.phone}
            error={errors.phone}
            type="tel"
            autoComplete="tel"
            onChange={updateField}
          />
        </div>
      </section>

      <section className={styles.section} aria-labelledby="body-movement">
        <div className={styles.sectionIntro}>
          <div>
            <h2 id="body-movement">Body &amp; movement</h2>
            <p>A little context to help shape your session with care.</p>
          </div>
        </div>
        <div className={styles.twoColumnGrid}>
          <QuestionnaireField
            field="allergies"
            label="Do you have any allergies?"
            value={data.allergies}
            error={errors.allergies}
            type="textarea"
            onChange={updateField}
          />
          <QuestionnaireField
            field="injuries"
            label="Do you have any prior or chronic injuries?"
            value={data.injuries}
            error={errors.injuries}
            type="textarea"
            onChange={updateField}
          />
          <QuestionnaireField
            field="activities"
            label="What are the movement pattern and habits ?"
            value={data.activities}
            error={errors.activities}
            type="textarea"
            onChange={updateField}
          />
          <QuestionnaireField
            field="discomfortAreas"
            label="In what areas are you feeling discomfort or pain?"
            value={data.discomfortAreas}
            error={errors.discomfortAreas}
            type="textarea"
            onChange={updateField}
          />
        </div>
      </section>

      <section className={styles.section} aria-labelledby="session-atmosphere">
        <div className={styles.sectionIntro}>
          <div>
            <h2 id="session-atmosphere">Session atmosphere</h2>
            <p>Small details that can make the space feel more comfortable.</p>
          </div>
        </div>
        <div className={styles.twoColumnGrid}>
          <QuestionnaireField
            field="musicPreferences"
            label="Do you have any music preferences?"
            value={data.musicPreferences}
            error={errors.musicPreferences}
            type="textarea"
            onChange={updateField}
          />
          <QuestionnaireField
            field="disturbingAromas"
            label="Is there any aroma that disturbs you?"
            value={data.disturbingAromas}
            error={errors.disturbingAromas}
            type="textarea"
            onChange={updateField}
          />
        </div>
      </section>

      <section className={styles.section} aria-labelledby="anything-else">
        <div className={styles.sectionIntro}>
          <div>
            <h2 id="anything-else">Anything else</h2>
            <p>Share only what feels useful and comfortable.</p>
          </div>
        </div>
        <QuestionnaireField
          field="extraInfo"
          label="Is there any extra information, struggle, distresses or strains you would like to share?"
          value={data.extraInfo}
          error={errors.extraInfo}
          type="textarea"
          rows={7}
          onChange={updateField}
        />
      </section>

      <div className={styles.disclaimer} id="confidentiality-note">
        <span aria-hidden="true">—</span>
        <p>
          All information is held in strictest confidence. At no given point is
          information disclosed or shared without clients consent. You may
          choose to skip answering any question you feel impinges on personal
          information you do not wish to disclose.
        </p>
      </div>

      <div className={styles.submitArea}>
        <div>
          <p className={styles.optionalNote}>All fields are optional.</p>
          <p className={styles.submitNote}>
            Please review your answers before sending.
          </p>
        </div>
        <button type="submit" disabled={sending} aria-busy={sending}>
          {sending ? "Sending…" : "Send questionnaire"}
        </button>
      </div>

      <div
        ref={statusRef}
        className={`${styles.status} ${
          result?.kind === "error" ? styles.statusError : styles.statusHidden
        }`}
        role="status"
        aria-live="polite"
      >
        {result?.message}
      </div>
    </form>
  );
}
