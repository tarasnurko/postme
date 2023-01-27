import React from "react";
import Button from "./Button";

const CreateButton = ({ children, disabled, onClick }) => {
  return (
    <Button
      type="submit"
      disabled={disabled}
      onClick={onClick}
      className="bg-amber-500 hover:bg-amber-600"
    >
      {children}
    </Button>
  );
};

export default CreateButton;
