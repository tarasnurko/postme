import React from "react";
import { Link } from "react-router-dom";

const PostPreview = (props) => {
  // console.log(props);

  return (
    <div className="flex justify-between gap-5 pb-8 border-b border-gray-400">
      <div className="flex flex-col gap-4">
        <div className="flex justify-start items-center gap-4">
          <Link
            to={`/users/${props.post.user._id}`}
            className="flex items-center gap-3"
          >
            <img
              className="shrink-0 w-12 h-12 bg-gray-700 rounded-full"
              src={props.post.user.photo}
              alt="user"
            />
            <p className="text-base">{props.post.user.username}</p>
          </Link>
          <p className="text-xs text-zinc-400">2 month ago</p>
          <p className="font-medium text-base text-zinc-400">EN</p>
          <div className="max-w-[300px] flex items-center gap-3 flex-wrap">
            {props.post.tags.map((tag, index) => (
              <Link
                key={index}
                to="/search?topic=tag"
                className="px-4 py-1 bg-gray-300 rounded-xl font-medium text-sm"
              >
                {tag}
              </Link>
            ))}
          </div>
        </div>
        <Link to={`/posts/${props.post._id}`} className="flex flex-col">
          <h3 className="font-bold text-xl">{props.post.title}</h3>
          <p className="text-base">{props.post.description}</p>
        </Link>
      </div>
      <img
        className="shrink-0 w-40 h-40 object-cover"
        src={props.post.preview}
        alt="preview"
      />
    </div>
  );
};

export default PostPreview;

{
  /* <div className="flex flex-col gap-4">
        <div className="flex justify-start items-center gap-5">
          <Link
            to={`/users/${props.post.user._id}`}
            className="flex items-center gap-3"
          >
            <div className="shrink-0 w-10 h-10 bg-gray-700 rounded-full"></div>
            <p className="text-base">{props.post.user.username}</p>
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
        <Link to={`/posts/${props.post._id}`} className="flex flex-col gap-1">
          <h3 className="font-bold text-xl">{props.post.title}</h3>
          <p className="text-base">{props.post.description}</p>
        </Link>
      </div> */
}
