import React from "react";
import { Link } from "react-router-dom";

const Tags = (props) => {
  return (
    <div className="max-w-[620px] flex items-center gap-3 flex-wrap">
      {props.tags.map((tag, index) => (
        <Link
          key={index}
          to="/search?topic=tag"
          className="px-4 py-1 bg-gray-300 rounded-xl font-medium text-sm"
        >
          {tag}
        </Link>
      ))}
    </div>
  );
};

export default Tags;
