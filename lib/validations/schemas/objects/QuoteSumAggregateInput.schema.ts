/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  total: z.literal(true).optional(),
  deliveryFee: z.literal(true).optional(),
  pickupFee: z.literal(true).optional(),
  deposit: z.literal(true).optional(),
  subtotal: z.literal(true).optional(),
  taxes: z.literal(true).optional(),
  discount: z.literal(true).optional(),
  finalTotal: z.literal(true).optional(),
  priority: z.literal(true).optional()
}).strict();
export const QuoteSumAggregateInputObjectSchema: z.ZodType<Prisma.QuoteSumAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.QuoteSumAggregateInputType>;
export const QuoteSumAggregateInputObjectZodSchema = makeSchema();
