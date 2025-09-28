/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import { z } from 'zod';

export const PaymentStatusSchema = z.enum(['PENDING', 'PAID', 'OVERDUE', 'CANCELLED', 'REFUNDED'])

export type PaymentStatus = z.infer<typeof PaymentStatusSchema>;