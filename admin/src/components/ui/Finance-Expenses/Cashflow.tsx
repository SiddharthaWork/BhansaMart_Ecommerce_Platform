import { TableSearchHeader } from '../../shared/order-management/Table-Search-Header';
import { Table } from '../../shared/Table';
import { FrontendRoutes } from '../../../constants';
import { TitleBreadCrumb } from '../../shared/Title-Breadcrumb';
import { _PurchaseDetail } from '../inventory-management/(suppliers)/_PurchaseDetail';
import { ICashFlow } from '@/(___types)';
import { TableSkeletonLoader } from '@/components/shared';
import { useCashflowQuery } from '@/server-action/api/cashflow';
import { render } from 'react-dom';

const newOrderBreadcrumbData = [
  {
    label: 'Dashboard',
    path: FrontendRoutes.HOME,
  },
  {
    label: 'Finance & Expense',
    path: '#',
  },
  {
    label: 'Cashflow',
    path: FrontendRoutes.CASHFLOW,
  },
];

interface CashflowData {
  startDate: string;
  endDate: string;
  totalSales: number;
  totalExpenses: number;
  netCashFlow: number;
}

interface TransformedData {
  id: string;
  date: string;
  category: string;
  inflow: number | null;
  outflow: number | null;
  balance: number | string;
}

export const Cashflow = () => {
  const { data: cashflowData, isPending } = useCashflowQuery();

  const transformData = (data: { getWeeklyCashFlow: CashflowData } | undefined) => {
    if (!data?.getWeeklyCashFlow) return [];

    const weeklyData = data.getWeeklyCashFlow;
    
    return [
      {
        id: 'sales',
        date: weeklyData.endDate,
        category: 'Total Sales',
        inflow: weeklyData.totalSales,
        outflow: null,
        balance: '',
      },
      {
        id: 'expenses',
        date: '',
        category: 'Total Expenses',
        inflow: null,
        outflow: weeklyData.totalExpenses,
        balance: '',
      },
      {
        id: 'balance',
        date: '',
        category: 'Balance',
        inflow: null,
        outflow: null,
        balance: weeklyData.netCashFlow,
      },
    ];
  };

  const columns = [
    {
      key: 'date',
      header: 'Date',
      width: '120px',
      render: (_: any, data: TransformedData) => (
        <span>{data.date}</span>
      ),
    },
    {
      key: 'category',
      header: 'Categories',
      width: '200px',
      render: (_: any, data: TransformedData) => (
        <span>{data.category}</span>
      ),
    },
    {
      key: 'inflow',
      header: 'Inflow (Rs)',
      width: '150px',
      render: (_: any, data: TransformedData) => (
        <span>{data.inflow ? data.inflow.toLocaleString() : '—'}</span>
      ),
    },
    {
      key: 'outflow',
      header: 'Outflow (Rs)',
      width: '150px',
      render: (_: any, data: TransformedData) => (
        <span>{data.outflow ? data.outflow.toLocaleString() : '—'}</span>
      ),
    },
    {
      key: 'balance',
      header: 'Balance (Rs)',
      width: '150px',
      render: (_: any, data: TransformedData) => (
        <span>
          {typeof data.balance === 'number' 
            ? data.balance.toLocaleString() 
            : data.balance || '—'}
        </span>
      ),
    },
  ];

  return (
    <div className="flex flex-col pl-7 pr-8 gap-6" id="parent">
      <TitleBreadCrumb
        breadcrumbData={newOrderBreadcrumbData}
        title="Cashflow"
      />
      <section className="bg-white rounded-lg shadow-sm" id="table-search">
        <TableSearchHeader />
        {isPending ? (
          <TableSkeletonLoader />
        ) : (
          <Table
            showSelectAll={false}
            showAction={false}
            data={transformData(cashflowData as any ) as any }
            columns={columns}
          />
        )}
      </section>
    </div>
  );
};