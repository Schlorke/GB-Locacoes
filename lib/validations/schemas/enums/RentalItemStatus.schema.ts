import { z } from 'zod';

export const RentalItemStatusSchema = z.enum(['RENTED', 'RETURNED', 'DAMAGED', 'LOST'])

export type RentalItemStatus = z.infer<typeof RentalItemStatusSchema>;