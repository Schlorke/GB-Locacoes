import * as z from 'zod';

export const DriverStatusSchema = z.enum(['ACTIVE', 'INACTIVE', 'ON_LEAVE'])

export type DriverStatus = z.infer<typeof DriverStatusSchema>;