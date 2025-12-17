import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  total: z.literal(true).optional(),
  extensionDays: z.literal(true).optional(),
  extensionFee: z.literal(true).optional(),
  lateFee: z.literal(true).optional()
}).strict();
export const RentalsSumAggregateInputObjectSchema: z.ZodType<Prisma.RentalsSumAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.RentalsSumAggregateInputType>;
export const RentalsSumAggregateInputObjectZodSchema = makeSchema();
