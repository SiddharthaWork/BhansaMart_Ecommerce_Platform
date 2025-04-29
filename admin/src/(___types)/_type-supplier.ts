import { FileWithPreview } from '@/components/shared';
import { IProduct } from './_type-product-details';

export interface IBankDetails {
  accountHolderName: string;
  accountNumber: string;
  bankName: string;
  branch: string;
  paymentTerms: string;
}

export interface ISupplier {
  _id: string;
  name: string;
  description?: string;
  // Contact Information
  email: string;
  phone: string;
  businessType: string;
  contactPerson: {
    name: string;
    designation: string;
    phone: string;
    email: string;
  };
  // Address
  addresses: {
    district: string;
    address: string;
    province: string;
  };
  businessInfo: {
    company: string;
    PAN: string;
  };
  bankDetails: {
    accountHolderName: string;
    accountNumber: string;
    bankName: string;
    branch: string;
    paymentTerms: string;
  };
  products?: IProduct[];
  logo?: string;
}
export interface InputSupplier {
  name: string;
  description?: string;
  // Contact Information
  email: string;
  phone: string;
  businessType: string;
  contactPerson: {
    name: string;
    designation?: string;
    phone: string;
    email: string;
  };
  // Address
  addresses: {
    district: string;
    address: string;
    province: string;
  };
  businessInfo: {
    company: string;
    PAN: string;
  };
  bankDetails: {
    accountHolderName: string;
    accountNumber: string;
    bankName: string;
    branch: string;
    paymentTerms: string;
  };
  products?: IProduct[];
  logo?: string | FileWithPreview;
}

// export interface IPurchase {
//   product: string;
//   supplier: string;
//   category?: string;
//   price: number;
//   quantity: number;
//   paidAmount: number;
//   expiryDate: string;

//   /// dfdfdf
//   _id: string;
//   purchaseId: string;
//   supplierName: string;
//   purchaseDate: string;
//   totalAmount: string;
//   totalPaid: string;
//   balance: string;

//   attributes?: [
//     {
//       attribute: string;
//       price: number;
//       expiryDate: string;
//       quantity: number;
//       paidAmount: number;
//     },
//   ];
// }
