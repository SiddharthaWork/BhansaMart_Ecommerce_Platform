import { Table } from '../../../shared';

const data = [
    {
      deliveryId: 'D-8765',
      orderId: 'O-98765', 
      customerName: 'Adison Philips',
      deliveryDate: '2024-01-02',
      timeTaken: '20 min',
      deliveryPerson: 'Rickey Bush',
      totalCost: '$10,000',
      _id: '1',
    },
    {
      deliveryId: 'D-8373',
      orderId: 'O-12349',
      customerName: 'Nolan Philips',
      deliveryDate: '2024-01-02',
      timeTaken: '20 min', 
      deliveryPerson: 'Lauren Santos',
      totalCost: '$3,000'
      ,_id: '2',
    },
    {
      deliveryId: 'D-2387',
      orderId: 'O-23873',
      customerName: 'Haylie Dorwart',
      deliveryDate: '2024-01-02',
      timeTaken: '20 min',
      deliveryPerson: 'Rickey Bush',
      totalCost: '$800'
      ,_id: '3',
    },
    {
      deliveryId: 'D-9873',
      orderId: 'O-56476',
      customerName: 'Jaylon Dorwart',
      deliveryDate: '2024-01-02',
      timeTaken: '20 min',
      deliveryPerson: 'Lauren Santos',
      totalCost: '$800'
      ,_id: '4',
    }
  ];
  
export const DeliverySummary = () => {

  const columns = [
    {
      key: 'deliveryId',
      header: 'Delivery ID',
      width: '150px',
    },
    {
      key: 'orderId',
      header: 'Order ID',
      width: '150px',
    },
    {
      key: 'customerName',
      header: 'Customer Name',
      width: '150px',
    },
    {
      key: 'deliveryDate',
      header: 'Delivery Date',
      width: '150px',
    },
    {
      key: 'timeTaken',
      header: 'Time Taken',
      width: '100px',
    },
    {
      key: 'deliveryPerson',
      header: 'Delivery Person',
      width: '150px',
    },
    {
      key: 'totalCost',
      header: 'Total Cost',
      width: '150px',
    },
  ];

  return (
    <div>
      <Table
        data={data}
        columns={columns}
        showAction={false}
      />
    </div>
  );
};
