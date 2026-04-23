import React from "react";
import { bookingRequestDataType } from "@/types/forms";

type fieldType = "textArea" | "text" | "email" | "tel" | "list";

export default function InputField({
  label,
  fieldName,
  fieldType,
  data,
  setData,
  list,
  color = "purple-100",
}: {
  label: string;
  fieldName:
    | "name"
    | "pronouns"
    | "email"
    | "tel"
    | "message"
    | "sessionDuration";
  fieldType: fieldType;
  data: bookingRequestDataType;
  setData: (x: bookingRequestDataType) => void;
  list?: string[] | null;
  color: string;
}) {
  return (
    <div className={`z-100 rounded flex flex-col justify-end w-full`}>
      <p className="handWrite1">{label}: </p>

      {fieldType === "textArea" ? (
        <textarea
          className={`bg-${color} outline-none w-full min-h-[200px] px-1 rounded`}
          value={data[fieldName]}
          onChange={(e) =>
            setData({
              ...data,
              [fieldName]: e.target.value,
            })
          }
        />
      ) : fieldType === "list" ? (
        <select
          className={`bg-${color} outline-none w-full px-1 rounded`}
          value={data[fieldName]}
          onChange={(e) =>
            setData({
              ...data,
              [fieldName]: e.target.value,
            })
          }
        >
          {list?.map((x) => {
            return (
              <option value={x} key={x}>
                {x}
              </option>
            );
          })}
        </select>
      ) : (
        <input
          className={`bg-${color} outline-none w-full px-1 rounded`}
          type={fieldType}
          value={data[fieldName]}
          onChange={(e) =>
            setData({
              ...data,
              [fieldName]: e.target.value,
            })
          }
        />
      )}
    </div>
  );
}
