import { useFetchUserByReferal } from '@/server-action/api/user';
import { ReferalManagement } from '../../components/ui/reward-program/ReferalManagement';
import { useState } from 'react';

export const ReferalManagementPage = () => {
  const [paginationDetails, setPaginationDetails] = useState({
    page: 1,
    limit: 10,
  });

  const { data, isLoading, refetch } = useFetchUserByReferal(
    paginationDetails.page,
    paginationDetails.limit
  );

  const paginationDetail = {
    currentPage: paginationDetails.page,
    limit: paginationDetails.limit,
    totalCount: data?.getReferredUsers?.totalCount as number,
  };
  return (
    <div>
      <ReferalManagement
        user={data?.getReferredUsers?.users ?? []}
        paginationDetails={paginationDetail}
        setPaginationDetails={setPaginationDetails}
        isLoading={isLoading}
        refetch={refetch}
      />
    </div>
  );
};
