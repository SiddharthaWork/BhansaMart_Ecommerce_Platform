import { DropdownField, TitleBreadCrumb } from '@/components/shared';
import { StockReportBasicManagementSetup } from '@/constants';
import { DynamicTabs } from '../order-report/OrderReport';
import { useState } from 'react';
import { CategoryReport } from './Category-Report';
import { LowStockReport } from './Low-Stock-Report';

export const StockReport = () => {
  const [tabValue, setTabValue] = useState('stock');

  return (
    <div className="flex flex-col pl-7 pr-8 gap-6" id="parent">
      <TitleBreadCrumb
        breadcrumbData={
          StockReportBasicManagementSetup().stockReportListBreadcrumbData
        }
        title="Stock Report"
      />

      <section className="flex justify-end items-center ">
        <DropdownField
          label=""
          className="border border-grey-200 p-[10px] rounded outline-none "
        />
      </section>

      <section>
        <DynamicTabs
          tabOptions={StockReportBasicManagementSetup().tabOptions}
          value={tabValue}
          handleTabChange={setTabValue}
        />
        <section>
          {tabValue === 'category' ? <CategoryReport /> : <LowStockReport />}
        </section>
      </section>
    </div>
  );
};
