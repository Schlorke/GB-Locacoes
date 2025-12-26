/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod';
import { NotificationTypeSchema } from '../../enums/NotificationType.schema';
import { NotificationPrioritySchema } from '../../enums/NotificationPriority.schema';
// prettier-ignore
export const NotificationInputSchema = z.object({
    id: z.string(),
    userId: z.string(),
    type: NotificationTypeSchema,
    priority: NotificationPrioritySchema,
    title: z.string(),
    message: z.string(),
    isRead: z.boolean(),
    readAt: z.date().optional().nullable(),
    actionUrl: z.string().optional().nullable(),
    metadata: z.unknown().optional().nullable(),
    expiresAt: z.date().optional().nullable(),
    createdAt: z.date(),
    updatedAt: z.date(),
    user: z.unknown()
}).strict();

export type NotificationInputType = z.infer<typeof NotificationInputSchema>;
