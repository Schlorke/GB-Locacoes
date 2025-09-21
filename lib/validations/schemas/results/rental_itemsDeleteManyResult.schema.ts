import { z } from 'zod';
export const rental_itemsDeleteManyResultSchema = z.object({
  count: z.number()
});