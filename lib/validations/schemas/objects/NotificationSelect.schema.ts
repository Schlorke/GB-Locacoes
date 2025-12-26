/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserArgsObjectSchema as UserArgsObjectSchema } from './UserArgs.schema'

const makeSchema = () => z.object({
  id: z.boolean().optional(),
  userId: z.boolean().optional(),
  type: z.boolean().optional(),
  priority: z.boolean().optional(),
  title: z.boolean().optional(),
  message: z.boolean().optional(),
  isRead: z.boolean().optional(),
  readAt: z.boolean().optional(),
  actionUrl: z.boolean().optional(),
  metadata: z.boolean().optional(),
  expiresAt: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  user: z.union([z.boolean(), z.lazy(() => UserArgsObjectSchema)]).optional()
}).strict();
export const NotificationSelectObjectSchema: z.ZodType<Prisma.NotificationSelect> = makeSchema() as unknown as z.ZodType<Prisma.NotificationSelect>;
export const NotificationSelectObjectZodSchema = makeSchema();
