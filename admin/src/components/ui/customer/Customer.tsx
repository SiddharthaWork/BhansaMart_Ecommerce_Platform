import { useNavigate } from 'react-router-dom';
import {
  HeaderOptions,
  Table,
  TableSearchHeader,
  TitleBreadCrumb,
} from '../..';
import { FrontendRoutes, OrderManagementBasicSetup } from '../../../constants';
import { FilterOptions } from '../../../constants/Filter-Options';
import { memo, useEffect, useState } from 'react';
import { _User } from '@/(___types)';
import { useFetchuserByRole } from '@/server-action/api/user';
import { useDeleteCustomer } from '@/server-action/api/customer';
import { TableSkeletonLoader } from '@/components/shared';
import { DateFormatter } from '@/utils/DateFormatter';
import CustomerFilter from '@/components/shared/filterComponents/CustomerFilter';

export const Customer = memo(() => {
  const[showFilter, setShowFilter] = useState(false);
  const { mutate: deleteCustomer } = useDeleteCustomer();


  const handleDeleteCustomer = (id: string) => {
    deleteCustomer(id);
  };
  const [paginationDetails, setPaginationDetails] = useState({
    page: 1,
    limit: 10,
  });

  const { data: customerData, isLoading, error } = useFetchuserByRole(
    paginationDetails.page,
    paginationDetails.limit,
    'customer'
  );

  const [users, setUsers] = useState<_User[]>([]);
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    if (customerData?.getUsersByRole) {
      setUsers(customerData.getUsersByRole.users);
      setTotalCount(customerData.getUsersByRole.totalCount);
    }
  }, [customerData]);

  const paginationDetail = {
    currentPage: paginationDetails.page,
    limit: paginationDetails.limit,
    totalCount: totalCount,
  };

  const columns = [
    {
      key: 'customername',
      header: 'Customer Name',
      width: '290px',
      render: (_: any, customer: any) => (
        <div className="flex place-items-center gap-2">
          <img
            src={
              customer?.image
                ? `https://api-bhansa.webstudiomatrix.com/${customer?.image}`
                : '/avatar.png'
            }
            className="w-8 h-8 rounded-full"
            alt="Customer"
          />
          <section className="flex flex-col">
            <span className="text-fade-black text-sm">{customer?.name}</span>
            <span className="text-lynch-400 text-sm">
              {customer?._id?.slice(0, 5)}
            </span>
          </section>
        </div>
      ),
    },
    {
      key: 'email',
      header: 'Email',
      width: '90px',
      render: (_: any, customer: any) => <span>{customer.email}</span>,
    },

    {
      key: 'location',
      header: 'Location',
      width: '90px',
      render: (_: any, customer: any) => (
        <span className="truncate line-clamp-2 ">
          {customer.address?.slice(0, 10)}...
        </span>
      ),
    },

    {
      key: 'orders',
      header: 'Orders',
      width: '90px',
      render: (_: any, customer: any) => <span>{customer.orders?.length}</span>,
    },
    {
      key: 'spent',
      header: 'Spent (Rs)',
      width: '90px',
      render: (_: any, customer: any) => <span>{customer.spent || 0}</span>,
    },
    {
      key: 'royalty',
      header: 'Royalty Points',
      width: '90px',
      render: (_: any, customer: any) => <span>{customer.royalty || 0}</span>,
    },
    {
      key: 'registered',
      header: 'Registered On',
      width: '90px',
      render: (_: any, customer: any) => {
        const date = DateFormatter(customer?.joinDate);
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
  ];

  const newOrderBreadcrumbData = [
    {
      label: 'Dashboard',
      path: FrontendRoutes.HOME,
    },
    {
      label: 'Customer List',
      path: FrontendRoutes.CUSTOMER,
    },
  ];

  const nav = useNavigate();

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="flex flex-col pl-7 pr-8 gap-6" id="parent">
      <TitleBreadCrumb
        breadcrumbData={newOrderBreadcrumbData}
        title="Customer List"
      />

      <HeaderOptions
        filterOptions={FilterOptions}
        filterTitle="Sort By"
        secondButtonIcon="fontisto:export"
        secondButtonTitle="Export all order"
      />

      <section className="bg-white rounded-lg shadow-sm" id="table-search">
        <TableSearchHeader onFilterClick={() => setShowFilter(!showFilter)} 
          filterKey='name'
          originalData={users}
          setFilteredData={setUsers}
          setPagination={setPaginationDetails}
          />
          {showFilter && (
            <CustomerFilter
              data={users}
              setcustomerListData={setUsers}
              setPaginationDetails={setPaginationDetails}
            />
          )}

        {isLoading ? (
          <TableSkeletonLoader />
        ) : (
          <Table
            data={users}
            columns={columns}
            showDelete
            showEdit
            showView
            viewRow={(row) =>
              nav(`${FrontendRoutes.VIEWCUSTOMER}/${row._id || ''}`)
            }
            deleteRow={(row) => handleDeleteCustomer(row?._id)}
            showPagination
            paginationDetails={paginationDetail}
            onItemsPerPageChange={(limit) =>
              setPaginationDetails({
                limit: limit,
                page: paginationDetail.currentPage,
              })
            }
            onPageChange={(page: number) =>
              setPaginationDetails({
                limit: paginationDetail.limit,
                page: page,
              })
            }
          />
        )}
      </section>
    </div>
  );
});
