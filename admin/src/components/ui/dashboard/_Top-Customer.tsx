import { useFetchTopCustomersTopDrivers } from '@/server-action/api/dashboard';
import { Table } from '../../shared';
import { _TitleLinkOptions } from './_Title-Link-Options';

export const _TopCustomer = () => {
  const { data: topCustomerData } = useFetchTopCustomersTopDrivers();
  console.log(topCustomerData?.getOrderAnalytics?.topCustomers);
  const column = [
    {
      key: 'customerName',
      header: 'Customer Name',
      render: (_: any, data: any) => {
        return (
          <div className="flex place-items-center gap-2">
            <img
              src={
                data?.image
                  ? `https://api-bhansa.webstudiomatrix.com/${data?.images}`
                  : '/avatar.png'
              }
              alt=""
              className="w-8 h-8 rounded-full"
            />
            <section className="flex flex-col ">
              <span>{data?.customerName}</span>
              <span className="text-grey-300 text-sm">
                {data?.totalOrders} Purchases
              </span>
            </section>
          </div>
        );
      },
    },

    {
      key: 'totalAmount',
      header: 'Total Amount',
    },
    {
      key: 'loyaltyPoints',
      header: 'Loyalty Points',
    },
  ];

  return (
    <div className="flex flex-col p-6 border border-lynch-50 shadow-sm rounded gap-6 bg-white">
      <_TitleLinkOptions
        title="Top Customers"
        linkTitle="View All"
        path="/customerlist"
      />

      <Table
        columns={column}
        data={topCustomerData?.getOrderAnalytics?.topCustomers ?? []}
        showAction={false}
        showBg={false}
        showSelectAll={false}
        hasPadding={false}
      />
    </div>
  );
};
