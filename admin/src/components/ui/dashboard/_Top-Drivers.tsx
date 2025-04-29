import { useFetchTopCustomersTopDrivers } from '@/server-action/api/dashboard';
import { Table } from '../../shared';
import { _TitleLinkOptions } from './_Title-Link-Options';

export const _TopDriver = () => {
  const { data: topDrivers } = useFetchTopCustomersTopDrivers();
  console.log(topDrivers?.getOrderAnalytics?.topDrivers);
  const column = [
    {
      key: 'driverName',
      header: 'Driver Name',
      render: (_: any, data: any) => {
        return (
          <div className="flex place-items-center gap-2">
            <img
              src={
                data?.images
                  ? `https://api-bhansa.webstudiomatrix.com/${data?.images}`
                  : '/avatar.png'
              }
              alt=""
              className="w-8 h-8 rounded-full"
            />
            <section className="flex flex-col ">
              <span>{data?.driverName}</span>
              <span className="text-grey-300 text-sm">
                {data?.totalOrdersDelivered} Delivered
              </span>
            </section>
          </div>
        );
      },
    },

    {
      key: 'phone',
      header: 'Phone Number',
    },
    {
      key: 'totalAmountDelivered',
      header: 'Total Amount',
      render: (_: any, data: any) => {
        return <span>Rs. {data?.totalAmountDelivered}</span>;
      },
    },
  ];

  return (
    <div className="flex flex-col p-6 border border-lynch-50 shadow-sm rounded gap-6 bg-white">
      <_TitleLinkOptions
        title="Drivers"
        linkTitle="View All"
        path="/delivery-person-list"
      />
      <Table
        columns={column}
        data={topDrivers?.getOrderAnalytics?.topDrivers ?? []}
        showBg={false}
        showAction={false}
        showSelectAll={false}
        hasPadding={false}
      />
    </div>
  );
};
