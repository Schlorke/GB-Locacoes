/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod';
export const VehicleFindManyResultSchema = z.object({
  data: z.array(z.object({
  id: z.string(),
  plate: z.string(),
  brand: z.string().optional(),
  model: z.string().optional(),
  year: z.number().int().optional(),
  type: z.unknown(),
  status: z.unknown(),
  createdAt: z.date(),
  updatedAt: z.date()
})),
  pagination: z.object({
  page: z.number().int().min(1),
  pageSize: z.number().int().min(1),
  total: z.number().int().min(0),
  totalPages: z.number().int().min(0),
  hasNext: z.boolean(),
  hasPrev: z.boolean()
})
});