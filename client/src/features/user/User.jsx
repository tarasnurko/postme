import React from "react";
import { Link, Outlet, useLocation, useParams } from "react-router-dom";
import FollowButton from "../../components/common/buttons/FollowButton";

import PageLayout from "../../components/PageLayout";
import Sidebar from "../../components/Sidebar";
import { useGetUserQuery } from "./userApiSlice";

const User = () => {
  const { id } = useParams();

  const url = useLocation();
  const page = url.pathname.split("/");

  const { data: user, isLoading } = useGetUserQuery(id);

  return (
    <PageLayout gap={4} sidebar={<Sidebar />}>
      {!isLoading && user?.banner && (
        <img
          className="shrink-0 w-full h-[150px] object-cover"
          src={user?.banner}
          alt="banner"
        />
      )}
      <div className="flex justify-between items-center">
        {!isLoading && (
          <div className="flex gap-4 items-center">
            <img
              className="shrink-0 w-16 h-16 bg-gray-700 rounded-full"
              src={user?.photo}
              alt="avatar"
            />

            <div className="flex flex-col gap-1">
              <p className="text-xl font-medium">{user?.username}</p>
              <p className="text-base">{user?.followers.length} followers</p>
            </div>
          </div>
        )}
        <FollowButton />
      </div>
      <div className="mt-2 flex flex-col gap-10">
        <div className="flex items-center gap-8">
          <Link
            to=""
            className={
              !page?.[3] === true
                ? "text-lg border-b-2 border-black cursor-pointer"
                : "text-lg text-gray-600 cursor-pointer"
            }
          >
            Posts
          </Link>
          <Link
            to="likedPosts"
            className={
              page?.[3] === "likedPosts"
                ? "text-lg border-b-2 border-black cursor-pointer"
                : "text-lg text-gray-600 cursor-pointer"
            }
          >
            Liked Posts
          </Link>
          <Link
            to="followings"
            className={
              page?.[3] === "followings"
                ? "text-lg border-b-2 border-black cursor-pointer"
                : "text-lg text-gray-600 cursor-pointer"
            }
          >
            Followings
          </Link>
          <Link
            to="followers"
            className={
              page?.[3] === "followers"
                ? "text-lg border-b-2 border-black cursor-pointer"
                : "text-lg text-gray-600 cursor-pointer"
            }
          >
            Followers
          </Link>
        </div>
      </div>
      <Outlet />
    </PageLayout>
  );
};

export default User;
