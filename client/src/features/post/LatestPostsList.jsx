import React from "react";
import PostList from "./PostList";
import { useGetLatestPostsQuery } from "./postsApiSlice";

const LatestPostsList = () => {
  const { data: posts, isLoading } = useGetLatestPostsQuery(3);

  return !isLoading && <PostList posts={posts} />;
};

export default LatestPostsList;
