import { _IBrand } from './_type-attributes';
import { _Category } from './_type-Category';
import { IProduct } from './_type-product-details';

export interface IBanner {
  _id: string;
  title: string;
  description: string;
  image: string;
  mobImage: string;
  locations: string[];
  priority: number;
  category: _Category;
  brand: _IBrand;
  product: IProduct;
}
