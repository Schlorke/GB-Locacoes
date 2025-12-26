/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod';

export const NotificationScalarFieldEnumSchema = z.enum(['id', 'userId', 'type', 'priority', 'title', 'message', 'isRead', 'readAt', 'actionUrl', 'metadata', 'expiresAt', 'createdAt', 'updatedAt'])

export type NotificationScalarFieldEnum = z.infer<typeof NotificationScalarFieldEnumSchema>;