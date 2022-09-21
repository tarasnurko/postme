import React from "react";

const ToContent = (props) => {
  return (
    <div className="flex flex-col gap-5">
      {props.content.map((item, index) => {
        if (item.type === "subtitle") {
          return (
            <h2 key={index} className="font-semibold text-2xl">
              {item.content}
            </h2>
          );
        } else if (item.type === "text") {
          return (
            <p key={index} className="text-lg">
              {item.content}
            </p>
          );
        } else if (item.type === "image") {
          return (
            <div key={index} className="my-5 flex flex-col items-center gap-2">
              <img
                className="max-w-full max-h-[300px] object-cover"
                src={item?.src}
                alt={item?.alt}
              />
              {item.alt && <p className="text-xs text-gray-500">{item.alt}</p>}
            </div>
          );
        } else return "";
      })}
    </div>
  );
};

export default ToContent;
