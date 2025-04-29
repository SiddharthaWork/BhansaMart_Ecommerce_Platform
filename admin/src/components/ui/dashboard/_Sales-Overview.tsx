import { Icon } from '@iconify/react/dist/iconify.js';
import { Donought, Text } from '../../shared';
import { _TitleFilterOptions } from './_Title-Filter-Options';
import { useFetchSalesStats } from '@/server-action/api/dashboard';
import { memo, useState } from 'react';
import { DonoughtSalesMapper } from '@/utils/DonoughtSalesMapper';
import { ISalesStats } from '@/(___types)/_type-dashboard';

export const _SalesOverView = memo(() => {
  const { data: salesData } = useFetchSalesStats();

  const {
    MonthlyMappedSales,
    weeklyMappedSales,
    yearlyMappedSales,
    monthlySalesTotal,
    weeklySalesTotal,
    yearlySalesTotal,
  } = DonoughtSalesMapper({
    data: salesData?.getAllSalesStats ?? ({} as ISalesStats),
  });

  const [filterValue, setFilterValue] = useState('Monthly');

  return (
    <div className="flex flex-col p-6 border border-lynch-50 shadow-sm rounded gap-6 bg-white">
      <_TitleFilterOptions
        title="Sales Overview"
        filterOption={['Monthly', 'Weekly', 'Yearly']}
        onFilterOptionSelected={setFilterValue}
      />
      <section className="flex place-items-center gap-10">
        <Donought
          data={
            filterValue === 'Monthly'
              ? (MonthlyMappedSales ?? [])
              : filterValue === 'Weekly'
                ? (weeklyMappedSales ?? [])
                : (yearlyMappedSales ?? [])
          }
          totalvalue={
            filterValue === 'Monthly'
              ? monthlySalesTotal
              : filterValue === 'Weekly'
                ? weeklySalesTotal
                : yearlySalesTotal
          }
          subTitle={`${filterValue} Gross`}
        />
        <div className="flex flex-col gap-3 mt-2">
          <section className="border-b border-fade-bg pb-3 flex place-items-center gap-3">
            <div className="p-3 rounded bg-[#F2EAFF]">
              <Icon icon="bx:dollar" color="#6378E5" />
            </div>

            <div className="flex flex-col gap-1">
              <Text size="body-sm-default" variant="grey-300">
                Number of Sales
              </Text>
              <Text size="body-md-lg" variant="grey-600">
                Rs.{' '}
                {filterValue === 'Monthly'
                  ? monthlySalesTotal
                  : filterValue === 'Weekly'
                    ? weeklySalesTotal
                    : yearlySalesTotal}
              </Text>
            </div>
          </section>

          <section className="grid grid-cols-2 gap-7  ">
            {filterValue === 'Monthly' &&
              MonthlyMappedSales?.map((dataValue, index) => (
                <div className="flex flex-col gap-1" key={index}>
                  <section className="flex place-items-center gap-2">
                    <div className="bg-primary-blue p-2 rounded-full h-1 w-1" />
                    <Text size="body-xs-lg" variant="grey-300">
                      {dataValue.labelData}
                    </Text>
                  </section>
                  <Text size="body-sm-lg" variant="grey-600">
                    Rs. {dataValue.value}
                  </Text>
                </div>
              ))}

            {filterValue === 'Yearly' &&
              yearlyMappedSales?.map((dataValue, index) => (
                <div className="flex flex-col gap-1" key={index}>
                  <section className="flex place-items-center gap-2">
                    <div className="bg-primary-blue p-2 rounded-full h-1 w-1" />
                    <Text size="body-xs-lg" variant="grey-300">
                      {dataValue.labelData}
                    </Text>
                  </section>
                  <Text size="body-sm-lg" variant="grey-600">
                    Rs. {dataValue.value}
                  </Text>
                </div>
              ))}

            {filterValue === 'Weekly' &&
              weeklyMappedSales?.map((dataValue, index) => (
                <div className="flex flex-col gap-1" key={index}>
                  <section className="flex place-items-center gap-2">
                    <div className="bg-primary-blue p-2 rounded-full h-1 w-1" />
                    <Text size="body-xs-lg" variant="grey-300">
                      {dataValue.labelData}
                    </Text>
                  </section>
                  <Text size="body-sm-lg" variant="grey-600">
                    Rs. {dataValue.value}
                  </Text>
                </div>
              ))}
          </section>
        </div>
      </section>
    </div>
  );
});
