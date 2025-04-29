import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from 'react';
import { useGetOrders } from '@/server-action/api/order';
import { IOrder } from '@/(___types)';
import { TableData } from '@/components/shared/Table';

export interface PaginationDetails {
  currentPage: number;
  limit: number;
  totalCount?: number;
}

export interface OrderContextProps {
  newOrdersList: IOrder[];
  originalOrderList?: IOrder[];
  setNewOrderList: React.Dispatch<React.SetStateAction<IOrder[]>>;
  pageDetails: PaginationDetails;
  setPaginationDetails: React.Dispatch<React.SetStateAction<PaginationDetails>>;
  showFilter: boolean;
  setShowFilter: React.Dispatch<React.SetStateAction<boolean>>;
  isPending: boolean;
  isFetching: boolean;
  column: {
    key: string;
    header: string;
    width?: string;
    render?: (value: any, row: TableData) => React.ReactNode;
  }[];
}

const OrderContext = createContext<OrderContextProps | null>(null);

export const OrderProvider = ({ children }: { children: ReactNode }) => {
  const [showFilter, setShowFilter] = useState(false);

  const [newOrdersList, setNewOrderList] = useState([] as IOrder[]);

  const [paginationDetails, setPaginationDetails] = useState<PaginationDetails>(
    {
      currentPage: 1,
      limit: 10,
    }
  );

  const {
    data: orderData,
    isPending,
    isFetching,
  } = useGetOrders(
    paginationDetails.currentPage,
    paginationDetails.limit,
    'pending',
    'unassigned'
  );

  const pageDetails = {
    currentPage: paginationDetails.currentPage,
    limit: paginationDetails.limit,
    totalCount: orderData?.getAllOrders.totalCount as number,
  };

  useEffect(() => {
    if (orderData && orderData.getAllOrders.orders.length > 0) {
      setNewOrderList(orderData.getAllOrders.orders);
    }
  }, [orderData]);

  const column = [
    {
      key: 'orderId',
      header: 'Order Id',
      width: '290px',
      render: (_: any, data: any) => {
        return <span>O-{data?._id?.slice(0, 5)}</span>;
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
      key: 'status',
      header: 'Status',
      width: '90px',

      render: (_: any, OrdersListItems: any) => (
        <span
          className={`p-1 ${
            OrdersListItems.orderStatus === 'success'
              ? 'bg-fade-green text-parrot rounded'
              : OrdersListItems.orderStatus === 'pending'
                ? 'bg-grey-extra rounded text-grey-400'
                : 'bg-fade-orange rounded text-orange '
          }`}
        >
          {OrdersListItems.orderStatus}
        </span>
      ),
    },
    {
      key: 'deliveryDate',
      header: 'Delivery Date',
      width: '90px',
      render: (_: any, data: any) => {
        return (
          <span>
            {data?.orderTimeline?.deliveryCompletion
              ? data?.orderTimeline?.deliveryCompletion?.toString().slice(0, 10)
              : 'Not Assigned'}
          </span>
        );
      },
    },
  ];

  return (
    <OrderContext.Provider
      value={{
        originalOrderList: orderData?.getAllOrders.orders,
        newOrdersList,
        setPaginationDetails,
        setNewOrderList,
        showFilter,
        setShowFilter,
        isPending,
        isFetching,
        pageDetails,
        column,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};

export const useOrderContext = () => {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error('useOrderContext must be used within an OrderProvider');
  }
  return context;
};
