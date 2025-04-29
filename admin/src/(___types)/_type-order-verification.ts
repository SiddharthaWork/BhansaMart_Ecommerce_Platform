import { ICustomer } from './_type-customer';
import { IProduct } from './_type-product-details';
import { _User } from './_type-User';

export interface AddressDetails {
  address: string;
  email: string;
  fullname: string;
  landmark: string;
  phone: string;
  paymentStatus?: string;
}

export interface BillingDetails {
  subTotalItemPrice: number;
  shippingCost: number;
  discount: number;
  voucher: string;
  totalBill: number;
}

export interface OrderItemDetails {
  product: Partial<IProduct>;
  quantity: number;
  attributes: string;
}

export interface IOrder {
  _id: string;
  customer: _User;
  shippingAddress: {
    fullname: string;
    address: string;
    landmark: string;
    phone: string;
    email: string;
    paymentStatus: string;
  };
  billingAddress: {
    fullname: string;
    address: string;
    landmark: string;
    phone: string;
    email: string;
  };
  orderedProducts: {
    product: IProduct;
    quantity: number;
    attributes: string;
  }[];
  billDetails: {
    subTotalItemPrice: number;
    shippingCost: number;
    discount: number;
    voucher: string;
    totalBill: number;
  };
  orderStatus: string;
  deliveryStatus: string;
  totalAmount: number;
  paymentStatus: string;
  orderTimeline: {
    orderCreated: Date;
    orderConfirmation?: Date;
    pickup?: Date;
    canceled: {
      by: ICustomer;
      date: string | Date;
      reason: string;
    };
    deliveryAssignment?: Date;
    outForDelivery?: Date;
    orderHandOver?: Date;
    deliveryCompletion?: Date;
  };
  transactionDetails: {
    image: string;
    transactionId: string;
    payment: number;
    remainingPayment: number;
    paymentMethod: string;
  };
  deliveryPerson?: _User;
  cancellation: {
    reason: string;
    date: Date | string;
  };
}
