
import React, { useState } from "react";
import ProfileNavigation from "./ProfileNavigation";
import { Route, Routes } from "react-router-dom";
import Orders from "./Orders";
import Address from "./Address";
import Favorites from "./Favorites";
import Events from "./Events";
import UserProfile from "./UserProfile";
import Auth from "../Auth/Auth";
import Notification from "./Notification";
import MenuIcon from "@mui/icons-material/Menu";
import { IconButton } from "@mui/material";
import Payment from "./Payment";

function Profile() {
  const [openSideBar, setOpenSideBar] = useState(false);

  return (
    <div className="flex">
      {/* 👇 Mobile/Tablet hamburger button */}
      <div className="lg:hidden fixed top-3 left-3 z-50">
        <IconButton onClick={() => setOpenSideBar(true)}>
          <MenuIcon />
        </IconButton>
      </div>

      {/* 👇 Sidebar */}
      <ProfileNavigation
        open={openSideBar}
        handleClose={() => setOpenSideBar(false)}
      />

      {/* 👇 Right side content */}
      <div className="lg:ml-[20%] w-full p-4 min-h-screen">
        <Routes>
          <Route path="/" element={<UserProfile />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/address" element={<Address />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/events" element={<Events />} />
          <Route path="/notifications" element={<Notification />} />
          <Route path="/payment" element={<Payment />} />

        </Routes>

        <Auth />
      </div>
    </div>
  );
}

export default Profile;
