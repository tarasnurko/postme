import React from "react";
import PopularPostsList from "../features/post/PopularPostsList";
import LatestPostsList from "../features/post/LatestPostsList";
import FollowingsPostsList from "../features/post/FollowingsPostsList";

import PageLayout from "../components/PageLayout";

const MainPage = () => {
  return (
    <PageLayout>
      <LatestPostsList />
    </PageLayout>
  );
};

export default MainPage;
