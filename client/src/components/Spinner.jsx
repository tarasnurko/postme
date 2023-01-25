import React from "react";

const Spinner = () => {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div
        className={
          "border-4 border-cyan border-t-4 border-t-blue-700 rounded-[50%] w-20 h-20 animate-spin"
        }
      />
    </div>
  );
};

export default Spinner;
