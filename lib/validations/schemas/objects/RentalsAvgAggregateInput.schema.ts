import { z } from 'zod';
import type { Prisma } from '../../../../node_modules/.prisma/client';


export const RentalsAvgAggregateInputObjectSchema: z.ZodType<Prisma.RentalsAvgAggregateInputType, Prisma.RentalsAvgAggregateInputType> = z.object({
  total: z.literal(true).optional()
}).strict();
export const RentalsAvgAggregateInputObjectZodSchema = z.object({
  total: z.literal(true).optional()
}).strict();
