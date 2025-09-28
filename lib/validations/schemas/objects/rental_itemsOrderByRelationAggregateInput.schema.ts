/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  _count: SortOrderSchema.optional()
}).strict();
export const rental_itemsOrderByRelationAggregateInputObjectSchema: z.ZodType<Prisma.rental_itemsOrderByRelationAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.rental_itemsOrderByRelationAggregateInput>;
export const rental_itemsOrderByRelationAggregateInputObjectZodSchema = makeSchema();
