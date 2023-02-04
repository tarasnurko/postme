import React from "react";
import PopularPostsList from "../features/post/PopularPostsList";
import LatestPostsList from "../features/post/LatestPostsList";
import FollowingsPostsList from "../features/post/FollowingsPostsList";
import useAuth from "../hooks/useAuth";

import PageLayout from "../components/PageLayout";

const MainPage = () => {
  const { isAuthorized } = useAuth();

  return (
    <PageLayout>
      <LatestPostsList />
      <PopularPostsList />
      {isAuthorized && <FollowingsPostsList />}
    </PageLayout>
  );
};

export default MainPage;
