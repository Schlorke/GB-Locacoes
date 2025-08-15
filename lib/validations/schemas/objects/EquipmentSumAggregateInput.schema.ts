import { z } from 'zod';
import type { Prisma } from '../../../../node_modules/.prisma/client';


export const EquipmentSumAggregateInputObjectSchema: z.ZodType<Prisma.EquipmentSumAggregateInputType, Prisma.EquipmentSumAggregateInputType> = z.object({
  pricePerDay: z.literal(true).optional()
}).strict();
export const EquipmentSumAggregateInputObjectZodSchema = z.object({
  pricePerDay: z.literal(true).optional()
}).strict();
