import React from "react";

type fieldType = "textArea" | "text" | "email" | "tel" | "list";

export default function InputField({
  fieldName,
  fieldType,
  data,
  setData,
  list,
}: {
  fieldName: string;
  fieldType: fieldType;
  data;
  setData;
  list?: string[] | null;
}) {
  return (
    <div className="bg-violet-100 rounded flex justify-end w-full ">
      {fieldType == "textArea" ? (
        <textarea
          className="w-full min-h-[200px] px-1"
          value={data[fieldName]}
          onChange={(e) =>
            setData({
              ...data,
              [fieldName]: e.target.value,
            })
          }
        />
      ) : fieldType == "list" ? (
        <select id="cars" name="cars" className="w-full  px-1">
          {list &&
            list.map((x, i) =>
              i == 0 ? (
                <option value={x} key={x} defaultValue={x}>
                  {x}
                </option>
              ) : (
                <option value={x} key={x}>
                  {x}
                </option>
              ),
            )}
        </select>
      ) : (
        <input
          className="w-full px-1 "
          type={fieldType}
          value={data[fieldName]}
          onChange={(e) => setData({ ...data, [fieldName]: e.target.value })}
        />
      )}
    </div>
  );
}
