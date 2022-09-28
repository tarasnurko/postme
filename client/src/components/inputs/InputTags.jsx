import React from "react";
import Input from "./Input";

const InputTags = (props) => {
  return (
    <Input
      handleChange={props.handleChange}
      handleMove={props.handleMove}
      handleDelete={props.handleDelete}
      value={props.value}
      name="Tags"
      minlength={1}
      errMinMsg="Write tag(s) with commas"
      maxlength={50}
      errMaxMsg="Tags can't have more then 50 characters"
      rows={1}
      inputStyles="w-[500px] px-2 py-2 border-2 border-gray-600 rounded-md text-lg outline-none resize-vertical"
      inputErrStyles="w-[500px] px-2 py-2 border-2 border-red-600 rounded-md text-lg outline-none resize-vertical"
      blockStyles="relative min-h-[90px] flex flex-col gap-2"
      onChange={props.onChange}
      id={props.id}
    />
  );
};

export default InputTags;
