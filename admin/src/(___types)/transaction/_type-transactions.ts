export type TransactionType = {
  _id: string;
  orderStatus: string;
  totalAmount: number;
  paymentStatus: string;
  customer: {
    _id: string;
    name: string;
    image: string;
  };
  orderTimeline: {
    orderCreated: Date | string;
  };
  transactionDetails: {
    image: string;
    transactionId: string;
    payment: string;
    remainingPayment: string;
    paymentMethod: string;
  };
};
