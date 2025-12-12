/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  name: SortOrderSchema.optional(),
  description: SortOrderSchema.optional(),
  pricePerDay: SortOrderSchema.optional(),
  available: SortOrderSchema.optional(),
  categoryId: SortOrderSchema.optional(),
  maxStock: SortOrderSchema.optional(),
  dailyDiscount: SortOrderSchema.optional(),
  weeklyDiscount: SortOrderSchema.optional(),
  biweeklyDiscount: SortOrderSchema.optional(),
  monthlyDiscount: SortOrderSchema.optional(),
  popularPeriod: SortOrderSchema.optional(),
  dailyDirectValue: SortOrderSchema.optional(),
  weeklyDirectValue: SortOrderSchema.optional(),
  biweeklyDirectValue: SortOrderSchema.optional(),
  monthlyDirectValue: SortOrderSchema.optional(),
  dailyUseDirectValue: SortOrderSchema.optional(),
  weeklyUseDirectValue: SortOrderSchema.optional(),
  biweeklyUseDirectValue: SortOrderSchema.optional(),
  monthlyUseDirectValue: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional(),
  purchasePrice: SortOrderSchema.optional(),
  purchaseDate: SortOrderSchema.optional(),
  depreciationRate: SortOrderSchema.optional(),
  hourMeter: SortOrderSchema.optional(),
  odometer: SortOrderSchema.optional()
}).strict();
export const EquipmentMaxOrderByAggregateInputObjectSchema: z.ZodType<Prisma.EquipmentMaxOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.EquipmentMaxOrderByAggregateInput>;
export const EquipmentMaxOrderByAggregateInputObjectZodSchema = makeSchema();
