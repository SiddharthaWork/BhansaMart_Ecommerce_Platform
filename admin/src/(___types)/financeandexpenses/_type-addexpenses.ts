import { z } from 'zod'

export const incomeSchema = z.object({
    expenseCategory: z.string().min(1, "Select an expense category"),
    date: z.string().min(1, "Select a date"),
    description: z.string().min(1, "Enter a description"),
    amount: z.string().min(1, "Enter an amount"),
  })