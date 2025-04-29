import { Table } from '@/components/shared';
import { StockReportBasicManagementSetup } from '@/constants';

export const CategoryReport = () => {
  return (
    <div className="flex place-items-center justify-between bg-white p-4">
      <section>
        <Table
          columns={StockReportBasicManagementSetup().categoryTableColumns}
          data={[]}
          showAction={false}
          showSelectAll={false}
        />
      </section>
    </div>
  );
};
