import React from "react";
import PostList from "../../components/post/PostList";
import { useGetLatestPostsQuery } from "./postsApiSlice";
import Spinner from "../../components/Spinner";

const LatestPostsList = () => {
  const { data: posts, isLoading } = useGetLatestPostsQuery(3);

  return (
    <div className="flex flex-col gap-12">
      <h2 className="font-semibold text-3xl">Most Liked Posts</h2>
      {isLoading ? <Spinner /> : <PostList posts={posts} />}
      <p className="text-center font-medium text-base underline">
        More latest posts
      </p>
    </div>
  );
};

export default LatestPostsList;
