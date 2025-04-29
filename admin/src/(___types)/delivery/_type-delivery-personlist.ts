import {z} from 'zod';

export const deliverySchema = z.object({
    firstname: z.string().min(1, 'First name is required'),
    lastname: z.string().min(1, 'Last name is required'),
    email: z.string().email().min(1, 'Email is required'),
    phone: z.string().min(10, 'Phone number must be at least 10 digits'),
    address: z.string().min(1, 'Address is required'),
    joinDate: z.string().min(1, 'Join date is required'),
    gender: z.string().min(1, 'Gender is required'),
    vehicleNumber: z.string().min(1, 'Vehicle number is required'),
    vehicleModel: z.string().min(1, 'Vehicle model is required'),
    vehicleType: z.string().min(1, 'Vehicle type is required'),
    license: z.instanceof(File).refine(file => file.size > 0, 'License is required'),
    citizenship: z.array(z.instanceof(File)).min(1, 'At least one citizenship is required'),
    password: z.string().min(1, 'Password is required'),
  });