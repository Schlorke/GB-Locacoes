import * as z from 'zod';

export const RentalStatusSchema = z.enum(['ACTIVE', 'COMPLETED', 'CANCELLED', 'OVERDUE', 'PENDING_RETURN'])

export type RentalStatus = z.infer<typeof RentalStatusSchema>;