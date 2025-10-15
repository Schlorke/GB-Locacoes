/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  total: z.literal(true).optional()
}).strict();
export const RentalsSumAggregateInputObjectSchema: z.ZodType<Prisma.RentalsSumAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.RentalsSumAggregateInputType>;
export const RentalsSumAggregateInputObjectZodSchema = makeSchema();
