import nodemailer from "nodemailer";
import { NextResponse } from "next/server";
import buildMessage from "@/lib/buildMessage";
import { validateMessageForm } from "@/lib/validateMessageForm";
import { bookingRequestDataType } from "@/types/forms";

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

async function sendMessage(
  subject: string,
  message: string,
  replyTo?: string,
) {
  const options = {
    from: EMAIL_FROM,
    to: EMAIL_TO,
    subject,
    html: message,
    replyTo: replyTo || undefined,
  };
  try {
    await transporter.verify();
    await transporter.sendMail(options);
    return {
      success: true,
      result:
        "Your message has been sent. I will get back to you as soon as possible.",
    };
  } catch (error) {
    console.error("Contact message could not be sent.", error);
    return {
      success: false,
      result:
        "Sorry, there was a problem sending your message. Please try again later or email being.body.practice@gmail.com directly.",
    };
  }
}

export async function POST(req: Request) {
  //   const ip = getClientIp(req);
  //   const rl = rateLimit(`contact:${ip}`, 5, 10 * 60 * 1000);
  //   console.log("ENV: ", process.env.NODE_ENV);
  //   if (!rl.ok && process.env.NODE_ENV === "production") {
  //     return NextResponse.json(
  //       { result: "Too many requests. Please try again later." },
  //       {
  //         status: 429,
  //         headers: {
  //           "Retry-After": String(Math.ceil((rl.resetAt - Date.now()) / 1000)),
  //         },
  //       },
  //     );
  //   }
  try {
    const { subject, data } = (await req.json()) as {
      subject?: string;
      data?: bookingRequestDataType;
    };

    if (subject !== "New Message from Beingbody.net") {
      return NextResponse.json(
        {
          result: "Sorry, there was a problem. Please try again later.",
        },
        { status: 400 },
      );
    }

    if (!data) {
      return NextResponse.json(
        {
          result: "Sorry, there was a problem. Please try again later.",
        },
        { status: 400 },
      );
    }

    const checked = validateMessageForm(data);

    if (!checked.ok) {
      return NextResponse.json(
        {
          result: "Invalid form data",
          errors: checked.errors,
        },
        { status: 400 },
      );
    }

    if (!EMAIL_TO || !EMAIL_FROM || !EMAIL_PASS) {
      console.error("Contact email configuration is incomplete.");
      return NextResponse.json(
        { result: "The message could not be sent right now." },
        { status: 500 },
      );
    }

    const message = buildMessage(subject, checked.sanitized);
    const result = await sendMessage(
      subject,
      message,
      checked.sanitized.email,
    );

    return NextResponse.json(
      { result: result.result },
      { status: result.success ? 200 : 500 },
    );
  } catch {
    return NextResponse.json(
      {
        result:
          "Sorry, there was a problem with the server. Please try again later.",
      },
      { status: 500 },
    );
  }
}
