export interface IOrderAnalyticsDashboard {
  totalOrders: number;
  profit: number;
  weeklyProfit: number;
  recentTransactions: RecentTransactions[];
  weeklySales: weeklySales[];
  topProducts: topProducts[];
  dailyOrder: dailyOrder[];
  dailyCustomer: dailyCustomer[];
}

export interface dailyOrder {
  _id: string;
  totalOrders: number;
  totalAmount: number;
  date: string | Date;
  dayOfWeek: string;
}

export interface dailyCustomer {
  date: string | Date;
  dayOfWeek: string;
  newCustomers: number;
}

interface RecentTransactions {
  _id: string;
  id: string;
  date: Date | string;
  amount: string | number;
  paymentStatus: string;
  paymentMethod: string;
  customerName: string;
}

interface weeklySales {
  date: Date | string;
  totalSales: number;
}

interface topProducts {
  productName: string;
  totalQuantity: number;
  totalOrders: number;
  image: string[];
}

export interface ILowStockProductDashboard {
  _id: string;
  name: string;
  images: string[];
  inventoryDetails: {
    remainingStock: number;
  };
}

export interface ISalesStats {
  weeklySales: {
    categoryName: string;
    totalSales: number;
    totalQuantity: number;
  }[];
  monthlySales: {
    categoryName: string;
    totalSales: number;
    totalQuantity: number;
  }[];
  yearlySales: {
    categoryName: string;
    totalSales: number;
    totalQuantity: number;
  }[];
}

export interface topCustomers {
  _id: string;
  totalAmount: number;
  totalOrders: number;
  customerName: string;
  images: string;
  loyaltyPoints: number;
}

export interface topDrivers {
  _id: string;
  driverName: string;
  phone: string;
  images: string;
  totalAmountDelivered: string;
  totalOrdersDelivered: string;
}
