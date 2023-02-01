import { current } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUser: builder.query({
      query: (id) => `users/${id}`,
      providesTags: (result, error, id) => [{ type: "User", id }],
      transformResponse: (responseData) => {
        return responseData.data;
      },
    }),

    getUserData: builder.query({
      query: ({ id, data }) => `users/info?id=${id}&data=${data}`,
      providesTags: (result, error, { id }) => [{ type: "User", id }],
      transformResponse: (responseData) => {
        return responseData.data;
      },
    }),
    getMe: builder.query({
      query: () => `users/me`,
      transformResponse: (responseData) => {
        return responseData.data;
      },
    }),
    updateMe: builder.mutation({
      query: ({ id, data }) => ({
        url: `users/updateMe`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "User", id }],
    }),
    toggleFollow: builder.mutation({
      query: ({ userId, followerId }) => ({
        url: `users/toggleFollowing/${userId}`,
        method: "PATCH",
      }),
      async onQueryStarted(
        { userId, followerId },
        { dispatch, queryFulfilled }
      ) {
        const result = dispatch(
          userApiSlice.util.updateQueryData("getUser", userId, (draft) => {
            const user = current(draft);
            let followers = [...user.followers];

            console.log(user);

            if (user.followers.includes(followerId)) {
              followers = followers.filter(
                (follower) => follower !== followerId
              );
            } else {
              followers.push(followerId);
            }

            return {
              ...user,
              followers,
            };
          })
        );

        try {
          await queryFulfilled;
        } catch {
          result.undo();
        }
      },
      invalidatesTags: (result, error, { userId, followerId }) => [
        { type: "User", id: userId },
        { type: "User", id: followerId },
      ],
    }),
  }),
});

export const {
  useGetUserQuery,
  useGetUserDataQuery,
  useGetMeQuery,
  useUpdateMeMutation,
  useToggleFollowMutation,
} = userApiSlice;
