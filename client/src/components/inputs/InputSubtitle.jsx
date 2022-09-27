import React from "react";
import Input from "./Input";

const InputSubtitle = (props) => {
  return (
    <Input
      handleChange={props.handleChange}
      value={props.value}
      name="Subtitle"
      minlength={6}
      maxlength={100}
      errMinMsg="Subitle must have at least 6 characters"
      errMaxMsg="Subitle can't have more then 100 characters"
      rows={2}
      inputStyles="w-full px-2 py-2 border-2 border-gray-600 rounded-md text-lg outline-none resize-vertical"
      inputErrStyles="w-full px-2 py-2 border-2 border-red-600 rounded-md text-lg outline-none resize-vertical"
      blockStyles="relative min-h-[120px] flex flex-col gap-2"
      onChange={props.onChange}
      id={props.id}
    />
  );
};

export default InputSubtitle;
