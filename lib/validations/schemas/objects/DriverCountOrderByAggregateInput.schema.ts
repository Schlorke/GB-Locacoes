import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  name: SortOrderSchema.optional(),
  phone: SortOrderSchema.optional(),
  cnh: SortOrderSchema.optional(),
  cnhCategory: SortOrderSchema.optional(),
  status: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional()
}).strict();
export const DriverCountOrderByAggregateInputObjectSchema: z.ZodType<Prisma.DriverCountOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.DriverCountOrderByAggregateInput>;
export const DriverCountOrderByAggregateInputObjectZodSchema = makeSchema();
