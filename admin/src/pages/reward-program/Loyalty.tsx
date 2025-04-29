import { useFetchuserByRole } from '@/server-action/api/user';
import { LoyaltyPoints } from '../../components/ui/reward-program/LoyaltyPoints';
import { useState } from 'react';
import { ICustomer } from '@/(___types)/_type-customer';

export const LoyaltyPage = () => {
  const [paginationDetails, setPaginationDetails] = useState({
    page: 1,
    limit: 10,
  });

  const { data: userData, isLoading } = useFetchuserByRole(
    paginationDetails.page,
    paginationDetails.limit,
    'customer'
  );

  const paginationDetail = {
    currentPage: paginationDetails.page,
    limit: paginationDetails.limit,
    totalCount: userData?.getUsersByRole.totalCount as number,
  };

  return (
    <div>
      <LoyaltyPoints
        customer={
          (userData?.getUsersByRole.users as unknown as ICustomer[]) ?? []
        }
        paginationDetails={paginationDetail}
        setPaginationDetails={setPaginationDetails}
        isLoading={isLoading}
      />
    </div>
  );
};
