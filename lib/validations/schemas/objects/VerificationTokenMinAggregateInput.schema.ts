import { z } from 'zod';
import type { Prisma } from '../../../../node_modules/.prisma/client';


export const VerificationTokenMinAggregateInputObjectSchema: z.ZodType<Prisma.VerificationTokenMinAggregateInputType, Prisma.VerificationTokenMinAggregateInputType> = z.object({
  identifier: z.literal(true).optional(),
  token: z.literal(true).optional(),
  expires: z.literal(true).optional()
}).strict();
export const VerificationTokenMinAggregateInputObjectZodSchema = z.object({
  identifier: z.literal(true).optional(),
  token: z.literal(true).optional(),
  expires: z.literal(true).optional()
}).strict();
