import React from "react";
import { Field } from "formik";
import ErrorText from "../common/text/ErrorText";

const DescriptionInput = (props) => {
  return (
    <div className="relative min-h-[170px] flex flex-col gap-2">
      <label
        htmlFor="description"
        className="absolute ml-2 top-[-20px] left-0 text-xs text-gray-500"
      >
        Description
      </label>
      <Field
        className="w-full px-2 py-2 border-2 border-gray-600 rounded-md text-lg outline-none resize-vertical"
        id="description"
        name="description"
        placeholder="Description"
        as="textarea"
        rows={4}
        maxLength={300}
      />
      {props.isError && <ErrorText>{props.error}</ErrorText>}
    </div>
  );
};

export default DescriptionInput;
