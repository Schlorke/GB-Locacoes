import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  id: SortOrderSchema.optional(),
  name: SortOrderSchema.optional(),
  description: SortOrderSchema.optional(),
  pricePerDay: SortOrderSchema.optional(),
  images: SortOrderSchema.optional(),
  available: SortOrderSchema.optional(),
  categoryId: SortOrderSchema.optional(),
  specifications: SortOrderSchema.optional(),
  maxStock: SortOrderSchema.optional(),
  dailyDiscount: SortOrderSchema.optional(),
  weeklyDiscount: SortOrderSchema.optional(),
  biweeklyDiscount: SortOrderSchema.optional(),
  monthlyDiscount: SortOrderSchema.optional(),
  popularPeriod: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional()
}).strict();
export const EquipmentCountOrderByAggregateInputObjectSchema: z.ZodType<Prisma.EquipmentCountOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.EquipmentCountOrderByAggregateInput>;
export const EquipmentCountOrderByAggregateInputObjectZodSchema = makeSchema();
