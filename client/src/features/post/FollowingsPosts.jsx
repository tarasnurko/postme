import React from "react";
import PageLayout from "../../components/PageLayout";
import PostList from "../../components/post/PostList";
import Spinner from "../../components/Spinner";
import { useGetFollosingsPostsQuery } from "./postsApiSlice";

const FollowingsPosts = () => {
  const { data: posts, isLoading } = useGetFollosingsPostsQuery({ limit: 20 });

  return (
    <PageLayout>
      <div className="flex flex-col gap-12">
        <h2 className="font-semibold text-3xl">Latest Posts</h2>
        {isLoading ? <Spinner /> : <PostList posts={posts} />}
      </div>
    </PageLayout>
  );
};

export default FollowingsPosts;
