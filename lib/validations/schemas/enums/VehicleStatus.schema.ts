import * as z from 'zod';

export const VehicleStatusSchema = z.enum(['AVAILABLE', 'IN_USE', 'MAINTENANCE', 'OUT_OF_SERVICE'])

export type VehicleStatus = z.infer<typeof VehicleStatusSchema>;