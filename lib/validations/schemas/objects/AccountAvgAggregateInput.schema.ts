import { z } from 'zod';
import type { Prisma } from '../../../../node_modules/.prisma/client';


export const AccountAvgAggregateInputObjectSchema: z.ZodType<Prisma.AccountAvgAggregateInputType, Prisma.AccountAvgAggregateInputType> = z.object({
  expires_at: z.literal(true).optional()
}).strict();
export const AccountAvgAggregateInputObjectZodSchema = z.object({
  expires_at: z.literal(true).optional()
}).strict();
