/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import { z } from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  quantity: z.literal(true).optional(),
  days: z.literal(true).optional(),
  pricePerDay: z.literal(true).optional(),
  finalPrice: z.literal(true).optional()
}).strict();
export const CartItemAvgAggregateInputObjectSchema: z.ZodType<Prisma.CartItemAvgAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.CartItemAvgAggregateInputType>;
export const CartItemAvgAggregateInputObjectZodSchema = makeSchema();
