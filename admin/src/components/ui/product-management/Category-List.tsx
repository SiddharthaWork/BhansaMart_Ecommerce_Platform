import { useState } from 'react';
import {
  Table,
  SideModal,
  TitleBreadCrumb,
  TableSearchHeader,
  TableSkeletonLoader,
  Loader,
  HeaderOptions,
} from '../../shared';
import { AddCategory } from './Add-Category';
import { useDeleteCategory } from '@/server-action/api/category';
import { useCategoryList } from '@/contexts/useCategoryList';

export const CateogryList = () => {
  const {
    categoryDetails,
    setCategoryDetails,
    categoryDetail,
    setCategoryDetail,
    isLoading,
    isFetching,
    column,
    setShowModal,
    showModal,
    setSelectedSubCategoryName,
  } = useCategoryList();
  const { mutateAsync: deleteCategory, isPending: deletePending } =
    useDeleteCategory();

  const handleDelete = async (row: any) => {
    const res = await deleteCategory({ id: row?._id });
    if (res.data?.success) {
    }
  };

  return (
    <div className="flex flex-col pl-7 pr-8 gap-6" id="parent">
      {deletePending && <Loader titleName="Deleting Category" />}
      <TitleBreadCrumb title="Category List" />
      <HeaderOptions
        // filterOptions={FilterOptions}
        filterTitle="Sort By"
        secondButtonIcon="ic:baseline-plus"
        secondButtonTitle="Add Category"
        secondButtonBGColor="primary-blue"
        onSecondButtonOnClick={() => {
          setCategoryDetail(null);
          setShowModal((prev) => !prev);
          setSelectedSubCategoryName(null);
        }}
      />
      {isLoading || isFetching ? (
        <TableSkeletonLoader />
      ) : (
        <section className="bg-white rounded-lg shadow-sm" id="table-search">
          <TableSearchHeader showfilter={false} />

          <div className="mt-4 w-[98%] m-auto">
            <Table
              columns={column}
              data={categoryDetails || []}
              showEdit
              showDelete
              deleteRow={(row) => handleDelete(row)}
              editRow={(row) => {
                setShowModal(true);
                setCategoryDetail(row);
              }}
            />
          </div>
        </section>
      )}
      <SideModal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false);
          setSelectedSubCategoryName(null);
        }}
      >
        <AddCategory
          category={categoryDetail}
          setShowModal={setShowModal}
          setCategoryDetails={setCategoryDetails}
        />
      </SideModal>
    </div>
  );
};
