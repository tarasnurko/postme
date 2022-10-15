import React from "react";
import { Field } from "formik";
import ErrorText from "../common/text/ErrorText";

const PreviewInput = (props) => {
  return (
    <div className="relative min-h-[85px] flex flex-col gap-2">
      <label
        htmlFor="preview"
        className="absolute ml-2 top-[-20px] left-0 text-xs text-gray-500"
      >
        Preview
      </label>
      <Field
        className="w-full px-2 py-2 border-2 border-gray-600 rounded-md text-lg outline-none"
        id="preview"
        name="preview"
        placeholder="Preview url"
        maxLength={500}
      />
      {props.isError && <ErrorText>{props.error}</ErrorText>}
    </div>
  );
};

export default PreviewInput;
