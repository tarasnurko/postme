import React from "react";
import Input from "./Input";

const InputTitle = (props) => {
  return (
    <Input
      name="Title"
      handleChange={props.handleChange}
      value={props.value}
      minlength={6}
      maxlength={50}
      errMinMsg="Title must have at least 6 characters"
      errMaxMsg="Title can't have more then 260 characters"
      rows={1}
      inputStyles="w-[500px] px-2 py-2 border-2 border-gray-600 rounded-md text-lg outline-none resize-vertical"
      inputErrStyles="w-[500px] px-2 py-2 border-2 border-red-600 rounded-md text-lg outline-none resize-vertical"
      blockStyles="relative min-h-[80px] flex flex-col gap-2"
    />
  );
};

export default InputTitle;
