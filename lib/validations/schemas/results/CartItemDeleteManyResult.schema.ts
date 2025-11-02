import * as z from 'zod';
export const CartItemDeleteManyResultSchema = z.object({
  count: z.number()
});