import { z } from 'zod';
import type { Prisma } from '../../../../node_modules/.prisma/client';


export const QuoteMinAggregateInputObjectSchema: z.ZodType<Prisma.QuoteMinAggregateInputType, Prisma.QuoteMinAggregateInputType> = z.object({
  id: z.literal(true).optional(),
  name: z.literal(true).optional(),
  email: z.literal(true).optional(),
  phone: z.literal(true).optional(),
  company: z.literal(true).optional(),
  message: z.literal(true).optional(),
  total: z.literal(true).optional(),
  status: z.literal(true).optional(),
  userId: z.literal(true).optional(),
  createdAt: z.literal(true).optional(),
  updatedAt: z.literal(true).optional()
}).strict();
export const QuoteMinAggregateInputObjectZodSchema = z.object({
  id: z.literal(true).optional(),
  name: z.literal(true).optional(),
  email: z.literal(true).optional(),
  phone: z.literal(true).optional(),
  company: z.literal(true).optional(),
  message: z.literal(true).optional(),
  total: z.literal(true).optional(),
  status: z.literal(true).optional(),
  userId: z.literal(true).optional(),
  createdAt: z.literal(true).optional(),
  updatedAt: z.literal(true).optional()
}).strict();
