import { useState } from 'react';
import { ProductManagementBasicSetup } from '../../../../constants';
import { useOutsideClick } from '../../../../hooks/UseOutsideClick';
import {
  Modal,
  Table,
  TableSearchHeader,
  TitleBreadCrumb,
} from '../../../shared';
import { _PurchaseDetail } from './_PurchaseDetail';
import { _FullPurchase } from './_FullPurchase';
export const columns = [
  {
    key: 'purchaseId',
    header: 'Purchase ID',
    width: '150px',
  },
  {
    key: 'purchaseDate',
    header: 'Purchase Date',
    width: '150px',
  },
  {
    key: 'totalAmount',
    header: 'Total Amount',
    width: '150px',
  },
  {
    key: 'totalPaid',
    header: 'Total Paid',
    width: '150px',
  },
  {
    key: 'balance',
    header: 'Balance',
    width: '150px',
    render: (value: any) => (
      <span className={`${value !== 'Rs.0' ? 'text-orange' : 'text-black'}`}>
        {value}
      </span>
    ),
  },
];

export const data = [
  {
    _id: '1',
    purchaseId: '#PRD1023',
    purchaseDate: '2024-11-01',
    totalAmount: 'Rs.165,000',
    totalPaid: 'Rs.100,000',
    balance: 'Rs.65,000',
  },
  {
    _id: '2',
    purchaseId: '#PRD1023',
    purchaseDate: '2024-11-01',
    totalAmount: 'Rs.165,000',
    totalPaid: 'Rs.165,000',
    balance: 'Rs.0',
  },
  {
    _id: '3',
    purchaseId: '#PRD1023',
    purchaseDate: '2024-11-01',
    totalAmount: 'Rs.165,000',
    totalPaid: 'Rs.165,000',
    balance: 'Rs.0',
  },
  {
    _id: '4',
    purchaseId: '#PRD1023',
    purchaseDate: '2024-11-01',
    totalAmount: 'Rs.165,000',
    totalPaid: 'Rs.165,000',
    balance: 'Rs.0',
  },
  {
    _id: '5',
    purchaseId: '#PRD1023',
    purchaseDate: '2024-11-01',
    totalAmount: 'Rs.165,000',
    totalPaid: 'Rs.165,000',
    balance: 'Rs.0',
  },
];

export const _FullPurchaseDetails = () => {
  const [_setpoints, _setaddpoints] = useState(false);
  const [_removepoints, _setremovepoints] = useState(false);
  const _assignRef = useOutsideClick(() => _setaddpoints(false));
  const _removeRef = useOutsideClick(() => _setremovepoints(false));

  return (
    <div className="flex flex-col pl-7 pr-8 gap-6" id="parent">
      <TitleBreadCrumb
        breadcrumbData={ProductManagementBasicSetup().productListbreadcrumbData}
        title="Purchase Details"
      />
      <section className="bg-white rounded-lg shadow-sm " id="table-search">
        <TableSearchHeader />
        <Table
          showAction={true}
          showView={true}
          data={data}
          columns={columns}
          viewRow={() => _setaddpoints(true)}

          // viewRow={(row) => nav(`${FrontendRoutes.STOCK_DETAILS}/${row._id || ""}`)}
        />
        {_setpoints && (
          <Modal ref={_assignRef} classname="w-[50%]">
            <_FullPurchase onClose={() => _setaddpoints(false)} />
          </Modal>
        )}
        {_removepoints && (
          <Modal ref={_removeRef}>
            <div></div>
          </Modal>
        )}
      </section>
    </div>
  );
};
