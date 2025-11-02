import * as z from 'zod';
export const CartCreateManyResultSchema = z.object({
  count: z.number()
});