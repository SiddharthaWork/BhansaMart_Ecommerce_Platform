import { Icon } from "@iconify/react/dist/iconify.js";
import { Modal, Table, TableSearchHeader, TitleBreadCrumb } from "../.."
import { FrontendRoutes, OrderManagementBasicSetup } from "../../../constants";
import { Link, Outlet, useLocation } from "react-router-dom";
import { Text } from "../..";

const breadcrumbData = [
    {
        label: "Dashboard",
        path: FrontendRoutes.HOME,
    },
    {
        label: "Referal Management",
        path: "#",
    },
    {
        label: "Point Configuration",
        path: FrontendRoutes.POINTSCONFIGURATION,
    },
];

const navigate = [
    {
        id: "add-attribute",
        title: "Purchase Reward",
        icon: "material-symbols:balance",
        path: FrontendRoutes.PURCHASEREWARD,
    },
    {
        id: "add-attributes",
        title: "Referal Reward",
        icon: "material-symbols:rewarded-ads-outline",
        path: FrontendRoutes.REWARDREFERAL,
    },
];


export const PointsConf = () => {
   

    const url = useLocation();


    
    return (
    <div className="flex flex-col pl-7 pr-8 gap-6" id="parent">

            <TitleBreadCrumb
                breadcrumbData={breadcrumbData}
                title="Reward Points Configuration"
            />

                <section>
                    <div className="flex place-items-center gap-6 border border-grey-cadet-blue bg-white  ">
                        {navigate.map((nav) => (
                            <Link
                                key={nav.id}
                                className={`flex place-items-center gap-1 cursor-pointer py-5 px-3  ${nav.path === url.pathname && "border-b border-primary-blue"
                                    }`}
                                to={nav.path}
                            >
                                <Icon
                                    icon={nav.icon}
                                    color={`${nav.path === url.pathname ? "#2275FC" : "#454545"}`}
                                />
                                <Text
                                    size="body-sm-lg"
                                    variant={`${nav.path === url.pathname ? "primary-blue" : "grey-600"
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

    )
}

