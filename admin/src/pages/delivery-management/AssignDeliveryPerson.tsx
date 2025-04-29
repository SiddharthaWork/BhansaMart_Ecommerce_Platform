import { useGetOrders } from '@/server-action/api/order';
import { AssignDeliveryPerson } from '../../components';
import { useState } from 'react';

export const AssignDeliveryPersonPage = () => {
  const [paginationDetails, setPaginationDetails] = useState({
    page: 1,
    limit: 10,
  });
  const { data: ordersData, isLoading } = useGetOrders(
    paginationDetails.page,
    paginationDetails.limit,
    'confirmed',
    'unassigned'
  );

  const paginationDetail = {
    currentPage: paginationDetails.page,
    limit: paginationDetails.limit,
    totalCount: ordersData?.getAllOrders?.totalCount as number,
  };

  return (
    <div>
      <AssignDeliveryPerson
        data={ordersData?.getAllOrders?.orders ?? []}
        paginationDetails={paginationDetail}
        setPaginationDetails={setPaginationDetails}
        isLoading={isLoading}
      />
    </div>
  );
};
