import { z } from 'zod';
import type { Prisma } from '../../../../node_modules/.prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

export const EquipmentAvgOrderByAggregateInputObjectSchema: z.ZodType<Prisma.EquipmentAvgOrderByAggregateInput, Prisma.EquipmentAvgOrderByAggregateInput> = z.object({
  pricePerDay: SortOrderSchema.optional()
}).strict();
export const EquipmentAvgOrderByAggregateInputObjectZodSchema = z.object({
  pricePerDay: SortOrderSchema.optional()
}).strict();
