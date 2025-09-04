import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  pricePerDay: SortOrderSchema.optional(),
  maxStock: SortOrderSchema.optional(),
  dailyDiscount: SortOrderSchema.optional(),
  weeklyDiscount: SortOrderSchema.optional(),
  biweeklyDiscount: SortOrderSchema.optional(),
  monthlyDiscount: SortOrderSchema.optional(),
  dailyDirectValue: SortOrderSchema.optional(),
  weeklyDirectValue: SortOrderSchema.optional(),
  biweeklyDirectValue: SortOrderSchema.optional(),
  monthlyDirectValue: SortOrderSchema.optional()
}).strict();
export const EquipmentSumOrderByAggregateInputObjectSchema: z.ZodType<Prisma.EquipmentSumOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.EquipmentSumOrderByAggregateInput>;
export const EquipmentSumOrderByAggregateInputObjectZodSchema = makeSchema();
