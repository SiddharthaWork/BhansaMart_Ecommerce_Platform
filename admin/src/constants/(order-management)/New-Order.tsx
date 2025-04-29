import { FrontendRoutes } from '../Routes';

export const OrderManagementBasicSetup = () => {
  // ******new order component's data********
  const newOrderBreadcrumbData = [
    {
      label: 'Dashboard',
      path: FrontendRoutes.HOME,
    },
    {
      label: 'Order Management',
      path: '#',
    },
    {
      label: 'New Orders',
      path: FrontendRoutes.NEWORDERS,
    },
  ];

  const newOrderTableColumn = [
    {
      key: '_id',
      header: 'Order Id',
      width: '290px',
      render: (_: any, data: any) => {
        return <span>{`O-${data?._id?.slice(0, 5)}`}</span>;
      },
    },
    {
      key: 'customername',
      header: 'Customer Name',
      width: '90px',
      render: (_: any, data: any) => {
        return <span>{data?.customer?.name}</span>;
      },
    },
    {
      key: 'orderDate',
      header: 'Order Date',
      width: '90px',
      render: (_: any, data: any) => {
        return (
          <span>
            {data?.orderTimeline?.orderCreated.toString().slice(0, 10)}
          </span>
        );
      },
    },
    { key: 'totalAmount', header: 'Total Amount', width: '90px' },
    {
      key: 'totalItems',
      header: 'Total Items',
      width: '90px',
      render: (_: any, data: any) => {
        const totalQuantity = data?.orderedProducts?.reduce(
          (sum: number, item: any) => sum + item.quantity,
          0
        );
        return <span>{totalQuantity}</span>;
      },
    },
    {
      key: 'deliveryDate',
      header: 'Delivery Date',
      width: '90px',
      render: (_: any, data: any) => {
        return <span>{data?.orderTimeline?.deliveryDate ?? 'Pending'}</span>;
      },
    },
  ];
  // ******end of new order component's data********

  // ******orderVerify  component's data********
  const orderVerifyBreadcrumbData = [
    {
      label: 'Dashboard',
      path: FrontendRoutes.HOME,
    },
    {
      label: 'Order Management',
      path: '#',
    },
    {
      label: 'Order List',
      path: FrontendRoutes.NEWORDERS,
    },
    {
      label: 'Order Tracking',
      path: '#',
    },
  ];
  // ******end-of-orderVerify component's data********

  // ******order-tracking component's data********
  const orderTrackingBreadcrumbData = [
    {
      label: 'Dashboard',
      path: FrontendRoutes.HOME,
    },
    {
      label: 'Order Management',
      path: '#',
    },
    {
      label: 'Order List',
      path: FrontendRoutes.NEWORDERS,
    },
    {
      label: 'Order Tracking',
      path: '#',
    },
  ];
  // ******end-of-order-tracking component's data********

  // ******order list component's data********
  const orderListBreadcrumbData = [
    {
      label: 'Dashboard',
      path: FrontendRoutes.HOME,
    },
    {
      label: 'Order Management',
      path: '#',
    },
    {
      label: 'Order List',
      path: FrontendRoutes.ORDERLIST,
    },
  ];
  // ******end of order list component's data********

  // ******completed orders component's data********
  const completedOrdersBreadcrumbData = [
    {
      label: 'Dashboard',
      path: FrontendRoutes.HOME,
    },
    {
      label: 'Order Management',
      path: '#',
    },
    {
      label: 'Completed Orders',
      path: FrontendRoutes.COMPLETEDORDERS,
    },
  ];

  const completedOrdersTablecolumn = [
    { key: 'Order Id', header: 'Order Id', width: '290px' },
    { key: 'Customer Name', header: 'Customer Name', width: '90px' },
    { key: 'Order Date', header: 'Order Date', width: '90px' },
    { key: 'Total Amount', header: 'Total Amount', width: '90px' },
    { key: 'Delivery Date', header: 'Delivery Date', width: '90px' },
    { key: 'Delivery Personnel', header: 'Delivery Personnel', width: '90px' },
    { key: 'Feedback Rating', header: 'Feedback Rating', width: '90px' },
  ];

  // ******cancelled orders component's data********
  const cancelledOrderBreadcrumbData = [
    {
      label: 'Dashboard',
      path: FrontendRoutes.HOME,
    },
    {
      label: 'Order Management',
      path: '#',
    },
    {
      label: 'Cancelled Orders',
      path: FrontendRoutes.CANCELLEDORDERS,
    },
  ];

  const cancelledOrderTableColumn = [
    { key: 'Order Id', header: 'Order Id', width: '290px' },
    {
      key: 'Customer Name',
      header: 'Customer Name',
      width: '90px',
      render: (_: any, data: any) => {
        return <span>{data?.customer?.name}</span>;
      },
    },
    {
      key: 'Order Date',
      header: 'Order Date',
      width: '90px',
      render: (_: any, data: any) => {
        return (
          <span>
            {data?.orderTimeline?.orderCreated?.toString()?.slice(0, 10)}
          </span>
        );
      },
    },

    {
      key: 'Cancellation Date',
      header: 'Cancellation Date',
      width: '90px',
      render: (_: any, data: any) => {
        return (
          <span>{data?.cancellation?.date?.toString()?.slice(0, 10)}</span>
        );
      },
    },
    {
      key: 'Cancellation Reason',
      header: 'Cancellation Reason',
      width: '90px',
      render: (_: any, data: any) => {
        return (
          <span>{data?.cancellation?.reason?.toString().slice(0, 10)}...</span>
        );
      },
    },
  ];

  return {
    newOrderBreadcrumbData,
    newOrderTableColumn,
    orderListBreadcrumbData,
    completedOrdersBreadcrumbData,
    completedOrdersTablecolumn,
    cancelledOrderBreadcrumbData,
    cancelledOrderTableColumn,
    orderVerifyBreadcrumbData,
    orderTrackingBreadcrumbData,
  };
};
