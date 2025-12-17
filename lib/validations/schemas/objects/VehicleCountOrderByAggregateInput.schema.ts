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
export const VehicleCountOrderByAggregateInputObjectSchema: z.ZodType<Prisma.VehicleCountOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.VehicleCountOrderByAggregateInput>;
export const VehicleCountOrderByAggregateInputObjectZodSchema = makeSchema();
