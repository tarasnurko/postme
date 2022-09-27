import React from "react";

const Input = (props) => {
  const {
    handleChange,
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

  return (
    <div className={`${blockStyles}`}>
      <label className="absolute ml-2 top-[-20px] left-0 text-xs text-gray-500">
        {name}
      </label>
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
