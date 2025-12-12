/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod';
export const MaintenanceFindManyResultSchema = z.object({
  data: z.array(z.object({
  id: z.string(),
  equipmentId: z.string(),
  equipment: z.unknown(),
  type: z.unknown(),
  scheduledAt: z.date(),
  completedAt: z.date().optional(),
  cost: z.number().optional(),
  laborCost: z.number().optional(),
  partsCost: z.number().optional(),
  description: z.string().optional(),
  notes: z.string().optional(),
  technician: z.string().optional(),
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