import React from "react";
import Button from "./Button";

const FollowButton = (props) => {
  const text = props.type === "follow" ? "Follow" : "Unfollow";

  const styles =
    props.type === "follow"
      ? "bg-pink-400 hover:bg-pink-500"
      : "bg-slate-400 hover:bg-slate-500";

  return (
    <Button
      onClick={props.onClick}
      disabled={props.disabled}
      className={styles}
    >
      {text}
    </Button>
  );
};

export default FollowButton;
