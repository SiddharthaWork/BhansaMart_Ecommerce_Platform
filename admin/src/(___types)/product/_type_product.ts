import { z } from 'zod';

const statusEnum = ['draft', 'published', 'archived'] as const;
const visibilityEnum = ['online', 'instore', 'wholesale'] as const;

export const productSchema = z.object({
  name: z.string().min(1, 'Product name is required'),
  // description: z.string().min(1, "Description is required"),
  category: z.string().min(1, 'Category is required'),
  subCategory: z.string().min(1, 'Sub-category is required'),
  // supplierName: z.string().min(1, "Supplier is required"),
  // brand: z.string().min(1, "Brand is required"),
  sellingPrice: z.coerce.number().positive('Price must be positive'),
  // discountCategory: z.string().optional(),
  attribute: z.array(
    z.object({
      name: z.string().min(1, 'Variation name required'),
      // value: z.coerce.number().nonnegative("Value must be non-negative"),
      // unit: z.string().min(1, "Unit is required"),
      // color: z.string().optional(),
      // price: z.coerce.number().nonnegative("Price must be non-negative"),
    })
  ),
  // productSKU: z.string().min(1, "SKU is required"),
  // stockQuantity: z.coerce.number().nonnegative("Stock quantity invalid"),
  // reorderLevel: z.coerce.number().nonnegative("Reorder level invalid"),
  // status: z.enum(statusEnum),
  // visibleAs: z.array(z.enum(visibilityEnum)).optional(),
  // productTags: z.array(z.string()).optional(),
  // photos: z.array(z.any()).min(1, "At least one photo is required")
});

export type ProductSchemaType = z.infer<typeof productSchema>;
