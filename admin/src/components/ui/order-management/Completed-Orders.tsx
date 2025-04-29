import {
  HeaderOptions,
  Table,
  TableSearchHeader,
  TableSkeletonLoader,
  TitleBreadCrumb,
} from '../../shared';
import { FilterOptions, OrderManagementBasicSetup } from '../../../constants';
import { useCompletedOrderContext } from '@/contexts/useCompletedOrder';
import { useEffect, useState } from 'react';
import CompletedOrderFilter from '@/components/shared/filterComponents/CompletedOrderFilter';
import { set } from 'zod';
export const CompletedOrders = () => {
  const {
    column,
    isFetching,
    isPending,
    newOrdersList,
    pageDetails,
    setPaginationDetails,
  } = useCompletedOrderContext();
  console.log(newOrdersList);
  const[showFilter, setShowFilter] = useState(false);
  const[orderlist,setorderlist] = useState(newOrdersList);

  useEffect(() => {
    setorderlist(newOrdersList);
  }, [newOrdersList]);

  return (
    <div className="flex flex-col pl-7 pr-8 gap-6" id="parent">
      <TitleBreadCrumb
        breadcrumbData={
          OrderManagementBasicSetup().completedOrdersBreadcrumbData
        }
        title="Completed Orders"
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
        {
          showFilter && (
            <CompletedOrderFilter
            originalOrder={newOrdersList}
            setOrder={setorderlist}
            setPaginationDetails={setPaginationDetails} 
            />
          )
        }
        {isPending || isFetching ? (
          <TableSkeletonLoader/>
        ) : (
          <div className="p-4">
            <Table
              columns={column}
              data={orderlist}
              showView
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
