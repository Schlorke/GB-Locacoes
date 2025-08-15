import { z } from 'zod';
import type { Prisma } from '../../../../node_modules/.prisma/client';


export const RentalsCountAggregateInputObjectSchema: z.ZodType<Prisma.RentalsCountAggregateInputType, Prisma.RentalsCountAggregateInputType> = z.object({
  id: z.literal(true).optional(),
  startdate: z.literal(true).optional(),
  enddate: z.literal(true).optional(),
  total: z.literal(true).optional(),
  status: z.literal(true).optional(),
  userid: z.literal(true).optional(),
  createdat: z.literal(true).optional(),
  updatedat: z.literal(true).optional(),
  _all: z.literal(true).optional()
}).strict();
export const RentalsCountAggregateInputObjectZodSchema = z.object({
  id: z.literal(true).optional(),
  startdate: z.literal(true).optional(),
  enddate: z.literal(true).optional(),
  total: z.literal(true).optional(),
  status: z.literal(true).optional(),
  userid: z.literal(true).optional(),
  createdat: z.literal(true).optional(),
  updatedat: z.literal(true).optional(),
  _all: z.literal(true).optional()
}).strict();
