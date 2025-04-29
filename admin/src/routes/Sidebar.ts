import { FrontendRoutes } from '../constants';

export const SidebarMainRoutes = {
  title: 'main',
  routes: [
    {
      id: 1,
      path: FrontendRoutes.HOME,
      title: 'Dashboard',
      icon: 'proicons:home',
    },
    {
      id: 2,
      path: '#',
      title: 'Order Management',
      icon: 'mdi:cart',
      children: [
        { path: FrontendRoutes.NEWORDERS, title: 'New Orders', id: 22 },
        { path: FrontendRoutes.ORDERLIST, title: 'Order List', id: 23 },
        {
          path: FrontendRoutes.COMPLETEDORDERS,
          title: 'Completed Orders',
          id: 24,
        },
        {
          path: FrontendRoutes.CANCELLEDORDERS,
          title: 'Cancelled Orders',
          id: 25,
        },
      ],
    },
    {
      id: 3,
      path: '#',
      title: 'Product Management',
      icon: 'fluent-mdl2:product-variant',
      children: [
        { path: FrontendRoutes.PRODUCTLIST, title: 'Product List', id: 32 },
        { path: FrontendRoutes.CATEGORYLIST, title: 'Category List', id: 33 },
      ],
    },
    {
      id: 4,
      path: '#',
      title: 'Transaction Management',
      icon: 'clarity:dollar-solid',
      children: [
        {
          path: FrontendRoutes.ALLTRANSACTION,
          title: 'All Transactions',
          id: 42,
        },
        {
          path: FrontendRoutes.VERIFY_TRANSACTION,
          title: 'Verify Transactions',
          id: 43,
        },
      ],
    },
    {
      id: 5,
      path: '#',
      title: 'Delivery Management',
      icon: 'mage:delivery-truck',
      children: [
        {
          path: FrontendRoutes.ASSIGN_DELIVERY_PERSON,
          title: 'Assign Delivery Person',
          id: 52,
        },
        {
          path: FrontendRoutes.DELIVERY_PERSON_LIST,
          title: 'Delivery Person list',
          id: 53,
        },
        {
          path: FrontendRoutes.DELIVERYSETTLEMENT,
          title: 'Delivery Settlement',
          id: 54,
        },
        {
          path: FrontendRoutes.DELIVERYCONFIGURATION,
          title: 'Delivery Configuration',
          id: 55,
        },
        {
          path: FrontendRoutes.DELIVERY_PERSON_REQUEST,
          title: 'Delivery Person Requests',
          id: 56,
        },
        {
          path: FrontendRoutes.DELIVERY_LIVE_OVERVIEW,
          title: 'Live Overview',
          id: 56,
        },
      ],
    },
    {
      id: 6,
      path: '#',
      title: 'Inventory Management',
      icon: 'proicons:home',
      children: [
        {
          path: FrontendRoutes.STOCK_OVERVIEW,
          title: 'Stock Overview',
          id: 62,
        },
        {
          path: FrontendRoutes.SUPPLIER,
          title: 'Supplier Management',
          id: 63,
        },
        {
          path: FrontendRoutes.PURCHASE,
          title: 'Purchase Management',
          id: 64,
        },
      ],
    },
    {
      id: 7,
      path: FrontendRoutes.ATTRIBUTE,
      title: 'Attribute',
      icon: 'flowbite:cell-attributes-outline',
    },
    {
      id: 8,
      path: FrontendRoutes.CUSTOMER,
      title: 'Customer',
      icon: 'prime:user',
    },
    {
      id: 9,
      path: '#',
      title: 'Finance & Expense',
      icon: 'fluent:arrow-trending-lines-20-filled',
      children: [
        {
          id: 91,
          path: FrontendRoutes.EXPENSES,
          title: 'Expense',
        },
        {
          id: 91,
          path: FrontendRoutes.CASHFLOW,
          title: 'Cashflow',
        },
        {
          id: 91,
          path: FrontendRoutes.PROFITLOSS,
          title: 'Profit and Loss',
        },
      ],
    },
    {
      id: 10,
      path: '#',
      title: 'Referral & Rewards',
      icon: 'tabler:gift',
      children: [
        {
          path: FrontendRoutes.REFERALMANAGEMENT,
          title: 'Referral Management',
          id: 22,
        },
        { path: FrontendRoutes.LOYALTYPOINTS, title: 'Loyalty Points', id: 23 },
        {
          path: FrontendRoutes.POINTSCONFIGURATION,
          title: 'Point Configuration',
          id: 24,
        },
      ],
    },
    {
      id: 11,
      path: '#reports',
      title: 'Reports',
      icon: 'iconoir:reports',
      children: [
        { path: FrontendRoutes.SALESREPORT, title: 'Sales Report', id: 22 },
        {
          path: FrontendRoutes.DELIVERYREPORT,
          title: 'Delivery Report',
          id: 23,
        },
        { path: FrontendRoutes.ORDERREPORT, title: 'Order Report', id: 24 },
        { path: FrontendRoutes.STOCKREPORT, title: 'Stock Report', id: 25 },
      ],
    },
    {
      id: 12,
      path: FrontendRoutes.BANNER,
      title: 'Banner',
      icon: 'material-symbols-light:planner-banner-ad-pt-outline-rounded',
    },
  ],
};

export const SidebarSettingsRoutes = {
  title: 'Settings',
  routes: [
    {
      id: 111,
      path: '/',
      title: 'Notification',
      icon: 'tdesign:notification',
    },
    {
      id: 2222,
      path: '/',
      title: 'Settings',
      icon: 'ic:outline-settings',
      children: [{ path: '#log-out', title: 'Log Out', id: 22 }],
    },
  ],
};
