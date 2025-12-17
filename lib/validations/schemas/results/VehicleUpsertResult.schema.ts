import * as z from 'zod';
export const VehicleUpsertResultSchema = z.object({
  id: z.string(),
  plate: z.string(),
  brand: z.string().optional(),
  model: z.string().optional(),
  year: z.number().int().optional(),
  type: z.unknown(),
  status: z.unknown(),
  createdAt: z.date(),
  updatedAt: z.date()
});