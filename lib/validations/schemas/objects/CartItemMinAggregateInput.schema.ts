import { z } from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.literal(true).optional(),
  cartId: z.literal(true).optional(),
  equipmentId: z.literal(true).optional(),
  quantity: z.literal(true).optional(),
  days: z.literal(true).optional(),
  pricePerDay: z.literal(true).optional(),
  finalPrice: z.literal(true).optional(),
  createdAt: z.literal(true).optional()
}).strict();
export const CartItemMinAggregateInputObjectSchema: z.ZodType<Prisma.CartItemMinAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.CartItemMinAggregateInputType>;
export const CartItemMinAggregateInputObjectZodSchema = makeSchema();
