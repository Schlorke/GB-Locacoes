import * as z from 'zod';
export const DriverDeleteManyResultSchema = z.object({
  count: z.number()
});