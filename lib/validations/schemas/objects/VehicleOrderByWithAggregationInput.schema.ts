import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema as SortOrderInputObjectSchema } from './SortOrderInput.schema';
import { VehicleCountOrderByAggregateInputObjectSchema as VehicleCountOrderByAggregateInputObjectSchema } from './VehicleCountOrderByAggregateInput.schema';
import { VehicleAvgOrderByAggregateInputObjectSchema as VehicleAvgOrderByAggregateInputObjectSchema } from './VehicleAvgOrderByAggregateInput.schema';
import { VehicleMaxOrderByAggregateInputObjectSchema as VehicleMaxOrderByAggregateInputObjectSchema } from './VehicleMaxOrderByAggregateInput.schema';
import { VehicleMinOrderByAggregateInputObjectSchema as VehicleMinOrderByAggregateInputObjectSchema } from './VehicleMinOrderByAggregateInput.schema';
import { VehicleSumOrderByAggregateInputObjectSchema as VehicleSumOrderByAggregateInputObjectSchema } from './VehicleSumOrderByAggregateInput.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  plate: SortOrderSchema.optional(),
  brand: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  model: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  year: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  type: SortOrderSchema.optional(),
  status: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional(),
  _count: z.lazy(() => VehicleCountOrderByAggregateInputObjectSchema).optional(),
  _avg: z.lazy(() => VehicleAvgOrderByAggregateInputObjectSchema).optional(),
  _max: z.lazy(() => VehicleMaxOrderByAggregateInputObjectSchema).optional(),
  _min: z.lazy(() => VehicleMinOrderByAggregateInputObjectSchema).optional(),
  _sum: z.lazy(() => VehicleSumOrderByAggregateInputObjectSchema).optional()
}).strict();
export const VehicleOrderByWithAggregationInputObjectSchema: z.ZodType<Prisma.VehicleOrderByWithAggregationInput> = makeSchema() as unknown as z.ZodType<Prisma.VehicleOrderByWithAggregationInput>;
export const VehicleOrderByWithAggregationInputObjectZodSchema = makeSchema();
