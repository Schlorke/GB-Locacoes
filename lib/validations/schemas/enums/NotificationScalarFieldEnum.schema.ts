/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod';

export const NotificationScalarFieldEnumSchema = z.enum(['id', 'userId', 'type', 'title', 'message', 'priority', 'isRead', 'actionUrl', 'metadata', 'createdAt', 'readAt'])

export type NotificationScalarFieldEnum = z.infer<typeof NotificationScalarFieldEnumSchema>;