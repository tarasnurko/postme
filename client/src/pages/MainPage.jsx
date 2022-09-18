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
        <div className="w-[800px] ">
          <div className="flex flex-col mt-10 gap-14">
            <LatestPostsList />
            <PopularPostsList />
            {/* <FollowingsPostsList /> */}
          </div>
        </div>
      </section>
      <Sidebar>
        <ArrowRightCircleIcon className="absolute top-4 left-4 w-8 h-8" />
        <div className="w-full h-full flex flex-col items-center mt-16 px-10 gap-5">
          <p className="font-medium text-xl">My Posts</p>
          <div className="flex flex-col items-center gap-3">
            <p className="font-medium text-xl">Popular Topics</p>
            <div className="flex flex-wrap gap-2">
              <div className="px-5 py-1 bg-white rounded-xl font-semibold text-base">
                Lorem
              </div>
              <div className="px-5 py-1 bg-white rounded-xl font-semibold text-base">
                Lorem fd
              </div>
              <div className="px-5 py-1 bg-white rounded-xl font-semibold text-base">
                Loremfdfd
              </div>
              <div className="px-5 py-1 bg-white rounded-xl font-semibold text-base">
                Lorem fdfd
              </div>
              <div className="px-5 py-1 bg-white rounded-xl font-semibold text-base">
                Lor
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center gap-4">
            <p className="font-medium text-xl">Followings</p>
            <div className="flex flex-col items-center gap-3">
              <div className="flex items-center justify-center gap-3">
                <div className="w-12 h-12 bg-gray-700 rounded-full"></div>
                <div className="flex flex-col justify-center">
                  <p className="font-medium text-base">Username</p>
                  <p className="font-sm text-gray-600">200 followers</p>
                </div>
              </div>
              <div className="flex items-center justify-center gap-3">
                <div className="w-12 h-12 bg-gray-700 rounded-full"></div>
                <div className="flex flex-col justify-center">
                  <p className="font-medium text-base">Username</p>
                  <p className="font-sm text-gray-600">200 followers</p>
                </div>
              </div>
              <div className="flex items-center justify-center gap-3">
                <div className="w-12 h-12 bg-gray-700 rounded-full"></div>
                <div className="flex flex-col justify-center">
                  <p className="font-medium text-base">Username</p>
                  <p className="font-sm text-gray-600">200 followers</p>
                </div>
              </div>
            </div>
            <p className="font-medium text-base underline">More followings</p>
          </div>
        </div>
      </Sidebar>
    </>
  );
};

export default MainPage;
