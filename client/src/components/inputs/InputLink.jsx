import React from "react";
import InputTwo from "./InputTwo";

const InputLink = (props) => {
  return (
    <InputTwo
      handleChange={props.handleChange}
      handleMove={props.handleMove}
      handleDelete={props.handleDelete}
      value={props.value}
      name="Link"
      placeholderFirst="Link"
      placeholderSecond="Link text (optional)"
      minlengthFirst={1}
      errMinMsgFirst="Put there your link"
      maxlengthSecond={50}
      rowsFirst={2}
      inputStylesFirst="w-full px-2 py-2 border-2 border-gray-600 rounded-md text-lg outline-none resize-vertical"
      inputErrStylesFirst="w-full px-2 py-2 border-2 border-red-600 rounded-md text-lg outline-none resize-vertical"
      rowsSecond={1}
      inputStylesSecond="w-[300px] px-2 py-2 border-2 border-gray-600 rounded-md text-lg outline-none resize-vertical"
      blockStyles="relative min-h-[170px] flex flex-col gap-2"
    />
  );
};

export default InputLink;
