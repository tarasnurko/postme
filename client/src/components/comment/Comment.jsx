import { HandThumbUpIcon, TrashIcon } from "@heroicons/react/24/outline";
import { HandThumbUpIcon as HandThumbUpFilledIcon } from "@heroicons/react/24/solid";
import React from "react";
import { Link, useParams } from "react-router-dom";
import {
  useDeleteCommentMutation,
  useToggleCommentLikeMutation,
} from "../../features/comment/commentApiSlice";
import useAuth from "../../hooks/useAuth";
import DateText from "../common/text/DateText";

const Comment = ({ comment }) => {
  const { id: postId } = useParams();
  const { isAuthorized, userId } = useAuth();

  const [toggleLike, { isLoading: isToggling }] =
    useToggleCommentLikeMutation();

  const [deleteComment, { isLoading: isDeleting }] = useDeleteCommentMutation();

  const handleLike = async () => {
    await toggleLike({ commentId: comment.id, postId, userId });
  };

  const handleDelete = async () => {
    await deleteComment({ commentId: comment.id, postId });
  };

  const disabled = isToggling || isDeleting || !isAuthorized;

  return (
    <div className="flex gap-5">
      <Link to={`/users/${comment.user.id}`} className="shrink-0">
        <img
          src={comment.user.photo}
          alt="user"
          className="rounded-full w-14 h-14"
        />
      </Link>
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-3">
          <Link to={`/users/${comment.user.id}`}>
            <p className="text-base font-medium">{comment.user.username}</p>
          </Link>
          <DateText date={comment.createdAt} />
        </div>
        <p className="text-base">{comment.text}</p>
        <div className="mt-2 flex items-center gap-6">
          <button
            className="flex items-center gap-2 cursor-pointer"
            disabled={disabled}
            onClick={handleLike}
          >
            {comment.likedBy.includes(userId) ? (
              <HandThumbUpFilledIcon className="w-6 h-6" />
            ) : (
              <HandThumbUpIcon className="w-6 h-6" />
            )}
            <p className="text-sm font-medium">{comment.likedBy.length}</p>
          </button>
          {isAuthorized && userId === comment.user.id && (
            <button
              className="flex items-center gap-2 cursor-pointer"
              disabled={disabled}
              onClick={handleDelete}
            >
              <TrashIcon className="w-6 h-6" />
              <p className="text-sm font-medium">Delete comment</p>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Comment;
