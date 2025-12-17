/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod';
export const EquipmentUnitUpsertResultSchema = z.object({
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
});