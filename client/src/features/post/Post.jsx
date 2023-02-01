import {
  ChatBubbleBottomCenterTextIcon,
  HandThumbUpIcon,
  PencilSquareIcon,
} from "@heroicons/react/24/outline";
import { HandThumbUpIcon as HandThumbUpFilledIcon } from "@heroicons/react/24/solid";
import React from "react";
import { Link, useParams } from "react-router-dom";
import Spinner from "../../components/Spinner";
import UserPreview from "../../components/user/UserPreview";
import { useGetPostQuery, useTogglePostLikeMutation } from "./postsApiSlice";
import ToContent from "./ToContent";
import Tags from "../../components/post/Tags";
import useAuth from "../../hooks/useAuth";
import PageLayout from "../../components/PageLayout";
import CommentsList from "../../components/comment/CommentsList";
import DateText from "../../components/common/text/DateText";

const Post = () => {
  const { id } = useParams();
  const { isAuthorized, userId, role } = useAuth();

  const { data: post, isLoading } = useGetPostQuery(id);
  const [togglePostLike, { isLoading: isLikeLoading }] =
    useTogglePostLikeMutation();

  const checkCanEdit = () => {
    return isAuthorized && (userId === post.user._id || role === "admin");
  };

  const handleLike = async () => {
    await togglePostLike({ postId: id, userId });
  };

  return (
    <PageLayout gap={8}>
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
            <DateText date={post.createdAt} />
            {checkCanEdit() && (
              <Link to={"edit"} className="w-6 h-6 ml-[auto] cursor-pointer">
                <PencilSquareIcon className="" />
              </Link>
            )}
          </div>
          {post.tags.length > 0 && <Tags tags={post.tags} />}
          <div className="flex flex-col gap-10">
            <h1 className="font-semibold text-3xl">{post.title}</h1>
            <div className="flex flex-col sm:flex-row sm:justify-between items-center gap-5">
              <img
                src={post.preview}
                alt="preview"
                className="w-full h-80 sm:w-[500px] sm:h-[300px] object-cover"
              />

              <p className="text-base font-medium">{post.description}</p>
            </div>
            {!isLoading && <ToContent content={post.content} />}
          </div>
          <div className="flex justify-start gap-8">
            <button
              className="flex items-center gap-2 cursor-pointer"
              disabled={!isAuthorized || isLikeLoading}
              onClick={handleLike}
            >
              {isAuthorized && post.likedBy.includes(userId) ? (
                <HandThumbUpFilledIcon className="w-6 h-6" />
              ) : (
                <HandThumbUpIcon className="w-6 h-6" />
              )}
              <p className="text-sm font-medium">{post.likedBy.length}</p>
            </button>
            <div className="flex items-center gap-2 cursor-pointer">
              <ChatBubbleBottomCenterTextIcon className="w-6 h-6" />
              <p className="text-sm font-medium">{post.comments.length}</p>
            </div>
          </div>
          <CommentsList comments={post.comments} />
        </>
      )}
    </PageLayout>
  );
};

export default Post;
