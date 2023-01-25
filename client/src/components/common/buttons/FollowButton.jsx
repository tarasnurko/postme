import React from "react";
import Button from "./Button";

const FollowButton = (props) => {
  const styles = !props.disabled
    ? "bg-pink-400 hover:bg-pink-500"
    : "bg-slate-400 hover:bg-slate-500 cursor-not-allowed";

  return (
    <Button
      onClick={props.onClick}
      disabled={props.disabled}
      className={styles}
    >
      Follow
    </Button>
  );
};

export default FollowButton;
