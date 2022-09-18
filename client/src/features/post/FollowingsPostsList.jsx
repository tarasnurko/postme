import React from "react";
import PostPreview from "./PostPreview";

const FollowingsPostsList = () => {
  return (
    <div className="flex flex-col gap-12">
      <h2 className="font-semibold text-3xl">New Posts</h2>
      <div className="flex flex-col gap-8">
        <PostPreview />
        <div className="border-b border-gray-400"></div>
        <PostPreview />
        <div className="border-b border-gray-400"></div>
        <PostPreview />
        <p className="text-center font-medium text-base underline">
          More new posts
        </p>
      </div>
    </div>
  );
};

export default FollowingsPostsList;
