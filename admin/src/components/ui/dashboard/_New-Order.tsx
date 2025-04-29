import { useGetOrders } from '@/server-action/api/order';
import { Table } from '../../shared';
import { _TitleLinkOptions } from './_Title-Link-Options';
import { DateFormatter } from '@/utils/DateFormatter';

export const _NewOrder = () => {
  const { data: orderData } = useGetOrders(1, 5, 'pending');

  const column = [
    {
      key: 'orderId',
      header: 'Order Id',
      render: (_: any, data: any) => {
        return (
          <span className="text-primary-blue">O-{data?._id?.slice(0, 5)}</span>
        );
      },
    },
    {
      key: 'customerName',
      header: 'Customer Name',
      render: (_: any, data: any) => {
        return <span>{data?.customer?.name}</span>;
      },
    },
    {
      key: 'orderDate',
      header: 'Order-Date',
      render: (_: any, data: any) => {
        const date = DateFormatter(data?.orderTimeline?.orderCreated);
        return (
          <span>
            {date && !isNaN(date.getTime())
              ? date.toLocaleString('en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                })
              : 'Invalid Date'}
          </span>
        );
      },
    },
    {
      key: 'totalAmount',
      header: 'Total Amount',
      render: (_: any, data: any) => {
        return <span>Rs. {data?.totalAmount}</span>;
      },
    },
    {
      key: 'totalItems',
      header: 'Total Items',
      render: (_: any, data: any) => {
        const totalOrder = data?.orderedProducts?.reduce(
          (total: any, item: any) => total + item.quantity,
          0
        );
        return <span>{totalOrder}</span>;
      },
    },
  ];
  return (
    <div className="flex flex-col p-6 border border-lynch-50 shadow-sm rounded gap-6 bg-white h-[400px] overflow-scroll">
      <_TitleLinkOptions
        title="New Orders"
        linkTitle="View All"
        path="/new-orders"
      />

      <Table
        columns={column}
        data={orderData?.getAllOrders?.orders ?? []}
        showAction={false}
        showSelectAll={false}
      />
    </div>
  );
};
