import { useFetchuserByRole } from '@/server-action/api/user';
import { DeliveryPersonList } from '../../components';
import { useState } from 'react';

export const DeliveryPersonListPage = () => {
  const [paginationDetails, setpaginationDetails] = useState({
    page: 1,
    limit: 10,
  });

  const { data: deliveryDetail, isLoading } = useFetchuserByRole(
    paginationDetails.page,
    paginationDetails.limit,
    'driver'
  );

  const paginationDetail = {
    currentPage: paginationDetails.page,
    limit: paginationDetails.limit,
    totalCount: deliveryDetail?.getUsersByRole?.totalCount as number,
  };

  return (
    <DeliveryPersonList
      data={deliveryDetail?.getUsersByRole?.users ?? []}
      paginationDetails={paginationDetail}
      setPaginationDetails={setpaginationDetails}
      isLoading={isLoading}
    />
  );
};
