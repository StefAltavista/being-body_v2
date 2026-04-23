"use client";
import React, { useState } from "react";
import InputField from "./InputField";
import Loading from "./Loading";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { validateMessageForm } from "@/lib/validateMessageForm";
import { bookingRequestDataType } from "@/types/forms";
import ResponseMessageModal from "./Form.ResponseMessageModal";

gsap.registerPlugin(useGSAP);

export default function SendMessageForm({ close }: { close: () => void }) {
  const [result, setResult] = useState({
    success: false,
    message: "",
  });
  const [done, setDone] = useState(false);
  const [load, setLoad] = useState(false);
  const [errors, setErrors] = useState<
    Partial<Record<keyof bookingRequestDataType, string>>
  >({});

  const submit = (x: { success: boolean; message: string }) => {
    setResult(x);
    setDone(true);
  };
  const inputClassName = "pb-4 flex flex-col z-10";

  const [data, setData] = useState<bookingRequestDataType>({
    name: "",
    pronouns: "",
    email: "",
    tel: "",
    message: "",
  });

  const send = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const checked = validateMessageForm(data);

    if (!checked.ok) {
      setErrors(checked.errors);
      return;
    }

    setErrors({});
    setLoad(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          subject: "New Message from Beingbody.net",
          data: checked.sanitized,
        }),
      });

      const body = await res.json();

      if (res.status !== 200) {
        submit({
          success: false,
          message: body.result || "Message could not be sent.",
        });
        return;
      }

      submit({
        success: true,
        message: body.result || "Message sent!",
      });
    } catch (e) {
      console.log(e);
      submit({
        success: false,
        message: "Internal Error",
      });
    } finally {
      setLoad(false);
    }
  };
  return (
    <div className=" p-2 w-full text-center overflow-hidden relative">
      <div className="overflow-visible">
        <form className="w-full z-20">
          <div className={inputClassName}>
            <InputField
              label="Name"
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
              label="Pronouns"
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
              label="E-Mail"
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
          <div className="flex flex-row justify-between">
            <button
              type="button"
              className="text-right bg-white rounded w-10 h-6 px-12 flex justify-center items-center"
              onClick={send}
            >
              <p className="handWrite1">Send</p>
            </button>
            <button
              type="button"
              className="text-right bg-white rounded w-10 h-6 px-12 flex justify-center items-center"
              onClick={close}
            >
              <p className="handWrite1">Cancel</p>
            </button>
          </div>
        </form>

        {load && <Loading />}

        {done && (
          <ResponseMessageModal
            close={close}
            result={result}
            setDone={setDone}
          />
        )}
      </div>
    </div>
  );
}
