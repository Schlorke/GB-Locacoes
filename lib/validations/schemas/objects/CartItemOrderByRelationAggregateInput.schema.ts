import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  _count: SortOrderSchema.optional()
}).strict();
export const CartItemOrderByRelationAggregateInputObjectSchema: z.ZodType<Prisma.CartItemOrderByRelationAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.CartItemOrderByRelationAggregateInput>;
export const CartItemOrderByRelationAggregateInputObjectZodSchema = makeSchema();
