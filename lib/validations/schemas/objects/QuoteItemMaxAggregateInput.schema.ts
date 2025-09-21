import { z } from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.literal(true).optional(),
  quoteId: z.literal(true).optional(),
  equipmentId: z.literal(true).optional(),
  quantity: z.literal(true).optional(),
  days: z.literal(true).optional(),
  pricePerDay: z.literal(true).optional(),
  total: z.literal(true).optional(),
  createdAt: z.literal(true).optional(),
  updatedAt: z.literal(true).optional()
}).strict();
export const QuoteItemMaxAggregateInputObjectSchema: z.ZodType<Prisma.QuoteItemMaxAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.QuoteItemMaxAggregateInputType>;
export const QuoteItemMaxAggregateInputObjectZodSchema = makeSchema();
