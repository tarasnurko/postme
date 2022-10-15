import React from "react";
import Button from "./Button";

const AddButton = (props) => {
  return (
    <Button disabled={props.disabled} onClick={props.onClick}>
      Add
    </Button>
  );
};

export default AddButton;
