import { Outlet } from "react-router-dom";
import Banner from "./components/Banner";
import Categories from "./components/Categories";
import Deals from "./components/Deals";
import Delivery from "./components/Delivery";
import Products from "./components/Products";
import Coupons from "./components/Coupons";

const Home = () => {
  return (
    <div>
      {/* <Navbar customShadow='shadow-md' /> */}
      <Banner />
      <Categories />
      <Delivery />
      <Coupons />
      <Deals />
      <Products />
      <Outlet />
      {/* <Footer /> */}
    </div>
  );
};

export default Home;
