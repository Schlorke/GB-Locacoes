/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import { z } from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.literal(true).optional(),
  startdate: z.literal(true).optional(),
  enddate: z.literal(true).optional(),
  total: z.literal(true).optional(),
  status: z.literal(true).optional(),
  userid: z.literal(true).optional(),
  createdat: z.literal(true).optional(),
  updatedat: z.literal(true).optional()
}).strict();
export const RentalsMinAggregateInputObjectSchema: z.ZodType<Prisma.RentalsMinAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.RentalsMinAggregateInputType>;
export const RentalsMinAggregateInputObjectZodSchema = makeSchema();
