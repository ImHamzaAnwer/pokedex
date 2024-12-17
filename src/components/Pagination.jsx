/* eslint-disable react/prop-types */
const Pagination = ({ currentPage, onPageChange, totalPages }) => {
  const handlePrevPage = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const renderPageNumbers = () => {
    const pages = [];
    let startPage;
    let endPage;

    if (totalPages <= 5) {
      startPage = 1;
      endPage = totalPages;
    } else if (currentPage <= 3) {
      startPage = 1;
      endPage = 5;
    } else if (currentPage + 2 >= totalPages) {
      startPage = totalPages - 4;
      endPage = totalPages;
    } else {
      startPage = currentPage - 2;
      endPage = currentPage + 2;
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <li key={i}>
          <span
            className={`cursor-pointer flex items-center justify-center px-3 h-8 leading-tight rounded-md mx-1 ${
              currentPage === i
                ? "text-blue-600 bg-blue-50 border border-blue-300 hover:bg-blue-100 hover:text-blue-700"
                : "text-gray-500 bg-slate-200 border border-gray-300 hover:text-gray-700 hover:font-semibold"
            }`}
            onClick={() => onPageChange(i)}
          >
            {i}
          </span>
        </li>
      );
    }
    return pages;
  };

  return (
    <nav>
      <ul className="flex items-center justify-center py-10 -space-x-px h-8 text-sm">
        <li>
          <span
            className={`cursor-pointer flex items-center justify-center px-3 h-8 ${
              currentPage === 1 ? "cursor-not-allowed" : ""
            }`}
            onClick={handlePrevPage}
            disabled={currentPage === 1}
          >
            <span className="sr-only">Previous</span>
            <svg
              className="w-2.5 h-2.5 rtl:rotate-180"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 6 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 1 1 5l4 4"
              />
            </svg>
          </span>
        </li>
        {renderPageNumbers()}
        <li>
          <span
            className={`cursor-pointer flex items-center justify-center px-3 h-8 ${
              currentPage === totalPages ? "cursor-not-allowed" : ""
            }`}
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
          >
            <span className="sr-only">Next</span>
            <svg
              className="w-2.5 h-2.5 rtl:rotate-180"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 6 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 9 4-4-4-4"
              />
            </svg>
          </span>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
