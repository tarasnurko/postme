import React from "react";
import { Link } from "react-router-dom";

const PostPreview = (props) => {
  return (
    <div className="flex justify-between gap-5 pb-8 border-b border-gray-400">
      <div className="flex flex-col items-start gap-4">
        <div className="flex justify-start items-center gap-5">
          <Link to={`/users/${444}`} className="flex items-center gap-3">
            <div className="shrink-0 w-10 h-10 bg-gray-700 rounded-full"></div>
            <p className="text-base">{props.user}</p>
          </Link>
          <div className="flex justify-start items-center gap-3">
            <p className="text-xs text-zinc-400">2 month ago</p>
            <p className="font-medium text-base text-zinc-400">EN</p>
            <Link
              to="/search?topic=lorem"
              className="px-4 py-1 bg-gray-300 rounded-xl font-medium text-sm"
            >
              Lorem
            </Link>
          </div>
        </div>
        <Link to={`/posts/${props.id}`} className="flex flex-col gap-1">
          <h3 className="font-bold text-xl">{props.title}</h3>
          <p className="text-base">{props.description}</p>
        </Link>
      </div>
      <div>
        <img
          className="w-[220px] max-h-48 object-cover"
          src="https://images.pexels.com/photos/9399760/pexels-photo-9399760.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load"
          alt="img"
        />
      </div>
    </div>
  );
};

export default PostPreview;
