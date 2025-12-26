/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod';

export const NotificationTypeSchema = z.enum(['QUOTE', 'ORDER', 'PAYMENT', 'EQUIPMENT', 'SYSTEM', 'RENTAL', 'DELIVERY', 'CONTRACT'])

export type NotificationType = z.infer<typeof NotificationTypeSchema>;