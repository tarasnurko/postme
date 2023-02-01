import React from "react";
import Button from "../Button";

const DefaultButton = (props) => {
  return (
    <Button
      disabled={props.disabled}
      onClick={props.onClick}
      className={props.className}
      type={props.type}
    >
      {props.children}
    </Button>
  );
};

export default DefaultButton;
