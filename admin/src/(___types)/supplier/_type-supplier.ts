import { z } from 'zod';

export const supplierSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email().min(1, 'Email is required'),
  phone: z.string().min(10, 'Phone number must be at least 10 digits'),
  businessType: z.string().min(1, 'Business type is required'),
  address: z.string().min(1, 'Address is required'),
  contactName: z.string().min(1, 'Contact name is required'),
  contactEmail: z.string().email().min(1, 'Contact email is required'),
  contactPhone: z
    .string()
    .min(10, 'Contact phone number must be at least 10 digits'),
  company: z.string().min(1, 'Company name is required'),
  pan: z.string().min(1, 'PAN is required'),
  bankName: z.string().min(1, 'Bank name is required'),
  branch: z.string().min(1, 'Branch is required'),
  accountName: z.string().min(1, 'Account name is required'),
  accountNumber: z.string().min(1, 'Account number is required'),
  paymentTerms: z.string().min(1, 'Payment terms is required'),
});
