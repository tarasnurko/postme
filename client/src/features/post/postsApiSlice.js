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
      transformResponse: (responseData) => {
        return responseData.data;
      },
    }),
    getLatestPosts: builder.query({
      query: (limit) => `posts/latest?limit=${limit}`,
      transformResponse: (responseData) => {
        return responseData.data;
      },
    }),
    getMostLikedPosts: builder.query({
      query: (limit) => `posts/mostLiked?limit=${limit}`,
      transformResponse: (responseData) => {
        return responseData.data;
      },
    }),
    getPost: builder.query({
      query: (id) => `posts/${id}`,
      transformResponse: (responseData) => {
        return responseData.data;
      },
    }),
  }),
});

export const {
  useGetAllPostsQuery,
  useGetLatestPostsQuery,
  useGetMostLikedPostsQuery,
  useGetPostQuery,
} = postsApiSlice;
