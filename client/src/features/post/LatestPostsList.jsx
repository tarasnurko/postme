import React from "react";
import PostList from "../../components/post/PostList";
import { useGetLatestPostsQuery } from "./postsApiSlice";
import Spinner from "../../components/Spinner";
import { Link } from "react-router-dom";

const LatestPostsList = () => {
  const { data, isLoading } = useGetLatestPostsQuery({ page: 1, limit: 3 });

  return (
    <div className="flex flex-col gap-12">
      <h2 className="font-semibold text-3xl">Latest Posts</h2>
      {isLoading ? <Spinner /> : <PostList posts={data.posts} />}
      <Link
        to="/posts/latest"
        className="text-center font-medium text-base underline"
      >
        More latest posts
      </Link>
    </div>
  );
};

export default LatestPostsList;
