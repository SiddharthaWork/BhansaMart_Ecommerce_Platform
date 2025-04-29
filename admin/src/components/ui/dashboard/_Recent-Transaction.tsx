import { DateFormatter } from '@/utils/DateFormatter';
import { Table } from '../../shared';
import { _TitleLinkOptions } from './_Title-Link-Options';

interface _recentTransactionPropTypes {
  data: {
    _id: string;
    id: string;
    date: Date | string;
    amount: string | number;
    paymentStatus: string;
    paymentMethod: string;
    customerName: string;
  }[];
}
export const _RecentTransaction = ({ data }: _recentTransactionPropTypes) => {
  const column = [
    {
      key: 'transactionId',
      header: 'Transaction Id',
      render: (_: any, data: any) => {
        return <span>T-{data?.id?.slice(0, 5)}</span>;
      },
    },
    {
      key: 'customerName',
      header: 'Customer Name',
    },

    {
      key: 'date',
      header: 'Order Date',
      render: (_: any, data: any) => {
        const date = DateFormatter(data?.date);

        return (
          <span>
            {date && !isNaN(date.getTime())
              ? date.toLocaleDateString('en-US', {
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
      key: 'amount',
      header: 'Total Amount',
      render: (_: any, data: any) => {
        return (
          <div>
            <span className="text-lime-green">Rs. {data?.amount}</span>
          </div>
        );
      },
    },
  ];
  return (
    <div className="flex flex-col p-6 border border-lynch-50 shadow-sm rounded gap-6 bg-white">
      <_TitleLinkOptions
        title="Recent Transaction"
        linkTitle="View All"
        path="/transaction"
      />
      <section className="h-[300px] overflow-scroll">
        <Table
          columns={column}
          data={data}
          showAction={false}
          showSelectAll={false}
        />
      </section>
    </div>
  );
};
