import React from 'react';

const Search = ({ searchTerm, setSearchTerm, search }) => {
  return (
    <div className="mb-4 flex items-center">
      <input
        type="text"
        id="searchInput"
        placeholder="Search..."
        className="border border-gray-300 p-2 flex-1"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            search();
          }
        }}
      />
      <button className="bg-blue-500 text-white py-2 px-4 ml-2 rounded-md" onClick={search}>
        Search
      </button>
    </div>
  );
};

export default Search;
