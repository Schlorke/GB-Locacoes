import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  name: SortOrderSchema.optional(),
  description: SortOrderSchema.optional(),
  icon: SortOrderSchema.optional(),
  iconColor: SortOrderSchema.optional(),
  bgColor: SortOrderSchema.optional(),
  fontColor: SortOrderSchema.optional(),
  slug: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional(),
  placement: SortOrderSchema.optional()
}).strict();
export const CategoryMaxOrderByAggregateInputObjectSchema: z.ZodType<Prisma.CategoryMaxOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.CategoryMaxOrderByAggregateInput>;
export const CategoryMaxOrderByAggregateInputObjectZodSchema = makeSchema();
