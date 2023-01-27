import { current } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";

export const commentApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addComment: builder.mutation({
      query: ({ postId, data }) => ({
        url: `comments/${postId}`,
        method: "POST",
        body: {
          ...data,
        },
      }),
      invalidatesTags: (result, error, { postId }) => [
        { type: "Post", id: postId },
      ],
    }),
    updateComment: builder.mutation({
      query: ({ commentId, data }) => ({
        url: `comments/${commentId}`,
        method: "PATCH",
        body: {
          ...data,
        },
      }),
    }),
    deleteComment: builder.mutation({
      query: ({ commentId }) => ({
        url: `comments/${commentId}`,
        method: "DELETE",
      }),
      async onQueryStarted(
        { postId, commentId },
        { dispatch, queryFulfilled }
      ) {
        const result = dispatch(
          apiSlice.util.updateQueryData("getPost", postId, (draft) => {
            let post = current(draft);

            console.log(commentId);

            let comments = [...post.comments];

            comments = comments.filter((comment) => comment.id !== commentId);

            return {
              ...post,
              comments,
            };
          })
        );

        try {
          await queryFulfilled;
        } catch {
          result.undo();
        }
      },
      invalidatesTags: (result, error, { postId }) => [
        { type: "Post", id: postId },
      ],
    }),
    toggleCommentLike: builder.mutation({
      query: ({ commentId, postId, userId }) => ({
        url: `comments/toggleLike/${commentId}`,
        method: "PATCH",
      }),
      async onQueryStarted(
        { postId, commentId, userId },
        { dispatch, queryFulfilled }
      ) {
        const result = dispatch(
          apiSlice.util.updateQueryData("getPost", postId, (draft) => {
            let post = current(draft);

            let comments = [...post.comments];

            const index = comments.findIndex(
              (comment) => comment.id === commentId
            );

            let likedBy = [...comments[index].likedBy];

            if (likedBy.includes(userId)) {
              likedBy = likedBy.filter((user) => user !== userId);
            } else {
              likedBy = [...likedBy, userId];
            }

            comments.splice(index, 1, {
              ...comments[index],
              likedBy,
            });

            return {
              ...post,
              comments,
            };
          })
        );

        try {
          await queryFulfilled;
        } catch {
          result.undo();
        }
      },
      invalidatesTags: (result, error, { postId }) => [
        { type: "Post", id: postId },
      ],
    }),
  }),
});

export const {
  useAddCommentMutation,
  useDeleteCommentMutation,
  useToggleCommentLikeMutation,
} = commentApiSlice;
