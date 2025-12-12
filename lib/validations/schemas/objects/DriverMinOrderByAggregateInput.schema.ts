/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
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
export const DriverMinOrderByAggregateInputObjectSchema: z.ZodType<Prisma.DriverMinOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.DriverMinOrderByAggregateInput>;
export const DriverMinOrderByAggregateInputObjectZodSchema = makeSchema();
