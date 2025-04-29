import { useState } from 'react';
import { CancelledOrders } from '../../components';
import { useGetOrders } from '@/server-action/api/order';

export const CancelledOrderpage = () => {
  const [showFilter, setShowFilter] = useState(false);
  const [paginationDetails, setPaginationDetails] = useState({
    page: 1,
    limit: 10,
  });

  const {
    data: orderData,
    isPending,
    isFetching,
  } = useGetOrders(
    paginationDetails.page,
    paginationDetails.limit,
    'cancelled'
  );

  const paginationDetail = {
    currentPage: paginationDetails.page,
    limit: paginationDetails.limit,
    totalCount: orderData?.getAllOrders.totalCount as number,
  };
  return (
    <CancelledOrders
      isFetching={isFetching}
      isPending={isPending}
      order={orderData?.getAllOrders.orders ?? []}
      paginationDetails={paginationDetail}
      setPaginationDetails={setPaginationDetails}
      showFilter={showFilter}
      setShowFilter={setShowFilter}
    />
  );
};
