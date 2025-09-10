
import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../component/State/Authentication/Action";
import {
  Dashboard,
  ShoppingBag,
  ShopTwo,
  Category,
  Event,
  AdminPanelSettings,
  Logout,
} from "@mui/icons-material";
import { Divider, Drawer, useMediaQuery } from "@mui/material";

const toolitem = [
  { title: "Dashboard", icon: <Dashboard />, path: "/" },
  { title: "Orders", icon: <ShoppingBag />, path: "/orders" },
  { title: "ToolItem", icon: <ShopTwo />, path: "/toolitem" },
  { title: "Tool Category", icon: <Category />, path: "/category" },
  { title: "Events", icon: <Event />, path: "/events" },
  { title: "Details", icon: <AdminPanelSettings />, path: "/details" },
  { title: "Logout", icon: <Logout />, path: "/" },
];

const AdminSideBar = ({ open, handleClose }) => {
  const isSmallScreen = useMediaQuery("(max-width:1080px)");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleNavigate = (item) => {
    if (item.title === "Logout") {
      dispatch(logout());
      navigate("/");
      handleClose();
    } else {
      navigate(`/admin/toolowners${item.path}`);
      if (isSmallScreen) handleClose();
    }
  };

  return (
    <Drawer
      variant={isSmallScreen ? "temporary" : "permanent"}
      onClose={handleClose}
      open={open}
      anchor="left"
      sx={{ zIndex: 1200 }}
      ModalProps={{ keepMounted: true }}
    >
      <div className="w-[70vw] lg:w-[20vw] h-screen flex flex-col justify-center text-xl space-y-[1.65rem]">
        {toolitem.map((item, i) => (
          <React.Fragment key={item.title}>
            <div
              onClick={() => handleNavigate(item)}
              className="px-5 py-2 flex items-center gap-5 cursor-pointer hover:bg-gray-200"
            >
              {item.icon}
              <span>{item.title}</span>
            </div>
            {i !== toolitem.length - 1 && <Divider />}
          </React.Fragment>
        ))}
      </div>
    </Drawer>
  );
};

export default AdminSideBar;
