import React from "react";
import InputTwo from "./InputTwo";

const InputImage = () => {
  return (
    <InputTwo
      name="Image"
      placeholderFirst="Image link"
      minlengthFirst="1"
      errMinMsgFirst="Image must have source link"
      rowsFirst={2}
      inputStylesFirst="w-full px-2 py-2 border-2 border-gray-600 rounded-md text-lg outline-none resize-vertical"
      inputErrStylesFirst="w-full px-2 py-2 border-2 border-red-600 rounded-md text-lg outline-none resize-vertical"
      placeholderSecond="Image description"
      maxlengthSecond={50}
      errMaxMsgSecond="Image description can't have more then 50 characters"
      rowsSecond={1}
      inputStylesSecond="w-[500px] px-2 py-2 border-2 border-gray-600 rounded-md text-lg outline-none resize-vertical"
      inputErrStylesSecond="w-[500px] px-2 py-2 border-2 border-red-600 rounded-md text-lg outline-none resize-vertical"
      blockStyles="relative min-h-[170px] flex flex-col gap-2"
    />
  );
};

export default InputImage;
