import { Outlet, useLocation } from "react-router-dom";
import { Footer, Navbar } from "./components";

export default function App() {
  const location = useLocation();
  const hideNavAndFooter =
    location.pathname === "/login" ||
    location.pathname === "/signup" ||
    location.pathname === "/reset-password" ||
    location.pathname === "/otp-verification" ||
    location.pathname === "/change-password";

  const hideFooterOnly = location.pathname.startsWith("/dashboard") || location.pathname === "/s";

  return (
    <div className="flex flex-col">
      {!hideNavAndFooter && <Navbar customShadow="shadow-md" />}
      <Outlet />
      {/* {!hideNavAndFooter ||
        !(location.pathname.startsWith("/dashboard") && <Footer />)
        } */}
      {!hideNavAndFooter && !hideFooterOnly && <Footer />}
    </div>
  );
}
