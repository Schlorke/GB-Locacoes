/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod';

export const NotificationPrioritySchema = z.enum(['LOW', 'MEDIUM', 'HIGH'])

export type NotificationPriority = z.infer<typeof NotificationPrioritySchema>;