import nodemailer from "nodemailer";
import { NextResponse } from "next/server";
import buildQuestionnaireMessage from "@/lib/buildQuestionnaireMessage";
import { validateQuestionnaireForm } from "@/lib/validateQuestionnaireForm";

export const runtime = "nodejs";

const EMAIL_TO = process.env.EMAIL_TO;
const EMAIL_FROM = process.env.EMAIL_FROM;
const EMAIL_PASS = process.env.EMAIL_PASS;

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  requireTLS: true,
  auth: {
    user: EMAIL_FROM,
    pass: EMAIL_PASS,
  },
});

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as { data?: unknown };
    const checked = validateQuestionnaireForm(body.data);

    if (!checked.ok) {
      return NextResponse.json(
        {
          result: "Please review the highlighted fields.",
          errors: checked.errors,
        },
        { status: 400 },
      );
    }

    if (!EMAIL_TO || !EMAIL_FROM || !EMAIL_PASS) {
      console.error("Questionnaire email configuration is incomplete.");
      return NextResponse.json(
        { result: "The questionnaire could not be sent right now." },
        { status: 500 },
      );
    }

    const html = buildQuestionnaireMessage(checked.sanitized);

    await transporter.verify();
    await transporter.sendMail({
      from: EMAIL_FROM,
      to: EMAIL_TO,
      subject: "New Wellness Questionnaire from Beingbody.net",
      html,
      replyTo: checked.sanitized.email || undefined,
    });

    return NextResponse.json(
      { result: "Your questionnaire has been sent. Thank you." },
      { status: 200 },
    );
  } catch (error) {
    console.error("Questionnaire email could not be sent.", error);
    return NextResponse.json(
      {
        result:
          "Sorry, there was a problem sending your questionnaire. Please try again later.",
      },
      { status: 500 },
    );
  }
}

