import React from "react";
import Sidebar from "../components/Sidebar";
import PopularPostsList from "../features/post/PopularPostsList";
import LatestPostsList from "../features/post/LatestPostsList";
import FollowingsPostsList from "../features/post/FollowingsPostsList";
import { ArrowRightCircleIcon } from "@heroicons/react/24/outline";

const MainPage = () => {
  return (
    <>
      <section className="container mx-auto px-20">
        <div className="w-[800px] flex flex-col mt-10 gap-14">
          <LatestPostsList />
          {/* <PopularPostsList /> */}
        </div>
      </section>
      <Sidebar />
    </>
  );
};

export default MainPage;
