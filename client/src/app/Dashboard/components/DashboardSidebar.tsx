import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { sidebarData } from "../dashboardObj";
import LogoutDialog from "./LogoutDialog";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
// import { IoMenu } from "react-icons/io5";
import { Drawer, IconButton } from "@mui/material"; // Import MUI Drawer
import { Icon } from "@iconify/react/dist/iconify.js";

interface NavType {
  icon: any;
  label: string;
  path: string;
}

const DashboardSidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [openLogoutDialog, setOpenLogoutDialog] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false); // Drawer state

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    Cookies.remove("RSM");
    setOpenLogoutDialog(false);
    toast.success("Logged out Successfully!");
    navigate("/");
  };

  const NavLink = ({ icon: Icon, label, path }: NavType) => {
    const handleClick = (e: React.MouseEvent) => {
      if (label === "Logout") {
        e.preventDefault();
        setOpenLogoutDialog(true);
      }
      setIsDrawerOpen(false); // Close drawer on click
    };

    return (
      <Link
        to={label === "Logout" ? "#" : path}
        onClick={handleClick}
        className={`flex items-center gap-3 px-3 py-2 group transition-all duration-300 ease-in-out font-semibold rounded-lg ${location.pathname === path ? "bg-[#F4FCE9] text-[#539818]" : "text-gray-700"
          }`}
      >
        <div
          className={`p-2 rounded-full ${location.pathname === path ? "bg-[#E6F8CF]" : "bg-gray-100"
            }`}
        >
          <Icon className="w-[14px] h-[14px]" />
        </div>
        <span className="lg:text-base text-sm">{label}</span>
      </Link>
    );
  };

  return (
    <div>
      {/* Hamburger Button for Small Screens */}
      <IconButton
        className="fixed left-[6px] z-10 flex top-[17px] md:hidden"
        onClick={() => setIsDrawerOpen(true)}
      >
        <Icon icon="material-symbols:menu-rounded" width="30" height="30" className="flex md:hidden" />
      </IconButton>
      {/* Sidebar for Large Screens */}
      <div className="relative flex-col hidden h-full gap-6 p-4 border-r md:flex lg:w-80 md:w-64">
        {Object.entries(sidebarData).map(([section, items]) => (
          <div key={section} className="space-y-2">
            <p className="text-[10px] md:text-xs font-semibold text-gray-500">{section}</p>
            <nav className="space-y-1">
              {items.map((item) => (
                <NavLink key={item.path} {...item} />
              ))}
            </nav>
          </div>
        ))}
      </div>

      {/* MUI Drawer for Small Screens */}
      <Drawer
        anchor="left"
        open={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
      >
        <div className="flex flex-col w-64 h-full p-4 bg-white">
          {/* Close Button */}
          <button className="self-end mb-4 text-gray-800" onClick={() => setIsDrawerOpen(false)}>
            ✖
          </button>

          {Object.entries(sidebarData).map(([section, items]) => (
            <div key={section} className="space-y-2">
              <p className="md:text-xs text-[11px] font-semibold text-gray-500">{section}</p>
              <nav className="space-y-1">
                {items.map((item) => (
                  <NavLink key={item.path} {...item} />
                ))}
              </nav>
            </div>
          ))}
        </div>
      </Drawer>

      {/* Logout Dialog */}
      {openLogoutDialog && (
        <LogoutDialog isOpen={openLogoutDialog}
          onClose={() => setOpenLogoutDialog(false)}
          onClick={handleLogout}
        />
      )}
    </div>
  );
};

export default DashboardSidebar;
