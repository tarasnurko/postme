import React from "react";
import Input from "./Input";

const InputPreview = (props) => {
  return (
    <Input
      handleChange={props.handleChange}
      value={props.value}
      name="Preview Link"
      minlength={1}
      errMinMsg="Post must have a preview"
      rows={2}
      inputStyles="w-full px-2 py-2 border-2 border-gray-600 rounded-md text-lg outline-none resize-vertical"
      inputErrStyles="w-full px-2 py-2 border-2 border-red-600 rounded-md text-lg outline-none resize-vertical"
      blockStyles="relative min-h-[110px] flex flex-col gap-2"
    />
  );
};

export default InputPreview;
