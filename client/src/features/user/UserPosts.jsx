import React from "react";
import { Link, useParams } from "react-router-dom";
import { useGetUserDataQuery } from "./userApiSlice";

const UserPosts = () => {
  const { id } = useParams();

  const { data, isLoading } = useGetUserDataQuery({ id, data: "posts" });

  return (
    <div className="mt-6 flex flex-col gap-8">
      {!isLoading &&
        data.posts.length &&
        data.posts.map((post) => (
          <div
            key={post._id}
            className="flex justify-between gap-5 pb-8 border-b border-gray-400"
          >
            <div className="flex flex-col gap-4">
              <div className="flex justify-start items-center gap-4">
                <p className="text-xs text-zinc-400">2 month ago</p>
                <p className="font-medium text-base text-zinc-400">EN</p>
                <div className="max-w-[300px] flex items-center gap-3 flex-wrap">
                  {post.tags.map((tag, index) => (
                    <Link
                      key={index}
                      to="/search?topic=tag"
                      className="px-4 py-1 bg-gray-300 rounded-xl font-medium text-sm"
                    >
                      {tag}
                    </Link>
                  ))}
                </div>
              </div>
              <Link to={`/posts/${post._id}`} className="flex flex-col">
                <h3 className="font-bold text-xl">{post.title}</h3>
                <p className="text-base">{post.description}</p>
              </Link>
            </div>

            <img
              className="shrink-0 w-40 h-40 object-cover"
              src={post.preview}
              alt="preview"
            />
          </div>
        ))}
      {!isLoading && !data.posts.length && (
        <p className="text-lg font-medium">No Posts</p>
      )}
    </div>
  );
};

export default UserPosts;
