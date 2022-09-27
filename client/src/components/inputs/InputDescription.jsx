import React from "react";
import Input from "./Input";

const InputDescription = (props) => {
  return (
    <Input
      name="Description"
      handleChange={props.handleChange}
      value={props.value}
      minlength={20}
      maxlength={260}
      errMinMsg="Description must have at least 20 characters"
      errMaxMsg="Description can't have more then 260 characters"
      rows={4}
      inputStyles="w-full px-2 py-2 border-2 border-gray-600 rounded-md text-lg outline-none resize-vertical"
      inputErrStyles="w-full px-2 py-2 border-2 border-red-600 rounded-md text-lg outline-none resize-vertical"
      blockStyles="relative min-h-[170px] flex flex-col gap-2"
    />
  );
};

export default InputDescription;
