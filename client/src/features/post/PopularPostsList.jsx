import React from "react";
import PostPreview from "./PostPreview";
import { useGetMostLikedPostsQuery } from "./postsApiSlice";

const PopularPostsList = () => {
  const { data: posts, isLoading } = useGetMostLikedPostsQuery(3);

  return (
    <div className="flex flex-col gap-12">
      <h2 className="font-semibold text-3xl">Most Liked Posts</h2>
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
          More most liked posts
        </p>
      </div>
    </div>
  );
};

export default PopularPostsList;
