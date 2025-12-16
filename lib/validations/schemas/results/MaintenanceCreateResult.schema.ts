/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod';
export const MaintenanceCreateResultSchema = z.object({
  id: z.string(),
  equipmentId: z.string(),
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
  updatedAt: z.date(),
  equipment: z.unknown()
});