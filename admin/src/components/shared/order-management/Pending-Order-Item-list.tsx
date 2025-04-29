import { OrderItemDetails } from '../../../(___types)';
import { Table } from '../Table';
import { Text } from '../Text';

interface pendingOrderItemListPropTypes {
  orderItemDetails?: OrderItemDetails[];
}

export const PendingOrderItemList = ({
  orderItemDetails,
}: pendingOrderItemListPropTypes) => {
  const column = [
    {
      key: 'orderId',
      header: 'Item',
      render: (_: any, orderItemDetails: any) => {
        return (
          <div className="flex place-items-center  w-full gap-2">
            <section>
              <img
                src={`https://api-bhansa.webstudiomatrix.com/${orderItemDetails?.product?.images[0]}`}
                alt=""
                className="w-8 h-8 rounded"
              />
            </section>
            <section className="flex flex-col text-sm text-fade-black">
              <span>{orderItemDetails?.product?.name}</span>
              <span>{orderItemDetails?.product?.productCategory}</span>
            </section>
          </div>
        );
      },
    },
    { key: 'quantity', header: 'quantity', width: '90px' },
    {
      header: 'Unit Price (Rs)',
      key: '',
      render: (_: any, orderItemDetails: any) => {
        return <span>Rs. {orderItemDetails?.product?.sellingPrice}</span>;
      },
      width: '90px',
    },
    {
      key: '',
      header: 'Total Price',
      width: '90px',
      render: (_: any, orderItemDetails: any) => {
        const quantity = orderItemDetails?.quantity;
        const basePrice = orderItemDetails?.product?.sellingPrice;
        return <span>Rs. {quantity * basePrice}</span>;
      },
    },
    {
      key: 'availabilityStatus',
      header: 'Availability Status',
      width: '90px',
      render: (_: any, orderItemDetails: any) => {
        const reorderPoint =
          orderItemDetails?.product?.inventoryDetails?.reorderPoint;
        const totalRemainingStock =
          orderItemDetails?.product?.inventoryDetails?.remainingStock;
        const status =
          totalRemainingStock > reorderPoint
            ? 'In Stock'
            : totalRemainingStock === 0
              ? 'Out of Stock'
              : 'Low Stock';
        return (
          <span
            className={`px-2   ${
              status === 'In Stock'
                ? 'bg-fade-green text-parrot rounded'
                : status === 'Out of Stock'
                  ? 'bg-grey-extra rounded text-white py-1'
                  : 'bg-orange rounded text-white py-1'
            }`}
          >
            {status}
          </span>
        );
      },
    },
  ];
  return (
    <div className="flex flex-col shadow-sm  rounded-lg bg-white">
      <section className="flex place-items-center gap-2 border-b border-grey-100 py-5 px-6">
        <Text variant="fade-black" size="body-md-lg">
          Order Items
        </Text>
      </section>
      <section>
        <Table
          columns={column}
          data={orderItemDetails ?? ([] as unknown as any)}
          showAction={false}
        />
      </section>
    </div>
  );
};
