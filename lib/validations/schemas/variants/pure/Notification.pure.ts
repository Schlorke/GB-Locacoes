/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod';
import { NotificationTypeSchema } from '../../enums/NotificationType.schema';
import { NotificationPrioritySchema } from '../../enums/NotificationPriority.schema';
// prettier-ignore
export const NotificationModelSchema = z.object({
    id: z.string(),
    userId: z.string(),
    type: NotificationTypeSchema,
    priority: NotificationPrioritySchema,
    title: z.string(),
    message: z.string(),
    isRead: z.boolean(),
    readAt: z.date().nullable(),
    actionUrl: z.string().nullable(),
    metadata: z.unknown().nullable(),
    expiresAt: z.date().nullable(),
    createdAt: z.date(),
    updatedAt: z.date(),
    user: z.unknown()
}).strict();

export type NotificationPureType = z.infer<typeof NotificationModelSchema>;
