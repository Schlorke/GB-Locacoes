import { z } from 'zod';
export const CategoryCreateManyResultSchema = z.object({
  count: z.number()
});