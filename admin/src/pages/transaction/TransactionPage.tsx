import { useFetchOrderByPayment } from '@/server-action/api/order';
import { Transaction } from '../../components/ui/transaction/Transaction';
import { useState } from 'react';

export const TransactionPage = () => {
  const [paginationDetails, setPaginationDetails] = useState({
    page: 1,
    limit: 10,
  });

  const [tab, setTab] = useState('online');

  const handleTabChange = (value: string) => {
    setTab(value);
  };

  const {
    data: paymentInfo,
    isLoading,
    isError,
  } = useFetchOrderByPayment(
    paginationDetails.page,
    paginationDetails.limit,
    tab
  );

  const paginationDetail = {
    currentPage: paginationDetails.page,
    limit: paginationDetails.limit,
    totalCount: paymentInfo?.fetchOrdersByPaymentMethod?.totalCount as number,
  };

  console.log(paymentInfo);
  // console.log(paymentInfo?.FetchOrdersByPaymentMethod?.orders);
  if (isError) {
    return <p>Error loading orders: Something went wrong</p>;
  }

  return (
    <div>
      <Transaction
        data={paymentInfo?.fetchOrdersByPaymentMethod?.orders ?? []}
        tab={tab}
        handleTabChange={handleTabChange}
        isLoading={isLoading}
      />
    </div>
  );
};
