import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  plate: SortOrderSchema.optional(),
  brand: SortOrderSchema.optional(),
  model: SortOrderSchema.optional(),
  year: SortOrderSchema.optional(),
  type: SortOrderSchema.optional(),
  status: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional()
}).strict();
export const VehicleMinOrderByAggregateInputObjectSchema: z.ZodType<Prisma.VehicleMinOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.VehicleMinOrderByAggregateInput>;
export const VehicleMinOrderByAggregateInputObjectZodSchema = makeSchema();
