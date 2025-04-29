export interface ICashFlow {
  _id: string;
  startDate: string | Date;
  endDate: string | Date;
  totalSales: number;
  totalExpenses: number;
  netCashFlow: number;
}
