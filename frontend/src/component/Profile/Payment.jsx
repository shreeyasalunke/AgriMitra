import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsersOrders } from "../State/Orders/Action";

const Payment = () => {
  const dispatch = useDispatch();
  const { orders, loading, error } = useSelector((state) => state.order);
  const jwt = localStorage.getItem("jwt");

  useEffect(() => {
    if (jwt) {
      dispatch(getUsersOrders(jwt));
    }
  }, [dispatch, jwt]);

  if (loading) return <p className="p-4">Loading payments...</p>;
  if (error) return <p className="p-4 text-red-500">Error: {error.message}</p>;
  if (!orders || orders.length === 0)
    return <p className="p-4">No orders found.</p>;

  // ✅ सिर्फ वो orders जिनकी payment "PAID" है
  const filteredOrders = orders.filter(
    (order) => order.payment && order.payment.paymentStatus === "PAID"
  );

  return (
    <div className="p-6 bg-white shadow rounded-lg">
      <h2 className="text-xl font-semibold mb-4">💳 Payment History</h2>

      {filteredOrders.length === 0 ? (
        <p>No successful payments found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border border-gray-200 rounded-lg">
            <thead className="bg-gray-100 text-gray-600 text-sm">
              <tr>
                <th className="py-2 px-4 text-left">Order ID</th>
                <th className="py-2 px-4 text-left">Amount</th>
                <th className="py-2 px-4 text-left">Method</th>
                <th className="py-2 px-4 text-left">Status</th>
                <th className="py-2 px-4 text-left">Transaction ID</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order) => (
                <tr
                  key={order.id}
                  className="border-t border-gray-200 text-sm hover:bg-gray-50"
                >
                  <td className="py-2 px-4">{order.id}</td>
                  <td className="py-2 px-4 font-medium">
                    ₹{order.payment?.totalAmount || 0}
                  </td>
                  <td className="py-2 px-4">
                    {order.payment?.paymentMethod || "-"}
                  </td>
                  <td className="py-2 px-4">
                    <span className="text-green-600 font-medium">✅ Paid</span>
                  </td>
                  <td className="py-2 px-4 text-gray-500">
                    {order.payment?.transactionId || "-"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Payment;
