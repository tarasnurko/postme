import React from "react";
import { Link } from "react-router-dom";
import PostList from "../../components/post/PostList";
import Spinner from "../../components/Spinner";
import { useGetFollowingsPostsQuery } from "./postsApiSlice";

const FollowingsPostsList = () => {
  const { data, isLoading, isError } = useGetFollowingsPostsQuery({
    page: 1,
    limit: 3,
  });

  const render = () => {
    if (isLoading) {
      return <Spinner />;
    } else if (!data?.posts || data?.posts?.length === 0) {
      return <p>No Followings Posts</p>;
    } else if (isError) {
      return <p>Some error occured</p>;
    }
    return (
      <>
        <PostList posts={data?.posts} />

        <Link
          to="/posts/followings"
          className="text-center font-medium text-base underline"
        >
          More Followings Posts
        </Link>
      </>
    );
  };

  return (
    <div className="flex flex-col gap-12">
      <h2 className="font-semibold text-3xl">Followings Posts</h2>
      {render()}
    </div>
  );
};

export default FollowingsPostsList;
