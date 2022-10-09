import React from "react";

const Spinner = (props) => {
  return (
    <div
      className={`border-4 border-cyan border-t-4 border-t-blue-700 rounded-[50%] w-20 h-20 animate-spin ${props.className}`}
    />
  );
};

export default Spinner;
