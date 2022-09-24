import { apiSlice } from "../../app/api/apiSlice";

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUser: builder.query({
      query: (id) => `users/${id}`,
      transformResponse: (responseData) => {
        return responseData.data;
      },
    }),

    getUserData: builder.query({
      query: ({ id, data }) => `users/info?id=${id}&data=${data}`,
      transformResponse: (responseData) => {
        return responseData.data;
      },
    }),
  }),
});

export const { useGetUserQuery, useGetUserDataQuery } = userApiSlice;
