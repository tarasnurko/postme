import React from "react";
import Input from "./Input";

const InputText = (props) => {
  return (
    <Input
      handleChange={props.handleChange}
      handleMove={props.handleMove}
      handleDelete={props.handleDelete}
      value={props.value}
      name="Text"
      minlength={20}
      maxlength={2000}
      errMinMsg="Text must have at least 20 characters"
      errMaxMsg="Text can't have more then 2000 characters"
      rows={10}
      inputStyles="w-full px-2 py-2 border-2 border-gray-600 rounded-md text-lg outline-none resize-vertical"
      inputErrStyles="w-full px-2 py-2 border-2 border-red-600 rounded-md text-lg outline-none resize-vertical"
      blockStyles="relative min-h-[340px] flex flex-col gap-2"
    />
  );
};

export default InputText;
