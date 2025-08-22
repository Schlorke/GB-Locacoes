import { z } from 'zod';
import type { Prisma } from '../../../../node_modules/.prisma/client';


export const AccountSumAggregateInputObjectSchema: z.ZodType<Prisma.AccountSumAggregateInputType, Prisma.AccountSumAggregateInputType> = z.object({
  expires_at: z.literal(true).optional()
}).strict();
export const AccountSumAggregateInputObjectZodSchema = z.object({
  expires_at: z.literal(true).optional()
}).strict();
