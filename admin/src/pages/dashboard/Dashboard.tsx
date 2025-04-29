import { Dashboard } from '../../components';
import { DashboardData } from '../../mock/dashboard-data';

export const DashboardPage = () => {
  const { totalRevenue, todayOrders, newlyJoinedCustomers } = DashboardData();

  console.log();

  return (
    <Dashboard
      totalRevenue={totalRevenue}
      dailyOrder={todayOrders}
      newCustomer={newlyJoinedCustomers}
    />
  );
};
