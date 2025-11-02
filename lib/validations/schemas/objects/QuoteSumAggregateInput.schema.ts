import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  total: z.literal(true).optional()
}).strict();
export const QuoteSumAggregateInputObjectSchema: z.ZodType<Prisma.QuoteSumAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.QuoteSumAggregateInputType>;
export const QuoteSumAggregateInputObjectZodSchema = makeSchema();
