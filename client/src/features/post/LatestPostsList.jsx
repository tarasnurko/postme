import React from "react";
import PostPreview from "./PostPreview";
import { useGetLatestPostsQuery } from "./postsApiSlice";

const LatestPostsList = () => {
  const { data: posts, isLoading } = useGetLatestPostsQuery(3);

  if (posts) {
    // console.log(posts);
  }

  return (
    <div className="flex flex-col gap-12">
      <h2 className="font-semibold text-3xl">Latest</h2>
      <div className="flex flex-col gap-8">
        {!isLoading &&
          posts.data.map((post, index) => (
            <PostPreview
              key={post._id}
              user={post.user.username}
              title={post.title}
              description={post.description}
            />
          ))}
        <p className="text-center font-medium text-base underline">
          More new posts
        </p>
      </div>
    </div>
  );
};

export default LatestPostsList;
