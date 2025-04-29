import ChangePassword from "../app/Authentication/ChangePassword";
import EmailVerification from "../app/Authentication/EmailVerification";
import Login from "../app/Authentication/Login";
import OtpVerification from "../app/Authentication/OtpVerification";
import ResetPassword from "../app/Authentication/ResetPassword";
import Signup from "../app/Authentication/Signup";
import Category from "../app/Category";
import AboutPage from "../app/Dashboard/About";
import Address from "../app/Dashboard/Address";
import AddressComp from "../app/Dashboard/components/AddressComp";
// import DashboardOutlet from "../app/Dashboard/components/DashboardOutlet";
import CouponTabs from "../app/Dashboard/Coupons";
import HelpAndSupport from "../app/Dashboard/HelpAndSupport";
import LoyaltyPage from "../app/Dashboard/Loyalty";
import Orders from "../app/Dashboard/Orders";
import PaymentSettings from "../app/Dashboard/Payments";
import Profile from "../app/Dashboard/Profile";
import Reviews from "../app/Dashboard/Reviews";
import Rewards from "../app/Dashboard/Rewards";
import UsersData from "../app/Graphqldemo/user";
import Home from "../app/Home";
import ProductDetails from "../app/Productpage/ProductDetails";
import SearchPage from "../app/Search";
import Text from "../app/Text";
import OrderCheckout from "../app/Home/OrderCheckout/OrderCheckout";
import ProtectedRoute from "./ProtectedRoute";
import OrderDetails from "../app/Home/OrderCheckout/OrderDetails";
import BrandProduct from "../app/Brand";

export const routesConfig = [
  { path: "/", element: <Home /> },
  { path: "login", element: <Login /> },
  { path: "signup", element: <Signup /> },
  { path: "email-verification", element: <EmailVerification /> },
  { path: "reset-password", element: <ResetPassword /> },
  { path: "otp-verification", element: <OtpVerification /> },
  { path: "change-password", element: <ChangePassword /> },
  { path: "categories", element: <Category /> },
  { path: "user", element: <UsersData /> },
  { path: "product/:productId", element: <ProductDetails /> },
  { path: "checkout", element: <OrderCheckout /> },
  { path: "order-summary", element: <OrderDetails /> },
  { path: "s", element: <SearchPage /> },
  { path: "brand/:brandName/:brandId", element: <BrandProduct /> },
  { path: "test", element: <Text /> },

  {
    path: "dashboard",
    element: <ProtectedRoute />,
    children: [
      { path: "", element: <Profile /> },
      { path: "orders", element: <Orders /> },
      { path: "address", element: <Address /> },
      { path: "add-address", element: <AddressComp /> },
      { path: "reviews", element: <Reviews /> },
      { path: "loyalty", element: <LoyaltyPage /> },
      { path: "coupons", element: <CouponTabs /> },
      { path: "referral", element: <Rewards /> },
      { path: "payment", element: <PaymentSettings /> },
      { path: "support", element: <HelpAndSupport /> },
      { path: "about", element: <AboutPage /> },
    ],
  },
];
