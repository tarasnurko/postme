import React from "react";
import PostList from "./PostList";
import { useGetMostLikedPostsQuery } from "./postsApiSlice";

const PopularPostsList = () => {
  const { data: posts, isLoading } = useGetMostLikedPostsQuery(3);

  return !isLoading && <PostList isLoading={isLoading} posts={posts} />;
};

export default PopularPostsList;
