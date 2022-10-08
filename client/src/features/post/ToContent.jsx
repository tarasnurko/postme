import React from "react";

const ToContent = (props) => {
  return (
    <div className="flex flex-col gap-5">
      {props.content.map((item, index) => {
        if (item.type === "subtitle") {
          return (
            <h2 key={index} className="font-semibold text-2xl">
              {item.text}
            </h2>
          );
        } else if (item.type === "text") {
          return (
            <p key={index} className="text-lg">
              {item.text}
            </p>
          );
        } else if (item.type === "image") {
          return (
            <div key={index} className="my-5 flex flex-col items-center gap-2">
              <img
                className="max-w-full max-h-[500px] object-cover"
                src={item?.text}
                alt={item?.sub}
              />
              {item?.sub && <p className="text-sm text-gray-500">{item.sub}</p>}
            </div>
          );
        } else if (item.type === "link") {
          return (
            <div key={index} className="text-center">
              {item?.sub ? (
                <a
                  href={item?.text}
                  className="text-base text-violet-700 underline"
                >
                  {item?.sub}
                </a>
              ) : (
                <a
                  href={item?.text}
                  className="text-base text-violet-700 underline"
                >
                  {item?.text}
                </a>
              )}
            </div>
          );
        } else return "";
      })}
    </div>
  );
};

export default ToContent;
