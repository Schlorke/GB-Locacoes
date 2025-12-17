import * as z from 'zod';
export const PermissionAggregateResultSchema = z.object({  _count: z.object({
    id: z.number(),
    role: z.number(),
    module: z.number(),
    action: z.number(),
    createdAt: z.number(),
    updatedAt: z.number()
  }).optional(),
  _min: z.object({
    id: z.string().nullable(),
    module: z.string().nullable(),
    action: z.string().nullable(),
    createdAt: z.date().nullable(),
    updatedAt: z.date().nullable()
  }).nullable().optional(),
  _max: z.object({
    id: z.string().nullable(),
    module: z.string().nullable(),
    action: z.string().nullable(),
    createdAt: z.date().nullable(),
    updatedAt: z.date().nullable()
  }).nullable().optional()});