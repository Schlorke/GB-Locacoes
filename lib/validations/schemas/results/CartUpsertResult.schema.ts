import * as z from 'zod';
export const CartUpsertResultSchema = z.object({
  id: z.string(),
  userId: z.string(),
  user: z.unknown(),
  items: z.array(z.unknown()),
  createdAt: z.date(),
  updatedAt: z.date()
});