import React from "react";
import { useParams } from "react-router-dom";
import Spinner from "../../components/Spinner";
import UserList from "../../components/user/UserList";
import { useGetUserDataQuery } from "./userApiSlice";

const UserFollowers = () => {
  const { id } = useParams();

  const { data, isLoading } = useGetUserDataQuery({ id, data: "followers" });

  return (
    <>
      {isLoading && <Spinner />}

      {!isLoading && data.followers.length > 0 && (
        <UserList users={data.followers} />
      )}

      {!isLoading && data.followers.length === 0 && (
        <p className="text-lg font-medium text-center">No Followings</p>
      )}
    </>
  );
};

export default UserFollowers;
