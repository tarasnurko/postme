import { apiSlice } from "../../app/api/apiSlice";

export const searchApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    search: builder.query({
      query: (params) => ({
        url: `search`,
        params,
      }),
      transformResponse: (responseData) => {
        return responseData.data;
      },
    }),
  }),
});

export const { useLazySearchQuery } = searchApiSlice;
