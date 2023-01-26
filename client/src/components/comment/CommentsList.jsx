import React from "react";
import Comment from "./Comment";

const CommentsList = ({ comments }) => {
  return (
    <div className="flex flex-col gap-8">
      <h2 className="font-semibold text-2xl">Comments</h2>
      {!comments || !comments?.length ? (
        <p>No comments yet</p>
      ) : (
        <div className="flex flex-col gap-10">
          {comments.map((comment) => (
            <Comment comment={comment} key={comment.id} />
          ))}
        </div>
      )}
    </div>
  );
};

export default CommentsList;
