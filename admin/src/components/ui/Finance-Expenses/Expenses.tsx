import { TableSearchHeader } from '../../shared/order-management/Table-Search-Header';
import { Table } from '../../shared/Table';
import { FrontendRoutes, ProductManagementBasicSetup } from '../../../constants';
import { TitleBreadCrumb } from '../../shared/Title-Breadcrumb';

import { ExpenseBar } from './ExpenseBar';
import { SideModal, TableSkeletonLoader } from '@/components/shared';
import ViewExpenses from './ViewExpenses';
import { useState } from 'react';
import { useGetExpenses } from '@/server-action/api/expense';

const columns = [
  {
    key: 'date',
    header: 'Date',
    width: '120px',
    render: (_: any, data: any) => {
      return <span>{new Date(data?.date).toDateString()}</span>;
    },
  },
  {
    key: 'id',
    header: 'Expense ID',
    width: '120px',
    render: (_: any, data: any) => {
      return <span>E-{data?.id?.slice(0, 5)}</span>;
    },
  },
  {
    key: 'category',
    header: 'Category',
    width: '120px',
  },
  {
    key: 'linkedPurchaseId',
    header: 'Linked Purchase ID',
    width: '150px',
  },
  {
    key: 'description',
    header: 'Description',
    width: '250px',
  },
  {
    key: 'amount',
    header: 'Amount',
    width: '100px',
  },
];

const newOrderBreadcrumbData = [
  {
    label: 'Dashboard',
    path: FrontendRoutes.HOME,
  },
  {
    label: 'Finance & Expense',
    path: "#",

  },
  {
    label: 'Expenses',
    path: FrontendRoutes.EXPENSES,
  },
];

export const Expenses = () => {
  const [showModal, setShowModal] = useState(false);

  const { data: expenseData, isLoading } = useGetExpenses();
  console.log(expenseData);

  return (
    <div className="flex flex-col pl-7 pr-8 gap-6" id="parent">
      <TitleBreadCrumb
        breadcrumbData={newOrderBreadcrumbData}
        title="Expense"
      />
      <ExpenseBar />
      <section className="bg-white rounded-lg shadow-sm" id="table-search">
        {isLoading ? (
        <TableSkeletonLoader/>
         ) : ( 
        <Table
          showAction={true}
          showDelete
          showEdit
          showView
          data={expenseData?.getAllExpenses ?? []}
          columns={columns}
          viewRow={(row) => setShowModal(true)}
        />
      )}
        <SideModal isOpen={showModal} onClose={() => setShowModal(false)}>
          <ViewExpenses />
        </SideModal>
      </section>
    </div>
  );
};
