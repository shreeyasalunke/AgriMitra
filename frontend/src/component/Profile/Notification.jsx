import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsersNotificationAction } from "../State/Orders/Action"; // ✅ apne folder structure ke hisaab se adjust kar lena

const Notification = () => {
  const dispatch = useDispatch();
  const { notifications, loading } = useSelector((state) => state.order); // ✅ reducer ka naam orderReducer h to state.order use hoga

  const jwt = localStorage.getItem("jwt"); // token le rahe hai

  useEffect(() => {
    if (jwt) {
      dispatch(getUsersNotificationAction(jwt));
    }
  }, [dispatch, jwt]);

  if (loading) {
    return <p className="text-center">Loading notifications...</p>;
  }

  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Notifications</h2>
      {notifications.length === 0 ? (
        <p className="text-gray-500">No notifications found</p>
      ) : (
        <ul className="space-y-2">
          {notifications.map((n, index) => (
            <li
              key={n.id || index} // ✅ unique key
              className="bg-gray-100 p-3 rounded-lg shadow-sm hover:bg-gray-200 transition"
            >
              <p className="text-sm text-gray-800">{n.message}</p>
              <span className="text-xs text-gray-500">
                {new Date(n.sentAt).toLocaleString()} {/* ✅ backend field ke naam check kar lena */}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Notification;
