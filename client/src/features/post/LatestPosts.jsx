import React from "react";
import { useState } from "react";
import PageLayout from "../../components/PageLayout";
import Pagination from "../../components/Pagination";
import PostList from "../../components/post/PostList";
import Spinner from "../../components/Spinner";
import { useGetLatestPostsQuery } from "./postsApiSlice";

const LatestPosts = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { data, isLoading } = useGetLatestPostsQuery({
    page: currentPage,
    limit: 5,
  });

  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };

  const handleNext = () => {
    console.log("dfd");
    if (currentPage < data.totalPages) {
      setCurrentPage((prev) => prev + 1);
      scrollToTop();
    }
  };
  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
      scrollToTop();
    }
  };
  const handlePage = (num) => {
    if (num !== currentPage) {
      setCurrentPage(num);
      scrollToTop();
    }
  };

  return (
    <PageLayout>
      <div className="flex flex-col gap-12">
        <h2 className="font-semibold text-3xl">Latest Posts</h2>
        {isLoading ? (
          <Spinner />
        ) : (
          <div>
            <PostList posts={data.posts} />
            <Pagination
              current={currentPage}
              totalPageCount={data.totalPages}
              handleNext={handleNext}
              handlePrev={handlePrev}
              handlePage={handlePage}
            />
          </div>
        )}
      </div>
    </PageLayout>
  );
};

export default LatestPosts;
