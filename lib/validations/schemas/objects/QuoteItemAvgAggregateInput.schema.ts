import { z } from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  quantity: z.literal(true).optional(),
  days: z.literal(true).optional(),
  pricePerDay: z.literal(true).optional(),
  total: z.literal(true).optional()
}).strict();
export const QuoteItemAvgAggregateInputObjectSchema: z.ZodType<Prisma.QuoteItemAvgAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.QuoteItemAvgAggregateInputType>;
export const QuoteItemAvgAggregateInputObjectZodSchema = makeSchema();
