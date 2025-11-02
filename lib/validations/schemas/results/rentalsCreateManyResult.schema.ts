import * as z from 'zod';
export const rentalsCreateManyResultSchema = z.object({
  count: z.number()
});