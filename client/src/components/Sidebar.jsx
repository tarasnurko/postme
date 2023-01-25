import { ArrowRightCircleIcon } from "@heroicons/react/24/outline";
import React from "react";

const Sidebar = (props) => {
  return (
    <aside className="fixed top-[60px] right-0 w-[360px] h-screen bg-emerald-200">
      <ArrowRightCircleIcon className="absolute top-4 left-4 w-8 h-8" />
      <div className="w-full h-full flex flex-col items-center mt-16 px-10 gap-5">
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
          <p className="font-medium text-xl">Popular Users</p>
          <div className="flex flex-col items-center gap-3">
            <div className="flex items-center justify-center gap-3">
              <div className="shrink-0 w-12 h-12 bg-gray-700 rounded-full"></div>
              <div className="flex flex-col justify-center">
                <p className="font-medium text-base">Username</p>
                <p className="font-sm text-gray-600">200 followers</p>
              </div>
            </div>
            <div className="flex items-center justify-center gap-3">
              <div className="shrink-0 w-12 h-12 bg-gray-700 rounded-full"></div>
              <div className="flex flex-col justify-center">
                <p className="font-medium text-base">Username</p>
                <p className="font-sm text-gray-600">200 followers</p>
              </div>
            </div>
            <div className="flex items-center justify-center gap-3">
              <div className="shrink-0 w-12 h-12 bg-gray-700 rounded-full"></div>
              <div className="flex flex-col justify-center">
                <p className="font-medium text-base">Username</p>
                <p className="font-sm text-gray-600">200 followers</p>
              </div>
            </div>
          </div>
          <p className="font-medium text-base underline">More users</p>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
