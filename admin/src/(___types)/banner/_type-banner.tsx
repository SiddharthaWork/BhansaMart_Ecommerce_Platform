import { z } from 'zod';

export const BannerSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  // logo: z.string().min(1, 'Banner is required'),
  // mobileLogo: z.string().min(1,'Banner is required'),
  priority: z
    .number()
    .min(1, 'Priority is required')
    .max(10, 'Title is required'),
  selectBy: z.string().min(1, 'Please Select One Option'),
});
