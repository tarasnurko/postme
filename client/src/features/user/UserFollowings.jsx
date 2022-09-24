import React from "react";
import { Link, useParams } from "react-router-dom";
import { useGetUserDataQuery } from "./userApiSlice";

const UserFollowings = () => {
  const { id } = useParams();

  const { data, isLoading } = useGetUserDataQuery({ id, data: "followings" });

  return (
    <div className="mt-6 grid auto-rows-[60px] grid-cols-3 gap-5">
      {!isLoading &&
        data.followings.map((following) => (
          <Link
            to={`/users/${following._id}`}
            key={following._id}
            className="flex items-center gap-3"
          >
            <img
              className="shrink-0 w-12 h-12 bg-gray-700 rounded-full"
              src={following.photo}
              alt="user"
            />
            <div className="flex flex-col justify-center">
              <p className="font-medium text-base">{following.username}</p>
              <p className="font-sm text-gray-600">
                {following.followers.length} followers
              </p>
            </div>
          </Link>
        ))}
    </div>
  );
};

export default UserFollowings;
