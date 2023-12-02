import React from 'react';

const Delete = ({ deleteSelected }) => {
  return (
    <div className="mt-4">
      <button className="bg-red-500 text-white py-2 px-4 rounded-md" onClick={deleteSelected}>
        Delete Selected
      </button>
    </div>
  );
};

export default Delete;
