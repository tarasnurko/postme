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
    }),
    toggleCommentLike: builder.mutation({
      query: ({ commentId }) => ({
        url: `comments/toggleLike/${commentId}`,
        method: "PATCH",
      }),
    }),
  }),
});

export const { useAddCommentMutation } = commentApiSlice;
