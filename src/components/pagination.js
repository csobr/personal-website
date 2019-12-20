import React from "react";

const Pagination = ({ projectsPerPage, totalProjects, paginate }) => {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalProjects / projectsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <div className="pagination">
        {pageNumbers.map(number => (
          <div key={number} className="dots">
            <a onClick={() => paginate(number)} className="dot">
              {number}
            </a>
          </div>
        ))}
      </div>
    </nav>
  );
};
export default Pagination;
