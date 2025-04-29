import { _User } from '@/(___types)';
import { Table, TableSearchHeader, TitleBreadCrumb } from '../..';
import { FrontendRoutes, OrderManagementBasicSetup } from '../../../constants';
import { TableSkeletonLoader } from '@/components/shared';

const columns = [
  {
    key: '_id',
    header: 'Customer ID',
    width: '120px',
    render: (_: any, data: any) => {
      return <span>C-{data?._id?.slice(0, 5)}</span>;
    },
  },
  { key: 'name', header: 'Customer Name', width: '120px' },
  { key: 'referralCode', header: 'Referral Code', width: '120px' },
  {
    key: 'successfulReferrals',
    header: 'No. of Successful Referrals',
    width: '120px',
    render: (_: any, data: any) => {
      return <span>{data?.referredUsers?.length}</span>;
    },
  },
];

const newOrderBreadcrumbData = [
  {
    label: 'Dashboard',
    path: FrontendRoutes.HOME,
  },
  {
    label: 'Referral & Rewards',
    path: '#',
  },
  {
    label: 'Referral Management',
    path: FrontendRoutes.REFERALMANAGEMENT,
  },
];

interface _referralManagepropTypes {
  user: _User[];
  paginationDetails?: {
    currentPage: number;
    limit: number;
    totalCount: number;
  };
  setPaginationDetails?: React.Dispatch<
    React.SetStateAction<{
      page: number;
      limit: number;
    }>
  >;
  isLoading: boolean;
  refetch: () => void;
}

export const ReferalManagement = ({
  user,
  paginationDetails,
  setPaginationDetails,
  isLoading,
}: _referralManagepropTypes) => {
  return (
    <div className="flex flex-col pl-7 pr-8 gap-6" id="parent">
      <TitleBreadCrumb
        breadcrumbData={newOrderBreadcrumbData}
        title="Referral Management"
      />

      <section className="bg-white rounded-lg shadow-sm" id="table-search">
        <TableSearchHeader />
        {isLoading ? (
          <TableSkeletonLoader />
        ) : (
          <Table
            data={user ?? []}
            columns={columns}
            showSelectAll={false}
            showAction={false}
            showPagination
            paginationDetails={paginationDetails}
            onItemsPerPageChange={(page) =>
              setPaginationDetails?.({
                limit: page,
                page: paginationDetails?.currentPage ?? 1,
              })
            }
            onPageChange={(page) => {
              setPaginationDetails?.({
                limit: paginationDetails?.limit ?? 10,
                page,
              });
            }}
          />
        )}
      </section>
    </div>
  );
};
