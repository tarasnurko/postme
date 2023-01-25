import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:4000/api/v1",
  credentials: "include",
});

export const apiSlice = createApi({
  baseQuery,
  tagTypes: ["Post", "User"],
  endpoints: (builder) => ({}),
});
