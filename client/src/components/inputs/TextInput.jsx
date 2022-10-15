import {
  ChevronDoubleDownIcon,
  ChevronDoubleUpIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { Field } from "formik";
import React from "react";
import ErrorText from "../common/text/ErrorText";

const TextInput = (props) => {
  return (
    <div className="relative min-h-[170px] flex flex-col gap-2">
      <label
        htmlFor={`content[${props.index}].text`}
        className="absolute ml-2 top-[-20px] left-0 text-xs text-gray-500"
      >
        Text
      </label>
      <div className="absolute top-[-24px] right-2 h-5 flex items-center gap-4">
        <div className="flex gap-2">
          {props.canMoveUp && (
            <ChevronDoubleUpIcon
              className="w-5 h-5 cursor-pointer"
              onClick={props.onMoveUp}
            />
          )}
          {props.canMoveDown && (
            <ChevronDoubleDownIcon
              className="w-5 h-5 cursor-pointer"
              onClick={props.onMoveDown}
            />
          )}
          <XMarkIcon
            className="w-5 h-5 cursor-pointer"
            onClick={props.onDelete}
          />
        </div>
      </div>
      <Field
        className="w-full px-2 py-2 border-2 border-gray-600 rounded-md text-lg outline-none resize-vertical"
        name={`content[${props.index}].text`}
        placeholder="Text"
        as="textarea"
        rows={4}
        maxLength={2000}
      />
      {props.isError && <ErrorText>{props.error}</ErrorText>}
    </div>
  );
};

export default TextInput;
