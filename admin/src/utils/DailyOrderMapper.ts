import { dailyOrder } from '@/(___types)/_type-dashboard';

export const DailyOrderMapper = ({ data }: { data: dailyOrder[] }) => {
  console.log(data);
  const mappedData = data?.map((item) => {
    const map = {
      labelData: item?.dayOfWeek?.slice(0, 2),
      value: item?.totalOrders,
    };
    return map;
  });
  const totalOrder = data?.reduce((item, acc) => item + acc.totalOrders, 0);
  return { mappedData, totalOrder };
};
