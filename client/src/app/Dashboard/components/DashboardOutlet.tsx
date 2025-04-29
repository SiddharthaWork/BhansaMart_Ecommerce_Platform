// import React from "react";
import DashboardSidebar from "./DashboardSidebar";
import { Outlet } from "react-router-dom";
import { Divider } from "@mui/material";


const DashboardOutlet = () => {
  return (
    <div className="flex w-auto md:gap-0 lg:gap-4 lg:mx-[5%] md:mx-[3%]">
      <DashboardSidebar />
      <Divider orientation="vertical" />
      <div className="w-full h-full px-0 overflow-hidden md:px-1 md:ml-0 ml-[-13px]">
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardOutlet;
