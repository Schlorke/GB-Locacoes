import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema as SortOrderInputObjectSchema } from './SortOrderInput.schema';
import { MaintenanceCountOrderByAggregateInputObjectSchema as MaintenanceCountOrderByAggregateInputObjectSchema } from './MaintenanceCountOrderByAggregateInput.schema';
import { MaintenanceAvgOrderByAggregateInputObjectSchema as MaintenanceAvgOrderByAggregateInputObjectSchema } from './MaintenanceAvgOrderByAggregateInput.schema';
import { MaintenanceMaxOrderByAggregateInputObjectSchema as MaintenanceMaxOrderByAggregateInputObjectSchema } from './MaintenanceMaxOrderByAggregateInput.schema';
import { MaintenanceMinOrderByAggregateInputObjectSchema as MaintenanceMinOrderByAggregateInputObjectSchema } from './MaintenanceMinOrderByAggregateInput.schema';
import { MaintenanceSumOrderByAggregateInputObjectSchema as MaintenanceSumOrderByAggregateInputObjectSchema } from './MaintenanceSumOrderByAggregateInput.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  equipmentId: SortOrderSchema.optional(),
  type: SortOrderSchema.optional(),
  scheduledAt: SortOrderSchema.optional(),
  completedAt: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  cost: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  laborCost: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  partsCost: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  description: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  notes: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  technician: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  status: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional(),
  _count: z.lazy(() => MaintenanceCountOrderByAggregateInputObjectSchema).optional(),
  _avg: z.lazy(() => MaintenanceAvgOrderByAggregateInputObjectSchema).optional(),
  _max: z.lazy(() => MaintenanceMaxOrderByAggregateInputObjectSchema).optional(),
  _min: z.lazy(() => MaintenanceMinOrderByAggregateInputObjectSchema).optional(),
  _sum: z.lazy(() => MaintenanceSumOrderByAggregateInputObjectSchema).optional()
}).strict();
export const MaintenanceOrderByWithAggregationInputObjectSchema: z.ZodType<Prisma.MaintenanceOrderByWithAggregationInput> = makeSchema() as unknown as z.ZodType<Prisma.MaintenanceOrderByWithAggregationInput>;
export const MaintenanceOrderByWithAggregationInputObjectZodSchema = makeSchema();
