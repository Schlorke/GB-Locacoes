/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  total: z.literal(true).optional(),
  extensionDays: z.literal(true).optional(),
  extensionFee: z.literal(true).optional(),
  lateFee: z.literal(true).optional()
}).strict();
export const RentalsAvgAggregateInputObjectSchema: z.ZodType<Prisma.RentalsAvgAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.RentalsAvgAggregateInputType>;
export const RentalsAvgAggregateInputObjectZodSchema = makeSchema();
