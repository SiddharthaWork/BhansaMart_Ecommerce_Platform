import {z} from 'zod'

export const categorySchema = z.object({
    name: z.string().min(1, 'Name is required'),
    description: z.string().min(1, 'Description is required'),
    images: z.array(z.any()).min(1, 'At least one image is required'),
    subCategories: z.array(
      z.object({
        name: z.string().min(1, 'Name is required'),
        description: z.string().min(1, 'Description is required'),
        images: z.array(z.any()).min(1, 'At least one image is required'),
      })
    ),
  });