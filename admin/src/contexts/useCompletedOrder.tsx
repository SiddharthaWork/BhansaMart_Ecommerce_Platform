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
import { DateFormatter } from '@/utils/DateFormatter';

export interface PaginationDetails {
  currentPage: number;
  limit: number;
  totalCount?: number;
}

export interface OrderContextProps {
  newOrdersList: IOrder[];
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

const CompletedOrderContext = createContext<OrderContextProps | null>(null);

export const CompletedOrderProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
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
    'delivered'
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
      key: '_id',
      header: 'Order Id',
      width: '290px',
      render: (_: any, data: any) => {
        return <span>O-{data?._id?.slice(0, 5)}</span>;
      },
    },
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
    { key: 'Total Amount', header: 'Total Amount', width: '90px' },
    { key: 'Delivery Date', header: 'Delivery Date', width: '90px' },
    { key: 'Delivery Personnel', header: 'Delivery Personnel', width: '90px' },
    { key: 'Feedback Rating', header: 'Feedback Rating', width: '90px' },
  ];

  return (
    <CompletedOrderContext.Provider
      value={{
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
    </CompletedOrderContext.Provider>
  );
};

export const useCompletedOrderContext = () => {
  const context = useContext(CompletedOrderContext);
  if (!context) {
    throw new Error('useOrderContext must be used within an OrderProvider');
  }
  return context;
};
