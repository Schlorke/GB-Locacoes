/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  name: SortOrderSchema.optional(),
  description: SortOrderSchema.optional(),
  pricePerDay: SortOrderSchema.optional(),
  images: SortOrderSchema.optional(),
  available: SortOrderSchema.optional(),
  categoryId: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional(),
  biweeklyDiscount: SortOrderSchema.optional(),
  dailyDiscount: SortOrderSchema.optional(),
  maxStock: SortOrderSchema.optional(),
  monthlyDiscount: SortOrderSchema.optional(),
  popularPeriod: SortOrderSchema.optional(),
  weeklyDiscount: SortOrderSchema.optional(),
  specifications: SortOrderSchema.optional(),
  biweeklyDirectValue: SortOrderSchema.optional(),
  biweeklyUseDirectValue: SortOrderSchema.optional(),
  dailyDirectValue: SortOrderSchema.optional(),
  dailyUseDirectValue: SortOrderSchema.optional(),
  monthlyDirectValue: SortOrderSchema.optional(),
  monthlyUseDirectValue: SortOrderSchema.optional(),
  weeklyDirectValue: SortOrderSchema.optional(),
  weeklyUseDirectValue: SortOrderSchema.optional(),
  depreciationRate: SortOrderSchema.optional(),
  hourMeter: SortOrderSchema.optional(),
  odometer: SortOrderSchema.optional(),
  purchaseDate: SortOrderSchema.optional(),
  purchasePrice: SortOrderSchema.optional()
}).strict();
export const EquipmentCountOrderByAggregateInputObjectSchema: z.ZodType<Prisma.EquipmentCountOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.EquipmentCountOrderByAggregateInput>;
export const EquipmentCountOrderByAggregateInputObjectZodSchema = makeSchema();
