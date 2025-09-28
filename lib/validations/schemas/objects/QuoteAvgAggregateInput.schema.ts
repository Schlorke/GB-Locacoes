/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import { z } from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  total: z.literal(true).optional()
}).strict();
export const QuoteAvgAggregateInputObjectSchema: z.ZodType<Prisma.QuoteAvgAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.QuoteAvgAggregateInputType>;
export const QuoteAvgAggregateInputObjectZodSchema = makeSchema();
