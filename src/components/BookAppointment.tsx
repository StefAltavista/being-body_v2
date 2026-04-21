"use client";
import React, { useState } from "react";
import Link from "next/link";
import Header from "./Header";
import InputField from "./InputField";
import buildMessage from "@/actions/buildMessage";
import submitForm from "@/actions/submitForm";
import Loading from "./Loading";

export default function BookAppointment() {
  const [result, setResult] = useState();
  const [data, setData] = useState({
    name: "",
    pronouns: "",
    email: "",
    tel: "",
    message: "",
  });
  const [load, setLoad] = useState(false);

  const send = async () => {
    const subject = "New Booking Request from Beingbody.net";
    const message = buildMessage(subject, data);
    setLoad(true);
    const response = await submitForm(subject, message);
    setResult(response);
    setLoad(false);
  };

  const inputClassName = "w-full grid grid-cols-[1fr_2fr]  pb-0 m-2 mr-0 ";
  const labelClassName = "handWrite1 !text-right !w-full !px-2";
  return (
    <div>
      {!result ? (
        <form className="flex flex-col items-end w-full">
          <div className={inputClassName}>
            <p className={labelClassName}>Name:</p>
            <InputField
              fieldType="text"
              fieldName={"name"}
              data={data}
              setData={setData}
            />
          </div>

          <div className={inputClassName}>
            {" "}
            <p className={labelClassName}>Pronouns:</p>
            <InputField
              fieldType="list"
              fieldName={"pronouns"}
              data={data}
              setData={setData}
              list={[
                "not specified",
                "she/her/hers",
                "they/them/theirs",
                "he/him/his",
              ]}
            />
          </div>
          <div className={inputClassName}>
            {" "}
            <p className={labelClassName}>Email:</p>
            <InputField
              fieldType="email"
              fieldName={"email"}
              data={data}
              setData={setData}
            />
          </div>
          <div className={inputClassName}>
            {" "}
            <p className={labelClassName}>Phone Number</p>
            <InputField
              fieldType="tel"
              fieldName={"phone"}
              data={data}
              setData={setData}
            />
          </div>
          <div className={inputClassName}>
            <p className={labelClassName}>Message</p>
            <InputField
              fieldType="textArea"
              fieldName={"message"}
              data={data}
              setData={setData}
            />
          </div>

          <button
            className="text-right bg-violet-200 rounded w-10 h-6 px-12 flex justify-center items-center"
            onClick={send}
          >
            <p className="handWrite1 ">Book</p>
          </button>
        </form>
      ) : (
        <>
          <p>{result}</p>
          <Link href="/">
            <button>Back to website</button>
          </Link>
        </>
      )}
      {load && <Loading></Loading>}
    </div>
  );
}
