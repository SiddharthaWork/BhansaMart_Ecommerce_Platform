import {z} from 'zod'

export const voucherSchema = z.object({
    code: z.string().min(1, "Enter the code"),
    type: z.string().min(1, "Select a type"),
    discount: z.string().min(1, "Enter a discount"),
    startDate: z.string().min(1, "Select a start date"),
    endDate: z.string().min(1, "Select an end date"),
  
  })