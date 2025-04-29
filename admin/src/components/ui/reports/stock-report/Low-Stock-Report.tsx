import { BarChart, Table } from '@/components/shared';
import { StockReportBasicManagementSetup } from '@/constants';

export const LowStockReport = () => {
  return (
    <div className="flex place-items-center justify-between bg-white p-4">
      <section>
        <Table
          columns={StockReportBasicManagementSetup().lowStockTableColumns}
          data={[]}
          showAction={false}
          showSelectAll={false}
        />
      </section>
      <section>{/* <BarChart /> */}</section>
    </div>
  );
};
