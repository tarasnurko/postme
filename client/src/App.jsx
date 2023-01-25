import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Login from "./features/auth/Login";
import Signup from "./features/auth/Signup";
import RequireAuth from "./features/auth/RequireAuth";
import Post from "./features/post/Post";
import PostCreate from "./features/post/PostCreate";
import PostEdit from "./features/post/PostEdit";
import User from "./features/user/User";
import UserFollowers from "./features/user/UserFollowers";
import UserFollowings from "./features/user/UserFollowings";
import UserLikedPosts from "./features/user/UserLikedPosts";
import UserPosts from "./features/user/UserPosts";
import MainPage from "./pages/MainPage";
import LatestPosts from "./features/post/LatestPosts";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<MainPage />} />

        <Route path="posts">
          <Route path="latest" element={<LatestPosts />} />
          <Route path=":id" element={<Post />} />
          <Route path="*" element={<RequireAuth />}>
            <Route path="create" element={<PostCreate />} />
            <Route path=":id/edit" element={<PostEdit />} />
          </Route>
        </Route>

        <Route path="login" element={<Login />} />
        <Route path="register" element={<Signup />} />

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
