/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.literal(true).optional(),
  userId: z.literal(true).optional(),
  type: z.literal(true).optional(),
  priority: z.literal(true).optional(),
  title: z.literal(true).optional(),
  message: z.literal(true).optional(),
  isRead: z.literal(true).optional(),
  readAt: z.literal(true).optional(),
  actionUrl: z.literal(true).optional(),
  expiresAt: z.literal(true).optional(),
  createdAt: z.literal(true).optional(),
  updatedAt: z.literal(true).optional()
}).strict();
export const NotificationMinAggregateInputObjectSchema: z.ZodType<Prisma.NotificationMinAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.NotificationMinAggregateInputType>;
export const NotificationMinAggregateInputObjectZodSchema = makeSchema();
