/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  pricePerDay: SortOrderSchema.optional(),
  biweeklyDiscount: SortOrderSchema.optional(),
  dailyDiscount: SortOrderSchema.optional(),
  maxStock: SortOrderSchema.optional(),
  monthlyDiscount: SortOrderSchema.optional(),
  weeklyDiscount: SortOrderSchema.optional(),
  biweeklyDirectValue: SortOrderSchema.optional(),
  dailyDirectValue: SortOrderSchema.optional(),
  monthlyDirectValue: SortOrderSchema.optional(),
  weeklyDirectValue: SortOrderSchema.optional(),
  depreciationRate: SortOrderSchema.optional(),
  hourMeter: SortOrderSchema.optional(),
  odometer: SortOrderSchema.optional(),
  purchasePrice: SortOrderSchema.optional(),
  partsLossCount: SortOrderSchema.optional()
}).strict();
export const EquipmentAvgOrderByAggregateInputObjectSchema: z.ZodType<Prisma.EquipmentAvgOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.EquipmentAvgOrderByAggregateInput>;
export const EquipmentAvgOrderByAggregateInputObjectZodSchema = makeSchema();
