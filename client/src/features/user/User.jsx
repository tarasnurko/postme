import React from "react";
import {
  Link,
  Outlet,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import FollowButton from "../../components/common/buttons/FollowButton";

import PageLayout from "../../components/PageLayout";
import useAuth from "../../hooks/useAuth";
import { useSendLogoutMutation } from "../auth/authApiSlice";
import { useGetUserQuery, useToggleFollowMutation } from "./userApiSlice";

const User = () => {
  const { userId, isAuthorized } = useAuth();
  const { id } = useParams();

  const url = useLocation();
  const page = url.pathname.split("/");
  const navigate = useNavigate();

  const { data: user, isLoading } = useGetUserQuery(id);
  const [sendLogout] = useSendLogoutMutation();
  const [toggleFollow, { isLoading: isTogglingFollow }] =
    useToggleFollowMutation();

  const handleLogout = async () => {
    await sendLogout();
    navigate("/login");
  };

  // console.log(user);

  const handleToggleFollow = async () => {
    await toggleFollow({ userId: id, followerId: userId });
  };

  const isFollower = (!isLoading && user.followers.includes(userId)) || false;

  return (
    <PageLayout gap={4}>
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
        {isAuthorized && userId !== id && (
          <FollowButton
            onClick={handleToggleFollow}
            disabled={isTogglingFollow}
            type={!isFollower ? "follow" : "unfollow"}
          />
        )}
      </div>
      <div className="mt-2 flex flex-col gap-10">
        <div className="flex items-center flex-wrap gap-4 sm:gap-8">
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
          {isAuthorized && userId === id && (
            <Link
              to="edit"
              className={
                page?.[3] === "edit"
                  ? "text-lg border-b-2 border-black cursor-pointer"
                  : "text-lg text-gray-600 cursor-pointer"
              }
            >
              Edit
            </Link>
          )}
          {isAuthorized && userId === id && (
            <button
              className="text-lg text-gray-600 cursor-pointer"
              onClick={handleLogout}
            >
              Logout
            </button>
          )}
        </div>
      </div>
      <Outlet />
    </PageLayout>
  );
};

export default User;
