import {
  ChatBubbleBottomCenterTextIcon,
  HandThumbUpIcon,
} from "@heroicons/react/24/outline";
import React from "react";
import { Link, useParams } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import { useGetPostQuery } from "./postsApiSlice";
import ToContent from "./ToContent";

const Post = () => {
  const { id } = useParams();
  const { data: post, isLoading } = useGetPostQuery(id);

  if (!isLoading) {
    // console.log(post);
  }

  return (
    <>
      <section className="container mx-auto px-20">
        <div className="w-[800px] flex flex-col mt-10 gap-10">
          <div className="flex justify-start items-center gap-5">
            <Link to={`/users/${444}`} className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gray-700 rounded-full"></div>
              <p className="text-base">Username</p>
            </Link>
            <div className="flex justify-start items-center gap-3">
              <p className="text-xs text-zinc-400">2 month ago</p>
              <p className="font-medium text-base text-zinc-400">EN</p>
              <Link
                to="/search?topic=lorem"
                className="px-4 py-1 bg-gray-300 rounded-xl font-medium text-sm"
              >
                Lorem
              </Link>
            </div>
          </div>
          <div className="flex flex-col gap-10">
            <h1 className="font-semibold text-3xl">Post Title</h1>
            <div className="flex justify-between items-center gap-5">
              <img
                src="https://images.pexels.com/photos/9969679/pexels-photo-9969679.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                alt="preview"
                className="max-w-[500px] max-h-[300px] object-cover"
              />

              <p className="text-base font-medium">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo
                quibusdam laudantium, neque, modi ullam deleniti ut excepturi
                sapiente, iste
              </p>
            </div>
            {!isLoading && <ToContent content={post.content} />}
          </div>
          <div className="flex justify-start gap-8">
            <div className="flex items-center gap-2 cursor-pointer">
              <HandThumbUpIcon className="w-6 h-6" />
              <p className="text-sm font-medium">200</p>
            </div>
            <div className="flex items-center gap-2 cursor-pointer">
              <ChatBubbleBottomCenterTextIcon className="w-6 h-6" />
              <p className="text-sm font-medium">200</p>
            </div>
          </div>
          <div className="flex flex-col gap-10">
            <h2 className="font-semibold text-2xl">Comments</h2>
            <div className="flex flex-col gap-10">
              <div className="flex gap-5">
                <div className="shrink-0 w-20 h-20 bg-gray-700 rounded-full"></div>
                <div className="flex flex-col gap-2">
                  <p className="text-xl font-medium">Username</p>
                  <p className="text-base">
                    There are many variations of passages of Lorem Ipsum
                    available, but the majority have suffered alteration in some
                    form, by injected humour, or randomised words which There
                    are many variations of passages of Lorem Ipsum available,
                  </p>
                  <div className="mt-2 flex items-center gap-5">
                    <div className="flex items-center gap-2 cursor-pointer">
                      <HandThumbUpIcon className="w-6 h-6" />
                      <p className="text-sm font-medium">200</p>
                    </div>
                    <p className="text-xs text-zinc-400">2 Month ago</p>
                  </div>
                </div>
              </div>
              <div className="flex gap-5">
                <div className="shrink-0 w-20 h-20 bg-gray-700 rounded-full"></div>
                <div className="flex flex-col gap-2">
                  <p className="text-xl font-medium">Username</p>
                  <p className="text-base">
                    There are many variations of passages of Lorem Ipsum
                    available, but the majority have suffered alteration in some
                    form, by injected humour, or randomised words which There
                    are many variations of passages of Lorem Ipsum available,
                  </p>
                  <div className="mt-2 flex items-center gap-5">
                    <div className="flex items-center gap-2 cursor-pointer">
                      <HandThumbUpIcon className="w-6 h-6" />
                      <p className="text-sm font-medium">200</p>
                    </div>
                    <p className="text-xs text-zinc-400">2 Month ago</p>
                  </div>
                </div>
              </div>
              <div className="flex gap-5">
                <div className="shrink-0 w-20 h-20 bg-gray-700 rounded-full"></div>
                <div className="flex flex-col gap-2">
                  <p className="text-xl font-medium">Username</p>
                  <p className="text-base">
                    There are many variations of passages of Lorem Ipsum
                    available, but the majority have suffered alteration in some
                    form, by injected humour, or randomised words which There
                    are many variations of passages of Lorem Ipsum available,
                  </p>
                  <div className="mt-2 flex items-center gap-5">
                    <div className="flex items-center gap-2 cursor-pointer">
                      <HandThumbUpIcon className="w-6 h-6" />
                      <p className="text-sm font-medium">200</p>
                    </div>
                    <p className="text-xs text-zinc-400">2 Month ago</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Sidebar />
    </>
  );
};

export default Post;
