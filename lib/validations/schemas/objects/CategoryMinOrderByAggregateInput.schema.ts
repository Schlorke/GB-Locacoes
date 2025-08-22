import { z } from 'zod';
import type { Prisma } from '../../../../node_modules/.prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

export const CategoryMinOrderByAggregateInputObjectSchema: z.ZodType<Prisma.CategoryMinOrderByAggregateInput, Prisma.CategoryMinOrderByAggregateInput> = z.object({
  id: SortOrderSchema.optional(),
  name: SortOrderSchema.optional(),
  description: SortOrderSchema.optional(),
  icon: SortOrderSchema.optional(),
  iconColor: SortOrderSchema.optional(),
  bgColor: SortOrderSchema.optional(),
  fontColor: SortOrderSchema.optional(),
  slug: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional()
}).strict();
export const CategoryMinOrderByAggregateInputObjectZodSchema = z.object({
  id: SortOrderSchema.optional(),
  name: SortOrderSchema.optional(),
  description: SortOrderSchema.optional(),
  icon: SortOrderSchema.optional(),
  iconColor: SortOrderSchema.optional(),
  bgColor: SortOrderSchema.optional(),
  fontColor: SortOrderSchema.optional(),
  slug: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional()
}).strict();
