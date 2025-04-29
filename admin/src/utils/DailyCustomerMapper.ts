import { dailyCustomer } from '@/(___types)/_type-dashboard';

const days = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

export const DailyCustomerMapper = ({ data }: { data: dailyCustomer[] }) => {
  console.log(data);
  const mappedData = data?.map((item, index) => {
    const map = {
      labelData: item?.dayOfWeek?.slice(0, 2),
      value: item?.newCustomers,
    };
    return map;
  });
  const totalOrder = data?.reduce((item, acc) => item + acc.newCustomers, 0);
  return { mappedData, totalOrder };
};
