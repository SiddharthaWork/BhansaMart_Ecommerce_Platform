import { FileWithPreview } from '../components/shared';

export interface _Category {
  _id: string;
  name: string;
  description?: string;
  priority?: number;
  isActive: boolean;
  images: string[] | FileWithPreview[];
  subCategories: _SubCategory[];
  products: string;
}

interface _SubCategory {
  _id: string;
  name: string;
  description: string;
  isActive: boolean;
  images: string[] | FileWithPreview[];
  products: string[];
}

export interface _inputCategory {
  _id: string;
  name: string;
  description?: string;
  priority?: number;
  isActive: boolean;
  images: string[] | FileWithPreview[];
  subCategories: _inputSubCategory[];
  products: string;
}

interface _inputSubCategory {
  name: string;
  description: string;
  images: string[] | FileWithPreview[];
}
