import { useState } from 'react';

const pageSize = 4; // number of items per page

function PaginatedList({data}) {

//   const response=await fetch('http://localhost:4000/quotes-server')
//   const data=await response.json()


  console.log("data is "+data)
 

  const [currentPage, setCurrentPage] = useState(1);

  const numPages = Math.ceil(data.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentPageData = data.slice(startIndex, endIndex);

  const handlePrevClick = () => {
    setCurrentPage(currentPage - 1);
  };

  const handleNextClick = () => {
    setCurrentPage(currentPage + 1);
  };

  return (
    <div>
      {currentPageData.map((item) => (
        <div key={item.c}>
          <h2 style={{
            color:"red",
            fontWeigh: "bold",
          }}>{item.q}</h2>
          <p>by {item.a}</p>
        </div>
      ))}
      <button onClick={handlePrevClick} disabled={currentPage === 1}>
        Prev
      </button>
      <button onClick={handleNextClick} disabled={currentPage === numPages}>
        Next
      </button>
    </div>
  );
}

export default PaginatedList;
