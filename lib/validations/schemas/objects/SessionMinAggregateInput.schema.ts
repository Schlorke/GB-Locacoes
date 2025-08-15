import { z } from 'zod';
import type { Prisma } from '../../../../node_modules/.prisma/client';


export const SessionMinAggregateInputObjectSchema: z.ZodType<Prisma.SessionMinAggregateInputType, Prisma.SessionMinAggregateInputType> = z.object({
  id: z.literal(true).optional(),
  sessionToken: z.literal(true).optional(),
  userId: z.literal(true).optional(),
  expires: z.literal(true).optional()
}).strict();
export const SessionMinAggregateInputObjectZodSchema = z.object({
  id: z.literal(true).optional(),
  sessionToken: z.literal(true).optional(),
  userId: z.literal(true).optional(),
  expires: z.literal(true).optional()
}).strict();
