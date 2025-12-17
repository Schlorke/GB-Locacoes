import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  amount: SortOrderSchema.optional()
}).strict();
export const PaymentAvgOrderByAggregateInputObjectSchema: z.ZodType<Prisma.PaymentAvgOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.PaymentAvgOrderByAggregateInput>;
export const PaymentAvgOrderByAggregateInputObjectZodSchema = makeSchema();
