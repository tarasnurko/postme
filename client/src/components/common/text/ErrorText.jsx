import React from "react";

const ErrorText = (props) => {
  return <p className="ml-2 mt-2 text-sm text-red-400">{props.children}</p>;
};

export default ErrorText;
