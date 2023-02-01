import React from "react";
import { useMemo } from "react";
import CreateComment from "../../features/comment/CreateComment";
import useAuth from "../../hooks/useAuth";
import Comment from "./Comment";

const CommentsList = ({ comments }) => {
  const { isAuthorized, userId } = useAuth();

  const fillteredComments = useMemo(() => {
    if (!isAuthorized) return comments;

    const arr = [...comments];
    return arr.sort((prev, next) => {
      if (next.user.id === userId && prev.user.id !== userId) {
        return 1;
      }
      if (prev.user.id === userId && next.user.id !== userId) {
        return -1;
      }
      return 0;
    });
  }, [comments, isAuthorized, userId]);

  return (
    <div className="flex flex-col gap-8">
      <h2 className="font-semibold text-2xl">Comments</h2>
      {isAuthorized && <CreateComment />}
      {!comments || !comments?.length ? (
        <p>No comments yet</p>
      ) : (
        <div className="flex flex-col gap-6">
          {fillteredComments.map((comment) => (
            <Comment comment={comment} key={comment.id} />
          ))}
        </div>
      )}
    </div>
  );
};

export default CommentsList;
