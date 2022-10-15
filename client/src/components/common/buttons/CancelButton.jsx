import React from "react";
import Button from "./Button";

const CancelButton = (props) => {
  return (
    <Button
      onClick={props.onClick}
      disabled={props.disabled}
      className="bg-gray-500 hover:bg-gray-600"
    >
      Cancel
    </Button>
  );
};

export default CancelButton;
