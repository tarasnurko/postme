import {
  ChatBubbleBottomCenterTextIcon,
  HandThumbUpIcon,
  PencilSquareIcon,
} from "@heroicons/react/24/outline";
import React from "react";
import { Link, useParams } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import Spinner from "../../components/Spinner";
import UserPreview from "../../components/user/UserPreview";
import { useGetPostQuery } from "./postsApiSlice";
import ToContent from "./ToContent";
import Tags from "../../components/post/Tags";
import PostDate from "../../components/post/PostDate";
import useAuth from "../../hooks/useAuth";
import PageLayout from "../../components/PageLayout";

const Post = () => {
  const { id } = useParams();
  const { data: post, isLoading } = useGetPostQuery(id);

  const { isAuthorized, userId, role } = useAuth();

  const checkCanEdit = () => {
    return isAuthorized && (userId === post.user._id || role === "admin");
  };

  return (
    <PageLayout sidebar={<Sidebar />}>
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <div className="flex justify-start items-center gap-5">
            <UserPreview
              id={post.user._id}
              photo={post.user.photo}
              username={post.user.username}
              followers={post.user.followers.length}
            />
            <PostDate />
            {checkCanEdit() && (
              <Link to={"edit"} className="w-6 h-6 ml-[auto] cursor-pointer">
                <PencilSquareIcon className="" />
              </Link>
            )}
          </div>
          {post.tags.length > 0 && <Tags tags={post.tags} />}
          <div className="flex flex-col gap-10">
            <h1 className="font-semibold text-3xl">{post.title}</h1>
            <div className="flex justify-between items-center gap-5">
              <img
                src={post.preview}
                alt="preview"
                className="w-[500px] h-[300px] object-cover"
              />

              <p className="text-base font-medium">{post.description}</p>
            </div>
            {!isLoading && <ToContent content={post.content} />}
          </div>
          <div className="flex justify-start gap-8">
            <div className="flex items-center gap-2 cursor-pointer">
              <HandThumbUpIcon className="w-6 h-6" />
              <p className="text-sm font-medium">200</p>
            </div>
            <div className="flex items-center gap-2 cursor-pointer">
              <ChatBubbleBottomCenterTextIcon className="w-6 h-6" />
              <p className="text-sm font-medium">200</p>
            </div>
          </div>
          <div className="flex flex-col gap-10">
            <h2 className="font-semibold text-2xl">Comments</h2>
            <div className="flex flex-col gap-10">
              <div className="flex gap-5">
                <div className="shrink-0 w-20 h-20 bg-gray-700 rounded-full"></div>
                <div className="flex flex-col gap-2">
                  <p className="text-xl font-medium">Username</p>
                  <p className="text-base">
                    There are many variations of passages of Lorem Ipsum
                    available, but the majority have suffered alteration in some
                    form, by injected humour, or randomised words which There
                    are many variations of passages of Lorem Ipsum available,
                  </p>
                  <div className="mt-2 flex items-center gap-5">
                    <div className="flex items-center gap-2 cursor-pointer">
                      <HandThumbUpIcon className="w-6 h-6" />
                      <p className="text-sm font-medium">200</p>
                    </div>
                    <p className="text-xs text-zinc-400">2 Month ago</p>
                  </div>
                </div>
              </div>
              <div className="flex gap-5">
                <div className="shrink-0 w-20 h-20 bg-gray-700 rounded-full"></div>
                <div className="flex flex-col gap-2">
                  <p className="text-xl font-medium">Username</p>
                  <p className="text-base">
                    There are many variations of passages of Lorem Ipsum
                    available, but the majority have suffered alteration in some
                    form, by injected humour, or randomised words which There
                    are many variations of passages of Lorem Ipsum available,
                  </p>
                  <div className="mt-2 flex items-center gap-5">
                    <div className="flex items-center gap-2 cursor-pointer">
                      <HandThumbUpIcon className="w-6 h-6" />
                      <p className="text-sm font-medium">200</p>
                    </div>
                    <p className="text-xs text-zinc-400">2 Month ago</p>
                  </div>
                </div>
              </div>
              <div className="flex gap-5">
                <div className="shrink-0 w-20 h-20 bg-gray-700 rounded-full"></div>
                <div className="flex flex-col gap-2">
                  <p className="text-xl font-medium">Username</p>
                  <p className="text-base">
                    There are many variations of passages of Lorem Ipsum
                    available, but the majority have suffered alteration in some
                    form, by injected humour, or randomised words which There
                    are many variations of passages of Lorem Ipsum available,
                  </p>
                  <div className="mt-2 flex items-center gap-5">
                    <div className="flex items-center gap-2 cursor-pointer">
                      <HandThumbUpIcon className="w-6 h-6" />
                      <p className="text-sm font-medium">200</p>
                    </div>
                    <p className="text-xs text-zinc-400">2 Month ago</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </PageLayout>
  );
};

export default Post;
