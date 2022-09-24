import React from "react";
import PostPreview from "./PostPreview";

const PostList = (props) => {
  return (
    <div className="flex flex-col gap-12">
      <h2 className="font-semibold text-3xl">Most Liked Posts</h2>
      <div className="flex flex-col gap-8">
        {props.posts.map((post) => (
          <PostPreview key={post._id} post={post} />
        ))}
        <p className="text-center font-medium text-base underline">
          More most liked posts
        </p>
      </div>
    </div>
  );
};

export default PostList;
