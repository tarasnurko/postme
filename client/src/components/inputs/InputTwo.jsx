import React, { useEffect, useState } from "react";

const InputImage = (props) => {
  const {
    name,
    placeholderFirst,
    minlengthFirst,
    maxlengthFirst,
    errMinMsgFirst,
    errMaxMsgFirst,
    rowsFirst,
    inputStylesFirst,
    inputErrStylesFirst,
    placeholderSecond,
    minlengthSecond,
    maxlengthSecond,
    errMinMsgSecond,
    errMaxMsgSecond,
    rowsSecond,
    inputStylesSecond,
    inputErrStylesSecond,
    blockStyles,
  } = props;

  const [errFirst, setErrFirst] = useState("");
  const [errSecond, setErrSecond] = useState("");
  const [valueFirst, setValueFirst] = useState("");
  const [valueSecond, setValueSecond] = useState("");
  const [clickedFirst, setClickedFirst] = useState(false);
  const [clickedSecond, setClickedSecond] = useState(false);

  useEffect(() => {
    let timeout = setTimeout(() => {
      if (clickedFirst) {
        const firstTrimmed = valueFirst.trim();

        if (minlengthFirst && errMinMsgFirst && firstTrimmed < minlengthFirst) {
          setErrFirst(errMinMsgFirst);
        } else if (
          maxlengthFirst &&
          errMaxMsgFirst &&
          firstTrimmed < maxlengthFirst
        ) {
          setErrFirst(errMaxMsgFirst);
        } else {
          setErrFirst("");
        }
      }

      if (clickedSecond) {
        const secondTrimmed = valueSecond.trim();

        if (
          minlengthSecond &&
          errMinMsgSecond &&
          secondTrimmed < minlengthSecond
        ) {
          setErrFirst(errMinMsgSecond);
        } else if (
          maxlengthSecond &&
          errMaxMsgSecond &&
          secondTrimmed > maxlengthSecond
        ) {
          setErrSecond(errMaxMsgSecond);
        } else {
          setErrSecond("");
        }
      }
    }, 500);

    return () => clearTimeout(timeout);
  }, [
    clickedFirst,
    clickedSecond,
    errMaxMsgFirst,
    errMaxMsgSecond,
    errMinMsgFirst,
    errMinMsgSecond,
    maxlengthFirst,
    maxlengthSecond,
    minlengthFirst,
    minlengthSecond,
    valueFirst,
    valueSecond,
  ]);

  const handleInputFirst = (e) => {
    if (!clickedFirst) setClickedFirst(true);

    setValueFirst(e.target.value);
  };

  const handleInputSecond = (e) => {
    if (!clickedSecond) setClickedSecond(true);

    setValueSecond(e.target.value);
  };

  return (
    <div className={blockStyles}>
      <label className="absolute ml-2 top-[-20px] left-0 text-xs text-gray-500">
        {name}
      </label>
      <textarea
        placeholder={placeholderFirst}
        value={valueFirst}
        onChange={handleInputFirst}
        rows={rowsFirst}
        maxLength={maxlengthFirst}
        className={!errFirst ? `${inputStylesFirst}` : `${inputErrStylesFirst}`}
      />
      <textarea
        placeholder={placeholderSecond}
        value={valueSecond}
        onChange={handleInputSecond}
        rows={rowsSecond}
        maxLength={maxlengthSecond}
        className={
          !errSecond ? `${inputStylesSecond}` : `${inputErrStylesSecond}`
        }
      />
      {(errSecond || errFirst) && (
        <p className="ml-2 mt-2 text-sm text-red-400">{`${errFirst}  ${errSecond}`}</p>
      )}
    </div>
  );
};

export default InputImage;
