/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema as SortOrderInputObjectSchema } from './SortOrderInput.schema';
import { DriverCountOrderByAggregateInputObjectSchema as DriverCountOrderByAggregateInputObjectSchema } from './DriverCountOrderByAggregateInput.schema';
import { DriverMaxOrderByAggregateInputObjectSchema as DriverMaxOrderByAggregateInputObjectSchema } from './DriverMaxOrderByAggregateInput.schema';
import { DriverMinOrderByAggregateInputObjectSchema as DriverMinOrderByAggregateInputObjectSchema } from './DriverMinOrderByAggregateInput.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  name: SortOrderSchema.optional(),
  phone: SortOrderSchema.optional(),
  cnh: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  cnhCategory: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  status: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional(),
  _count: z.lazy(() => DriverCountOrderByAggregateInputObjectSchema).optional(),
  _max: z.lazy(() => DriverMaxOrderByAggregateInputObjectSchema).optional(),
  _min: z.lazy(() => DriverMinOrderByAggregateInputObjectSchema).optional()
}).strict();
export const DriverOrderByWithAggregationInputObjectSchema: z.ZodType<Prisma.DriverOrderByWithAggregationInput> = makeSchema() as unknown as z.ZodType<Prisma.DriverOrderByWithAggregationInput>;
export const DriverOrderByWithAggregationInputObjectZodSchema = makeSchema();
