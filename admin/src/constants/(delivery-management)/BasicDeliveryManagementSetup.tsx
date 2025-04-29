import { FrontendRoutes } from "../Routes";

export const BasicDeliveryManagementSetup = () => {
  const AssignDeliveryPersonBreadCrumbDetails = [
    {
      label: "Dashboard",
      path: FrontendRoutes.HOME,
    },
    {
      label: "Delivery Management",
      path: "#",
    },
    {
      label: "Delivery Settlement",
      path: FrontendRoutes.ASSIGN_DELIVERY_PERSON,
    },

  ];

  const DeliveryPersonListBreadCrumbDetails=[
    {
      label: "Dashboard",
      path: FrontendRoutes.HOME,
    },
    {
      label: "Delivery Management",
      path: "#",
    },
    {
      label: "Delivery Person List",
      path: FrontendRoutes.DELIVERY_PERSON_LIST,
    },
  ]

  return { AssignDeliveryPersonBreadCrumbDetails,DeliveryPersonListBreadCrumbDetails };
};
