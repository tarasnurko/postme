import React from "react";
import { Field } from "formik";
import ErrorText from "../common/text/ErrorText";

const TitleInput = (props) => {
  return (
    <div className="relative min-h-[85px] flex flex-col gap-2">
      <label
        htmlFor="title"
        className="absolute ml-2 top-[-20px] left-0 text-xs text-gray-500"
      >
        Title
      </label>
      <Field
        className="w-full px-2 py-2 border-2 border-gray-600 rounded-md text-lg outline-none"
        id="title"
        name="title"
        placeholder="Title"
        maxLength={80}
      />
      {props.isError && <ErrorText>{props.error}</ErrorText>}
    </div>
  );
};

export default TitleInput;
