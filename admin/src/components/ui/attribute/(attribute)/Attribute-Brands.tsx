import { Icon } from '@iconify/react/dist/iconify.js';
import { Modal, Table, TableSkeletonLoader, Text } from '../../../shared';
import { useCallback, useState } from 'react';
import { useOutsideClick } from '../../../../hooks/UseOutsideClick';
import { useDeleteBrand, useGetBrands } from '@/server-action/api/attribute';
import { AddAttributeBrand } from './Add-Attribute-Brand';
import { _IBrand, _updateIBrand } from '@/(___types)/_type-attributes';

export const AttributeBrands = () => {
  const [addAttribute, setAddAttribute] = useState(false);

  const ref = useOutsideClick(() => setAddAttribute(false));
  const { data: brandData, isLoading } = useGetBrands();

  const [brandDetails, setBrandDetails] = useState<_updateIBrand>();
  const { mutate: deleteBrand } = useDeleteBrand();

  const handleDelete = useCallback(
    (id: string) => {
      deleteBrand(id, {
        onSuccess: () => ({}),
      });
    },
    [deleteBrand]
  );

  const column = [
    {
      key: 'name',
      header: 'Brand Names',
    },
    {
      key: '',
      header: 'Categories',
      render: (_: any, tableBrandData: any) => (
        <div>
          {tableBrandData?.category?.map((cat: any) => cat.name)?.join(', ')}{' '}
        </div>
      ),
    },
  ];

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
          className="flex  shadow-sm bg-primary-blue place-items-center gap-1 px-4 py-3 rounded cursor-pointer  "
          id="filter"
          onClick={() => setAddAttribute(true)}
        >
          <Icon icon="si:add-line" color="#fff" fontSize={28} />
          <Text variant="white" size="body-base-default">
            Add Brand
          </Text>
        </section>
      </section>

      <div className="bg-white p-3 rounded-b-3xl">
        {isLoading ? (
          <TableSkeletonLoader />
        ) : (
          <Table
            columns={column}
            data={brandData?.brand || []}
            editRow={(row) => {
              setAddAttribute(true);
              setBrandDetails(row as unknown as _updateIBrand);
            }}
            showEdit
            showDelete
            deleteRow={(row) => handleDelete(row._id)}
          />
        )}
      </div>

      {addAttribute && (
        <Modal ref={ref}>
          <AddAttributeBrand attribute={brandDetails} />
        </Modal>
      )}
    </div>
  );
};
