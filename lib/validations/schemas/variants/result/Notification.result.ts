/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod';
import { NotificationTypeSchema } from '../../enums/NotificationType.schema';
import { NotificationPrioritySchema } from '../../enums/NotificationPriority.schema';
// prettier-ignore
export const NotificationResultSchema = z.object({
    id: z.string(),
    userId: z.string(),
    type: NotificationTypeSchema,
    title: z.string(),
    message: z.string(),
    priority: NotificationPrioritySchema,
    isRead: z.boolean(),
    actionUrl: z.string().nullable(),
    metadata: z.unknown().nullable(),
    createdAt: z.date(),
    readAt: z.date().nullable()
}).strict();

export type NotificationResultType = z.infer<typeof NotificationResultSchema>;
