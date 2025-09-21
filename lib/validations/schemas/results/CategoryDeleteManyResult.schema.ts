import { z } from 'zod';
export const CategoryDeleteManyResultSchema = z.object({
  count: z.number()
});