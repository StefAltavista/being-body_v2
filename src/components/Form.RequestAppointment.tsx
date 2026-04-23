"use client";

import React, { useRef, useState } from "react";
import InputField from "./InputField";
import Loading from "./Loading";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { GoogleEvent } from "@/lib/getCalendar";
import { getDate } from "./Calendar";
import type { bookingRequestDataType } from "@/types/forms.ts";
import { validateBookingRequestForm } from "@/lib/validateBookingRequestForm";
import ResponseBookingModal from "./Form.ResponseBookingModal";

gsap.registerPlugin(useGSAP);

export default function RequestAppointment({
  event,
  close,
}: {
  event: GoogleEvent;
  close: () => void;
}) {
  const [load, setLoad] = useState(false);
  const [errors, setErrors] = useState<
    Partial<Record<keyof bookingRequestDataType, string>>
  >({});
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const inputClassName = "pb-4 flex flex-col";
  const [data, setData] = useState<bookingRequestDataType>({
    name: "",
    pronouns: "",
    email: "",
    tel: "",
    message: "",
    sessionDuration: "1h",
  });
  const [result, setResult] = useState({
    success: false,
    message: "",
  });
  const [done, setDone] = useState(false);

  const submit = (x: { success: boolean; message: string }) => {
    setResult(x);
    setDone(true);
  };

  const handleRequestSpot = async () => {
    const checked = validateBookingRequestForm(data);

    if (!checked.ok) {
      setErrors(checked.errors);
      return;
    }

    setErrors({});
    setLoad(true);

    try {
      const res = await fetch("/api/book", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          event,
          data: checked.sanitized,
        }),
      });

      const body = await res.json();

      if (res.status !== 200) {
        submit({ success: false, message: "Booking failed" });
        return;
      }

      submit({ success: true, message: body.result });
    } catch (e) {
      console.log(e);
      submit({ success: false, message: "Internal Error" });
    } finally {
      setLoad(false);
    }
  };

  return (
    <div className="p-2 w-full text-center overflow-hidden relative">
      <div className="flex rounded p-2 mb-2 bg-blue-100">
        <div className="w-full flex flex-col items-start">
          <h3>{getDate(event).split("-")[0]}</h3>
          <p>{getDate(event).split("-")[1]}</p>
        </div>
        <h3>{event.start?.split("T")[1].slice(0, 5)}</h3>
      </div>

      <div
        ref={wrapperRef}
        style={{ pointerEvents: "auto" }}
        className="overflow-visible"
      >
        <form className="w-full z-20">
          <div className={inputClassName}>
            <InputField
              label="*Name"
              color="white"
              fieldType="text"
              fieldName="name"
              data={data}
              setData={setData}
            />
            {errors.name && (
              <p className="!text-red-500 text-sm">{errors.name}</p>
            )}
          </div>

          <div className={inputClassName}>
            <InputField
              label="*Pronouns"
              color="white"
              fieldType="text"
              fieldName="pronouns"
              data={data}
              setData={setData}
            />
            {errors.pronouns && (
              <p className="!text-red-500 text-sm">{errors.pronouns}</p>
            )}
          </div>

          <div className={inputClassName}>
            <InputField
              label="*E-Mail"
              color="white"
              fieldType="email"
              fieldName="email"
              data={data}
              setData={setData}
            />
            {errors.email && (
              <p className="!text-red-500 text-sm">{errors.email}</p>
            )}
          </div>

          <div className={inputClassName}>
            <InputField
              label="Phone Number"
              color="white"
              fieldType="tel"
              fieldName="tel"
              data={data}
              setData={setData}
            />
            {errors.tel && (
              <p className="!text-red-500 text-sm">{errors.tel}</p>
            )}
          </div>

          <div className={inputClassName}>
            <InputField
              color="white"
              label="*Session Duration"
              fieldType="list"
              fieldName="sessionDuration"
              data={data}
              setData={setData}
              list={["1h", "1.5h", "30min"]}
            />
            {errors.sessionDuration && (
              <p className="!text-red-500 text-sm">{errors.sessionDuration}</p>
            )}
          </div>

          <div className={inputClassName}>
            <InputField
              label="Message"
              color="white"
              fieldType="textArea"
              fieldName="message"
              data={data}
              setData={setData}
            />
            {errors.message && (
              <p className="!text-red-500 text-sm">{errors.message}</p>
            )}
          </div>

          <p className="handWrite1 !text-[15px] !mb-4">
            * No Data is stored on this website. Informations are shared with
            the owner via e-mail only and held in strictest confidence. At no
            given point is information disclosed or shared without client`s
            consent.
          </p>

          <button
            type="button"
            className="cursor-pointer bg-violet-200 rounded p-2 m-2 h-10"
            onClick={handleRequestSpot}
          >
            Send Request
          </button>

          <button
            type="button"
            className="cursor-pointer bg-violet-200 rounded p-2 m-2 h-10"
            onClick={close}
          >
            Cancel
          </button>
        </form>

        {load && <Loading />}

        {done && (
          <ResponseBookingModal
            // event={event}
            close={close}
            setDone={setDone}
            result={result}
          />
        )}
      </div>
    </div>
  );
}
