import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import React from "react";
import { DOTS, usePagination } from "../hooks/usePagination";

const Pagination = ({
  handleNext,
  handlePrev,
  handlePage,
  current,
  totalPageCount,
}) => {
  const paginationRange = usePagination({
    totalPageCount,
    currentPage: current,
  });

  const activePageStyles =
    "relative z-10 inline-flex items-center border border-indigo-500 bg-indigo-50 px-4 py-2 text-sm font-medium text-indigo-600 focus:z-20";

  const defaultPageStyles =
    "relative inline-flex items-center border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20";

  return (
    <div className="flex items-center justify-center mt-4 bg-white">
      <nav
        className="isolate inline-flex -space-x-px rounded-md shadow-sm"
        aria-label="Pagination"
      >
        <button
          className="relative inline-flex items-center rounded-l-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20"
          disabled={current === 1}
          onClick={handlePrev}
        >
          <span className="sr-only">Previous</span>
          <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
        </button>
        {paginationRange.map((item, index) =>
          item === DOTS ? (
            <div>...</div>
          ) : (
            <button
              key={index}
              aria-current="page"
              className={
                current === item ? activePageStyles : defaultPageStyles
              }
              onClick={() => handlePage(index + 1)}
            >
              {item}
            </button>
          )
        )}

        <button
          className="relative inline-flex items-center rounded-r-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20"
          disabled={current === totalPageCount}
          onClick={handleNext}
        >
          <span className="sr-only">Next</span>
          <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
        </button>
      </nav>
    </div>
  );
};

export default Pagination;
