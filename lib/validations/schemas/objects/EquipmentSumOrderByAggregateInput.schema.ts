import { z } from 'zod';
import type { Prisma } from '../../../../node_modules/.prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

export const EquipmentSumOrderByAggregateInputObjectSchema: z.ZodType<Prisma.EquipmentSumOrderByAggregateInput, Prisma.EquipmentSumOrderByAggregateInput> = z.object({
  pricePerDay: SortOrderSchema.optional()
}).strict();
export const EquipmentSumOrderByAggregateInputObjectZodSchema = z.object({
  pricePerDay: SortOrderSchema.optional()
}).strict();
