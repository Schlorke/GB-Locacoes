import { z } from 'zod';
export const CartItemCreateManyResultSchema = z.object({
  count: z.number()
});