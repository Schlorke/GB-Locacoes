import { z } from 'zod';
import type { Prisma } from '../../../../node_modules/.prisma/client';


export const RentalsMaxAggregateInputObjectSchema: z.ZodType<Prisma.RentalsMaxAggregateInputType, Prisma.RentalsMaxAggregateInputType> = z.object({
  id: z.literal(true).optional(),
  startdate: z.literal(true).optional(),
  enddate: z.literal(true).optional(),
  total: z.literal(true).optional(),
  status: z.literal(true).optional(),
  userid: z.literal(true).optional(),
  createdat: z.literal(true).optional(),
  updatedat: z.literal(true).optional()
}).strict();
export const RentalsMaxAggregateInputObjectZodSchema = z.object({
  id: z.literal(true).optional(),
  startdate: z.literal(true).optional(),
  enddate: z.literal(true).optional(),
  total: z.literal(true).optional(),
  status: z.literal(true).optional(),
  userid: z.literal(true).optional(),
  createdat: z.literal(true).optional(),
  updatedat: z.literal(true).optional()
}).strict();
