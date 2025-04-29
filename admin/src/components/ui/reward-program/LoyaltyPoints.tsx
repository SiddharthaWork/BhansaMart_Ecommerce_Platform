import { ICustomer } from '@/(___types)/_type-customer';
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
  {
    key: 'loyaltyPoints',
    header: 'Available Points',
    width: '120px',
    render: (_: any, data: any) => {
      return <span>{data?.loyaltyPoints ? data?.loyaltyPoints : 0}</span>;
    },
  },
];

interface loyaltyPointsPropTypes {
  customer?: ICustomer[];
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
}

const newOrderBreadcrumbData = [
  {
    label: 'Dashboard',
    path: FrontendRoutes.HOME,
  },
  {
    label: 'Referral & Rewards',
    path: "#",
  },
  {
    label: 'Loyalty Points',
    path: FrontendRoutes.LOYALTYPOINTS,
  },
];

export const LoyaltyPoints = ({
  paginationDetails,
  customer,
  setPaginationDetails,
  isLoading
}: loyaltyPointsPropTypes) => {
  return (
    <div className="flex flex-col pl-7 pr-8 gap-6" id="parent">
      <TitleBreadCrumb
        breadcrumbData={newOrderBreadcrumbData}
        title="Loyalty Points"
      />

      <section className="bg-white rounded-lg shadow-sm" id="table-search">
        <TableSearchHeader />
      {isLoading ? (
        <TableSkeletonLoader/>
      ) : (
        <Table
        data={customer ?? []}
        columns={columns}
        showSelectAll={false}
        showAction={false}
        />
      )}
      </section>
    </div>
  );
};
