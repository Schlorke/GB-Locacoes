/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  _count: SortOrderSchema.optional()
}).strict();
export const rentalsOrderByRelationAggregateInputObjectSchema: z.ZodType<Prisma.rentalsOrderByRelationAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.rentalsOrderByRelationAggregateInput>;
export const rentalsOrderByRelationAggregateInputObjectZodSchema = makeSchema();
