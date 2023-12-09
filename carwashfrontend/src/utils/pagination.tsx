// // Pagination.tsx
// import React from "react";

// interface PaginationProps {
//   totalPages: number;
//   currentPage: number;
//   onPageChange: (page: number) => void;
// }

// const Pagination: React.FC<PaginationProps> = ({
//   totalPages,
//   currentPage,
//   onPageChange,
// }) => {
//   console.log("totalPages:", totalPages);
//   console.log("currentPage:", currentPage);
//   return (
//     <div className="mt-4 flex justify-center space-x-2">
//       {Array.from({ length: totalPages }, (_, index) => (
//         <button
//           key={index}
//           onClick={() => onPageChange(index + 1)}
//           className={`px-3 py-2 border rounded ${
//             index + 1 === currentPage ? "bg-blue-500 text-white" : "bg-gray-300"
//           }`}
//         >
//           {index + 1}
//         </button>
//       ))}
//     </div>
//   );
// };

// export default Pagination;
