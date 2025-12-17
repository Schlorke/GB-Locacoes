import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  amount: z.literal(true).optional()
}).strict();
export const PaymentSumAggregateInputObjectSchema: z.ZodType<Prisma.PaymentSumAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.PaymentSumAggregateInputType>;
export const PaymentSumAggregateInputObjectZodSchema = makeSchema();
