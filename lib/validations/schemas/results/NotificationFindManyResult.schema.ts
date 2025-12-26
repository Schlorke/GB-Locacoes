/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod';
export const NotificationFindManyResultSchema = z.object({
  data: z.array(z.object({
  id: z.string(),
  userId: z.string(),
  type: z.unknown(),
  priority: z.unknown(),
  title: z.string(),
  message: z.string(),
  isRead: z.boolean(),
  readAt: z.date().optional(),
  actionUrl: z.string().optional(),
  metadata: z.unknown().optional(),
  expiresAt: z.date().optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
  user: z.unknown()
})),
  pagination: z.object({
  page: z.number().int().min(1),
  pageSize: z.number().int().min(1),
  total: z.number().int().min(0),
  totalPages: z.number().int().min(0),
  hasNext: z.boolean(),
  hasPrev: z.boolean()
})
});