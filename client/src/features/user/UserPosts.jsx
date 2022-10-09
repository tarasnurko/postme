import React from "react";
import { Link, useParams } from "react-router-dom";
import { useGetUserDataQuery } from "./userApiSlice";
import useAuth from "./../../hooks/useAuth";
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import Spinner from "../../components/Spinner";
import PostList from "../../components/post/PostList";

const UserPosts = () => {
  const { id } = useParams();

  const { isAuthorized, userId } = useAuth();

  const { data, isLoading } = useGetUserDataQuery({ id, data: "posts" });

  return (
    <>
      {isAuthorized && userId === id && (
        <Link
          to="/posts/create"
          className="mt-4 flex justify-center items-center gap-2"
        >
          <p className="text-lg font-medium">Create post</p>
          <PlusCircleIcon className="w-6 h-6" />
        </Link>
      )}
      {isLoading && (
        <div className="w-full flex justify-center">
          <Spinner />
        </div>
      )}
      {!isLoading && data.posts.length > 0 && (
        <div className="mt-4 flex flex-col gap-8">
          <PostList posts={data.posts} />
        </div>
      )}
      {!isLoading && data.posts.length === 0 && (
        <p className="text-lg font-medium text-center">No posts</p>
      )}
    </>
  );
};

export default UserPosts;
