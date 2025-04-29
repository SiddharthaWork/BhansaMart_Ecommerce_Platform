import { useFetchOrderAnalytics } from '@/server-action/api/dashboard';
import { BarChart } from '../../shared';
import { _DailyOrderNewCustomerHeader } from '../../shared/dashboard/_Daily-Order_New-Customer-Header';
import { DailyOrderMapper } from '@/utils/DailyOrderMapper';

interface dailyOrderTypes {
  margin: number;
}

export const _DailyOrder = ({ margin }: dailyOrderTypes) => {
  const { data: dashboardData } = useFetchOrderAnalytics();
  const { mappedData, totalOrder } = DailyOrderMapper({
    data: dashboardData?.getOrderAnalytics?.dailyOrder ?? [],
  });

  const fill = {
    type: 'gradient',
    gradient: {
      shade: 'light',
      type: 'vertical', // Gradient direction (can be "horizontal", "vertical", etc.)
      shadeIntensity: 0.5,
      gradientToColors: ['rgba(34, 117, 252, 0.28)'], // Gradient end color
      inverseColors: false,
      opacityFrom: 1,
      opacityTo: 1,
      stops: [0, 100], // Defines the gradient stops
    },
  };

  return (
    <div className="flex flex-col p-6 border border-lynch-50 shadow-sm rounded gap-6 bg-white">
      <_DailyOrderNewCustomerHeader
        margin={margin}
        orderAverage={totalOrder}
        title="Weekly Orders"
        averageTitle="Orders"
      />
      <BarChart data={mappedData} height={200} fill={fill} />
    </div>
  );
};
