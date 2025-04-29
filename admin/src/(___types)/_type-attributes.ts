export interface _IVoucher {
  _id: string;
  couponCode: string;
  couponType: string;
  value?: number;
  minPurchase?: number;
  maxUsage?: number;
  perUserLimit?: number;
  expiresOn?: Date;
  status?: string;
  productRestrictions?: string[];
}

export interface _inputVoucher {
  couponCode: string;
  couponType: string;
  value?: number;
  minPurchase?: number;
  maxUsage?: number;
  perUserLimit?: number;
  expiresOn?: Date;
  status?: string;
  productRestrictions?: string[];
}

export interface _IBrand {
  _id: string;
  name: string;
  cateogry: string[];
}

export interface _updateIBrand {
  _id: string;
  name: string;
  category: { _id: string; name: string }[];
}

export interface _onlyIBrand {
  _id: string;
  name: string;
}

export interface _inputIBrand {
  name: string;
  category: string[];
}

export interface _inputBrandDiscount {
  brand: string;
  product: string;
  type: string;
  discount: number;
  endDate: string;
  startDate: string;
}

export interface _inputCategoryDiscount {
  category: string;
  subCategory: string;
  discount: number;
  type: string;
  startDate: string;
  endDate: string;
}

export interface _inputIndividualDiscount {
  product: string;
  discount: number;
  type: string;
  startDate: string;
  endDate: string;
}
