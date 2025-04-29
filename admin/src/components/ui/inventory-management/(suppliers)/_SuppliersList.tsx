import {
  useDeleteSupplier,
  useGetSupplier,
} from '@/server-action/api/supplier';
import { FrontendRoutes } from '../../../../constants/Routes';
import { SideModal, Table, TableSkeletonLoader } from '../../../shared';
import { useNavigate } from 'react-router-dom';
import { useCallback, useState } from 'react';
import { AddSupliers } from '@/components/ui/inventory-management/(suppliers)/AddSupliers';
import { ISupplier } from '@/(___types)/_type-supplier';

interface Props {
  suppliersData?: ISupplier[];
  isLoading?: boolean;
}


export const _SuppliersList = ({ suppliersData, isLoading }: Props) => {
  const nav = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const { mutate: deleteSupplier } = useDeleteSupplier();
  const handleDelete = useCallback(
    (id: string) => {
      deleteSupplier(id);
    },
    [deleteSupplier]
  );

  // const { data: supplierData, isLoading } = useGetSupplier();
  const [editData, setEditData] = useState<ISupplier | undefined>(undefined);

  const columns = [
    {
      key: 'name',
      header: 'Supplier Name',
      width: '150px',
    },
    {
      key: '',
      header: 'Contact Person',
      width: '150px',
      render: (_: any, supplierData: any) => {
        return <span>{supplierData?.contactPerson?.name ?? 'none'}</span>;
      },
    },
    {
      key: 'totalamount',
      header: 'Item Supplied',
      width: '150px',
      render: (_: any, supplierData: any) => {
        return <span>{supplierData?.products?.length}</span>;
      },
    },
    {
      key: 'leadtime',
      header: 'Lead Time',
      width: '100px',
    },
  ];

  return (
    <div>
      {isLoading ? (
        <TableSkeletonLoader />
      ) : (
        <Table
          showAction={true}
          showView
          showDelete
          showEdit
          data={suppliersData || []}
          columns={columns}
          editRow={(row) => {
            setIsOpen(true);
            setEditData(row);
          }}
          viewRow={(row) =>
            nav(`${FrontendRoutes.SUPPLIER_DETAILS}/${row._id || ''}`)
          }
          deleteRow={(row) => handleDelete(row._id)}
        />
      )}
      <SideModal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <AddSupliers editData={editData} setIsOpen={() => setIsOpen(false)} />
      </SideModal>
    </div>
  );
};
