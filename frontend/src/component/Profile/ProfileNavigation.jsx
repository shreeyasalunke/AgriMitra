

import React from "react";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import FavoriteIcon from "@mui/icons-material/Favorite";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import EventIcon from "@mui/icons-material/Event";
import LogoutIcon from "@mui/icons-material/Logout";
import { Divider, Drawer } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../State/Authentication/Action";

const menu = [
  { title: "Orders", icon: <ShoppingBagIcon /> },
  { title: "Favorites", icon: <FavoriteIcon /> },
  { title: "Address", icon: <FavoriteIcon /> },
  { title: "Payment", icon: <AccountBalanceWalletIcon /> },
  { title: "Notifications", icon: <NotificationsActiveIcon /> },
  { title: "Events", icon: <EventIcon /> },
  { title: "Logout", icon: <LogoutIcon /> },
];

function ProfileNavigation({ open, handleClose }) {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const handleNavigate = (item) => {
    if (item.title === "Logout") {
      dispatch(logout());
      navigate("/");
    } else {
      navigate(`/my-profile/${item.title.toLowerCase()}`);
    }
    if (handleClose) handleClose(); // mobile पर menu click के बाद sidebar बंद
  };

  const SidebarContent = (
    <div className="w-[70vw] sm:w-[50vw] lg:w-[20vw] h-full bg-white flex flex-col text-lg">
      {menu.map((item, i) => {
        const active = location.pathname.includes(
          item.title.toLowerCase()
        );
        return (
          <div key={i}>
            <div
              onClick={() => handleNavigate(item)}
              className={`px-5 py-3 flex items-center gap-4 cursor-pointer 
                hover:bg-gray-100 ${
                  active ? "bg-gray-200 font-semibold" : ""
                }`}
            >
              {item.icon}
              <span>{item.title}</span>
            </div>
            {i !== menu.length - 1 && <Divider />}
          </div>
        );
      })}
    </div>
  );

  return (
    <>
      {/* 👇 Mobile/Tablet → Drawer */}
      <Drawer
        open={open}
        onClose={handleClose}
        anchor="left"
        variant="temporary"
      >
        {SidebarContent}
      </Drawer>

      {/* 👇 Desktop → permanent Sidebar */}
      <div className="hidden lg:block fixed top-0 left-0 h-screen w-[20%] border-r shadow-md bg-white">
        {SidebarContent}
      </div>
    </>
  );
}

export default ProfileNavigation;
