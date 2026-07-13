import { z } from 'zod';

export const profileSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, 'Name is required')
    .min(3, 'Name must be at least 3 characters')
    .max(50, 'Name cannot exceed 50 characters')
    .regex(/^[A-Za-z\s]+$/, 'Name can only contain letters and spaces'),

  phone: z
    .string()
    .trim()
    .min(1, 'Phone number is required')
    .regex(/^\d{10}$/, 'Phone number must contain exactly 10 digits'),

  line1: z
    .string()
    .trim()
    .min(1, 'Address Line 1 is required')
    .max(100, 'Address Line 1 cannot exceed 100 characters'),

  line2: z
    .string()
    .trim()
    .min(1, 'Address Line 2 is required')
    .max(100, 'Address Line 2 cannot exceed 100 characters'),

  gender: z.enum(['male', 'female', 'other'], {
    error: 'Gender is required',
  }),

  dob: z
    .string()
    .min(1, 'Date of birth is required')
    .refine((date) => !Number.isNaN(Date.parse(date)), {
      message: 'Invalid date',
    }),
});
