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
        </div>
      </section>
      <Sidebar />
    </>
  );
};

export default Post;

{
  /* <h2 className="font-semibold text-2xl">
                Subtitle subtitle subtitle
              </h2>
              <p className="text-lg">
                Contrary to popular belief, Lorem Ipsum is not simply random
                text. It has roots in a piece of classical Latin literature from
                45 BC, making it over 2000 years old. Richard McClintock, a
                Latin professor at Hampden-Sydney College in Virginia, looked up
                one of the more obscure Latin words, consectetur, from a Lorem
                Ipsum passage, and going through the cites of the word in
                classical literature, discovered the undoubtable source.
              </p>
              <p className="text-lg">
                Contrary to popular belief, Lorem Ipsum is not simply random
                text. It has roots in a piece of classical Latin literature from
                45 BC, making it over 2000 years old. Richard McClintock, a
                Latin professor at Hampden-Sydney College in Virginia, looked up
                one of the more obscure Latin words, consectetur, from a Lorem
                Ipsum passage, and going through the cites of the word in
                classical literature, discovered the undoubtable source.
              </p>
              <div className="my-5 flex flex-col items-center gap-2">
                <img
                  className="max-w-full max-h-[300px] object-cover"
                  src="https://images.pexels.com/photos/76971/fighter-jet-fighter-aircraft-f-16-falcon-aircraft-76971.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                  alt="There are many variations"
                />
                <p className="text-xs text-gray-500">
                  There are many variations
                </p>
              </div>
              <h2 className="font-semibold text-2xl">
                Many desktop publishing packages and web page
              </h2>
              <p className="text-lg">
                Contrary to popular belief, Lorem Ipsum is not simply random
                text. It has roots in a piece of classical Latin literature from
                45 BC, making it over 2000 years old. Richard McClintock, a
                Latin professor at Hampden-Sydney College in Virginia, looked up
                one of the more obscure Latin words, consectetur, from a Lorem
                Ipsum passage, and going through the cites of the word in
                classical literature, discovered the undoubtable source.
              </p>
              <p className="text-lg">
                <b>Contrary</b> to popular belief, Lorem Ipsum is not simply
                random text. It has roots in a piece of classical Latin
                literature from 45 BC, making it over 2000 years old. Richard
                McClintock, a Latin professor at Hampden-Sydney College in
                Virginia, looked up one of the more obscure Latin words,
                consectetur, from a Lorem Ipsum passage, and going through the
                cites of the word in classical literature, discovered the
                undoubtable source.
              </p> */
}

{
  /* <div className="flex flex-col gap-5">

                <h2 className="font-semibold text-2xl">
                  Subtitle subtitle subtitle
                </h2>
                <p className="text-lg">
                  Contrary to popular belief, Lorem Ipsum is not simply random
                  text. It has roots in a piece of classical Latin literature
                  from 45 BC, making it over 2000 years old. Richard McClintock,
                  a Latin professor at Hampden-Sydney College in Virginia,
                  looked up one of the more obscure Latin words, consectetur,
                  from a Lorem Ipsum passage, and going through the cites of the
                  word in classical literature, discovered the undoubtable
                  source.
                </p>
                <p className="text-lg">
                  Contrary to popular belief, Lorem Ipsum is not simply random
                  text. It has roots in a piece of classical Latin literature
                  from 45 BC, making it over 2000 years old. Richard McClintock,
                  a Latin professor at Hampden-Sydney College in Virginia,
                  looked up one of the more obscure Latin words, consectetur,
                  from a Lorem Ipsum passage, and going through the cites of the
                  word in classical literature, discovered the undoubtable
                  source.
                </p>
                <div className="my-5 flex flex-col items-center gap-2">
                  <img
                    className="max-w-full max-h-[300px] object-cover"
                    src="https://images.pexels.com/photos/76971/fighter-jet-fighter-aircraft-f-16-falcon-aircraft-76971.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                    alt="There are many variations"
                  />
                  <p className="text-xs text-gray-500">
                    There are many variations
                  </p>
                </div>
                <h2 className="font-semibold text-2xl">
                  Many desktop publishing packages and web page
                </h2>
                <p className="text-lg">
                  Contrary to popular belief, Lorem Ipsum is not simply random
                  text. It has roots in a piece of classical Latin literature
                  from 45 BC, making it over 2000 years old. Richard McClintock,
                  a Latin professor at Hampden-Sydney College in Virginia,
                  looked up one of the more obscure Latin words, consectetur,
                  from a Lorem Ipsum passage, and going through the cites of the
                  word in classical literature, discovered the undoubtable
                  source.
                </p>
                <p className="text-lg">
                  <b>Contrary</b> to popular belief, Lorem Ipsum is not simply
                  random text. It has roots in a piece of classical Latin
                  literature from 45 BC, making it over 2000 years old. Richard
                  McClintock, a Latin professor at Hampden-Sydney College in
                  Virginia, looked up one of the more obscure Latin words,
                  consectetur, from a Lorem Ipsum passage, and going through the
                  cites of the word in classical literature, discovered the
                  undoubtable source.
                </p>
              </div> */
}
