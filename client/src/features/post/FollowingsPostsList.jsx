import React from "react";
import { Link } from "react-router-dom";
import PostList from "../../components/post/PostList";
import Spinner from "../../components/Spinner";
import { useGetFollosingsPostsQuery } from "./postsApiSlice";

const FollowingsPostsList = () => {
  const { data: posts, isLoading } = useGetFollosingsPostsQuery({
    page: 1,
    limit: 3,
  });

  return (
    <div className="flex flex-col gap-12">
      <h2 className="font-semibold text-3xl">Followings Posts</h2>
      {isLoading ? <Spinner /> : <PostList posts={posts} />}
      <Link
        to="/posts/followings"
        className="text-center font-medium text-base underline"
      >
        More followings posts
      </Link>
    </div>
  );
};

export default FollowingsPostsList;
