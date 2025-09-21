import { z } from 'zod';
export const VerificationTokenAggregateResultSchema = z.object({  _count: z.object({
    identifier: z.number(),
    token: z.number(),
    expires: z.number()
  }).optional(),
  _min: z.object({
    identifier: z.string().nullable(),
    token: z.string().nullable(),
    expires: z.date().nullable()
  }).nullable().optional(),
  _max: z.object({
    identifier: z.string().nullable(),
    token: z.string().nullable(),
    expires: z.date().nullable()
  }).nullable().optional()});