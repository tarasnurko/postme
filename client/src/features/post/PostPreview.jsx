import React from "react";

const PostPreview = (props) => {
  return (
    <div className="flex justify-between gap-5 pb-8 border-b border-gray-400">
      <div className="flex flex-col gap-3">
        <div className="flex items-center">
          <div className="w-10 h-10 bg-gray-700 rounded-full"></div>
          <p className="ml-3 text-base">{props.user}</p>
          <p className="ml-5 text-xs text-zinc-400">2 month ago</p>
          <p className="ml-3 font-medium text-base text-zinc-400">EN</p>
          <div className="ml-5 px-4 py-1 bg-gray-300 rounded-xl font-medium text-sm">
            Lorem
          </div>
        </div>
        <h3 className="font-bold text-xl">{props.title}</h3>
        <p className="text-base">{props.description}</p>
      </div>
      <img
        className="w-[220px] max-h-48 object-cover"
        src="https://images.pexels.com/photos/9399760/pexels-photo-9399760.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load"
        alt="img"
      />
    </div>
  );
};

export default PostPreview;
