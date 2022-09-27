import {
  ChevronDoubleDownIcon,
  ChevronDoubleUpIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import React from "react";

const Input = (props) => {
  const {
    name,
    handleChange,
    handleMove,
    handleDelete,
    value,

    placeholderFirst,
    placeholderSecond,

    rowsFirst,
    rowsSecond,

    inputStylesFirst,
    inputStylesSecond,
    inputErrStylesFirst,

    errMinMsgFirst,
    errMaxMsgFirst,

    minlengthFirst,
    maxlengthFirst,
    maxlengthSecond,

    blockStyles,
  } = props;

  const handleContent = (e) => {
    let inputVal = e.target.value;

    if (minlengthFirst && errMinMsgFirst && inputVal.length < minlengthFirst) {
      handleChange(value?.id, {
        content: e.target.value,
        err: errMinMsgFirst,
      });
    } else if (
      maxlengthFirst &&
      errMaxMsgFirst &&
      inputVal.length > maxlengthFirst
    ) {
      handleChange(value?.id, {
        content: e.target.value,
        err: errMaxMsgFirst,
      });
    } else {
      handleChange(value?.id, {
        content: inputVal,
        err: "",
      });
    }
  };

  const handleSub = (e) => {
    let inputVal = e.target.value;

    handleChange(value?.id, {
      sub: inputVal,
    });
  };

  const deleteItem = () => {
    handleDelete(value?.id);
  };

  console.log(value);
  const moveItem = (direction) => {
    handleMove(value?.id, direction);
  };

  return (
    <div className={blockStyles}>
      <label className="absolute ml-2 top-[-20px] left-0 text-xs text-gray-500">
        {name}
      </label>
      <div className="absolute top-[-24px] right-2 h-6 flex items-center gap-5">
        {handleDelete && (
          <div>
            <XMarkIcon
              className="w-6 h-6 cursor-pointer"
              onClick={deleteItem}
            />
          </div>
        )}
        {handleMove && (
          <div className="flex gap-2">
            <ChevronDoubleDownIcon
              className="w-6 h-6 cursor-pointer"
              onClick={() => moveItem(1)}
            />
            <ChevronDoubleUpIcon
              className="w-6 h-6 cursor-pointer"
              onClick={() => moveItem(-1)}
            />
          </div>
        )}
      </div>
      <textarea
        placeholder={placeholderFirst}
        value={value?.content}
        onChange={handleContent}
        rows={rowsFirst}
        maxLength={maxlengthFirst}
        className={
          !value?.err ? `${inputStylesFirst}` : `${inputErrStylesFirst}`
        }
      />
      <textarea
        placeholder={placeholderSecond}
        value={value?.sub}
        onChange={handleSub}
        rows={rowsSecond}
        maxLength={maxlengthSecond}
        className={inputStylesSecond}
      />
      {value?.err && (
        <p className="ml-2 mt-2 text-sm text-red-400">{value?.err}</p>
      )}
    </div>
  );
};

export default Input;
