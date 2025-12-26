/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod';
export const NotificationFindUniqueResultSchema = z.nullable(z.object({
  id: z.string(),
  userId: z.string(),
  type: z.unknown(),
  title: z.string(),
  message: z.string(),
  priority: z.unknown(),
  isRead: z.boolean(),
  actionUrl: z.string().optional(),
  metadata: z.unknown().optional(),
  createdAt: z.date(),
  readAt: z.date().optional()
}));