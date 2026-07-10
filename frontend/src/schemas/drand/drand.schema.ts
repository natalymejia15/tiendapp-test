import { z } from 'zod';

export const brandSchema = z.object({
  reference: z
    .string()
    .min(2, 'Reference is required')
    .max(10, 'Maximum 10 characters'),

  name: z
    .string()
    .min(2, 'Name is required')
    .max(100),
});

export type BrandFormValues = z.infer<typeof brandSchema>;