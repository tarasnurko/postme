import React from "react";
import { useParams } from "react-router-dom";
import Spinner from "../../components/Spinner";
import UserList from "../../components/user/UserList";
import { useGetUserDataQuery } from "./userApiSlice";

const UserFollowings = () => {
  const { id } = useParams();

  const { data, isLoading } = useGetUserDataQuery({ id, data: "followings" });

  return (
    <>
      {isLoading && <Spinner />}

      {!isLoading && data.followings.length > 0 && (
        <UserList users={data.followings} />
      )}

      {!isLoading && data.followings.length === 0 && (
        <p className="text-lg font-medium text-center">No Followings</p>
      )}
    </>
  );
};

export default UserFollowings;
