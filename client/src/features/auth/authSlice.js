import { createSlice } from "@reduxjs/toolkit";
import Cookie from "js-cookie";

const authSlice = createSlice({
  name: "auth",
  initialState: { token: Cookie.get("jwt") || null },
  reducers: {
    setCredentials: (state, action) => {
      const { accessToken } = action.payload;
      state.token = accessToken;
    },
    logOut: (state, action) => {
      state.token = null;
    },
  },
});

export const { setCredentials, logOut } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentToken = (state) => state.auth.token;
