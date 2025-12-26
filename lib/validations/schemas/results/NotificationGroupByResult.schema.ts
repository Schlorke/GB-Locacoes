/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod';
export const NotificationGroupByResultSchema = z.array(z.object({
  id: z.string(),
  userId: z.string(),
  title: z.string(),
  message: z.string(),
  isRead: z.boolean(),
  actionUrl: z.string(),
  metadata: z.unknown(),
  createdAt: z.date(),
  readAt: z.date(),
  _count: z.object({
    id: z.number(),
    userId: z.number(),
    type: z.number(),
    title: z.number(),
    message: z.number(),
    priority: z.number(),
    isRead: z.number(),
    actionUrl: z.number(),
    metadata: z.number(),
    createdAt: z.number(),
    readAt: z.number()
  }).optional(),
  _min: z.object({
    id: z.string().nullable(),
    userId: z.string().nullable(),
    title: z.string().nullable(),
    message: z.string().nullable(),
    actionUrl: z.string().nullable(),
    createdAt: z.date().nullable(),
    readAt: z.date().nullable()
  }).nullable().optional(),
  _max: z.object({
    id: z.string().nullable(),
    userId: z.string().nullable(),
    title: z.string().nullable(),
    message: z.string().nullable(),
    actionUrl: z.string().nullable(),
    createdAt: z.date().nullable(),
    readAt: z.date().nullable()
  }).nullable().optional()
}));