import { z } from 'zod';
import type { Prisma } from '../../../../node_modules/.prisma/client';


export const Rental_itemsAvgAggregateInputObjectSchema: z.ZodType<Prisma.Rental_itemsAvgAggregateInputType, Prisma.Rental_itemsAvgAggregateInputType> = z.object({
  quantity: z.literal(true).optional(),
  priceperday: z.literal(true).optional(),
  totaldays: z.literal(true).optional(),
  totalprice: z.literal(true).optional()
}).strict();
export const Rental_itemsAvgAggregateInputObjectZodSchema = z.object({
  quantity: z.literal(true).optional(),
  priceperday: z.literal(true).optional(),
  totaldays: z.literal(true).optional(),
  totalprice: z.literal(true).optional()
}).strict();
