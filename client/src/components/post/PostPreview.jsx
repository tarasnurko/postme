import React from "react";
import Tags from "./Tags";
import { Link } from "react-router-dom";
import UserPreview from "../user/UserPreview";
import DateText from "../common/text/DateText";

const PostPreview = (props) => {
  return (
    <div className="flex flex-col-reverse sm:flex-row sm:justify-between gap-4 pb-8 border-b border-gray-400">
      <div className="flex flex-col gap-4">
        <div className="flex justify-start items-center gap-4">
          {props.post.user && (
            <UserPreview
              id={props.post?.user?._id}
              photo={props.post?.user?.photo}
              username={props.post?.user?.username || "user"}
              followers={props.post?.user?.followers?.length || 0}
            />
          )}
          <DateText date={props.post?.createdAt} />
        </div>
        <Link to={`/posts/${props.post._id}`} className="flex flex-col">
          <h3 className="font-bold text-xl">{props.post?.title}</h3>
          <p className="text-base">{props.post?.description}</p>
        </Link>
        {props.post.tags?.length > 0 && <Tags tags={props.post?.tags} />}
      </div>
      <img
        className="shrink-0 w-full sm:w-44 h-44 object-cover"
        src={props.post?.preview}
        alt="preview"
      />
    </div>
  );
};

export default PostPreview;
