/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  total: SortOrderSchema.optional()
}).strict();
export const rentalsAvgOrderByAggregateInputObjectSchema: z.ZodType<Prisma.rentalsAvgOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.rentalsAvgOrderByAggregateInput>;
export const rentalsAvgOrderByAggregateInputObjectZodSchema = makeSchema();
