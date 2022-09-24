import React from "react";
import { Link, useParams } from "react-router-dom";
import { useGetUserDataQuery } from "./userApiSlice";

const UserFollowers = () => {
  const { id } = useParams();

  const { data, isLoading } = useGetUserDataQuery({ id, data: "followers" });

  return (
    <div className="mt-6 grid auto-rows-[60px] grid-cols-3 gap-5">
      {!isLoading &&
        data.followers.map((follower) => (
          <Link
            to={`/users/${follower._id}`}
            key={follower._id}
            className="flex items-center gap-3"
          >
            <img
              className="shrink-0 w-12 h-12 bg-gray-700 rounded-full"
              src={follower.photo}
              alt="user"
            />
            <div className="flex flex-col justify-center">
              <p className="font-medium text-base">{follower.username}</p>
              <p className="font-sm text-gray-600">
                {follower.followers.length} followers
              </p>
            </div>
          </Link>
        ))}
    </div>
  );
};

export default UserFollowers;
