import React from 'react';

const Pagination = ({ goToPage, currentPage, totalPages }) => {
  return (
    <div className="flex justify-between mt-8">
      <button
        className="bg-gray-500 text-white py-2 px-4 rounded-md"
        onClick={() => goToPage(1)}
        disabled={currentPage === 1}
      >
        First
      </button>
      <button
        className="bg-gray-500 text-white py-2 px-4 rounded-md"
        onClick={() => goToPage(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Previous
      </button>
      <span className="text-lg font-bold">Page {currentPage}</span>
      <button
        className="bg-gray-500 text-white py-2 px-4 rounded-md"
        onClick={() => goToPage(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
      <button
        className="bg-gray-500 text-white py-2 px-4 rounded-md"
        onClick={() => goToPage(totalPages)}
        disabled={currentPage === totalPages}
      >
        Last
      </button>
    </div>
  );
};

export default Pagination;
