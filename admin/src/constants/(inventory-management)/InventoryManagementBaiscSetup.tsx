import { FrontendRoutes } from '@/constants/Routes';

export const InventoryManagementBaiscSetup = () => {
  const StockOverviewData = [
    {
      label: 'Dashboard',
      path: FrontendRoutes.HOME,
    },
    {
      label: 'Inventory Management',
      path: '#',
    },
    {
      label: 'Stock Overview',
      path: FrontendRoutes.STOCK_OVERVIEW,
    },
  ];

  const SuppelierManagementData = [
    {
      label: 'Dashboard',
      path: FrontendRoutes.HOME,
    },
    {
      label: 'Inventory Management',
      path: '#',
    },
    {
      label: 'Supplier Management',
      path: FrontendRoutes.SUPPLIER_DETAILS,
    },
  ];

  const purchaseManagementData = [
    {
      label: 'Dashboard',
      path: FrontendRoutes.HOME,
    },
    {
      label: 'Inventory Management',
      path: '#',
    },
    {
      label: 'Purchase Management',
      path: FrontendRoutes.PURCHASE,
    },
  ];
  return { StockOverviewData, SuppelierManagementData, purchaseManagementData };
};
