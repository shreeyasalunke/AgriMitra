import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "@mui/material";
import { getAllToolItems } from "../State/ToolItem/Action";
import { addItemToCart } from "../State/Cart/Action";

const AllToolsPage = () => {
  const { toolItems, loading } = useSelector((store) => store.toolitem);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllToolItems()); // 👈 API call at mount
  }, [dispatch]);

  const handleAddItemToCart = (item) => {
    const reqData = {
      token: localStorage.getItem("jwt"),
      cartItem: {
        toolItemId: item.id,
        quantity: 1,
      },
    };
    dispatch(addItemToCart(reqData));
  };

  if (loading) return <p className="text-center py-6 text-lg">Loading...</p>;

  return (
    <div className="px-4 md:px-8 lg:px-16 py-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">All Tools</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {toolItems.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col"
          >
            <div className="relative w-full h-48 bg-gray-100">
              <img
                src={item.images?.[0] || "https://via.placeholder.com/150"}
                alt={item.name}
                className="w-full h-full object-cover"
              />
              {!item.available && (
                <span className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
                  Out of Stock
                </span>
              )}
            </div>

            <div className="p-4 flex flex-col flex-grow">
              <h3 className="text-lg font-semibold text-gray-800 truncate">
                {item.name}
              </h3>
              <p className="text-gray-500 text-sm line-clamp-2">{item.description}</p>
              <p className="text-xl font-bold text-green-600 mt-2">₹{item.price}</p>

              <div className="mt-auto pt-4">
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  disabled={!item.available}
                  onClick={() => handleAddItemToCart(item)}
                >
                  {item.available ? "Add to Cart" : "Unavailable"}
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllToolsPage;
