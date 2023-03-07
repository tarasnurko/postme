import React from "react";
import { Link } from "react-router-dom";
import PostList from "../../components/post/PostList";
import Spinner from "../../components/Spinner";
import { useGetMostLikedPostsQuery } from "./postsApiSlice";

const PopularPostsList = () => {
  const { data, isLoading, isError } = useGetMostLikedPostsQuery({
    page: 1,
    limit: 3,
  });

  const render = () => {
    if (isLoading) {
      return <Spinner />;
    } else if (!data?.posts || data?.posts?.length === 0) {
      return <p>No Popular Posts</p>;
    } else if (isError) {
      return <p>Some error occured</p>;
    }
    return (
      <>
        <PostList posts={data.posts} />

        <Link
          to="/posts/popular"
          className="text-center font-medium text-base underline"
        >
          More popular posts
        </Link>
      </>
    );
  };

  return (
    <div className="flex flex-col gap-12">
      <h2 className="font-semibold text-3xl">Most Popular Posts</h2>
      {render()}
    </div>
  );
};

export default PopularPostsList;
