import { BeverageType } from '../constants/enums/Product';

export interface IProductAttribute {
  name: string;
  value: string | number | boolean;
  unit?: string;
  color?: string;
  price?: string;
}

export interface INutritionalInfo {
  servingSize: string;
  calories: number;
  proteins: number;
  carbohydrates: number;
  fats: number;
  sugar?: number;
  sodium?: number;
  fiber?: number;
}

export interface IBeverageInfo {
  type: BeverageType;
  alcoholContent?: number; // Percentage for alcoholic beverages
  volume: number; // in milliliters
  volumeOptions?: number[]; // Available volume options in ML
  pricePerML?: number; // Base price per ML for calculation
  containerType: string; // bottle, can, etc.
  brewery?: string; // For alcoholic beverages
  vintage?: number; // For wine
  region?: string; // Origin region for wines/beers
}

export enum ProductBadge {
  HOT = 'HOT',
  SALE = 'SALE',
  NEW = 'NEW',
  BEST_SELLER = 'BEST_SELLER',
  ORGANIC = 'ORGANIC',
  LIMITED_EDITION = 'LIMITED_EDITION',
  EXCLUSIVE = 'EXCLUSIVE',
  REGULAR = 'REGULAR',
}

export interface IProduct {
  _id: string;
  name: string;
  description: string;
  basePrice: number;
  sellingPrice: number;
  discountCategory: string;
  sku: string;
  category: {
    _id: string;
    name: string;
  };
  subCategory: {
    _id: string;
    name: string;
  };
  attributeValue: string;
  attributeUnit: number | string;

  supplier: {
    _id: string;
    name: string;
  };
  badges: ProductBadge[];
  attributes: IProductAttribute[];
  brand: { _id: string; name: string };
  images: string[];
  inventoryDetails: {
    unit: string;
    reorderPoint: number;
    totalStock: number;
    usedStock: number;
    remainingStock: number;
  };
  status: string;
  isFeatured: boolean;
  featuredPriority?: number;
  metaDescription?: string;
  metaTitle?: string;
  reviews: string[];
  tags: string[];
  searchKeywords: string[];
}
