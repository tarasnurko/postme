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
      transformResponse: (responseData) => {
        const posts = responseData.data.map((post) => {
          post.id = post._id;
          return post;
        });
        return posts;
      },
    }),
    getMostLikedPosts: builder.query({
      query: (limit) => `posts/mostLiked?limit=${limit}`,
      transformResponse: (responseData) => {
        const posts = responseData.data.map((post) => {
          post.id = post._id;
          return post;
        });
        return posts;
      },
    }),
    getPost: builder.query({
      query: (id) => `posts/${id}`,
      transformResponse: (responseData) => {
        const post = responseData.data;
        post.id = post._id;

        console.log(post);
        return post;
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
