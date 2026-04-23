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

async function sendMessage(subject: string, message: string) {
  const options = {
    from: EMAIL_FROM,
    to: EMAIL_TO,
    subject,
    html: message,
  };
  try {
    await transporter.verify();
    console.log("SMTP ready");
  } catch (e) {
    console.error("SMTP verify failed", e);
  }
  try {
    await transporter.sendMail(options);
    return {
      e: null,
      result: "Message sent!",
    };
  } catch (e) {
    console.log("ERROR Message NOT sent", e);
    return {
      e,
      result:
        ":/ sorry there was a problem with the server. Please try again or send the info directly at being.body.practice@gmail.com",
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

    const message = buildMessage(subject, checked.sanitized);
    const result = await sendMessage(subject, message);

    return NextResponse.json(result, { status: 200 });
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
