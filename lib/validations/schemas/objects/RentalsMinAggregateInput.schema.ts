import { z } from 'zod';
import type { Prisma } from '../../../../node_modules/.prisma/client';


export const RentalsMinAggregateInputObjectSchema: z.ZodType<Prisma.RentalsMinAggregateInputType, Prisma.RentalsMinAggregateInputType> = z.object({
  id: z.literal(true).optional(),
  startdate: z.literal(true).optional(),
  enddate: z.literal(true).optional(),
  total: z.literal(true).optional(),
  status: z.literal(true).optional(),
  userid: z.literal(true).optional(),
  createdat: z.literal(true).optional(),
  updatedat: z.literal(true).optional()
}).strict();
export const RentalsMinAggregateInputObjectZodSchema = z.object({
  id: z.literal(true).optional(),
  startdate: z.literal(true).optional(),
  enddate: z.literal(true).optional(),
  total: z.literal(true).optional(),
  status: z.literal(true).optional(),
  userid: z.literal(true).optional(),
  createdat: z.literal(true).optional(),
  updatedat: z.literal(true).optional()
}).strict();
