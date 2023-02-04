import React, { useState } from "react";
import { apiSlice } from "../../app/api/apiSlice";
import PageLayout from "../../components/PageLayout";
import Pagination from "../../components/Pagination";
import PostList from "../../components/post/PostList";
import Spinner from "../../components/Spinner";
import UserList from "../../components/user/UserList";
import { scrollToTop } from "../../utils/scrollToTop";
import { useLazySearchQuery } from "./searchApiSlice";

const Search = () => {
  const [text, setText] = useState("");
  const [type, setType] = useState("post");
  const [order, setOrder] = useState("likes");

  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const [trigger, { data, isLoading }] = useLazySearchQuery();

  const handleText = (e) => {
    setText(e.target.value);
  };

  const handleType = (e) => {
    const type = e.target.value;
    setType(type);
    if (type === "post") {
      setOrder("likes");
    } else {
      setOrder("followers");
    }
  };

  const handleOrder = (e) => {
    setOrder(e.target.value);
  };

  const handleLimit = (e) => {
    setLimit(e.target.value);
  };

  const handleSearch = () => {
    if (!text.trim()) return;
    trigger({
      type,
      search: text,
      sort: order,
      page: currentPage,
      limit: limit,
    });
  };

  const renderPosts = () => {
    if (!data?.data?.length) return <p>No posts found</p>;
    return <PostList posts={data.data} />;
  };

  const renderUsers = () => {
    if (!data.data?.length) return <p>No users found</p>;
    return <UserList users={data.data} />;
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
    <PageLayout gap={8}>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row gap-4 justify-between bg-slate-500 py-4 px-4 rounded-lg">
          <input
            className="text-base w-full sm:w-96 py-1 px-3 rounded"
            name="text"
            type="text"
            value={text}
            placeholder="Search"
            onChange={(e) => handleText(e)}
          />
          <button
            className="text-base py-1 px-3 bg-slate-100  rounded"
            onClick={handleSearch}
            disabled={isLoading}
          >
            Search
          </button>
        </div>
        <div className="flex flex-row flex-wrap gap-4 sm:gap-10 bg-slate-500 py-4 px-4 rounded-lg">
          <div className="flex gap-2">
            <p className="text-neutral-50">Type:</p>
            <select name="type" value={type} onChange={(e) => handleType(e)}>
              <option value="post">Post</option>
              <option value="user">User</option>
            </select>
          </div>
          <div className="flex gap-2">
            <p className="text-neutral-50">Order by:</p>
            {type === "post" ? (
              <select
                name="order"
                value={order}
                onChange={(e) => handleOrder(e)}
              >
                <option value="likes">Likes</option>
                <option value="comments">Comments</option>
                <option value="createdAt">Date</option>
              </select>
            ) : (
              <select
                name="order"
                value={order}
                onChange={(e) => handleOrder(e)}
              >
                <option value="followers">Followers</option>
                <option value="posts">Posts</option>
                <option value="createdAt">Date</option>
              </select>
            )}
          </div>
          <div className="flex gap-2">
            <p className="text-neutral-50">Limit:</p>
            <select name="type" value={limit} onChange={(e) => handleLimit(e)}>
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
              <option value="25">25</option>
            </select>
          </div>
        </div>
      </div>
      {isLoading && <Spinner />}
      {data && !isLoading && (
        <>
          {type === "post" ? renderPosts() : renderUsers()}
          <Pagination
            current={currentPage}
            totalPageCount={data.totalPages}
            handleNext={handleNext}
            handlePrev={handlePrev}
            handlePage={handlePage}
          />
        </>
      )}
    </PageLayout>
  );
};

export default Search;
