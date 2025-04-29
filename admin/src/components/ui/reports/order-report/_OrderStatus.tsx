import { Table } from '../../../shared';

const data = [
  { status: 'Completed', totalOrders: 150, percentage: '760%',_id: '1' },
  { status: 'Pending', totalOrders: 50, percentage: '15%', _id: '2' },
  { status: 'Cancelled', totalOrders: 20, percentage: '5%', _id: '3' },
  { status: 'In Delivery', totalOrders: 30, percentage: '30%', _id: '4' },
];

export const OrderStatus = () => {
  const columns = [
    { key: 'status', header: 'Status', width: '200px' },
    { key: 'totalOrders', header: 'Total Orders', width: '200px' },
    { key: 'percentage', header: 'Percentage', width: '200px' },
  ];

  return (
    <div>
      <Table data={data} columns={columns} showAction={false} />
    </div>
  );
};
