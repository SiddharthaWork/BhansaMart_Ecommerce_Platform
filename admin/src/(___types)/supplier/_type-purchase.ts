import {z} from 'zod'

export const purchaseSchema = z.object({
    product: z.string().min(1, 'Product is required'),
    supplier: z.string().min(1, 'Supplier is required'),
    price: z.number().min(1, 'Price is required'),
    quantity: z.number().min(1, 'Quantity is required'),
    paidAmount: z.number().min(1, 'Paid Amount is required'),
    expiryDate: z.string().min(1, 'Expiry Date is required'),
    // attributes: z.array(
    //   z.object({
    //     attribute: z.string().min(1, 'Attribute is required'),
    //     price: z.number().min(1, 'Price is required'),
    //     quantity: z.number().min(1, 'Quantity is required'),
    //     paidAmount: z.number().min(1, 'Paid Amount is required'),
    //     expiryDate: z.string().min(1, 'Expiry Date is required'),
    //   })
    // ),
  })