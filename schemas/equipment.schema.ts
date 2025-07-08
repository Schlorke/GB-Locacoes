import { z } from 'zod';

export const equipmentSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1),
  description: z.string().optional(),
  price: z.number().nonnegative(),
  categoryId: z.string(),
});

export type Equipment = z.infer<typeof equipmentSchema>;
