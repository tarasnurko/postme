import React, { useState } from "react";
import PageLayout from "../../components/PageLayout";
import Pagination from "../../components/Pagination";
import PostList from "../../components/post/PostList";
import Spinner from "../../components/Spinner";
import { scrollToTop } from "../../utils/scrollToTop";
import { useGetFollowingsPostsQuery } from "./postsApiSlice";

const FollowingsPosts = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { data, isLoading, isError } = useGetFollowingsPostsQuery({
    limit: 5,
    page: currentPage,
  });

  const handleNext = () => {
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

  const render = () => {
    if (isLoading) {
      return <Spinner />;
    } else if (!data?.posts || data?.posts?.length === 0) {
      return <p>No Followings Posts</p>;
    } else if (isError) {
      return <p>Some error occured</p>;
    }

    return (
      <div>
        <PostList posts={data?.posts} />
        <Pagination
          current={currentPage}
          totalPageCount={data.totalPages}
          handleNext={handleNext}
          handlePrev={handlePrev}
          handlePage={handlePage}
        />
      </div>
    );
  };

  return (
    <PageLayout>
      <div className="flex flex-col gap-12">
        <h2 className="font-semibold text-3xl">Followings Posts</h2>
        {render()}
      </div>
    </PageLayout>
  );
};

export default FollowingsPosts;
