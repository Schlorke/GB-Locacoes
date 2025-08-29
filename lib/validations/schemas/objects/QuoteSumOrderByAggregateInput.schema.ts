import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  total: SortOrderSchema.optional()
}).strict();
export const QuoteSumOrderByAggregateInputObjectSchema: z.ZodType<Prisma.QuoteSumOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.QuoteSumOrderByAggregateInput>;
export const QuoteSumOrderByAggregateInputObjectZodSchema = makeSchema();
