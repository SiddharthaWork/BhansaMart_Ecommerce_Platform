import { InventoryManagementBaiscSetup } from '@/constants/(inventory-management)/InventoryManagementBaiscSetup';
import { TableSearchHeader } from '../../../shared/order-management/Table-Search-Header';
import { Table } from '../../../shared/Table';
import { TitleBreadCrumb } from '../../../shared/Title-Breadcrumb';
import { Modal, TableSkeletonLoader } from '@/components/shared';
import { memo, useEffect, useState } from 'react';
import StockDetails from '../(suppliers)/StockDetails';
import { useStockOverview } from '@/contexts/useStockOverView';
import { useOutsideClick } from '@/hooks/UseOutsideClick';
import { IProduct } from '@/(___types)';
import StockOverviewFilter from '@/components/shared/filterComponents/StockOverviewFilter';

export const StockOverview = memo(() => {
  const {
    showFilter,
    setShowFilter,
    isPending,
    isLoading,
    setStockOverview,
    stockOverview,
    setSingleStockPreview,
    singleStockPreview,
    setPaginationDetails,
    paginationDetails,
    columns,
  } = useStockOverview();

  const [stockdata, setstockdata] = useState(stockOverview || []);

  useEffect(() => {
    setstockdata(stockOverview || []);
  }, [stockOverview]);

  const [modal, setModal] = useState<boolean | null>(null);
  const _assignRef = useOutsideClick(() => setModal(null));
  return (
    <div className="flex flex-col pl-7 pr-8 gap-6" id="parent">
      <TitleBreadCrumb
        breadcrumbData={InventoryManagementBaiscSetup().StockOverviewData}
        title="Stock Overview"
      />
      <section className="bg-white rounded-lg shadow-sm" id="table-search">
        <TableSearchHeader onFilterClick={() => setShowFilter(!showFilter)} 
          filterKey='name'
          originalData={stockdata || []}
          setFilteredData={setstockdata}
          setPagination={setPaginationDetails}
          onSearchChange={undefined}
          />

        {showFilter && (
          <div className="w-full">
            <StockOverviewFilter
            originalProduct={stockdata || []}
            setPaginationDetails={setPaginationDetails}
            setNewProductData={setstockdata}
            />
          </div>
        )}
        {isLoading ? (
          <TableSkeletonLoader />
        ) : (
          <Table
            showAction={true}
            showView
            data={stockdata || []}
            columns={columns}
            showPagination
            viewRow={(row) => {
              setSingleStockPreview(row as IProduct);
              setModal(true);
            }}
            paginationDetails={paginationDetails}
            onItemsPerPageChange={(page) =>
              setPaginationDetails?.({
                limit: page,
                currentPage: paginationDetails?.currentPage ?? 1,
              })
            }
            onPageChange={(page) => {
              setPaginationDetails?.({
                limit: paginationDetails?.limit ?? 10,
                currentPage: page,
              });
            }}
          />
        )}
      </section>

      {modal && (
        <Modal ref={_assignRef} classname="overflow-scroll w-[50rem]">
          <StockDetails
            stockId={singleStockPreview?._id ?? ''}
            onClose={() => setModal(false)}
          />
        </Modal>
      )}
    </div>
  );
});
