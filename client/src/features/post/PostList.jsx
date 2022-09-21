import React from "react";
import PostPreview from "./PostPreview";

const PostList = (props) => {
  return (
    <div className="flex flex-col gap-12">
      <h2 className="font-semibold text-3xl">Most Liked Posts</h2>
      <div className="flex flex-col gap-8">
        {props.posts.map((post) => (
          <PostPreview
            id={post.id}
            key={post.id}
            user={post.user.username}
            title={post.title}
            description={post.description}
          />
        ))}
        <p className="text-center font-medium text-base underline">
          More most liked posts
        </p>
      </div>
    </div>
  );
};

export default PostList;
