import { useState } from 'react';
import { FilterOptions, OrderManagementBasicSetup } from '../../../constants';
import {
  HeaderOptions,
  Table,
  TableSearchHeader,
  TitleBreadCrumb,
} from '../../shared';
import { IOrder } from '@/(___types)';
import { useDeleteOrder } from '@/server-action/api/order';

interface _cancelledOrderData {
  order: IOrder[];
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
  showFilter: boolean;
  setShowFilter: React.Dispatch<React.SetStateAction<boolean>>;
  isPending: boolean;
  isFetching: boolean;
}

export const CancelledOrders = ({
  order,
  paginationDetails,
  setPaginationDetails,
  showFilter,
  setShowFilter,
  isFetching,
  isPending,
}: _cancelledOrderData) => {
  const { mutateAsync: deleteOrder } = useDeleteOrder();

  const handleDeleteOrder = async (id: string) => {
    await deleteOrder(id);
  };

  return (
    <div className="flex flex-col pl-7 pr-8 gap-6" id="parent">
      <TitleBreadCrumb
        breadcrumbData={
          OrderManagementBasicSetup().cancelledOrderBreadcrumbData
        }
        title="Cancelled Orders"
      />

      <HeaderOptions
        filterOptions={FilterOptions}
        filterTitle="Sort By"
        secondButtonIcon="fontisto:export"
        secondButtonTitle="Export all order"
      />

      <section className="bg-white rounded-lg shadow-sm" id="table-search">
        <TableSearchHeader />
        {/* {showFilter && <OrderFilter onApplyFilter={applyFilters} />} */}

        {/* <div className="flex place-items-center gap-2 p-4">
              <section className="flex flex-col gap-2">
                <Text>Order Id</Text>
              </section>
            </div> */}

        <div className="p-4">
          <Table
            columns={OrderManagementBasicSetup().cancelledOrderTableColumn}
            data={order}
            paginationDetails={paginationDetails}
            showPagination
            showAction
            showView
            showDelete
            deleteRow={(row) => handleDeleteOrder(row?._id)}
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
        </div>
      </section>
    </div>
  );
};
