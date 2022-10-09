import React from "react";
import PostPreview from "./PostPreview";

const PostList = (props) => {
  return (
    <div className="flex flex-col gap-8">
      {props.posts.map((post) => (
        <PostPreview key={post._id} post={post} />
      ))}
    </div>
  );
};

export default PostList;
