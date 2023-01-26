import { HandThumbUpIcon, TrashIcon } from "@heroicons/react/24/outline";
import React from "react";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { formatDate } from "../../utils/formatDate";

const Comment = ({ comment }) => {
  const { isAuthorized, userId } = useAuth();

  return (
    <div className="flex gap-5">
      <Link to={`/users/${comment.user.id}`}>
        <img
          className="shrink-0 w-14 h-14 bg-gray-700 rounded-full"
          src={comment.user.photo}
          alt="user"
        />
      </Link>
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-3">
          <Link to={`/users/${comment.user.id}`}>
            <p className="text-base font-medium">{comment.user.username}</p>
          </Link>
          <p className="text-xs text-zinc-400">
            {formatDate(comment.createdAt)}
          </p>
        </div>
        <p className="text-base">{comment.text}</p>
        <div className="mt-2 flex items-center gap-6">
          <button className="flex items-center gap-2 cursor-pointer">
            <HandThumbUpIcon className="w-6 h-6" />
            <p className="text-sm font-medium">{comment.likedBy.length}</p>
          </button>
          {isAuthorized && userId === comment.user.id && (
            <button className="flex items-center gap-2 cursor-pointer">
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
