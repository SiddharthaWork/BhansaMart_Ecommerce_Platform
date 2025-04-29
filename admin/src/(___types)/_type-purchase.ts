import { IProduct } from './_type-product-details';
import { ISupplier } from './_type-supplier';

export interface IPurchase {
  _id: string;
  products: {
    quantity: number;
    expiryDate: string | Date;
    price: number | string;
    paidAmount: number;
    attributes: {
      attribute: string;
      price: number | string;
      quantity: number | string;
      expiryDate: string | Date;
      paidAmount: string | number;
    }[];
    product: IProduct | string;
  }[];
  supplier: ISupplier;
  billNo: string;
}

export interface InputIPurchase {
  products: {
    quantity: number;
    expiryDate: string | Date;
    price: number | string;
    paidAmount: number;
    attributes: {
      attribute: string;
      price: number | string;
      quantity: number | string;
      expiryDate: string | Date;
      paidAmount: string | number;
    }[];
    product: string;
  }[];
  supplier: string;
  billNo: string;
}
