import React from "react";
import { Link } from "react-router-dom";
import PostList from "../../components/post/PostList";
import Spinner from "../../components/Spinner";
import { useGetMostLikedPostsQuery } from "./postsApiSlice";

const PopularPostsList = () => {
  const { data, isLoading } = useGetMostLikedPostsQuery({ page: 1, limit: 3 });

  console.log(data);

  return (
    <div className="flex flex-col gap-12">
      <h2 className="font-semibold text-3xl">Popular Posts</h2>
      {isLoading ? <Spinner /> : <PostList posts={data.posts} />}
      <Link
        to="/posts/popular"
        className="text-center font-medium text-base underline"
      >
        More popular posts
      </Link>
    </div>
  );
};

export default PopularPostsList;
