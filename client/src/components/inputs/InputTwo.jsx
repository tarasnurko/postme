import React from "react";

const Input = (props) => {
  const {
    name,
    handleChange,
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

  return (
    <div className={blockStyles}>
      <label className="absolute ml-2 top-[-20px] left-0 text-xs text-gray-500">
        {name}
      </label>
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
