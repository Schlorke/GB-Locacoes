/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod';
export const EquipmentUnitFindManyResultSchema = z.object({
  data: z.array(z.object({
  id: z.string(),
  equipmentId: z.string(),
  uniqueCode: z.string(),
  status: z.unknown(),
  hourMeter: z.number().optional(),
  odometer: z.number().optional(),
  serialNumber: z.string().optional(),
  notes: z.string().optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
  equipment: z.unknown()
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