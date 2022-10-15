import React from "react";
import Button from "./Button";

const FollowButton = (props) => {
  return (
    <Button
      onClick={props.onClick}
      disabled={props.disabled}
      className="bg-pink-400 hover:bg-pink-500"
    >
      Follow
    </Button>
  );
};

export default FollowButton;
