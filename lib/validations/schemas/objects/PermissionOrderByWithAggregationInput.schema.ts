import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { PermissionCountOrderByAggregateInputObjectSchema as PermissionCountOrderByAggregateInputObjectSchema } from './PermissionCountOrderByAggregateInput.schema';
import { PermissionMaxOrderByAggregateInputObjectSchema as PermissionMaxOrderByAggregateInputObjectSchema } from './PermissionMaxOrderByAggregateInput.schema';
import { PermissionMinOrderByAggregateInputObjectSchema as PermissionMinOrderByAggregateInputObjectSchema } from './PermissionMinOrderByAggregateInput.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  role: SortOrderSchema.optional(),
  module: SortOrderSchema.optional(),
  action: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional(),
  _count: z.lazy(() => PermissionCountOrderByAggregateInputObjectSchema).optional(),
  _max: z.lazy(() => PermissionMaxOrderByAggregateInputObjectSchema).optional(),
  _min: z.lazy(() => PermissionMinOrderByAggregateInputObjectSchema).optional()
}).strict();
export const PermissionOrderByWithAggregationInputObjectSchema: z.ZodType<Prisma.PermissionOrderByWithAggregationInput> = makeSchema() as unknown as z.ZodType<Prisma.PermissionOrderByWithAggregationInput>;
export const PermissionOrderByWithAggregationInputObjectZodSchema = makeSchema();
