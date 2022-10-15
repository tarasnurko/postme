import React from "react";
import Button from "../Button";

const SuccessButton = (props) => {
  return (
    <Button
      onClick={props.onClick}
      disabled={props.disabled}
      className="bg-green-500 hover:bg-green-600"
    >
      {props.children}
    </Button>
  );
};

export default SuccessButton;
