import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.literal(true).optional(),
  equipmentId: z.literal(true).optional(),
  uniqueCode: z.literal(true).optional(),
  status: z.literal(true).optional(),
  hourMeter: z.literal(true).optional(),
  odometer: z.literal(true).optional(),
  serialNumber: z.literal(true).optional(),
  notes: z.literal(true).optional(),
  createdAt: z.literal(true).optional(),
  updatedAt: z.literal(true).optional()
}).strict();
export const EquipmentUnitMinAggregateInputObjectSchema: z.ZodType<Prisma.EquipmentUnitMinAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.EquipmentUnitMinAggregateInputType>;
export const EquipmentUnitMinAggregateInputObjectZodSchema = makeSchema();
