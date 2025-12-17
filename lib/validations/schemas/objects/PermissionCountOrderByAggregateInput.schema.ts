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
export const PermissionCountOrderByAggregateInputObjectSchema: z.ZodType<Prisma.PermissionCountOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.PermissionCountOrderByAggregateInput>;
export const PermissionCountOrderByAggregateInputObjectZodSchema = makeSchema();
