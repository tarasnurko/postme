import React from "react";
import {
  ChevronDoubleUpIcon,
  ChevronDoubleDownIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

const Input = (props) => {
  const {
    handleChange,
    handleMove,
    handleDelete,
    value,
    name,
    minlength,
    maxlength,
    errMinMsg,
    errMaxMsg,
    rows,
    inputStyles,
    inputErrStyles,
    blockStyles,
  } = props;

  const handleInput = (e) => {
    let inputVal = e.target.value;

    if (minlength && errMinMsg && inputVal.length < minlength) {
      handleChange(value?.id, { content: e.target.value, err: errMinMsg });
    } else if (maxlength && errMaxMsg && inputVal.length > maxlength) {
      handleChange(value?.id, { content: inputVal, err: errMaxMsg });
    } else {
      handleChange(value?.id, { content: inputVal, err: null });
    }
  };

  const deleteItem = () => {
    handleDelete(value?.id);
  };

  const moveItem = (direction) => {
    handleMove(value?.id, direction);
  };

  return (
    <div className={`${blockStyles}`}>
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
        placeholder={name}
        value={value?.content}
        onChange={handleInput}
        rows={rows}
        maxLength={maxlength}
        className={!value?.err ? `${inputStyles}` : `${inputErrStyles}`}
      />
      {value?.err && (
        <p className="ml-2 mt-2 text-sm text-red-400">{value?.err}</p>
      )}
    </div>
  );
};

export default Input;
