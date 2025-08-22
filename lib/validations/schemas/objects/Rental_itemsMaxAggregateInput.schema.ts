import { z } from 'zod';
import type { Prisma } from '../../../../node_modules/.prisma/client';


export const Rental_itemsMaxAggregateInputObjectSchema: z.ZodType<Prisma.Rental_itemsMaxAggregateInputType, Prisma.Rental_itemsMaxAggregateInputType> = z.object({
  id: z.literal(true).optional(),
  rentalid: z.literal(true).optional(),
  equipmentid: z.literal(true).optional(),
  quantity: z.literal(true).optional(),
  priceperday: z.literal(true).optional(),
  totaldays: z.literal(true).optional(),
  totalprice: z.literal(true).optional(),
  createdat: z.literal(true).optional(),
  updatedat: z.literal(true).optional()
}).strict();
export const Rental_itemsMaxAggregateInputObjectZodSchema = z.object({
  id: z.literal(true).optional(),
  rentalid: z.literal(true).optional(),
  equipmentid: z.literal(true).optional(),
  quantity: z.literal(true).optional(),
  priceperday: z.literal(true).optional(),
  totaldays: z.literal(true).optional(),
  totalprice: z.literal(true).optional(),
  createdat: z.literal(true).optional(),
  updatedat: z.literal(true).optional()
}).strict();
