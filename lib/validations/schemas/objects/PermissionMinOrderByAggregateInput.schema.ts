/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  role: SortOrderSchema.optional(),
  module: SortOrderSchema.optional(),
  action: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional()
}).strict();
export const PermissionMinOrderByAggregateInputObjectSchema: z.ZodType<Prisma.PermissionMinOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.PermissionMinOrderByAggregateInput>;
export const PermissionMinOrderByAggregateInputObjectZodSchema = makeSchema();
