import { z } from 'zod';
import type { Prisma } from '../../../../node_modules/.prisma/client';


export const EquipmentAvgAggregateInputObjectSchema: z.ZodType<Prisma.EquipmentAvgAggregateInputType, Prisma.EquipmentAvgAggregateInputType> = z.object({
  pricePerDay: z.literal(true).optional()
}).strict();
export const EquipmentAvgAggregateInputObjectZodSchema = z.object({
  pricePerDay: z.literal(true).optional()
}).strict();
