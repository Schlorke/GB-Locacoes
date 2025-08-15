import { z } from 'zod';
import type { Prisma } from '../../../../node_modules/.prisma/client';


export const RentalsSumAggregateInputObjectSchema: z.ZodType<Prisma.RentalsSumAggregateInputType, Prisma.RentalsSumAggregateInputType> = z.object({
  total: z.literal(true).optional()
}).strict();
export const RentalsSumAggregateInputObjectZodSchema = z.object({
  total: z.literal(true).optional()
}).strict();
