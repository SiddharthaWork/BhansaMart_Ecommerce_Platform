import { Icon } from '@iconify/react/dist/iconify.js';
import { Modal, Table, TableSkeletonLoader, Text } from '../../../shared';
import { useState } from 'react';
import { useOutsideClick } from '../../../../hooks/UseOutsideClick';
import { _TabHeader } from './_Tab-Header';
import { _BrandDiscount } from './_Brand-Discount';
import { _CategoryDiscount } from './_Category-Discount';
import { _IndividualDiscount } from './_Individual-Discount';
import { useGetDiscounts } from '@/server-action/api/attribute';

export const AttributeDiscount = () => {
  const [addAttribute, setAddAttribute] = useState(false);

  const ref = useOutsideClick(() => setAddAttribute(false));

  const { data, isLoading } = useGetDiscounts();

  const column = [
    {
      key: 'code',
      header: 'Brand name',
      render: (_: any, data: any) => {
        return <span>{data?.brand?.name}</span>;
      },
    },
    {
      key: '',
      header: 'Product List',
    },
    {
      key: 'type',
      header: 'Type',
    },
    {
      key: 'discount',
      header: 'Discount',
    },
    {
      key: 'isActive',
      header: 'Status',
      render: (_: any, data: any) => (
        <div
          className={`px-2 rounded-lg py-1 text-center bg-red-400 ${
            data.isActive
              ? 'bg-fade-green text-parrot rounded'
              : 'bg-grey-extra rounded text-grey-400'
          }`}
        >
          {data.isActive ? 'Active' : 'Inactive'}
        </div>
      ),
    },
    {
      key: 'startDate',
      header: 'Start Date',
    },
    {
      key: 'endDate',
      header: 'End Date',
    },
  ];

  const categoryColumns = [
    {
      key: 'categoryName',
      header: 'Category Name',
      render: (_: any, data: any) => {
        return <span>{data?.category?.name}</span>;
      },
    },
    {
      key: 'subCategory',
      header: 'Sub-Category',
    },
    {
      key: 'type',
      header: 'Type',
    },
    {
      key: 'discount',
      header: 'Discount',
    },
    {
      key: 'isActive',
      header: 'Status',
      render: (_: any, data: any) => (
        <div
          className={`px-2 rounded-lg py-1 text-center bg-red-400 ${
            data.isActive
              ? 'bg-fade-green text-parrot rounded'
              : 'bg-grey-extra rounded text-grey-400'
          }`}
        >
          {data.isActive ? 'Active' : 'Inactive'}
        </div>
      ),
    },
    {
      key: 'startDate',
      header: 'Start Date',
    },
    {
      key: 'endDate',
      header: 'End Date',
    },
  ];

  const individualData = [
    {
      key: 'name',
      header: 'Product Name',
      render: (_: any, data: any) => {
        return <span>{data?.product?.name?.slice(0, 10)}</span>;
      },
    },
    {
      key: 'type',
      header: 'Type',
    },
    {
      key: 'discount',
      header: 'Discount',
    },
    {
      key: 'isActive',
      header: 'Status',
      render: (_: any, data: any) => (
        <div
          className={`px-2 rounded-lg py-1 text-center bg-red-400 ${
            data.isActive
              ? 'bg-fade-green text-parrot rounded'
              : 'bg-grey-extra rounded text-grey-400'
          }`}
        >
          {data.isActive ? 'Active' : 'Inactive'}
        </div>
      ),
    },
    {
      key: 'startDate',
      header: 'Start Date',
    },
    {
      key: 'endDate',
      header: 'End Date',
    },
  ];

  const [selectedTabs, setSelectedTabs] = useState('brands');

  return (
    <div className="rounded-xl bg-white">
      <section
        className="flex place-items-center justify-between p-4 border-b shadow-sm  border-grey-100 gap-6"
        id="search-filter"
      >
        <div
          className="flex place-items-center gap-2 border border-border rounded py-3 px-4 w-[73%] shadow-sm"
          id="search"
        >
          <Icon icon="iconamoon:search-light" color="#8695AA" />
          <input
            type="text"
            className="outline-none text-lynch-400 text-sm w-full    "
            placeholder="search here..."
          />
        </div>
        <section
          className="flex border border-grey-200 shadow-sm bg-white place-items-center gap-1 px-4 py-3 rounded cursor-pointer  "
          id="filter"
        >
          <Icon icon="fontisto:export" color="#B0B0B0" fontSize={28} />
          <Text variant="grey-300" size="body-base-default">
            Filter
          </Text>
        </section>
        <section
          className="flex  shadow-sm bg-primary-blue place-items-center gap-1 px-4 py-3 rounded cursor-pointer w-[15%] "
          id="filter"
          onClick={() => setAddAttribute(true)}
        >
          <Icon icon="si:add-line" color="#fff" fontSize={28} />
          <Text variant="white" size="body-base-default">
            Add Discount
          </Text>
        </section>
      </section>

      <div className="bg-white p-3 rounded-b-3xl flex flex-col gap-4">
        <section className="bg-[#CDE0FF] p-4 gap-4 flex place-items-center rounded">
          <Text size="body-base-lg">Brand Discount</Text>
        </section>

        <div className="h-[350px] overflow-scroll">
          {isLoading ? (
            <TableSkeletonLoader/>
           ) : ( 
          <Table
            columns={column}
            data={data?.discountBrands ?? []}
            showEdit
            showDelete
          />
        )}
        </div>
      </div>

      <div className="bg-white p-3 rounded-b-3xl flex flex-col gap-4">
        <section className="bg-[#CDE0FF] p-4 gap-4 flex place-items-center rounded">
          <Text size="body-base-lg">Category Wise</Text>
        </section>

        <section className="h-[350px] overflow-scroll">
        {isLoading ? (
            <TableSkeletonLoader/>
           ) : ( 
          <Table
            columns={categoryColumns}
            data={data?.categoryDiscount ?? []}
            showEdit
            showDelete
          />
          )}
        </section>
      </div>

      <div className="bg-white p-3 rounded-b-3xl flex flex-col gap-4">
        <section className="bg-[#CDE0FF] p-4 gap-4 flex place-items-center rounded">
          <Text size="body-base-lg">Individual</Text>
        </section>
        <section className="h-[350px] overflow-scroll">
        {isLoading ? (
            <TableSkeletonLoader/>
           ) : ( 
          <Table
            columns={individualData}
            data={data?.individualDiscount ?? []}
            showEdit
            showDelete
          />
          )}
        </section>
      </div>

      {addAttribute && (
        <Modal ref={ref}>
          <div className="p-16 flex flex-col gap-10 w-[510px] h-[550px] overflow-scroll">
            <Text size="body-lg-rare">Add Discount</Text>

            <section className="flex flex-col gap-6">
              <_TabHeader
                selectedTabs={selectedTabs}
                setSelectedTabs={setSelectedTabs}
              />
              {selectedTabs === 'brands' && (
                <div className="h-[450px] overflow-scroll">
                  <_BrandDiscount />
                </div>
              )}

              {selectedTabs === 'category' && (
                <div className="h-[450px] overflow-scroll">
                  <_CategoryDiscount />
                </div>
              )}

              {selectedTabs === 'individual' && (
                <div className="h-[450px] overflow-scroll">
                  <_IndividualDiscount />
                </div>
              )}
            </section>
          </div>
        </Modal>
      )}
    </div>
  );
};
