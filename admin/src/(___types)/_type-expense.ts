export interface IExpense {
  _id: string;
  expenseCategory: string;
  date: Date | string;
  description: string;
  amount: number;
  note?: string;
  purchaseId?: string;
}

export interface InputIExpese {
  date: Date | string;
  expenseCategory: string;
  description: string;
  amount: number;
  note?: string;
  purchaseId?: string;
}
