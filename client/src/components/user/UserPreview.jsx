import React from "react";
import { Link } from "react-router-dom";

const UserPreview = (props) => {
  return (
    <Link
      to={`/users/${props.id}`}
      key={props.id}
      className="flex items-center gap-3"
    >
      <img
        className="shrink-0 w-12 h-12 bg-gray-700 rounded-full"
        src={props.photo}
        alt="user"
      />
      <div className="flex flex-col justify-center">
        <p className="font-medium text-base">{props.username}</p>
        <p className="font-sm text-gray-600">
          {props.followers || 0} followers
        </p>
      </div>
    </Link>
  );
};

export default UserPreview;
