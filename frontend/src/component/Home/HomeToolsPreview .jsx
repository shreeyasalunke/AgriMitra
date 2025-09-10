// import React, { useEffect } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { Button } from "@mui/material";
// import { getAllToolItems } from "../State/ToolItem/Action";
// import { useNavigate } from "react-router-dom";

// const HomeToolsPreview = () => {
//   const { toolItems, loading } = useSelector((store) => store.toolitem);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   useEffect(() => {
//     dispatch(getAllToolItems()); // Home par bhi tools fetch honge
//   }, [dispatch]);

//   if (loading) return <p className="text-center py-6 text-lg">Loading...</p>;

//   return (
//     <div className="px-4 md:px-8 lg:px-16 py-6">
//       <h2 className="text-2xl font-bold mb-6 text-gray-800">Featured Tools</h2>

//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
//         {toolItems.slice(0, 6).map((item) => (
//           <div
//             key={item.id}
//             className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col"
//           >
//             <div className="relative w-full h-48 bg-gray-100">
//               <img
//                 src={item.images?.[0] || "https://via.placeholder.com/150"}
//                 alt={item.name}
//                 className="w-full h-full object-cover"
//               />
//             </div>

//             <div className="p-4 flex flex-col flex-grow">
//               <h3 className="text-lg font-semibold text-gray-800 truncate">{item.name}</h3>
//               <p className="text-gray-500 text-sm line-clamp-2">{item.description}</p>
//               <p className="text-xl font-bold text-green-600 mt-2">₹{item.price}</p>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* View More button */}
//       <div className="text-center mt-6">
//         <Button variant="contained" color="primary" onClick={() => navigate("/tools")}>
//           View More
//         </Button>
//       </div>
//     </div>
//   );
// };

// export default HomeToolsPreview;


import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "@mui/material";
import { getAllToolItems } from "../State/ToolItem/Action";
import { useNavigate } from "react-router-dom";

const HomeToolsPreview = () => {
  const { toolItems, loading } = useSelector((store) => store.toolitem);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getAllToolItems());
  }, [dispatch]);

  if (loading) return <p className="text-center py-6 text-lg">Loading...</p>;

  return (
    <div className="px-4 md:px-8 lg:px-16 py-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Featured Tools</h2>

      {/* More compact grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-6">
        {toolItems.slice(0, 10).map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border flex flex-col"
          >
            {/* Image Section */}
            <div className="relative w-full aspect-square overflow-hidden rounded-t-xl">
              <img
                src={item.images?.[0] || "https://via.placeholder.com/150"}
                alt={item.name}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>

            {/* Content Section */}
            <div className="p-3 flex flex-col flex-grow">
              <h3 className="text-sm font-semibold text-gray-800 line-clamp-1">
                {item.name}
              </h3>
              <p className="text-gray-500 text-xs line-clamp-2 mb-2">
                {item.description}
              </p>
              <p className="text-base font-bold text-green-600 mt-auto">
                ₹{item.price}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* View More button */}
      <div className="text-center mt-8">
        <Button
          variant="contained"
          color="primary"
          size="medium"
          onClick={() => navigate("/tools")}
        >
          View More
        </Button>
      </div>
    </div>
  );
};

export default HomeToolsPreview;
