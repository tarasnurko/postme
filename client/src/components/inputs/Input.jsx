import React, { useState, useEffect } from "react";

const Input = (props) => {
  const {
    onChange,
    initialValue,
    name,
    minlength,
    maxlength,
    errMinMsg,
    errMaxMsg,
    rows,
    inputStyles,
    inputErrStyles,
    blockStyles,
    id,
  } = props;

  const [value, setValue] = useState(initialValue);
  const [err, setErr] = useState("");
  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    let timeout = setTimeout(() => {
      if (clicked) {
        const trimmed = value.trim();

        if (minlength && errMinMsg && trimmed.length < minlength) {
          onChange(id, { content: "" });
          setErr(errMinMsg);
        } else if (maxlength && errMaxMsg && trimmed.length > maxlength) {
          onChange(id, { content: "" });
          setErr(errMaxMsg);
        } else {
          onChange(id, { content: value });
          setErr("");
        }
      }
    }, 500);

    return () => clearTimeout(timeout);
  }, [
    value,
    clicked,
    maxlength,
    minlength,
    errMaxMsg,
    errMinMsg,
    onChange,
    id,
  ]);

  const handleInput = (e) => {
    if (!clicked) setClicked(true);

    setValue(e.target.value);
  };

  return (
    <div className={`${blockStyles}`}>
      <label className="absolute ml-2 top-[-20px] left-0 text-xs text-gray-500">
        {name}
      </label>
      <textarea
        placeholder={name}
        value={value}
        onChange={handleInput}
        rows={rows}
        maxLength={maxlength}
        className={!err ? `${inputStyles}` : `${inputErrStyles}`}
      />
      {err && <p className="ml-2 mt-2 text-sm text-red-400">{err}</p>}
    </div>
  );
};

export default Input;
