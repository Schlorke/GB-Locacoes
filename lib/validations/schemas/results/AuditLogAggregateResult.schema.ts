/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod';
export const AuditLogAggregateResultSchema = z.object({  _count: z.object({
    id: z.number(),
    userId: z.number(),
    action: z.number(),
    entity: z.number(),
    entityId: z.number(),
    changes: z.number(),
    ipAddress: z.number(),
    userAgent: z.number(),
    createdAt: z.number(),
    user: z.number()
  }).optional(),
  _min: z.object({
    id: z.string().nullable(),
    userId: z.string().nullable(),
    action: z.string().nullable(),
    entity: z.string().nullable(),
    entityId: z.string().nullable(),
    ipAddress: z.string().nullable(),
    userAgent: z.string().nullable(),
    createdAt: z.date().nullable()
  }).nullable().optional(),
  _max: z.object({
    id: z.string().nullable(),
    userId: z.string().nullable(),
    action: z.string().nullable(),
    entity: z.string().nullable(),
    entityId: z.string().nullable(),
    ipAddress: z.string().nullable(),
    userAgent: z.string().nullable(),
    createdAt: z.date().nullable()
  }).nullable().optional()});