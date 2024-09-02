import React from 'react';

export const Pagination = ({ totalPages, paginate, currentPage }) => {
  const pageNumbers = [];

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    
      <ul className="pagination">
        {pageNumbers.map((number) => (
          <li
            key={number}
            className={`page-item ${currentPage === number ? 'active' : ''}`}
          >
            <a
              onClick={() => paginate(number)}
              className="page-link"
              href="#"
            >
              {number}
            </a>
          </li>
        ))}
      </ul>
    
  );
};
