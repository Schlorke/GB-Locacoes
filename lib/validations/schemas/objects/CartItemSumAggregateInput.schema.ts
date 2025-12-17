import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  quantity: z.literal(true).optional(),
  days: z.literal(true).optional(),
  pricePerDay: z.literal(true).optional(),
  finalPrice: z.literal(true).optional()
}).strict();
export const CartItemSumAggregateInputObjectSchema: z.ZodType<Prisma.CartItemSumAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.CartItemSumAggregateInputType>;
export const CartItemSumAggregateInputObjectZodSchema = makeSchema();
