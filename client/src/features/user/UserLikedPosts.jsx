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
      {isLoading && (
        <div className="w-full flex justify-center">
          <Spinner />
        </div>
      )}
      {!isLoading && data.likedPosts.length > 0 && (
        <div className="mt-4 flex flex-col gap-8">
          <PostList posts={data.likedPosts} />
        </div>
      )}
      {!isLoading && data.likedPosts.length === 0 && (
        <p className="text-lg font-medium text-center">No Liked Posts</p>
      )}
    </>
  );
};

export default UserLikedPosts;
