import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";
import { current } from "@reduxjs/toolkit";

export const postsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllPosts: builder.query({
      query: (args) => {
        const { limit, page, search, sort } = args;
        return {
          url: "posts",
          params: { limit, page, search, sort },
        };
      },
      providesTags: [{ type: "Post", id: "LIST" }],
      transformResponse: (responseData) => {
        return responseData.data;
      },
    }),
    getLatestPosts: builder.query({
      query: ({ page = 1, limit = 10 }) =>
        `posts/latest?page=${page}&limit=${limit}`,
      providesTags: [{ type: "Post", id: "LIST" }],
      transformResponse: (responseData) => {
        return responseData.data;
      },
    }),
    getMostLikedPosts: builder.query({
      query: ({ page = 1, limit = 10 }) =>
        `posts/mostLiked?page=${page}&limit=${limit}`,
      providesTags: [{ type: "Post", id: "LIST" }],
      transformResponse: (responseData) => {
        return responseData.data;
      },
    }),
    getFollowingsPosts: builder.query({
      query: (args) => ({
        url: "posts/followings",
        params: args,
      }),
      providesTags: [{ type: "Post", id: "LIST" }],
      transformResponse: (responseData) => {
        return responseData.data;
      },
    }),
    getPost: builder.query({
      query: (id) => `posts/${id}`,
      providesTags: (result, error, id) => [{ type: "Post", id }],
      transformResponse: (responseData) => {
        return responseData.data;
      },
    }),
    createPost: builder.mutation({
      query: (data) => ({
        url: "posts",
        method: "POST",
        body: {
          ...data,
        },
      }),
      invalidatesTags: [{ type: "Post", id: "LIST" }],
    }),
    updatePost: builder.mutation({
      query: ({ id, data }) => ({
        url: `posts/${id}`,
        method: "PATCH",
        body: {
          ...data,
        },
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Post", id }],
    }),
    togglePostLike: builder.mutation({
      query: ({ postId }) => ({
        url: `posts/toggleLike/${postId}`,
        method: "PATCH",
      }),
      async onQueryStarted({ postId, userId }, { dispatch, queryFulfilled }) {
        const result = dispatch(
          postsApiSlice.util.updateQueryData("getPost", postId, (draft) => {
            let post = current(draft);
            let likedBy = [];

            if (post.likedBy.includes(userId)) {
              likedBy = post.likedBy.filter((item) => item !== userId);
            } else {
              likedBy = [...post.likedBy, userId];
            }
            return {
              ...post,
              likedBy,
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
  useGetAllPostsQuery,
  useGetLatestPostsQuery,
  useGetMostLikedPostsQuery,
  useGetFollowingsPostsQuery,
  useGetPostQuery,
  useCreatePostMutation,
  useUpdatePostMutation,
  useTogglePostLikeMutation,
} = postsApiSlice;
