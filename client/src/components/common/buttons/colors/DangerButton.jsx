import React from "react";
import Button from "../Button";

const DangerButton = (props) => {
  return (
    <Button
      onClick={props.onClick}
      disabled={props.disabled}
      className="bg-red-600 hover:bg-red-700"
    >
      {props.children}
    </Button>
  );
};

export default DangerButton;
