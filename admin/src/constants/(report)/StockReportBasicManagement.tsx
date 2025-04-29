import { FrontendRoutes } from '../Routes';

export const StockReportBasicManagementSetup = () => {
  const stockReportListBreadcrumbData = [
    {
      label: 'Dashboard',
      path: FrontendRoutes.HOME,
    },
    {
      label: 'Reports',
      path: '#',
    },
    {
      label: 'Stock Report',
      path: FrontendRoutes.STOCKREPORT,
    },
  ];

  const tabOptions = [
    {
      label: 'Category-wise',
      value: 'category',
      icon: 'solar:archive-up-linear',
    },
    {
      label: 'Low Stock-wise',
      value: 'stock',
      icon: 'tabler:packages',
    },
  ];

  const categoryTableColumns = [
    {
      key: '',
      header: 'Category',
    },
    {
      key: '',
      header: 'Total Items',
    },
    {
      key: '',
      header: 'Total Stock',
    },
    {
      key: '',
      header: 'Low Stock items',
    },
    {
      key: '',
      header: 'Out of Stock Items',
    },
  ];

  const lowStockTableColumns = [
    {
      key: '',
      header: 'Product Name',
    },
    {
      key: '',
      header: 'Category',
    },
    {
      key: '',
      header: 'Current Stock',
    },
    {
      key: '',
      header: 'Minimum Stock',
    },
    {
      key: '',
      header: 'Status',
    },
  ];

  return {
    stockReportListBreadcrumbData,
    tabOptions,
    categoryTableColumns,
    lowStockTableColumns,
  };
};
