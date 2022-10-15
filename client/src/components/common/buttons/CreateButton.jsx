import React from "react";
import Button from "./Button";

const CreateButton = (props) => {
  return (
    <Button
      type="submit"
      disabled={props.disabled}
      onClick={props.onClick}
      className="bg-amber-500 hover:bg-amber-600"
    >
      Create Post
    </Button>
  );
};

export default CreateButton;
