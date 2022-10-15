import { XMarkIcon } from "@heroicons/react/24/outline";
import { FieldArray } from "formik";
import ErrorText from "../common/text/ErrorText";
import React from "react";
import DefaultButton from "../common/buttons/colors/DefaultButton";

const TagsInput = (props) => {
  const canAddTag = () => props.tagInput.trim().length > 0;

  return (
    <FieldArray name="tags" className="flex flex-col gap-4">
      {({ remove, push }) => (
        <div className="relative min-h-[120px] flex flex-col gap-2">
          <label
            htmlFor="description"
            className="absolute ml-2 top-[-20px] left-0 text-xs text-gray-500"
          >
            Tag
          </label>
          <input
            className="w-full px-2 py-2 border-2 border-gray-600 rounded-md text-lg outline-none resize-vertical"
            name="tag"
            placeholder="Tag"
            maxLength={15}
            type="text"
            value={props.tagInput}
            onChange={props.onTagChange}
          />

          <DefaultButton
            className="absolute top-1.5 right-4"
            disabled={!canAddTag()}
            onClick={() => props.onAddTag(push)}
          >
            Add
          </DefaultButton>

          {props.tags.length > 0 && (
            <div className="flex gap-4 flex-wrap">
              {props.tags.map((tag, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 px-4 py-1 bg-gray-300 rounded-xl font-medium text-sm"
                  onClick={() => remove(index)}
                >
                  <p>{tag}</p>
                  <XMarkIcon className="w-5 h-5" />
                </div>
              ))}
            </div>
          )}

          {props.isError && <ErrorText>{props.error}</ErrorText>}
        </div>
      )}
    </FieldArray>
  );
};

export default TagsInput;
