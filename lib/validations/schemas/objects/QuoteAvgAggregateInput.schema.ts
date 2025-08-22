import { z } from 'zod';
import type { Prisma } from '../../../../node_modules/.prisma/client';


export const QuoteAvgAggregateInputObjectSchema: z.ZodType<Prisma.QuoteAvgAggregateInputType, Prisma.QuoteAvgAggregateInputType> = z.object({
  total: z.literal(true).optional()
}).strict();
export const QuoteAvgAggregateInputObjectZodSchema = z.object({
  total: z.literal(true).optional()
}).strict();
