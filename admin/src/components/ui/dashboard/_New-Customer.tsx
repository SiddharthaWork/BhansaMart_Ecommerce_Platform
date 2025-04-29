import { useFetchOrderAnalytics } from '@/server-action/api/dashboard';
import { LineChart } from '../../shared';
import { _DailyOrderNewCustomerHeader } from '../../shared/dashboard/_Daily-Order_New-Customer-Header';
import { DailyCustomerMapper } from '@/utils/DailyCustomerMapper';

interface newCustomerTypes {
  margin: number;
}
export const _NewCustomer = ({ margin }: newCustomerTypes) => {
  const { data: customerData } = useFetchOrderAnalytics();

  console.log(customerData?.getOrderAnalytics?.dailyCustomer);

  const { mappedData, totalOrder } = DailyCustomerMapper({
    data: customerData?.getOrderAnalytics?.dailyCustomer ?? [],
  });
  return (
    <div className="flex flex-col p-6 border border-lynch-50 shadow-sm rounded gap-6 bg-white">
      <_DailyOrderNewCustomerHeader
        margin={margin}
        orderAverage={totalOrder}
        title="Weekly  Customer"
        averageTitle="Customers"
      />

      <LineChart data={mappedData} height={200} />
    </div>
  );
};
