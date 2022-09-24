import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Login from "./features/auth/Login";
import Register from "./features/auth/Register";
import Post from "./features/post/Post";
import User from "./features/user/User";
import UserFollowers from "./features/user/UserFollowers";
import UserFollowings from "./features/user/UserFollowings";
import UserLikedPosts from "./features/user/UserLikedPosts";
import UserPosts from "./features/user/UserPosts";
import MainPage from "./pages/MainPage";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<MainPage />} />
        <Route path="posts/:id" element={<Post />} />
        <Route path="users/:id" element={<User />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="users/:id" element={<User />}>
          <Route index element={<UserPosts />} />
          <Route path="likedPosts" element={<UserLikedPosts />} />
          <Route path="followings" element={<UserFollowings />} />
          <Route path="followers" element={<UserFollowers />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default App;
