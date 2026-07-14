import { z } from 'zod';

export const productSchema = z.object({
  reference: z
    .string()
    .trim()
    .min(2, 'Reference is required')
    .max(20, 'Maximum 20 characters'),

  name: z
    .string()
    .trim()
    .min(2, 'Name is required')
    .max(100, 'Maximum 100 characters'),

  description: z
    .string()
    .trim()
    .min(2, 'Description is required')
    .max(255, 'Maximum 255 characters'),

  price: z.coerce
    .number()
    .positive('Price must be greater than 0'),

  stock: z.coerce
    .number()
    .int('Stock must be an integer')
    .min(0, 'Stock cannot be negative'),

  brand_id: z.coerce
    .number()
    .min(1, 'Brand is required'),
});

export type ProductFormInput = z.input<typeof productSchema>;
export type ProductFormValues = z.output<typeof productSchema>;