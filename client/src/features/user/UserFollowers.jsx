import React from "react";
import { Link, useParams } from "react-router-dom";
import Spinner from "../../components/Spinner";
import UserPreview from "../../components/user/UserPreview";
import { useGetUserDataQuery } from "./userApiSlice";

const UserFollowers = () => {
  const { id } = useParams();

  const { data, isLoading } = useGetUserDataQuery({ id, data: "followers" });

  return (
    <>
      {isLoading && <Spinner />}

      {!isLoading && data.followers.length > 0 && (
        <div className="mt-6 grid auto-rows-[60px] grid-cols-3 gap-5">
          {data.followers.map((follower) => (
            <UserPreview
              key={follower._id}
              id={follower._id}
              photo={follower.photo}
              username={follower.username}
              followers={follower.followers.length}
            />
          ))}
        </div>
      )}

      {!isLoading && data.followers.length === 0 && (
        <p className="text-lg font-medium text-center">No Followings</p>
      )}
    </>
  );
};

export default UserFollowers;
