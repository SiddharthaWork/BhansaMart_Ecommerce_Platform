import { useState } from 'react';
import { TableSearchHeader } from '../../shared/order-management/Table-Search-Header';
import { Table } from '../../shared/Table';
import { FrontendRoutes } from '../../../constants';
import { TitleBreadCrumb } from '../../shared/Title-Breadcrumb';
import { ExpenseBar } from './ExpenseBar';
import { useGetProfitLoss } from '@/server-action/api/profitloss';
import { TableSkeletonLoader } from '@/components/shared';
import { Icon } from '@iconify/react/dist/iconify.js';

const newOrderBreadcrumbData = [
  { label: 'Dashboard', path: FrontendRoutes.HOME },
  { label: 'Finance & Expense', path: '#' },
  { label: 'Profit and Loss', path: FrontendRoutes.PROFITLOSS },
];

interface ProfitLossData {
  grossSales: number;
  goodsReturn: number;
  discounts: number;
  badDebts: number;
  cogs: number;
  incomeFromRevenue: number;
  totalExpenses: number;
  expenseSummary: { category: string; amount: number }[];
}

interface TransformedData {
  _id: string;
  category: string;
  inflow: number | null;
  outflow: number | null;
  balance: number | string;
}

export const Profit = () => {
  const { data: profitLossData, isPending } = useGetProfitLoss();
  const [isExpenseSummaryExpanded, setIsExpenseSummaryExpanded] =
    useState(false);

  const toggleExpenseSummary = () => {
    setIsExpenseSummaryExpanded((prev) => !prev);
  };

  const transformData = (
    data: ProfitLossData | undefined
  ): TransformedData[] => {
    if (!data) return [];

    const summaryRows =
      isExpenseSummaryExpanded && data.expenseSummary
        ? data.expenseSummary.map((item, index) => ({
            _id: `expense_${index}`,
            category: item.category,
            inflow: null,
            outflow: item.amount,
            balance: '',
          }))
        : [];

    return [
      {
        _id: 'grossSales',
        category: 'Gross Sales',
        inflow: data.grossSales,
        outflow: null,
        balance: '',
      },
      {
        _id: 'goodsReturn',
        category: 'Goods Return',
        inflow: null,
        outflow: data.goodsReturn,
        balance: '',
      },
      {
        _id: 'discounts',
        category: 'Discounts',
        inflow: null,
        outflow: data.discounts,
        balance: '',
      },
      {
        _id: 'badDebts',
        category: 'Bad Debts',
        inflow: null,
        outflow: data.badDebts,
        balance: '',
      },
      {
        _id: 'cogs',
        category: 'Cost of Goods Sold (COGS)',
        inflow: null,
        outflow: data.cogs,
        balance: '',
      },
      {
        _id: 'incomeFromRevenue',
        category: 'Income From Revenue',
        inflow: data.incomeFromRevenue,
        outflow: null,
        balance: '',
      },

      {
        _id: 'expenseSummaryHeading',
        category: 'Expense Summary',
        inflow: null,
        outflow: null,
        balance: '',
      },
      ...summaryRows,

      {
        _id: 'totalExpenses',
        category: 'Total Expenses',
        inflow: null,
        outflow: data.totalExpenses,
        balance: '',
      },
      {
        _id: 'netProfit',
        category: 'Net Profit / Loss',
        inflow: null,
        outflow: null,
        balance: data.incomeFromRevenue - data.totalExpenses,
      },
    ];
  };

  const columns = [
    {
      key: 'category',
      header: 'Category',
      width: '200px',
      render: (_: any, row: TransformedData) => (
        <div
          className={`cursor-pointer ${
            row._id === 'expenseSummaryHeading'
              ? 'font-bold border-t-2 border-gray-400 pt-2 flex   place-items-center gap-1'
              : 'font-normal'
          }`}
          onClick={
            row._id === 'expenseSummaryHeading'
              ? toggleExpenseSummary
              : undefined
          }
        >
          {row.category}
          {row._id === 'expenseSummaryHeading' &&
            (isExpenseSummaryExpanded ? (
              <Icon icon={'iconamoon:arrow-up-2-bold'} />
            ) : (
              <Icon icon={'iconamoon:arrow-down-2-bold'} />
            ))}
        </div>
      ),
    },
    {
      key: 'inflow',
      header: 'Inflow (Rs)',
      width: '150px',
      render: (_: any, row: TransformedData) => (
        <span>{row.inflow !== null ? row.inflow.toLocaleString() : '—'}</span>
      ),
    },
    {
      key: 'outflow',
      header: 'Outflow (Rs)',
      width: '150px',
      render: (_: any, row: TransformedData) => (
        <span>{row.outflow !== null ? row.outflow.toLocaleString() : '—'}</span>
      ),
    },
    {
      key: 'balance',
      header: 'Balance (Rs)',
      width: '150px',
      render: (_: any, row: TransformedData) => (
        <span className="font-semibold">
          {typeof row.balance === 'number'
            ? row.balance.toLocaleString()
            : row.balance || '—'}
        </span>
      ),
    },
  ];

  return (
    <div className="flex flex-col pl-7 pr-8 gap-6">
      <TitleBreadCrumb
        breadcrumbData={newOrderBreadcrumbData}
        title="Profit and Loss"
      />
      <ExpenseBar />
      <section className="bg-white rounded-lg shadow-sm" id="table-section">
        <TableSearchHeader />
        {isPending ? (
          <TableSkeletonLoader />
        ) : (
          <Table
            showSelectAll={false}
            showAction={false}
            data={transformData(profitLossData)}
            columns={columns}
          />
        )}
      </section>
    </div>
  );
};
