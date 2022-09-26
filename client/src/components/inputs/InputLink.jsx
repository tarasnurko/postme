import React from "react";
import InputTwo from "./InputTwo";

const InputLink = (props) => {
  return (
    <InputTwo
      name="Link"
      placeholderFirst="Link"
      minlengthFirst="1"
      errMinMsgFirst="Put there your link"
      rowsFirst={2}
      inputStylesFirst="w-full px-2 py-2 border-2 border-gray-600 rounded-md text-lg outline-none resize-vertical"
      inputErrStylesFirst="w-full px-2 py-2 border-2 border-red-600 rounded-md text-lg outline-none resize-vertical"
      placeholderSecond="Image description"
      maxlengthSecond={30}
      errMaxMsgSecond="Link name can't have more then 30 characters"
      rowsSecond={1}
      inputStylesSecond="w-[300px] px-2 py-2 border-2 border-gray-600 rounded-md text-lg outline-none resize-vertical"
      inputErrStylesSecond="w-[300px] px-2 py-2 border-2 border-red-600 rounded-md text-lg outline-none resize-vertical"
      blockStyles="relative min-h-[170px] flex flex-col gap-2"
    />
  );
};

export default InputLink;
