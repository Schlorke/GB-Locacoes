import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  expires_at: SortOrderSchema.optional()
}).strict();
export const AccountAvgOrderByAggregateInputObjectSchema: z.ZodType<Prisma.AccountAvgOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.AccountAvgOrderByAggregateInput>;
export const AccountAvgOrderByAggregateInputObjectZodSchema = makeSchema();
