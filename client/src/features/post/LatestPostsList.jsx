import React from "react";
import PostList from "../../components/post/PostList";
import { useGetLatestPostsQuery } from "./postsApiSlice";
import Spinner from "../../components/Spinner";
import { Link } from "react-router-dom";

const LatestPostsList = () => {
  const { data, isLoading, isError } = useGetLatestPostsQuery({
    page: 1,
    limit: 3,
  });

  const render = () => {
    if (isLoading) {
      return <Spinner />;
    } else if (!data?.posts || data?.posts?.length === 0) {
      return <p>No Latest Posts</p>;
    } else if (isError) {
      return <p>Some error occured</p>;
    }
    return (
      <>
        <PostList posts={data.posts} />

        <Link
          to="/posts/latest"
          className="text-center font-medium text-base underline"
        >
          More Latest Posts
        </Link>
      </>
    );
  };

  return (
    <div className="flex flex-col gap-12">
      <h2 className="font-semibold text-3xl">Latest Posts</h2>
      {render()}
    </div>
  );
};

export default LatestPostsList;
