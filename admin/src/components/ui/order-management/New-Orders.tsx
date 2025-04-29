import {
  FilterOptions,
  FrontendRoutes,
  OrderManagementBasicSetup,
} from '../../../constants';
import {
  Table,
  TitleBreadCrumb,
  TableSearchHeader,
  HeaderOptions,
  TableSkeletonLoader,
} from '../../shared';
import { TableData } from '../../shared/Table';
import { useNavigate } from 'react-router-dom';
import OrderFilter from '@/components/shared/filterComponents/OrderFilter';
import { memo } from 'react';
import { useOrderContext } from '@/contexts/useNewOrders';

export const NewOrders = memo(() => {
  const {
    newOrdersList,
    pageDetails,
    setPaginationDetails,
    showFilter,
    setShowFilter,
    isPending,
    isFetching,
    column,
    setNewOrderList,
    originalOrderList
  } = useOrderContext();

  const nav = useNavigate();

  return (
    <div className="flex flex-col pl-7 pr-8 gap-6" id="parent">
      <TitleBreadCrumb
        title="New Orders"
        breadcrumbData={OrderManagementBasicSetup().newOrderBreadcrumbData}
      />

      <HeaderOptions
        filterOptions={FilterOptions}
        filterTitle="Sort By"
        secondButtonIcon="fontisto:export"
        secondButtonTitle="Export all order"
      />

      <section className="bg-white rounded-lg shadow-sm" id="table-search">
        <TableSearchHeader
          onFilterClick={() => setShowFilter((prev) => !prev)}
        />

        {showFilter && (
          <OrderFilter
            newOrdersList={newOrdersList}
            setNewOrderData={setNewOrderList}
            setPaginationDetails={setPaginationDetails}
            originalOrderList={originalOrderList as any }
          />
        )}

        {isPending || isFetching ? (
          <TableSkeletonLoader />
        ) : (
          <div className="p-4">
            <Table
              columns={column}
              data={newOrdersList}
              showView
              showEdit
              viewRow={(row: TableData) =>
                nav(`${FrontendRoutes.ORDERVERIFY}/${row._id}`)
              }
              editRow={(row) => {
                nav(`${FrontendRoutes.ORDERVERIFY}/${row._id}#order-action`);
              }}
              showPagination
              paginationDetails={pageDetails}
              onItemsPerPageChange={(page) =>
                setPaginationDetails?.({
                  limit: page,
                  currentPage: pageDetails?.currentPage ?? 1,
                })
              }
              onPageChange={(page) => {
                setPaginationDetails?.({
                  limit: pageDetails?.limit ?? 10,
                  currentPage: page,
                });
              }}
            />
          </div>
        )}
      </section>
    </div>
  );
});
