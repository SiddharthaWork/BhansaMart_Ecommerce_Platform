import {
  useFetchLowStockProducts,
  useFetchOrderAnalytics,
} from '@/server-action/api/dashboard';
import { TitleBreadCrumb } from '../../shared';
import {
  _TotalOrdersRevenue,
  _DailyOrder,
  _NewCustomer,
  _NewOrder,
  _ProductDetails,
  _RecentTransaction,
  _SalesOverView,
  _TopCustomer,
  _TopDriver,
  _Transaction,
  _WeeklySales,
} from './_index';
import { WeeklySalesMapper } from '@/utils/WeeklySalesMapper';

interface DashboardPropTypes {
  totalRevenue: {
    totalRevenue: string;
    margin: number;
  };
  dailyOrder: {
    margin: number;
  };
  newCustomer: {
    margin: number;
  };
}

export const Dashboard = ({
  totalRevenue,
  dailyOrder,
  newCustomer,
}: DashboardPropTypes) => {
  const { data: analyticsData } = useFetchOrderAnalytics();
  const { data: lowStockData } = useFetchLowStockProducts();
  const { mappedData, totalWeeklySales } = WeeklySalesMapper({
    data: analyticsData?.getOrderAnalytics?.weeklySales ?? [],
  });

  return (
    <div className="flex flex-col pl-7 pr-8 gap-6" id="parent">
      <TitleBreadCrumb title="Dashboard" />

      <section className="grid grid-cols-4 gap-6">
        <_TotalOrdersRevenue
          title="Total Orders"
          avatarImage="/avatar-1.png"
          value={analyticsData?.getOrderAnalytics?.totalOrders}
          margin={analyticsData?.getOrderAnalytics?.profit ?? 0}
          dateFilteration={'overall'}
        />

        <_TotalOrdersRevenue
          title="Total Revenue"
          avatarImage="/avatar-2.png"
          value={totalRevenue.totalRevenue}
          margin={totalRevenue.margin}
          dateFilteration={'overall'}
        />
        <div className="grid col-span-2">
          <_Transaction />
        </div>
      </section>

      <section className="grid grid-cols-4 gap-6">
        <_DailyOrder margin={dailyOrder.margin} />
        <_NewCustomer margin={newCustomer.margin} />
        <div className="grid col-span-2">
          <_SalesOverView />
        </div>
      </section>

      <section className="grid grid-cols-4 gap-6">
        <div className="grid col-span-2">
          <_RecentTransaction
            data={analyticsData?.getOrderAnalytics?.recentTransactions ?? []}
          />
        </div>
        <_WeeklySales
          sales={mappedData}
          totalProfit={analyticsData?.getOrderAnalytics?.weeklyProfit ?? 0}
          totalSales={totalWeeklySales}
        />
        <_ProductDetails
          title="Top Selling Products"
          topSellingProducts={
            analyticsData?.getOrderAnalytics?.topProducts ?? []
          }
        />
      </section>

      <section className="grid grid-cols-4 gap-6">
        <div className="grid col-span-1 ">
          <_ProductDetails
            title="Low Stock Products"
            lowStockProducts={lowStockData?.getLowStockProducts ?? []}
          />
        </div>
        <div className="grid col-span-3">
          <_NewOrder />
        </div>
      </section>

      <section className="grid grid-cols-2 gap-6">
        <_TopCustomer />
        <_TopDriver />
      </section>
    </div>
  );
};
