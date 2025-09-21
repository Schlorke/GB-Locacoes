import { z } from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  quantity: z.literal(true).optional(),
  priceperday: z.literal(true).optional(),
  totaldays: z.literal(true).optional(),
  totalprice: z.literal(true).optional()
}).strict();
export const Rental_itemsSumAggregateInputObjectSchema: z.ZodType<Prisma.Rental_itemsSumAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.Rental_itemsSumAggregateInputType>;
export const Rental_itemsSumAggregateInputObjectZodSchema = makeSchema();
