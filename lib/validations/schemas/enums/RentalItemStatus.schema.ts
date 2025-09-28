/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import { z } from 'zod';

export const RentalItemStatusSchema = z.enum(['RENTED', 'RETURNED', 'DAMAGED', 'LOST'])

export type RentalItemStatus = z.infer<typeof RentalItemStatusSchema>;