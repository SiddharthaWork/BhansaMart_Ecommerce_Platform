import { AllDeliveryPersonRequest } from '@/components/ui/delivery-management/(delivery-person-request)/All-Delivery-Person-Request';
import { useFetchuserByRole } from '@/server-action/api/user';
import { useState } from 'react';

export const AllDeliveryPersonRequestPage = () => {
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
    <AllDeliveryPersonRequest
      driver={deliveryDetail?.getUsersByRole?.users ?? []}
      paginationDetails={paginationDetail}
      setPaginationDetails={setpaginationDetails}
      isLoading={isLoading}
    />
  );
};
