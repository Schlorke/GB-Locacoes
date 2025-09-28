/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema as SortOrderInputObjectSchema } from './SortOrderInput.schema';
import { rentalsCountOrderByAggregateInputObjectSchema as rentalsCountOrderByAggregateInputObjectSchema } from './rentalsCountOrderByAggregateInput.schema';
import { rentalsAvgOrderByAggregateInputObjectSchema as rentalsAvgOrderByAggregateInputObjectSchema } from './rentalsAvgOrderByAggregateInput.schema';
import { rentalsMaxOrderByAggregateInputObjectSchema as rentalsMaxOrderByAggregateInputObjectSchema } from './rentalsMaxOrderByAggregateInput.schema';
import { rentalsMinOrderByAggregateInputObjectSchema as rentalsMinOrderByAggregateInputObjectSchema } from './rentalsMinOrderByAggregateInput.schema';
import { rentalsSumOrderByAggregateInputObjectSchema as rentalsSumOrderByAggregateInputObjectSchema } from './rentalsSumOrderByAggregateInput.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  startdate: SortOrderSchema.optional(),
  enddate: SortOrderSchema.optional(),
  total: SortOrderSchema.optional(),
  status: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  userid: SortOrderSchema.optional(),
  createdat: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  updatedat: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  _count: z.lazy(() => rentalsCountOrderByAggregateInputObjectSchema).optional(),
  _avg: z.lazy(() => rentalsAvgOrderByAggregateInputObjectSchema).optional(),
  _max: z.lazy(() => rentalsMaxOrderByAggregateInputObjectSchema).optional(),
  _min: z.lazy(() => rentalsMinOrderByAggregateInputObjectSchema).optional(),
  _sum: z.lazy(() => rentalsSumOrderByAggregateInputObjectSchema).optional()
}).strict();
export const rentalsOrderByWithAggregationInputObjectSchema: z.ZodType<Prisma.rentalsOrderByWithAggregationInput> = makeSchema() as unknown as z.ZodType<Prisma.rentalsOrderByWithAggregationInput>;
export const rentalsOrderByWithAggregationInputObjectZodSchema = makeSchema();
