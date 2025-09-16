import { z } from 'zod';
export const SessionGroupByResultSchema = z.array(z.object({
  id: z.string(),
  sessionToken: z.string(),
  userId: z.string(),
  expires: z.date(),
  _count: z.object({
    id: z.number(),
    sessionToken: z.number(),
    userId: z.number(),
    expires: z.number(),
    user: z.number()
  }).optional(),
  _min: z.object({
    id: z.string().nullable(),
    sessionToken: z.string().nullable(),
    userId: z.string().nullable(),
    expires: z.date().nullable()
  }).nullable().optional(),
  _max: z.object({
    id: z.string().nullable(),
    sessionToken: z.string().nullable(),
    userId: z.string().nullable(),
    expires: z.date().nullable()
  }).nullable().optional()
}));