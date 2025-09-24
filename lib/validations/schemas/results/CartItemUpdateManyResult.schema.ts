import { z } from 'zod';
export const CartItemUpdateManyResultSchema = z.object({
  count: z.number()
});