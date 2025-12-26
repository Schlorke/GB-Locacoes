/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod';
export const NotificationGroupByResultSchema = z.array(z.object({
  id: z.string(),
  userId: z.string(),
  title: z.string(),
  message: z.string(),
  isRead: z.boolean(),
  readAt: z.date(),
  actionUrl: z.string(),
  metadata: z.unknown(),
  expiresAt: z.date(),
  createdAt: z.date(),
  updatedAt: z.date(),
  _count: z.object({
    id: z.number(),
    userId: z.number(),
    type: z.number(),
    priority: z.number(),
    title: z.number(),
    message: z.number(),
    isRead: z.number(),
    readAt: z.number(),
    actionUrl: z.number(),
    metadata: z.number(),
    expiresAt: z.number(),
    createdAt: z.number(),
    updatedAt: z.number(),
    user: z.number()
  }).optional(),
  _min: z.object({
    id: z.string().nullable(),
    userId: z.string().nullable(),
    title: z.string().nullable(),
    message: z.string().nullable(),
    readAt: z.date().nullable(),
    actionUrl: z.string().nullable(),
    expiresAt: z.date().nullable(),
    createdAt: z.date().nullable(),
    updatedAt: z.date().nullable()
  }).nullable().optional(),
  _max: z.object({
    id: z.string().nullable(),
    userId: z.string().nullable(),
    title: z.string().nullable(),
    message: z.string().nullable(),
    readAt: z.date().nullable(),
    actionUrl: z.string().nullable(),
    expiresAt: z.date().nullable(),
    createdAt: z.date().nullable(),
    updatedAt: z.date().nullable()
  }).nullable().optional()
}));