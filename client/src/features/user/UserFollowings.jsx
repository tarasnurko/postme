import React from "react";
import { useParams } from "react-router-dom";
import Spinner from "../../components/Spinner";
import UserPreview from "../../components/user/UserPreview";
import { useGetUserDataQuery } from "./userApiSlice";

const UserFollowings = () => {
  const { id } = useParams();

  const { data, isLoading } = useGetUserDataQuery({ id, data: "followings" });

  return (
    <>
      {isLoading && (
        <div className="w-full flex justify-center">
          <Spinner />
        </div>
      )}

      {!isLoading && data.followings.length > 0 && (
        <div className="mt-6 grid auto-rows-[60px] grid-cols-3 gap-5">
          {data.followings.map((following) => (
            <UserPreview
              key={following._id}
              id={following._id}
              photo={following.photo}
              username={following.username}
              followers={following.followers.length}
            />
          ))}
        </div>
      )}

      {!isLoading && data.followings.length === 0 && (
        <p className="text-lg font-medium text-center">No Followings</p>
      )}
    </>
  );
};

export default UserFollowings;
