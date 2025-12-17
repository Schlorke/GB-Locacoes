import * as z from 'zod';
export const VehicleDeleteManyResultSchema = z.object({
  count: z.number()
});