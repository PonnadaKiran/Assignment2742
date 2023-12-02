import React from 'react';

const Table = ({renderTable}) => {
  return (
    <div className="rounded-md">
      {renderTable()}
    </div>
  );
};

export default Table;
