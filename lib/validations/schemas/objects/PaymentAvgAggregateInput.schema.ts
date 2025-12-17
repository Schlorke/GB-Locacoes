import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  amount: z.literal(true).optional()
}).strict();
export const PaymentAvgAggregateInputObjectSchema: z.ZodType<Prisma.PaymentAvgAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.PaymentAvgAggregateInputType>;
export const PaymentAvgAggregateInputObjectZodSchema = makeSchema();
