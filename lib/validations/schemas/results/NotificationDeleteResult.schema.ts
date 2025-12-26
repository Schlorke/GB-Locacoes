/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod';
export const NotificationDeleteResultSchema = z.nullable(z.object({
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
}));