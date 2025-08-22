import { z } from 'zod';
import type { Prisma } from '../../../../node_modules/.prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

export const CategoryCountOrderByAggregateInputObjectSchema: z.ZodType<Prisma.CategoryCountOrderByAggregateInput, Prisma.CategoryCountOrderByAggregateInput> = z.object({
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
export const CategoryCountOrderByAggregateInputObjectZodSchema = z.object({
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
