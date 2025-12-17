import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  total: z.literal(true).optional(),
  deliveryFee: z.literal(true).optional(),
  deposit: z.literal(true).optional(),
  discount: z.literal(true).optional(),
  finalTotal: z.literal(true).optional(),
  pickupFee: z.literal(true).optional(),
  priority: z.literal(true).optional(),
  subtotal: z.literal(true).optional(),
  taxes: z.literal(true).optional(),
  originalTotal: z.literal(true).optional(),
  lateFee: z.literal(true).optional()
}).strict();
export const QuoteAvgAggregateInputObjectSchema: z.ZodType<Prisma.QuoteAvgAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.QuoteAvgAggregateInputType>;
export const QuoteAvgAggregateInputObjectZodSchema = makeSchema();
