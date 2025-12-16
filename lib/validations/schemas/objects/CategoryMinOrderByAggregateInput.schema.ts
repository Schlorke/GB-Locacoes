/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
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
export const CategoryMinOrderByAggregateInputObjectSchema: z.ZodType<Prisma.CategoryMinOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.CategoryMinOrderByAggregateInput>;
export const CategoryMinOrderByAggregateInputObjectZodSchema = makeSchema();
