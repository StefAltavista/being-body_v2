import React from "react";

export default function InputField({ f, data, setData }) {
  return (
    <div className="border border-rgb(65, 37, 102) rounded">
      {f == "extraInfo" || f == "distresses" || f == "message" ? (
        <textarea
          type="text"
          value={data[f]}
          onChange={(e) =>
            setData({
              ...data,
              [f]: e.target.value,
            })
          }
        />
      ) : (
        <input
          type="text"
          value={data[f]}
          onChange={(e) => setData({ ...data, [f]: e.target.value })}
        />
      )}
    </div>
  );
}
