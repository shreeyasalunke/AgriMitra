
import React, { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import AdminSideBar from "./AdminSideBar";
import Orders from "../Orders/Orders";
import ToolItem from "../ToolItem/ToolItem";
import Events from "../Events/Events";
import ToolCategory from "../ToolCategory/ToolCategory";
import ToolOwnerDetails from "./ToolOwnerDetails";
import ToolOwnerDashboard from "../Dashboard/Dashboard";
import { useDispatch, useSelector } from "react-redux";
import { getToolOwnersCategory } from "../../component/State/Authentication/ToolOwner/Action";
import { fetchToolOwnersOrder } from "../../component/State/Tool Owner/Action";
import CreateToolItemForm from "../ToolItem/CreateToolItemForm";

import MenuIcon from "@mui/icons-material/Menu";
import { IconButton } from "@mui/material";

export default function Admin({ handleClose }) {
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");
  const { toolowner } = useSelector((store) => store);
  const [openSideBar, setOpenSideBar] = useState(false);

  useEffect(() => {
    dispatch(
      getToolOwnersCategory({
        jwt,
        toolownerId: toolowner.usersToolOwner?.id,
      })
    );
    dispatch(
      fetchToolOwnersOrder({
        jwt,
        toolownerId: toolowner.usersToolOwner?.id,
      })
    );
  }, []);

  return (
    <div className="flex">
      {/* 👇 Mobile hamburger button */}
      <div className="lg:hidden fixed top-3 left-3 z-50">
        <IconButton onClick={() => setOpenSideBar(true)}>
          <MenuIcon />
        </IconButton>
      </div>

      {/* 👇 Sidebar (responsive like ProfileNavigation) */}
      <AdminSideBar
        open={openSideBar}
        handleClose={() => setOpenSideBar(false)}
      />

      {/* 👇 Main content */}
      <div className="lg:ml-[20%] w-full p-4 min-h-screen">
        <Routes>
          <Route path="/" element={<ToolOwnerDashboard />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/toolitem" element={<ToolItem />} />
          <Route path="/events" element={<Events />} />
          <Route path="/category" element={<ToolCategory />} />
          <Route path="/details" element={<ToolOwnerDetails />} />
          <Route path="/add-toolitem" element={<CreateToolItemForm />} />
        </Routes>
      </div>
    </div>
  );
}
