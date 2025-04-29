import { Icon } from "@iconify/react/dist/iconify.js";
import { FrontendRoutes } from "../../../../constants";
import { Text, TitleBreadCrumb } from "../../../shared";
import { Link, Outlet, useLocation } from "react-router-dom";

const breadcrumbData = [
  {
    label: "Dashboard",
    path: FrontendRoutes.HOME,
  },
  {
    label: "Delivery Management",
    path: "#",
  },
  {
    label: "Delivery Configuration",
    path: FrontendRoutes.DELIVERYCONFIGURATION,
  },
];

const navigate = [
  {
    id: "add-attribute",
    title: "Delivery Fee",
    icon: "solar:dollar-bold",
    path: FrontendRoutes.DELIVERY_Fee,
  },
  {
    id: "add-attributes",
    title: "Minimum Order Threshold",
    icon: "mdi:cart-outline",
    path: FrontendRoutes.DELIVERY_MINIMUM,
  },
  {
    id: "add-attributess",
    title: "Free Delivery Threshold",
    icon: "iconamoon:delivery-fast",
    path: FrontendRoutes.DELIVERY_Free,
  },
];

export const DeliveryConfigure = () => {
  const url = useLocation();

  return (
    <div className="flex flex-col pl-7 pr-8 gap-6" id="parent">
      <TitleBreadCrumb title="Delivery Configuration" breadcrumbData={breadcrumbData} />

      <section>
        <div className="flex place-items-center gap-6 border border-grey-cadet-blue bg-white  ">
          {navigate.map((nav) => (
            <Link
              key={nav.id}
              className={`flex place-items-center gap-1 cursor-pointer py-5 px-3  ${
                nav.path === url.pathname && "border-b border-primary-blue"
              }`}
              to={nav.path}
            >
              <Icon
                icon={nav.icon}
                color={`${nav.path === url.pathname ? "#2275FC" : "#454545"}`}
              />
              <Text
                size="body-sm-lg"
                variant={`${
                  nav.path === url.pathname ? "primary-blue" : "grey-600"
                }`}
              >
                {nav.title}
              </Text>
            </Link>
          ))}
        </div>
        <Outlet />
      </section>
    </div>
  );
};
