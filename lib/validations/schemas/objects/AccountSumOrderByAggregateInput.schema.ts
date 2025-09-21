import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  expires_at: SortOrderSchema.optional()
}).strict();
export const AccountSumOrderByAggregateInputObjectSchema: z.ZodType<Prisma.AccountSumOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.AccountSumOrderByAggregateInput>;
export const AccountSumOrderByAggregateInputObjectZodSchema = makeSchema();
