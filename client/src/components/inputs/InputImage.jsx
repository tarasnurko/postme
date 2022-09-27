import React from "react";
import InputTwo from "./InputTwo";

const InputImage = (props) => {
  return (
    <InputTwo
      handleChange={props.handleChange}
      value={props.value}
      name="Image"
      placeholderFirst="Image link"
      placeholderSecond="Image description (optional)"
      minlengthFirst={1}
      errMinMsgFirst="Image must have source link"
      maxlengthSecond={50}
      rowsFirst={2}
      rowsSecond={1}
      inputStylesFirst="w-full px-2 py-2 border-2 border-gray-600 rounded-md text-lg outline-none resize-vertical"
      inputErrStylesFirst="w-full px-2 py-2 border-2 border-red-600 rounded-md text-lg outline-none resize-vertical"
      inputStylesSecond="w-[500px] px-2 py-2 border-2 border-gray-600 rounded-md text-lg outline-none resize-vertical"
      blockStyles="relative min-h-[170px] flex flex-col gap-2"
    />
  );
};

export default InputImage;
