import {
  HeaderOptions,
  Table,
  TableSearchHeader,
  TitleBreadCrumb,
  ViewWithFilter,
  GridView,
  TableSkeletonLoader,
} from '../../shared';
import {
  FilterOptions,
  ShowFilterOptions,
  FrontendRoutes,
  ProductManagementBasicSetup,
} from '../../../constants';
import { memo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IProduct } from '@/(___types)';
import { useDeleteProduct } from '@/server-action/api/product';
import ProductFilter from '@/components/shared/filterComponents/ProductFilter';
import { useProductListContext } from '@/contexts/useProductList';
import { filterActions } from '@/store/globalFilterStore';

export const ProductList = memo(() => {
  const [selectedView, setSelectedView] = useState('list');
  const { mutateAsync: deleteProduct } = useDeleteProduct();

  const handleDelete = async (row: any) => {
    await deleteProduct({
      id: row?._id,
    });
  };

  const {
    column,
    products,
    pageDetails,
    isFetching,
    setPaginationDetails,
    showFilter,
    setShowFilter,
    setNewProductData,
    originalProducts,
  } = useProductListContext();
  console.log(products);
  const nav = useNavigate();
  const [sshowFilter, ssetShowFilter] = useState(false);
  const handleFilterClick = () => {
    ssetShowFilter((prev) => !prev);
  };

  return (
    <div className="flex flex-col pl-7 pr-8 gap-6" id="parent">
      <TitleBreadCrumb
        breadcrumbData={ProductManagementBasicSetup().productListbreadcrumbData}
        title="Product List"
      />

      <section
        className="flex place-items-center justify-between "
        id="filter-export"
      >
        <ViewWithFilter
          selectedView={selectedView}
          setSelectedView={setSelectedView}
          // filterOption={[]}
        />

        <HeaderOptions
          filterOptions={FilterOptions}
          filterTitle="Sort By"
          secondButtonIcon="ic:baseline-plus"
          secondButtonTitle="Add Product"
          onSecondButtonOnClick={() => nav(FrontendRoutes.ADDPRODUCT)}
          secondButtonBGColor="primary-blue"
        />
      </section>
      {isFetching ? (
        <TableSkeletonLoader />
      ) : (
        <section className="bg-white rounded-lg shadow-sm" id="table-search">
          <TableSearchHeader 
            onFilterClick={handleFilterClick}
            filterKey="name"
            originalData={originalProducts || []}
            setFilteredData={setNewProductData}
            setPagination={setPaginationDetails}
            showfilter={true}
            onSearchChange={undefined}
          />
          {sshowFilter && (
            <ProductFilter
              originalProduct={originalProducts || []}
              newProductList={products || []}
              setNewProductData={setNewProductData}
              setPaginationDetails={setPaginationDetails}
            />
          )}
          {selectedView === 'list' ? (
            <div className="mt-4  m-auto">
              <Table
                columns={column as any}
                data={products ?? []}
                showAction
                // showToggle
                showView
                showEdit
                // onToggle={() => {}}
                showDelete
                editRow={(row) =>
                  nav(`${FrontendRoutes.ADDPRODUCT}/${row?._id}`)
                }
                viewRow={(row) =>
                  nav(`${FrontendRoutes.VIEWPRODUCT}/${row?._id}`)
                }
                deleteRow={(row: any) => handleDelete(row)}
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
                    totalCount: pageDetails?.totalCount,
                  });
                }}
              />
            </div>
          ) : (
            <GridView
              products={products || []}
              paginationDetails={pageDetails}
              setPaginationDetails={setPaginationDetails}
            />
          )}
        </section>
      )}
    </div>
  );
});
