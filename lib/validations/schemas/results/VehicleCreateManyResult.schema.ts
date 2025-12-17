import * as z from 'zod';
export const VehicleCreateManyResultSchema = z.object({
  count: z.number()
});