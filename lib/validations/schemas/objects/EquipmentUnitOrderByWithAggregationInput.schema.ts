/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema as SortOrderInputObjectSchema } from './SortOrderInput.schema';
import { EquipmentUnitCountOrderByAggregateInputObjectSchema as EquipmentUnitCountOrderByAggregateInputObjectSchema } from './EquipmentUnitCountOrderByAggregateInput.schema';
import { EquipmentUnitAvgOrderByAggregateInputObjectSchema as EquipmentUnitAvgOrderByAggregateInputObjectSchema } from './EquipmentUnitAvgOrderByAggregateInput.schema';
import { EquipmentUnitMaxOrderByAggregateInputObjectSchema as EquipmentUnitMaxOrderByAggregateInputObjectSchema } from './EquipmentUnitMaxOrderByAggregateInput.schema';
import { EquipmentUnitMinOrderByAggregateInputObjectSchema as EquipmentUnitMinOrderByAggregateInputObjectSchema } from './EquipmentUnitMinOrderByAggregateInput.schema';
import { EquipmentUnitSumOrderByAggregateInputObjectSchema as EquipmentUnitSumOrderByAggregateInputObjectSchema } from './EquipmentUnitSumOrderByAggregateInput.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  equipmentId: SortOrderSchema.optional(),
  uniqueCode: SortOrderSchema.optional(),
  status: SortOrderSchema.optional(),
  hourMeter: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  odometer: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  serialNumber: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  notes: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional(),
  _count: z.lazy(() => EquipmentUnitCountOrderByAggregateInputObjectSchema).optional(),
  _avg: z.lazy(() => EquipmentUnitAvgOrderByAggregateInputObjectSchema).optional(),
  _max: z.lazy(() => EquipmentUnitMaxOrderByAggregateInputObjectSchema).optional(),
  _min: z.lazy(() => EquipmentUnitMinOrderByAggregateInputObjectSchema).optional(),
  _sum: z.lazy(() => EquipmentUnitSumOrderByAggregateInputObjectSchema).optional()
}).strict();
export const EquipmentUnitOrderByWithAggregationInputObjectSchema: z.ZodType<Prisma.EquipmentUnitOrderByWithAggregationInput> = makeSchema() as unknown as z.ZodType<Prisma.EquipmentUnitOrderByWithAggregationInput>;
export const EquipmentUnitOrderByWithAggregationInputObjectZodSchema = makeSchema();
