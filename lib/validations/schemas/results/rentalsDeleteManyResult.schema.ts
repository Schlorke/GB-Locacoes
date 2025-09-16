import { z } from 'zod';
export const rentalsDeleteManyResultSchema = z.object({
  count: z.number()
});