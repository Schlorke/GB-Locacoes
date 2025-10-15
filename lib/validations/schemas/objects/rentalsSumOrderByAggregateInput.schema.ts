/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  total: SortOrderSchema.optional()
}).strict();
export const rentalsSumOrderByAggregateInputObjectSchema: z.ZodType<Prisma.rentalsSumOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.rentalsSumOrderByAggregateInput>;
export const rentalsSumOrderByAggregateInputObjectZodSchema = makeSchema();
