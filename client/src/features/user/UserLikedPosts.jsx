import React from "react";
import { useParams } from "react-router-dom";
import PostList from "../../components/post/PostList";
import Spinner from "../../components/Spinner";
import { useGetUserDataQuery } from "./userApiSlice";

const UserLikedPosts = () => {
  const { id } = useParams();

  const { data, isLoading } = useGetUserDataQuery({ id, data: "likedPosts" });

  return (
    <>
      {isLoading && <Spinner />}
      {!isLoading && data.likedPosts.length > 0 && (
        <PostList posts={data.likedPosts} />
      )}
      {!isLoading && data.likedPosts.length === 0 && (
        <p className="text-lg font-medium text-center">No Liked Posts</p>
      )}
    </>
  );
};

export default UserLikedPosts;
