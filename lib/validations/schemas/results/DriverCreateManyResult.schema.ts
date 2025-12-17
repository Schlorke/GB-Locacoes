import * as z from 'zod';
export const DriverCreateManyResultSchema = z.object({
  count: z.number()
});