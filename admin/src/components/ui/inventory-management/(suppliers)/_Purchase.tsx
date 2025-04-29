import { Modal, SideModal, Table } from '../../../shared';
import { useCallback, useState } from 'react';
import { useOutsideClick } from '../../../../hooks/UseOutsideClick';
import { _PurchaseDetail } from './_PurchaseDetail';
import AddPurchase from './AddPurchase';
import {
  useDeletePurchase,
  useGetPurchase,
} from '@/server-action/api/purchase';
import { IPurchase } from '@/(___types)/_type-purchase';

interface PurchaseListProps {
  purchaseData?: IPurchase[];
  isLoading?: boolean;
}

export const columns = [
  {
    key: 'supplierName',
    header: 'Supplier Name',
    width: '150px',
    render: (_: any, supplierData: any) => {
      return <span>{supplierData?.supplier?.name ?? 'none'}</span>;
    },
  },
  {
    key: 'price',
    header: 'Cost Price',
    width: '150px',
    render: (_: any, supplierData: any) => {
      const totalCostPrice = supplierData?.products?.reduce(
        (acc: any, item: any) => acc + item.price,
        0
      );
      return (
        <span> {(totalCostPrice && 'Rs.' + totalCostPrice) ?? 'none'}</span>
      );
    },
  },
  {
    key: 'price',
    header: 'Paid Price',
    width: '150px',
    render: (_: any, supplierData: any) => {
      const totalPaidAmount = supplierData?.products?.reduce(
        (acc: any, item: any) => acc + item.paidAmount,
        0
      );
      return (
        <span>{(totalPaidAmount && 'Rs.' + totalPaidAmount) ?? 'none'}</span>
      );
    },
  },
  {
    key: 'price',
    header: 'Remaining Price',
    width: '150px',
    render: (_: any, supplierData: any) => {
      const totalCostPrice = supplierData?.products?.reduce(
        (acc: any, item: any) => acc + item.price,
        0
      );
      const totalPaidAmount = supplierData?.products?.reduce(
        (acc: any, item: any) => acc + item.paidAmount,
        0
      );

      const remainingPrice = totalCostPrice - totalPaidAmount;
      return (
        <span>{(remainingPrice && 'Rs.' + remainingPrice) ?? 'none'}</span>
      );
    },
  },
  {
    key: 'quantity',
    header: 'Quantity',
    width: '150px',
    render: (_: any, supplierData: any) => {
      const totalQuantity = supplierData?.products?.reduce(
        (acc: any, item: any) => acc + item.quantity,
        0
      );
      return <span>{totalQuantity ?? 'none'}</span>;
    },
  },
];

export const _Purchase = ({ purchaseData, isLoading }: PurchaseListProps) => {
  const [_setpoints, _setaddpoints] = useState(false);
  const [_removepoints, _setremovepoints] = useState(false);
  const _assignRef = useOutsideClick(() => _setaddpoints(false));
  const [selectedView, setSelectedView] = useState();
  const [isOpen, setIsOpen] = useState(false);
  const [editData, setEditData] = useState<IPurchase | undefined>(undefined);

  const { mutateAsync: deletePurchase } = useDeletePurchase();

  const handleDelete = useCallback(
    (id: string) => {
      deletePurchase(
        { id },
        {
          onSuccess: () => ({}),
          onError: () => ({}),
        }
      );
    },
    [deletePurchase]
  );

  return (
    <div>
      <Table
        showAction={true}
        showView={true}
        data={purchaseData || []}
        showEdit
        editRow={(row) => {
          setIsOpen(true);
          setEditData(row);
        }}
        showDelete
        deleteRow={(row) => handleDelete(row._id)}
        columns={columns}
        // viewRow={(row) => nav(`${FrontendRoutes.STOCK_DETAILS}/${row._id || ""}`)}
        viewRow={(row: any) => {
          _setaddpoints(true);
          setSelectedView(row);
        }}
      />

      {_setpoints && (
        <Modal ref={_assignRef} classname="w-[60%]">
          <_PurchaseDetail
            onClose={() => _setaddpoints(false)}
            data={[selectedView] as any}
          />
        </Modal>
      )}

      <SideModal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <AddPurchase editData={editData} setIsOpen={() => setIsOpen(false)} />
      </SideModal>
    </div>
  );
};
