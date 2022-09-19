import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";

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
    }),
    getLatestPosts: builder.query({
      query: (limit) => `posts/latest?limit=${limit}`,
    }),
    getMostLikedPosts: builder.query({
      query: (limit) => `posts/mostLiked?limit=${limit}`,
    }),
  }),
});

export const {
  useGetAllPostsQuery,
  useGetLatestPostsQuery,
  useGetMostLikedPostsQuery,
} = postsApiSlice;
