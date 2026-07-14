import { z } from 'zod';

export const productSchema = z.object({
  brand_id: z.coerce
    .number()
    .min(1, 'Brand is required'),

  name: z
    .string()
    .trim()
    .min(2, 'Name is required')
    .max(100, 'Maximum 100 characters'),

  unit: z.enum(['UNIT', 'DISPLAY', 'BOX'], {
    message: 'Unit is required',
  }),

  observations: z
    .string()
    .trim()
    .min(2, 'Observations is required')
    .max(500, 'Maximum 500 characters'),

  inventory_quantity: z.coerce
    .number()
    .int('Inventory quantity must be an integer')
    .min(0, 'Inventory quantity cannot be negative'),
});

export type ProductFormInput = z.input<typeof productSchema>;
export type ProductFormValues = z.output<typeof productSchema>;