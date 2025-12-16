/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema as SortOrderInputObjectSchema } from './SortOrderInput.schema';
import { EquipmentCountOrderByAggregateInputObjectSchema as EquipmentCountOrderByAggregateInputObjectSchema } from './EquipmentCountOrderByAggregateInput.schema';
import { EquipmentAvgOrderByAggregateInputObjectSchema as EquipmentAvgOrderByAggregateInputObjectSchema } from './EquipmentAvgOrderByAggregateInput.schema';
import { EquipmentMaxOrderByAggregateInputObjectSchema as EquipmentMaxOrderByAggregateInputObjectSchema } from './EquipmentMaxOrderByAggregateInput.schema';
import { EquipmentMinOrderByAggregateInputObjectSchema as EquipmentMinOrderByAggregateInputObjectSchema } from './EquipmentMinOrderByAggregateInput.schema';
import { EquipmentSumOrderByAggregateInputObjectSchema as EquipmentSumOrderByAggregateInputObjectSchema } from './EquipmentSumOrderByAggregateInput.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  name: SortOrderSchema.optional(),
  description: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  pricePerDay: SortOrderSchema.optional(),
  images: SortOrderSchema.optional(),
  available: SortOrderSchema.optional(),
  categoryId: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional(),
  biweeklyDiscount: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  dailyDiscount: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  maxStock: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  monthlyDiscount: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  popularPeriod: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  weeklyDiscount: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  specifications: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  biweeklyDirectValue: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  biweeklyUseDirectValue: SortOrderSchema.optional(),
  dailyDirectValue: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  dailyUseDirectValue: SortOrderSchema.optional(),
  monthlyDirectValue: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  monthlyUseDirectValue: SortOrderSchema.optional(),
  weeklyDirectValue: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  weeklyUseDirectValue: SortOrderSchema.optional(),
  depreciationRate: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  hourMeter: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  odometer: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  purchaseDate: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  purchasePrice: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  _count: z.lazy(() => EquipmentCountOrderByAggregateInputObjectSchema).optional(),
  _avg: z.lazy(() => EquipmentAvgOrderByAggregateInputObjectSchema).optional(),
  _max: z.lazy(() => EquipmentMaxOrderByAggregateInputObjectSchema).optional(),
  _min: z.lazy(() => EquipmentMinOrderByAggregateInputObjectSchema).optional(),
  _sum: z.lazy(() => EquipmentSumOrderByAggregateInputObjectSchema).optional()
}).strict();
export const EquipmentOrderByWithAggregationInputObjectSchema: z.ZodType<Prisma.EquipmentOrderByWithAggregationInput> = makeSchema() as unknown as z.ZodType<Prisma.EquipmentOrderByWithAggregationInput>;
export const EquipmentOrderByWithAggregationInputObjectZodSchema = makeSchema();
