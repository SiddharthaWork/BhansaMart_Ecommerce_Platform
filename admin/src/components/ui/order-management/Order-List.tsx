import {
  HeaderOptions,
  Table,
  TableSearchHeader,
  TableSkeletonLoader,
  TitleBreadCrumb,
} from '../../shared';
import {
  FilterOptions,
  FrontendRoutes,
  OrderManagementBasicSetup,
} from '../../../constants';
import { useNavigate } from 'react-router-dom';
import { useConfirmOrderContext } from '@/contexts/useConfirmOrderList';
import OrderListFilter from '@/components/shared/filterComponents/OrderListFilter';

export const OrderList = () => {
  const {
    column,
    isFetching,
    isPending,
    setPaginationDetails,
    pageDetails,
    newOrdersList,
    showFilter,
    setShowFilter,
    setNewOrderList,
  } = useConfirmOrderContext();
  const nav = useNavigate();
  console.log(newOrdersList);
  return (
    <div className="flex flex-col pl-7 pr-8 gap-6" id="parent">
      <TitleBreadCrumb
        breadcrumbData={OrderManagementBasicSetup().orderListBreadcrumbData}
        title="Order List"
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
     
          <OrderListFilter
            newOrdersList={newOrdersList}
            setNewOrderData={setNewOrderList}
            setPaginationDetails={setPaginationDetails}
          />  
        )}

        {isPending || isFetching ? (
          <TableSkeletonLoader />
        ) : (
          <div className="p-4">
            <Table
              columns={column}
              data={newOrdersList}
              showEdit
              showView
              editRow={(row) => {
                nav(`${FrontendRoutes.ORDERTRACKING}/${row._id}#order-action`);
              }}
              viewRow={(row: any) =>
                nav(`${FrontendRoutes.ORDERTRACKING}/${row._id}`)
              }
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
};
