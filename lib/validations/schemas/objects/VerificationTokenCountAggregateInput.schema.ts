import { z } from 'zod';
import type { Prisma } from '../../../../node_modules/.prisma/client';


export const VerificationTokenCountAggregateInputObjectSchema: z.ZodType<Prisma.VerificationTokenCountAggregateInputType, Prisma.VerificationTokenCountAggregateInputType> = z.object({
  identifier: z.literal(true).optional(),
  token: z.literal(true).optional(),
  expires: z.literal(true).optional(),
  _all: z.literal(true).optional()
}).strict();
export const VerificationTokenCountAggregateInputObjectZodSchema = z.object({
  identifier: z.literal(true).optional(),
  token: z.literal(true).optional(),
  expires: z.literal(true).optional(),
  _all: z.literal(true).optional()
}).strict();
