import { ISalesStats } from '@/(___types)/_type-dashboard';

interface propTypes {
  data: ISalesStats;
}

export const DonoughtSalesMapper = ({ data }: propTypes) => {
  const weeklySales = data?.weeklySales;
  const monthlySales = data?.monthlySales;
  const yearlySales = data?.yearlySales;
  const weeklyMappedSales = weeklySales?.map((sale) => {
    const mappedData = {
      labelData: sale?.categoryName,
      value: sale?.totalSales,
    };
    return mappedData;
  });

  const weeklySalesTotal = weeklySales?.reduce(
    (item, acc) => item + acc.totalSales,
    0
  );

  const MonthlyMappedSales = monthlySales?.map((sale) => {
    const mappedData = {
      labelData: sale?.categoryName,
      value: sale?.totalSales,
    };
    return mappedData;
  });

  const monthlySalesTotal = monthlySales?.reduce(
    (item, acc) => item + acc.totalSales,
    0
  );

  const yearlyMappedSales = yearlySales?.map((sale) => {
    const mappedData = {
      labelData: sale?.categoryName,
      value: sale?.totalSales,
    };
    return mappedData;
  });

  const yearlySalesTotal = yearlySales?.reduce(
    (item, acc) => item + acc.totalSales,
    0
  );

  return {
    weeklyMappedSales,
    MonthlyMappedSales,
    yearlyMappedSales,
    weeklySalesTotal,
    monthlySalesTotal,
    yearlySalesTotal,
  };
};
