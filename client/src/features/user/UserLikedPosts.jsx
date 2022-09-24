import React from "react";
import { useParams } from "react-router-dom";
import PostPreview from "../post/PostPreview";
import { useGetUserDataQuery } from "./userApiSlice";

const UserLikedPosts = () => {
  const { id } = useParams();

  const { data, isLoading } = useGetUserDataQuery({ id, data: "likedPosts" });

  return (
    <div className="mt-6 flex flex-col gap-8">
      {!isLoading &&
        data.likedPosts.map((post) => (
          <PostPreview key={post._id} post={post} />
        ))}
    </div>
  );
};

export default UserLikedPosts;
