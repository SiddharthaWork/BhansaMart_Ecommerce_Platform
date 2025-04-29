import { Text } from "./";
import { Icon } from "@iconify/react";
import "../../assets/css/loginbutton.css";
import Companylogo from "../../assets/images/companylogo.svg";
import { useEffect, useState } from "react";
import { LocationDialog } from "../../app/Home/components/LocationDialog";
import DrawerComponent from "./Drawer";
import DrawerContent from "../../app/Home/components/DrawerContent";
import { Link, useNavigate } from "react-router-dom";
// import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import useFetchUserById from "../../hooks/useFetchUserById";
import { useAppData } from "../../context/AppContext";

interface NavpropType {
  customShadow?: string;
}
const placeholderData = [
  'Search "Product"',
  'Search "Beauty"',
  'Search "Rice"',
  'Search "Milk"',
];

export const Navbar: React.FC<NavpropType> = ({
  customShadow = "shadow-md",
}) => {
  const [currentPlaceholderIndex, setCurrentPlaceholderIndex] = useState(0);
  const [animate, setAnimate] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (drawerOpen) {
      document.body.style.overflow = "hidden"; // Disable scrolling
    } else {
      document.body.style.overflow = ""; // Enable scrolling
    }
  }, [drawerOpen]);

  const [searchText, setSearchText] = useState("");

  const hideLoginButton = location.pathname.startsWith("/dashboard");

  // const hideSearchBar = location.pathname.startsWith("/dashboard");

  const token = localStorage.getItem("token");

  const { location: address } = useAppData();

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimate(true);

      setTimeout(() => {
        setCurrentPlaceholderIndex(
          (nextPlaceholderIndex) =>
            (nextPlaceholderIndex + 1) % placeholderData.length
        );
        setAnimate(false);
      }, 350);
    }, 3500);

    return () => clearInterval(interval);
  }, []);

  const handleDialogOpen = () => {
    setDialogOpen(true);
  };
  const handleDrawerOpen = () => {
    setDrawerOpen(true);
  };

  // const handleLoginNavigate = () => {
  //   navigate("/login");
  // };

  // const handleDashNavigate = () => {
  //   navigate("/dashboard");
  // };

  useEffect(() => {
    // Clear input field when the route changes
    setSearchText("");
  }, [location.pathname]);

  const handleSearchNavigate = () => {
    if (!location.pathname.startsWith("/s")) {
      navigate(`/s`);
    }
  };

  const handleInputFocus = () => {
    if (!location.pathname.startsWith("/s")) {
      navigate(`/s`);
    }
  };

  useEffect(() => {
    if (location.pathname.startsWith("/s")) {
      const delayDebounce = setTimeout(() => {
        navigate(`/s?query=${encodeURIComponent(searchText)}`, {
          replace: true,
        });
      }, 300);

      return () => clearTimeout(delayDebounce);
    }
  }, [searchText, navigate, location.pathname]);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSearchNavigate();
    }
  };
  const cart = useSelector((state: any) => state.cart);

  const { data: user } = useFetchUserById();

  const addressData = address?.address || user?.getUser?.address;

  // useEffect(() => {
  //   const authenticate = async () => {
  //     try {
  //       const cookie = Cookies.get('RSM');
  //       if (cookie) {
  //         const cookieObj = cookie.split('^');
  //         dispatch(setToken(cookieObj[0]));
  //         const res = await getCurrentUser().unwrap();
  //         if (res?.success) {
  //           dispatch(setUser(res?.data));
  //         }
  //       }
  //     } catch {
  //       dispatch(setToken({ token: null, auth: null }));
  //       Cookies.remove('RSM');
  //     }
  //     //  finally {
  //     //   setIsLoading(false);
  //     // }
  //   };
  //   authenticate();
  // }, []);

  return (
    <div
      className={`flex justify-between w-full px-6 pt-3 pb-3 ${customShadow} place-items-center lg:pb-3 md:px-14 lg:px-24`}
    >
      <section className="flex flex-wrap justify-center flex-1 place-items-center md:gap-x-11 gap-x-8 md:gap-y-4 gap-y-2">
        <Link to="/">
          <img
            src={Companylogo}
            // src="/companylogo.png"
            alt="company-logo"
            className="lg:h-[70px] lg:w-[87px] md:h-[60px] md:w-[75px] h-[45px] w-[55px]"
          />
        </Link>
        <div className="flex flex-col gap-0 mr-3 md:gap-1 lg:mr-0">
          <Text size="body-md-rare" className="scale-90 md:scale-100">
            Delivery Location
          </Text>

          <section
            className="flex cursor-pointer place-items-center md:mt-0 mt-[-1px] "
            onClick={handleDialogOpen}
          >
            <Text
              size="body-sm-sm"
              className="w-full scale-90 md:scale-100 line-clamp-1"
            >
              {address
                ? address?.address?.split(" ").slice(0, 3).join(" ") + "..."
                : user?.getUser?.address?.split(" ").slice(0, 3).join(" ") + "..."}
            </Text>
            <Icon icon="nrk:arrow-dropdown" className="scale-90 md:scale-100" />
          </section>
        </div>

        {/* {!hideSearchBar && ( */}
        <div
          className="flex flex-1 w-full gap-3 px-2 py-2 border rounded outline-none cursor-pointer md:py-3 border-secondary place-items-center"
          onClick={handleSearchNavigate}
        >
          <Icon icon="mynaui:search" className="text-brown" fontSize={18} />
          <input
            type="text"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            onFocus={handleInputFocus}
            onKeyDown={handleKeyDown}
            className={`transition-all duration-1000 ease-linear rounded outline-none w-full min-w-[10rem] ${animate
              ? "animate-inputslideUp placeholder-opacity-100"
              : "placeholder-opacity-0"
              }`}
            placeholder={placeholderData[currentPlaceholderIndex]}
          />
        </div>
        {/* )} */}

        <div className="flex gap-4 place-items-center ">
          {!hideLoginButton && !token && (
            <Link to="/login">
              <button
                className="loginbutton group bg-fade-secondary lg:py-3 py-2 md:px-[14px] px-[12px] lg:px-[16px] flex items-center gap-2 rounded transition-all duration-500 ease-in-out relative overflow-hidden"
              // onClick={handleLoginNavigate}
              >
                <div className="w-2 h-2 transition-all duration-500 ease-in-out rounded-full group-hover:hidden bg-fade-black" />
                <Text
                  size="body-base-mid"
                  variant="fade-black"
                  className="ml-0 md:sacle-100 scale-90 transition-all duration-500 ease-in-out group-hover:text-white group-hover:ml-[-2px]"
                >
                  LOGIN
                </Text>
                <Icon
                  icon="lets-icons:arrow-right"
                  width="16"
                  height="16"
                  className="hidden font-semibold text-white transition-all duration-500 ease-in-out group-hover:flex"
                />
              </button>
            </Link>
          )}

          <button
            className="bg-camarone lg:py-3 py-2 md:px-[16px] px-[8px] lg:px-[18px] flex place-items-center md:gap-2 gap-1 rounded group"
            onClick={handleDrawerOpen}
          >
            <Icon
              icon="mdi:cart-outline"
              color="white"
              fontSize={24}
              className="transition-transform duration-300 scale-90 group-hover:animate-swing-fast md:sacle-100"
            />
            <Text
              size="body-base-default"
              variant="white"
              className="scale-90 md:sacle-100"
            >
              My Cart
            </Text>

            <Text
              size="body-base-default"
              variant="white"
              className="scale-90 md:sacle-100 "
            >
              {cart?.items?.length}
            </Text>
          </button>
          {!hideLoginButton && token && (
            <Link to="/dashboard">
              <button
                className="loginbutton group bg-fade-secondary lg:py-3 py-2 md:px-[8px] px-[7px] lg:px-[10px] flex items-center gap-1 rounded transition-all duration-500 ease-in-out relative overflow-hidden"
              // onClick={handleDashNavigate}
              >
                <Icon
                  icon="gg:profile"
                  width="22"
                  height="22"
                  className="text-gray-600 transition-all duration-300 ease-in-out group-hover:text-white"
                />
                <Text
                  size="body-base-mid"
                  variant="fade-black"
                  className="ml-0 transition-all duration-500 ease-in-out scale-90 md:sacle-100 group-hover:text-white group-hover:ml-0"
                >
                  PROFILE
                </Text>
                {/* <Icon
                  icon="lets-icons:arrow-right"
                  width="16"
                  height="16"
                  className="hidden font-semibold text-white transition-all duration-500 ease-in-out group-hover:flex"
                /> */}
              </button>
            </Link>
          )}
        </div>
      </section>
      {dialogOpen && (
        <LocationDialog
          isOpen={dialogOpen}
          addressData={addressData}
          onClose={() => setDialogOpen(false)}
        />
      )}
      {drawerOpen && (
        <DrawerComponent
          isOpen={true}
          onClose={() => setDrawerOpen(false)}
          title="My Cart"
          content={<DrawerContent onClose={() => setDrawerOpen(false)} />}
        />
      )}
    </div>
  );
};
