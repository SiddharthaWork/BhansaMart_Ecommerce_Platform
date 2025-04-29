import { useQuery } from '@tanstack/react-query';
import { gql, graphqlClient } from '../utils/GraphQlGateway';
import { IOrderAnalyticsDashboard } from '@/(___types)';
import {
  ILowStockProductDashboard,
  ISalesStats,
  topCustomers,
  topDrivers,
} from '@/(___types)/_type-dashboard';
import { _TopCustomer } from '@/components/ui/dashboard/_Top-Customer';

const orderAnalyticsQueryDocument = gql`
  query GetOrderAnalytics {
    getOrderAnalytics {
      totalOrders
      profit
      weeklyProfit
      dailyOrder {
        _id
        totalOrders
        totalAmount
        date
        dayOfWeek
      }
      dailyCustomer {
        date
        dayOfWeek
        newCustomers
      }
      recentTransactions {
        id
        date
        amount
        paymentStatus
        paymentMethod
        customerName
      }
      weeklySales {
        date
        totalSales
        orderCount
      }
      topProducts {
        productName
        totalQuantity
        totalOrders
        image
      }
    }
  }
`;

export const useFetchOrderAnalytics = () => {
  return useQuery<{
    getOrderAnalytics: IOrderAnalyticsDashboard;
  }>({
    queryKey: ['orderAnalytics'],
    queryFn: () =>
      graphqlClient<{
        getOrderAnalytics: IOrderAnalyticsDashboard;
      }>(orderAnalyticsQueryDocument).then((res) => res),
  });
};

const lowStockQueryDocument = gql`
  query GetLowStockProducts {
    getLowStockProducts {
      _id
      name
      images
      inventoryDetails {
        remainingStock
      }
    }
  }
`;

export const useFetchLowStockProducts = () => {
  return useQuery<{
    getLowStockProducts: ILowStockProductDashboard[];
  }>({
    queryKey: ['lowstockproducts'],
    queryFn: () =>
      graphqlClient<{
        getLowStockProducts: ILowStockProductDashboard[];
      }>(lowStockQueryDocument).then((res) => res),
  });
};

const salesStats = gql`
  query GetAllSalesStats {
    getAllSalesStats {
      weeklySales {
        categoryName
        totalSales
        totalQuantity
      }
      monthlySales {
        categoryName
        totalSales
        totalQuantity
      }
      yearlySales {
        categoryName
        totalSales
        totalQuantity
      }
    }
  }
`;

export const useFetchSalesStats = () => {
  return useQuery<{
    getAllSalesStats: ISalesStats;
  }>({
    queryKey: ['allsalesstats'],
    queryFn: () =>
      graphqlClient<{
        getAllSalesStats: ISalesStats;
      }>(salesStats).then((res) => res),
  });
};

const totalProductsAndTotalUsers = gql`
  query GetAllProducts {
    getAllProducts {
      totalCount
    }
    getAllUsers {
      totalCount
    }
  }
`;

export const useFetchTotalProductsAndTotalUsers = () => {
  return useQuery<{
    getAllProducts: {
      totalCount: number;
    };
    getAllUsers: {
      totalCount: number;
    };
  }>({
    queryKey: ['totalproductsandtotalusers'],
    queryFn: () =>
      graphqlClient<{
        getAllProducts: {
          totalCount: number;
        };
        getAllUsers: {
          totalCount: number;
        };
      }>(totalProductsAndTotalUsers).then((res) => res),
  });
};

const topDriversTopCustomersQueryDocument = gql`
  query GetOrderAnalytics {
    getOrderAnalytics {
      topDrivers {
        _id
        driverName
        phone
        totalAmountDelivered
        totalOrdersDelivered
        images
      }
      topCustomers {
        _id
        customerName
        totalAmount
        totalOrders
        images
        loyaltyPoints
      }
    }
  }
`;

export const useFetchTopCustomersTopDrivers = () => {
  return useQuery<{
    getOrderAnalytics: {
      topCustomers: topCustomers[];
      topDrivers: topDrivers[];
    };
  }>({
    queryKey: ['topdrivertopcustomers'],
    queryFn: () =>
      graphqlClient<{
        getOrderAnalytics: {
          topCustomers: topCustomers[];
          topDrivers: topDrivers[];
        };
      }>(topDriversTopCustomersQueryDocument).then((res) => res),
  });
};
