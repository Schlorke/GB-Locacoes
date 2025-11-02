import * as z from 'zod';
export const CartDeleteManyResultSchema = z.object({
  count: z.number()
});